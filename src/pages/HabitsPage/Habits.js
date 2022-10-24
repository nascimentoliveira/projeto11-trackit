import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../UserContext';
import HabitContext from './HabitContext';
import { TrashOutline } from 'react-ionicons';
import { MutatingDots } from 'react-loader-spinner';
import { HABITS_LIST_URL, DELETE_HABIT_URL, DAYS_WEEK } from '../../constants/constants';
import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Habits() {

  const { user, progress, setProgress } = useContext(UserContext);
  const { refresh, setRefresh } = useContext(HabitContext);
  const [habitsList, setHabitsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  function handleDelete(id) {
    if (progress.done.includes(id)) {
      progress.done.splice(progress.done.indexOf(id), 1);
      setProgress(progress);
    }
    else if (progress.notDone.includes(id)) {
      progress.notDone.splice(progress.notDone.indexOf(id), 1);
      setProgress(progress);
    }
  }

  function getHabit() {
    setLoading(true)
    axios.get(HABITS_LIST_URL, config)
      .then(res => {
        setHabitsList(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        toast.error(`Erro: ${err.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
      });
  }

  useEffect(getHabit, [refresh]);

  function deleteHabit(id, name) {
    if (window.confirm(`Deseja realmente excluir o hábito '${name}' ?`)) {
      axios.delete(`${DELETE_HABIT_URL}${id}`, config)
        .then(() => {
          setRefresh(Math.random());
          handleDelete(id);
        })
        .catch(err => {
          toast.error(`Erro: ${err.response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
          });
        });
    }
  }

  if (habitsList.length === 0) {
    if (loading) {
      return (
        <HabitComponent>
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
        </HabitComponent>
      );
    } else if (error) {
      return (
        <HabitComponent>
          <ToastContainer />
          Um erro ocorreu!
          Não foi possível carregar a lista de hábitos!
        </HabitComponent>
      );
    } else {
      return (
        <HabitComponent data-identifier='no-habit-message'>
          <ToastContainer />
          Você não tem nenhum hábito cadastrado ainda.
          Adicione um hábito para começar a trackear!
        </HabitComponent>
      );
    }
  }

  return (
    <HabitComponent>
      <ToastContainer />
      {habitsList.map(habit =>
        <HabitContainer key={habit.id}>
          <span data-identifier='habit-name'>{habit.name}</span>
          <WeekDays>
            {DAYS_WEEK.map((day, index) =>
              <Day
                key={index}
                isSelected={habit.days.some((x) => x === index)}
              >
                {day}
              </Day>
            )}
          </WeekDays>
          <TrashButton
            data-identifier='delete-habit-btn'
            onClick={() => deleteHabit(habit.id, habit.name)}
          >
            <TrashOutline
              color={'#666666'}
              title={'Excluir hábito'}
              height='20px'
              width='20px'
            />
          </TrashButton>
        </HabitContainer>

      )}
    </HabitComponent>
  );
}

const HabitComponent = styled.section`
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

const HabitContainer = styled.section`
  width: 100%;
  height: 91px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
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