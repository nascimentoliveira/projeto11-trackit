import styled from 'styled-components';
import Header from '../../components/Header';
import AddHabit from '../../components/NavHabit';
import Habits from '../../components/Habits';
import Footer from '../../components/Footer';

function HabitsPage() {
  return (
    <PageContainer>
      <Header />
      <AddHabit />
      <Habits />
      <Footer />
    </PageContainer>
  );
}

export default HabitsPage;

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