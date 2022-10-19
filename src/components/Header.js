import styled from 'styled-components';

function Header() {
  return (
    <HeaderComponent>
      <Logo>TrackIt</Logo>
      <User>
        <img src='https://as2.ftcdn.net/v2/jpg/05/09/51/19/1000_F_509511952_jRFPLFJaVREHZ5zRTlwmIZBSvFWMcazK.jpg' alt='' />
      </User>
    </HeaderComponent>
  );
}

export default Header;

const HeaderComponent = styled.header`
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 1;
  left: 0px;
  top: 0px;
  background-color: #126BA5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 0px 18px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'Playball', sans-serif;
  font-size: 39px;
  line-height: 49px;
  color: #FFFFFF;
`;

const User = styled.figure`
  img {
    width: 51px;
    height: 51px;
    border-radius: 25px;
  }
`;