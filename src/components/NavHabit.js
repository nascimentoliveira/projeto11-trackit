import styled from 'styled-components';

function NavHabit() {
  return (
    <NavHabitComponent>
      <span>Meus hábitos</span>
      <button>+</button>
    </NavHabitComponent>
  );
}

export default NavHabit;

const NavHabitComponent = styled.nav`
  font-family: 'Lexend Deca', sans-serif;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 28px 0px;
  box-sizing: border-box;

  span {
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
  }

  button {
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 27px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    outline: none;
  }

`;