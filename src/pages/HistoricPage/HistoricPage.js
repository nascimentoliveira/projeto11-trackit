import styled from 'styled-components';
import Header from '../../components/Header';
import NavHistoric from '../../components/NavHistoric';
import Historic from '../../components/Historic';
import Footer from '../../components/Footer';

function HistoricPage() {
  return (
    <PageContainer>
      <Header />
      <NavHistoric />
      <Historic />
      <Footer />
    </PageContainer>
  );
}

export default HistoricPage;

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