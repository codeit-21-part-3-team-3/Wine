import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import AuthGuard from '@/components/myprofile/AuthGuard';
import MyProfileContainer from '@/components/myprofile/MyProfileContainer';

export default function MyPage() {
  return (
    <>
      <Gnb />
      <Container>
        <AuthGuard>
          <MyProfileContainer />
        </AuthGuard>
      </Container>
    </>
  );
}
