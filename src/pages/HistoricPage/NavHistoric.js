import styled from 'styled-components';

export default function NavHistoric() {
  return (
    <NavHistoricComponent>
      <span>Histórico</span>
    </NavHistoricComponent>
  );
}

const NavHistoricComponent = styled.nav`
  max-width: 375px;
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