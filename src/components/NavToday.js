import styled from 'styled-components';

function NavToday() {
  return (
    <NavTodayComponent>
      <Today>Segunda, 17/05</Today>
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