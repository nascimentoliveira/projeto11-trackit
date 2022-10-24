import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../UserContext';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_URL } from '../../constants/urls';
import logo from '../../assets/images/Logo.png';
import Spinner from '../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formEnabled, setFormEnabled] = useState(true);
  const [form, SetForm] = useState({ email: '', password: '' });

  function handleForm(e) {
    const { name, value } = e.target
    SetForm({ ...form, [name]: value })
  }

  function SignIn(e) {
    setFormEnabled(false);
    e.preventDefault();
    axios.post(SIGN_IN_URL, form)
      .then(res => {
        setUser(res.data);
        navigate('/hoje');
      })
      .catch(err => {
        toast.error(`Erro: ${err.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        //SetForm({ email: '', password: '' });
        setFormEnabled(true);
      });
  }

  return (
    <PageContainer>
      <ToastContainer />
      <img src={logo} alt='' />
      <Form onSubmit={SignIn}>
        <Input
          data-identifier='input-email'
          type='email'
          placeholder='email'
          name='email'
          value={form.email}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        >
        </Input>

        <Input
          data-identifier='input-password'
          type='password'
          placeholder='senha'
          name='password'
          value={form.password}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        >
        </Input>

        <Button
          data-identifier='login-btn'
          type='submit'
          disabled={!formEnabled}>
          {formEnabled ? 'Entrar' : Spinner('60')}
        </Button>
      </Form>
      <Link to='/cadastro'>
        <ButtonSwap
          data-identifier='sign-up-action'
        >
          Não tem uma conta? Cadastre-se!
        </ButtonSwap>
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
  color: #666666;
  background-color: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  padding: 0px 11px;
  margin: 3px;
  box-sizing: border-box;
  
  &::placeholder {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: #DBDBDB;
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: #666666;
    -webkit-box-shadow: 0 0 0px 45px #FFFFFF inset;
    box-shadow: 0 0 0px 45px #FFFFFF inset;
  }

  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const Button = styled.button`
  font-family: 'Lexend Deca', sans-serif;
  width: 100%;
  height: 45px;
  font-size: 21px;
  line-height: 26px;
  color: #FFFFFF;
  background-color: #52B6FF;
  opacity: 1;
  border-radius: 5px;
  margin: 3px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: .7;
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
  color: #52B6FF;
  border: none;
  outline: none;
`;