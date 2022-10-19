import styled from 'styled-components';
import dayjs from 'dayjs';

function NavToday() {
  const dictWeekDays = {
    'Monday': 'Segunda',
    'Tuesday': 'Terça', 
    'Wednesday': 'Quarta',
    'Thursday': 'Quinta', 
    'Friday': 'Sexta',
    'Saturday': 'Sábado',
    'Sunday': 'Domingo'
  }

  return (
    <NavTodayComponent>
      <Today>{dictWeekDays[dayjs().format('dddd')]}, {dayjs().format('DD/MM')}</Today>
      <Status>Nenhum hábito concluído ainda</Status>
    </NavTodayComponent>
  );
}

export default NavToday;

const NavTodayComponent = styled.nav`
  width: 100%;
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 28px 18px;
  box-sizing: border-box;
`;

const Today = styled.span`
  font-size: 23px;
  line-height: 29px;
  color: #126BA5;
`;

const Status = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: #BABABA;
`;