import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import MyProfilePage from '@/components/myprofile/MyProfilePage';

export default function MyPage() {
  return (
    <>
      <Gnb />
      <Container>
        <div>
          <MyProfilePage />
        </div>
      </Container>
    </>
  );
}
