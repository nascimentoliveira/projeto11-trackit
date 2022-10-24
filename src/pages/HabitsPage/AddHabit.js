import styled from 'styled-components';
import axios from 'axios';
import HabitContext from './HabitContext';
import UserContext from '../../UserContext';
import Spinner from '../../components/Spinner';
import { useState, useContext } from 'react';
import { CREATE_HABIT_URL, DAYS_WEEK, DICT_NUM_DAYS } from '../../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

export default function AddHabit() {

  const { user, progress, setProgress, newHabit, setNewHabit } = useContext(UserContext);
  const [formEnabled, setFormEnabled] = useState(true);
  const { showAddHabit, setShowAddHabit, setRefresh } = useContext(HabitContext);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  function handleForm(e) {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  }

  function handleDays(day) {
    let newDays = [];
    if (newHabit.days.some((x) => x === day)) {
      newHabit.days.splice(newHabit.days.indexOf(day), 1);
      newDays = newHabit.days;
    }
    else
      newDays = [...newHabit.days, day];
    setNewHabit({ ...newHabit, days: newDays });
  }

  function sendHabit(e) {
    e.preventDefault();
    if (newHabit.days.length === 0) {
      toast.error(`Selecione pelo menos 1 dia da semana!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
    } else {
      setFormEnabled(false);
      axios.post(CREATE_HABIT_URL, newHabit, config)
        .then(res => {
          setShowAddHabit(!showAddHabit);
          setNewHabit({ name: '', days: [] });
          if (newHabit.days.includes(DICT_NUM_DAYS[dayjs().format('dddd')]))
            setProgress({ ...progress, notDone: [...progress.notDone, res.data.id] });
          setRefresh(Math.random());
          setFormEnabled(true);
        })
        .catch(err => {
          toast.error(`Erro: ${err.response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
          });
          setFormEnabled(true);
        })
    }
  }

  return (
    <AddHabitComponent onSubmit={sendHabit}>
      <ToastContainer />
      <InputHabitName
        data-identifier='input-habit-name'
        type='text'
        placeholder='nome do hábito'
        name='name'
        value={newHabit.name}
        onChange={handleForm}
        disabled={!formEnabled}
        required
      >
      </InputHabitName>
      <WeekDays>
        {DAYS_WEEK.map((day, index) =>
          <InputButtonWeek
            data-identifier='week-day-btn'
            key={index}
            type='button'
            value={day}
            disabled={!formEnabled}
            onClick={() => handleDays(index)}
            isSelected={newHabit.days.some((x) => x === index)}
          />
        )}
      </WeekDays>
      <Options>
        <InputCancel
          data-identifier='cancel-habit-create-btn'
          type='button'
          value='Cancelar'
          disabled={!formEnabled}
          onClick={() => setShowAddHabit(!showAddHabit)}
        />
        <InputSubmit
          data-identifier='save-habit-create-btn'
          type='submit'
          disabled={!formEnabled}
          onClick={sendHabit}
        >
          {formEnabled ? 'Salvar' : Spinner('30')}
        </InputSubmit>
      </Options>
    </AddHabitComponent >
  );
}

const AddHabitComponent = styled.form`
  max-width: 375px;
  width: 100%;
  height: 180px;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px;
  box-sizing: border-box;
`;

const InputHabitName = styled.input`
  width: 100%;
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  padding: 0px 11px;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  line-height: 25px;
  color: #666666;

  &::placeholder {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: #DBDBDB
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: #DBDBDB;
    -webkit-box-shadow: 0 0 0px 45px #FFFFFF inset;
    box-shadow: 0 0 0px 45px #FFFFFF inset;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const WeekDays = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 6px 0px;
`;

const InputButtonWeek = styled.input`
  width: 30px;
  height: 30px;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  line-height: 25px;
  background: ${props => props.isSelected ? '#CFCFCF' : '#FFFFFF'};
  border: 1px solid ${props => props.isSelected ? '#CFCFCF' : '#D5D5D5'};
  border-radius: 5px;
  margin: 2px;
  box-sizing: border-box;
  color: ${props => props.isSelected ? '#FFFFFF' : '#DBDBDB'};
  cursor: pointer;

  &:disabled {
    color: ${props => props.isSelected ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.isSelected ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid ${props => props.isSelected ? '#CFCFCF' : '#D5D5D5'};
  }
`;

const Options = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 23px;
`;

const InputCancel = styled.input`
  width: 84px;
  height: 35px;
  background: transparent;
  opacity: 1;
  border-radius: 5px;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin-right: 15px;
  color: #52B6FF;
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: .7;
  }
`;

const InputSubmit = styled.button`
  width: 84px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #52B6FF;
  opacity: 1;
  border-radius: 5px;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #FFFFFF;
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: .7;
  }
`;