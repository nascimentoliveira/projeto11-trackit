import styled from 'styled-components';
import { useState } from 'react';
import AddHabit from './AddHabit';
import HabitContext from './HabitContext';

export default function NavHabit() {

  const [showAddHabit, setShowAddHabit] = useState(false);

  return (
    <NavHabitComponent>
      <HabitContext.Provider value={{ showAddHabit, setShowAddHabit }}>
        <NavOption>
          Meus hábitos
          <button onClick={() => setShowAddHabit(!showAddHabit)}>+</button>
        </NavOption>
        {showAddHabit ? <AddHabit /> : ''}
      </HabitContext.Provider>
    </NavHabitComponent>
  );
}

const NavHabitComponent = styled.nav`
  font-family: 'Lexend Deca', sans-serif;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0px;
  box-sizing: border-box;
`;

const NavOption = styled.section`
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  font-size: 23px;
  line-height: 29px;
  color: #126BA5;

  button {
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 27px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;