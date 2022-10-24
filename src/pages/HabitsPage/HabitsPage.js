import styled from 'styled-components';
import Header from '../../components/Header';
import NavHabit from './NavHabit';
import Habits from './Habits';
import MenuFooter from '../../components/MenuFooter';
import HabitContext from './HabitContext';
import { useState } from 'react';

export default function HabitsPage() {

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [newHabit, setNewHabit] = useState({
    name: '',
    days: []
  });

  return (
    <HabitContext.Provider value={
      { showAddHabit, 
        setShowAddHabit, 
        refresh, 
        setRefresh,
        newHabit,
        setNewHabit
      }
    }>
      <PageContainer>
        <Header />
        <NavHabit />
        <Habits />
        <MenuFooter />
      </PageContainer>
    </HabitContext.Provider>
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