import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_URL } from '../../constants/urls';
import { SIGN_UP_COLORS } from '../../constants/colors';
import logo from '../../assets/images/Logo.png';
import Spinner from '../../components/Spinner';

export default function SignUpPage() {

  const navigate = useNavigate();
  const [formEnabled, setFormEnabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    name: '',
    image: '',
    password: ''
  })

  function handleForm(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function SignUp(e) {
    setFormEnabled(false);
    e.preventDefault();
    console.log(user);
    axios.post(SIGN_UP_URL, user)
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(err => {
        alert(err.response.data.message)
        setUser({
          email: '',
          name: '',
          image: '',
          password: ''
        });
        setFormEnabled(true);
      });
  }

  return (
    <PageContainer>
      <img src={logo} alt='' />
      <Form onSubmit={SignUp}>
        <Input
          type='email'
          placeholder='email'
          name='email'
          value={user.email}
          onChange={handleForm}
          disabled={!formEnabled}
          required>
        </Input>

        <Input
          type='password'
          placeholder='senha'
          name='password'
          value={user.password}
          onChange={handleForm}
          disabled={!formEnabled}
          required>
        </Input>

        <Input
          type='text'
          placeholder='nome'
          name='name'
          value={user.name}
          onChange={handleForm}
          disabled={!formEnabled}
          required>
        </Input>

        <Input
          type='text'
          placeholder='foto'
          name='image'
          value={user.image}
          onChange={handleForm}
          disabled={!formEnabled}
          required>
        </Input>

        <Button type='submit' disabled={!formEnabled}>
        {formEnabled ? 'Cadastrar' : Spinner()}
        </Button>
      </Form>
      <Link to='/'>
        <ButtonSwap>Já tem uma conta? Faça login!</ButtonSwap>
      </Link>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 180px;
    margin: 33px;
  } 
`;

const Form = styled.form`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  line-height: 25px;
  color: ${SIGN_UP_COLORS.active.inputText};
  background-color: ${SIGN_UP_COLORS.active.inputBackground};
  border: 1px solid ${SIGN_UP_COLORS.active.inputBorder};
  border-radius: 5px;
  margin: 3px;
  box-sizing: border-box;

  &::placeholder {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: ${SIGN_UP_COLORS.active.inputText};
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: ${SIGN_UP_COLORS.active.inputText};
    -webkit-box-shadow: 0 0 0px 45px ${SIGN_UP_COLORS.active.inputBackground} inset;
    box-shadow: 0 0 0px 45px ${SIGN_UP_COLORS.active.inputBackground} inset
  }

  &:disabled {
    color: ${SIGN_UP_COLORS.inactive.inputText};
    background-color: ${SIGN_UP_COLORS.inactive.inputBackground};
    -webkit-text-fill-color: ${SIGN_UP_COLORS.inactive.inputText};
    -webkit-box-shadow: 0 0 0px 45px ${SIGN_UP_COLORS.inactive.inputBackground} inset;
    box-shadow: 0 0 0px 45px ${SIGN_UP_COLORS.inactive.inputBackground} inset;
  }
`;

const Button = styled.button`
  font-family: 'Lexend Deca', sans-serif;
  width: 100%;
  height: 45px;
  font-size: 21px;
  line-height: 26px;
  color: ${SIGN_UP_COLORS.active.textButton};
  background-color: ${SIGN_UP_COLORS.active.button};
  opacity: ${SIGN_UP_COLORS.active.buttonOpacity};
  border-radius: 5px;
  margin: 3px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: ${SIGN_UP_COLORS.inactive.buttonOpacity};
  }
`;

const ButtonSwap = styled.button`
  font-family: 'Lexend Deca', sans-serif;
  font-size: 14px;
  line-height: 17px;
  margin: 22px;
  box-sizing: border-box;
  text-decoration-line: underline;
  background-color: transparent;
  color: ${SIGN_UP_COLORS.active.buttonSwapText};
  border: none;
  outline: none;
`;
