import { GetServerSideProps } from 'next';
import HeroSection from '@/components/wine/detail/HeroSection';
import WineDetailLayout from '@/components/wine/detail/WineDetailLayout';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { ApiUser } from '@/lib/api/user/user.types';
import { parseCookie } from '@/lib/auth/cookie';
import { getWine } from '@/lib/api/wine/wine';
import { fetcher } from '@/lib/fetcher';
import { ApiPath } from '@/lib/fetcher.types';

interface WineDetailPageProps {
  wine: GetWineDetailResponse;
  user: ApiUser;
}

export default function WineDetailPage({ wine, user }: WineDetailPageProps) {
  if (!wine) return <div>와인 정보를 불러올 수 없습니다.</div>;

  return (
    <main>
      <HeroSection wine={wine} />
      <WineDetailLayout wine={wine} user={user} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<WineDetailPageProps> = async context => {
  const { wineid: id } = context.params!;
  const cookies = parseCookie(context.req.headers.cookie || '');
  const rawToken = cookies['accessToken'];
  const accessToken = rawToken && rawToken !== 'undefined' ? rawToken.replace(/"/g, '') : null;
  if (!accessToken) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const [wine, user] = await Promise.all([
      getWine(Number(id), accessToken),
      fetcher<ApiUser>(`/users/me` as ApiPath, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    if (!wine) {
      return { notFound: true };
    }

    return { props: { wine, user } };
  } catch (error: unknown) {
    let status = 500;

    if (error !== null && typeof error === 'object' && 'status' in error) {
      status = (error as { status: number }).status;
    }

    if (status === 401) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    console.error(`상세 페이지 로드 실패: ${status}`);
    return { notFound: true };
  }
};
