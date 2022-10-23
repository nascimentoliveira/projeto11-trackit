import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../UserContext';
import HabitContext from './HabitContext';
import { TrashOutline } from 'react-ionicons';
import { HABITS_LIST_URL, DELETE_HABIT_URL } from '../../constants/urls';
import { useState, useContext, useEffect } from 'react';


export default function Habits() {

  const daysWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const { user } = useContext(UserContext);
  const { refresh, setRefresh } = useContext(HabitContext);
  const [habitsList, setHabitsList] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  function getHabit() {
    axios.get(HABITS_LIST_URL, config)
      .then(res => {
        setHabitsList(res.data)
        setRefresh(false)
      })
      .catch(err => console.log(err.response.data))
  }

  useEffect(getHabit, [refresh])

  function deleteHabit(id) {
    axios.delete(`${DELETE_HABIT_URL}${id}`, config)
      .then(setRefresh(true))
      .catch(err => console.log(err.response.data))
  }

  if (habitsList.length === 0) {
    return (
      <HabitComponent>
        Você não tem nenhum hábito cadastrado ainda.
        Adicione um hábito para começar a trackear!
      </HabitComponent>
    );
  }

  return (
    <HabitComponent>
      {habitsList.map(habit =>
        <HabitContainer key={habit.id}>
          {habit.name}
          <WeekDays>
            {daysWeek.map((day, index) =>
              <Day
                key={index}
                isSelected={habit.days.some((x) => x === index)}
              >
                {day}
              </Day>
            )}
          </WeekDays>
          <TrashButton
            onClick={() => { deleteHabit(habit.id) }}
          >
            <TrashOutline
              color={'#666666'}
              title={'Deletar hábito'}
              height='20px'
              width='20px'
            />
          </TrashButton>
        </HabitContainer>

      )}
    </HabitComponent>
  )
}

const HabitComponent = styled.section`
  max-width: 375px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif; 
  font-size: 18px;
  line-height: 22px;
  color: #666666;
`;

const HabitContainer = styled.section`
  width: 100%;
  height: 91px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0px;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  line-height: 25px;
  color: #666666;
  position: relative;
`;

const WeekDays = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 6px 0px;
`;

const Day = styled.li`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  line-height: 25px;
  background: ${props => props.isSelected ? '#CFCFCF' : '#FFFFFF'};
  border: 1px solid ${props => props.isSelected ? '#CFCFCF' : '#D5D5D5'};
  border-radius: 5px;
  margin: 2px;
  box-sizing: border-box;
  color: ${props => props.isSelected ? '#FFFFFF' : '#DBDBDB'};
`;

const TrashButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  outline: none;
  padding: 0px;
  margin: 0px;
  background-color: transparent;
  transition: .5s;

  &:hover {
    transform: scale(1.3);
  }
`;