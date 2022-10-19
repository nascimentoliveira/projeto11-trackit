import styled from 'styled-components';
import Header from '../../components/Header';
import NavToday from '../../components/NavToday';
import Footer from '../../components/Footer';


function TodayPage() {
  return (
    <PageContainer>
      <Header />
      <NavToday />
      <Footer />
    </PageContainer>
  );
}

export default TodayPage;

const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F2F2F2;
  padding: 70px 18px;
  box-sizing: border-box;
`;