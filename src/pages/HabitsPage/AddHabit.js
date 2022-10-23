import styled from 'styled-components';
import axios from 'axios';
import HabitContext from './HabitContext';
import UserContext from '../../UserContext';
import Spinner from '../../components/Spinner';
import { useState, useContext } from 'react';
import { CREATE_HABIT_URL } from '../../constants/urls';

export default function AddHabit() {

  const daysWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const { showAddHabit, setShowAddHabit } = useContext(HabitContext);
  const { token } = useContext(UserContext);
  const [formEnabled, setFormEnabled] = useState(true);
  const [habit, setHabit] = useState({
    name: '',
    days: []
  });

  function handleForm(e) {
    const { name, value } = e.target
    setHabit({ ...habit, [name]: value })
  }

  function handleDays(day) {
    let newDays = [];
    if (habit.days.some((x) => x === day)) {
      habit.days.splice(habit.days.indexOf(day), 1);
      newDays = habit.days
    }
    else
      newDays = [...habit.days, day];
    setHabit({ ...habit, days: newDays })
  }

  function sendHabit(e) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    setFormEnabled(false);
    e.preventDefault();
    axios.post(CREATE_HABIT_URL, habit, config)
      .then(res => {
        setShowAddHabit(!showAddHabit)
        setFormEnabled(true);
      })
      .catch(err => {
        alert(err.response.data.message)
        setFormEnabled(true);
      });
  }

  return (
    <AddHabitComponent onSubmit={sendHabit}>
      <InputHabitName
        type='text'
        placeholder='nome do hábito'
        name='name'
        value={habit.name}
        onChange={handleForm}
        disabled={!formEnabled}
        required
      >
      </InputHabitName>
      <WeekDays>
        {daysWeek.map((day, index) =>
          <InputButtonWeek
            key={index}
            type='button'
            value={day}
            disabled={!formEnabled}
            onClick={() => handleDays(index)}
            isSelected={habit.days.some((x) => x === index)}
          />
        )}
      </WeekDays>
      <Options>
        <InputCancel
          type='reset'
          value='Cancelar'
          disabled={!formEnabled}
          onClick={() => {
            setHabit({ name: '', days: [] })
            setShowAddHabit(!showAddHabit)
          }}
        />
        <InputSubmit
          type='submit'
          disabled={!formEnabled}
          onClick={sendHabit}
        >
          {formEnabled ? 'Salvar' : Spinner('30')}
        </InputSubmit>
      </Options>
    </AddHabitComponent>
  );
}

const AddHabitComponent = styled.form`
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