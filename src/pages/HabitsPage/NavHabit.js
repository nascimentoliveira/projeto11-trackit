import styled from 'styled-components';
import AddHabit from './AddHabit';
import HabitContext from './HabitContext';
import { useContext } from 'react';

export default function NavHabit() {

  const { showAddHabit, setShowAddHabit } = useContext(HabitContext);

  return (
    <NavHabitComponent>
      <NavOption>
        Meus hábitos
        <button onClick={() => setShowAddHabit(!showAddHabit)}>+</button>
      </NavOption>
      {showAddHabit ? <AddHabit /> : ''}
    </NavHabitComponent>
  );
}

const NavHabitComponent = styled.nav`
  font-family: 'Lexend Deca', sans-serif;
  max-width: 375px;
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
  justify-content: space-between;
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