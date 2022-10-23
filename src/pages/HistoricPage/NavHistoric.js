import styled from 'styled-components';

function NavHistoric() {
  return (
    <NavHistoricComponent>
      <span>Histórico</span>
    </NavHistoricComponent>
  );
}

export default NavHistoric;

const NavHistoricComponent = styled.nav`
  width: 100%;
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 28px 18px;
  box-sizing: border-box;
  
  span {
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
  }
`;