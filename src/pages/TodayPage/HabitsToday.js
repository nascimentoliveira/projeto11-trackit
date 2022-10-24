import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../UserContext';
import Spinner from '../../components/Spinner';
import { MutatingDots } from 'react-loader-spinner';
import { HABITS_LIST_TODAY_URL, HABIT_CHECK_URL } from '../../constants/constants';
import { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'react-ionicons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HabitsToday() {

  const { user, setProgress } = useContext(UserContext);
  const [habitsList, setHabitsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkLoading, setCheckLoading] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  function calcProgress(habits) {
    setProgress({
      done: habits.filter(habit => habit.done).map(habit => habit.id),
      notDone: habits.filter(habit => !habit.done).map(habit => habit.id)
    });
  }

  function getHabitsList(id) {
    axios.get(HABITS_LIST_TODAY_URL, config)
      .then(res => {
        setHabitsList(res.data);
        calcProgress(res.data);
        setLoading(false);
        checkLoading.splice(checkLoading.indexOf(id), 1);
        setCheckLoading(checkLoading);
      })
      .catch(err => {
        setLoading(false)
        setError(true)
        toast.error(`Erro: ${err.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        checkLoading.splice(checkLoading.indexOf(id), 1);
        setCheckLoading(checkLoading);
      })
  }

  useEffect(() => getHabitsList(), []);

  function checkHandle(id, isDone) {
    if (isDone) {
      axios.post(`${HABIT_CHECK_URL}${id}/uncheck`, {}, config)
        .then(() => {
          getHabitsList(id);
        })
        .catch(err => {
          toast.error(`Erro: ${err.response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
          });
          checkLoading.splice(checkLoading.indexOf(id), 1);
          setCheckLoading(checkLoading);
        });
    } else {
      axios.post(`${HABIT_CHECK_URL}${id}/check`, {}, config)
        .then(() => {
          getHabitsList(id);
        })
        .catch(err => {
          toast.error(`Erro: ${err.response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
          });
          checkLoading.splice(checkLoading.indexOf(id), 1);
          setCheckLoading(checkLoading);
        })
    }
  }

  if (habitsList.length === 0) {
    if (loading) {
      return (
        <TodayComponent>
          <ToastContainer />
          <MutatingDots
            height='100'
            width='100'
            color='#52B6FF'
            secondaryColor='#52B6FF'
            radius='20'
            ariaLabel='mutating-dots-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </TodayComponent>
      );
    } else if (error) {
      return (
        <TodayComponent>
          <ToastContainer />
          Um erro ocorreu!
          Não foi possível carregar a lista de hábitos!
        </TodayComponent>
      );
    } else {
      return (
        <TodayComponent>
          <ToastContainer />
          Você não tem nenhum hábito cadastrado ainda.
          Adicione um hábito para começar a trackear!
        </TodayComponent>
      );
    }
  }

  return (
    <TodayComponent>
      <ToastContainer />
      {habitsList.map(habit =>
        <HabitTodayContainer key={habit.id}>
          <div>
            <h1>{habit.name}</h1>
            <CurrentSequence isDone={habit.done}>
              {'Sequência Atual: '}
              <span >
                {(habit.currentSequence > 1) ? `${habit.currentSequence} dias` : `${habit.currentSequence} dia`}
              </span>
            </CurrentSequence>
            <Record isRercord={((habit.highestSequence === habit.currentSequence) && (habit.currentSequence > 0) && (habit.done))}>
              {'Seu recorde: '}
              <span>
                {(habit.currentSequence > 1) ? `${habit.highestSequence} dias` : `${habit.highestSequence} dia`}
              </span>
            </Record>
          </div>
          <CheckIcon
            data-identifier='done-habit-btn'
            isDone={habit.done}
            onClick={() => {
              setCheckLoading([...checkLoading, habit.id])
              checkHandle(habit.id, habit.done)
            }}
            disabled={checkLoading.includes(habit.id)}
          >
            {checkLoading.includes(habit.id) ?
              Spinner('30')
              :
              <Checkbox
                color={habit.done ? '#8FC549' : '#EBEBEB'}
                title={habit.done ? 'Desmarcar' : 'Marcar'}
                height='90px'
                width='90px'
              />
            }
          </CheckIcon>
        </HabitTodayContainer>
      )}
    </TodayComponent>
  );
}

const TodayComponent = styled.section`
  max-width: 375px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif; 
  font-size: 18px;
  line-height: 22px;
  color: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HabitTodayContainer = styled.section`
  max-width: 340px;
  width: 100%;
  height: 94px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 13px;
  margin-bottom: 10px;
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
    }
  }
`;

const CurrentSequence = styled.h2`
  font-family: 'Lexend Deca', sans-serif;
  font-size: 13px;
  line-height: 16px;
  color: #666666;

  span {
    color: ${props => props.isDone ? '#8FC549' : '#666666'};
  }
`;

const Record = styled.h2`
  font-family: 'Lexend Deca', sans-serif;
  font-size: 13px;
  line-height: 16px;
  color: #666666;

  span {
    color: ${props => props.isRercord ? '#8FC549' : '#666666'};
  }
`;

const CheckIcon = styled.button`
  width: 72px;
  height: 72px;
  background-color: transparent;
  border: ${props => props.isDone ? 'none' : '1px solid #E7E7E7'};
  border-radius: 12px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: ${props => props.isDone ? '#8FC549' : '#EBEBEB'};
  }
`;