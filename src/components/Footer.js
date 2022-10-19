import styled from 'styled-components';

function Footer() {
  return (
    <FooterComponent>
      <Button>Hábitos</Button>
      <Button>Hoje</Button>
      <Button>Histórico</Button>
    </FooterComponent>
  );
}

export default Footer;

const FooterComponent = styled.footer`
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
`;