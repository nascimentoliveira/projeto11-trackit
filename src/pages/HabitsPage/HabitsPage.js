import styled from 'styled-components';
import Header from '../../components/Header';
import NavHabit from './NavHabit';
import Habits from './Habits';
import MenuFooter from '../../components/MenuFooter';

export default function HabitsPage() {
  return (
    <PageContainer>
      <Header />
      <NavHabit />
      <Habits />
      <MenuFooter />
    </PageContainer>
  );
}


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