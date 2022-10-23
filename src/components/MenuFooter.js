import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function MenuFooter() {

  const { progress } = useContext(UserContext);

  return (
    <MenuFooterComponent>
      <Link to='/habitos'>
        <Button>Hábitos</Button>
      </Link>
      <Link to='/hoje'>
        <ButtonToday>
          <CircularProgressbarWithChildren
            value={progress}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: '#52B6FF',
              pathColor: '#FFFFFF',
              trailColor: 'transparent',
            })}>
            <div>Hoje</div>
          </CircularProgressbarWithChildren>
        </ButtonToday>
      </Link>
      <Link to='/historico'>
        <Button>Histórico</Button>
      </Link>
    </MenuFooterComponent>
  );
}

export default MenuFooter;

const MenuFooterComponent = styled.footer`
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 1;
  left: 0px;
  bottom: 0px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-around;
  padding: 0px 18px;
  box-sizing: border-box;
`;

const Button = styled.button`
  height: 100%;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #52B6FF;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const ButtonToday = styled.button`
  width: 91px;
  height: 91px;
  position: relative;
  bottom: 25px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  div {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;
  }
`;