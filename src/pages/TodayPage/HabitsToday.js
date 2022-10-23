import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../UserContext';
import { HABITS_LIST_TODAY_URL, HABIT_CHECK_URL } from '../../constants/urls';
import { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'react-ionicons';

export default function HabitsToday() {

  const { token } = useContext(UserContext);
  const [habitsList, setHabitsList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  function getHabitsList() {
    axios.get(HABITS_LIST_TODAY_URL, config)
      .then(res => {
        setHabitsList(res.data)
        setRefresh(false)
      })
      .catch(err => console.log(err.response.data))
  }

  useEffect(getHabitsList, [refresh])

  function checkHandle(id, isDone) {
    if (isDone) {
      axios.post(`${HABIT_CHECK_URL}${id}/uncheck`, {}, config)
        .then(() => setRefresh(true))
        .catch(err => console.log(err.response))
    } else {
      axios.post(`${HABIT_CHECK_URL}${id}/check`, {}, config)
        .then(() => setRefresh(true))
        .catch(err => console.log(err.response))
    }
  }

  if (habitsList.length === 0) {
    return (
      <TodayComponent>
        Você não tem nenhum hábito cadastrado ainda.
        Adicione um hábito para começar a trackear!
      </TodayComponent>
    );
  }

  return (
    <TodayComponent>
      {habitsList.map(habit =>
        <HabitTodayContainer
          key={habit.id}
          isDone={habit.done}
          isRercord={(habit.highestSequence === habit.currentSequence) && (habit.currentSequence > 0)}
        >
          <div>
            <h1>{habit.name}</h1>
            <h2>
              {'Sequência Atual: '}
              <span>
                {habit.currentSequence} dias
              </span>
            </h2>
            <h2>
              {'Seu recorde: '}
              <span>
                {habit.highestSequence} dias
              </span>
            </h2>
          </div>
          <CheckIcon
            isDone={habit.done}
            onClick={() => checkHandle(habit.id, habit.done)}
          >
            <Checkbox
              color={habit.done ? '#8FC549' : '#EBEBEB'}
              title={habit.done ? 'Desmarcar' : 'Marcar'}
              height='90px'
              width='90px'
            />
          </CheckIcon>
        </HabitTodayContainer>
      )}
    </TodayComponent>
  )
}

const TodayComponent = styled.section`
  max-width: 375px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif; 
  font-size: 18px;
  line-height: 22px;
  color: #666666;
`;

const HabitTodayContainer = styled.section`
  max-width: 340px;
  width: 100%;
  height: 94px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 13px;
  margin: 10px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-family: 'Lexend Deca', sans-serif;
    
    h1 {
      font-size: 20px;
      line-height: 25px;
      color: #666666;

      span {
        color: ${props => props.isDone ? '#8FC549' : '#666666'};
      }
    }

    h2 {
      font-size: 13px;
      line-height: 16px;
      color: #666666;

      span {
        color: ${props => props.isRercord ? '#8FC549' : '#666666'};
      }
    }
  }
`;

const CheckIcon = styled.button`
  width: 69px;
  height: 69px;
  background-color: transparent;
  border: ${props => props.isDone ? 'none' : '1px solid #E7E7E7'};
  border-radius: 5px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
