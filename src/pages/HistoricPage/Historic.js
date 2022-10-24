import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../../assets/styles/Calendar.css';
import axios from 'axios';
import UserContext from '../../UserContext';
import { useState, useContext, useEffect } from 'react';
import { HISTORIC_URL } from '../../constants/constants';
import { MutatingDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Historic() {

  const { user } = useContext(UserContext);
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [historic, setHistoric] = useState([]);
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  function getHistoric() {
    axios.get(HISTORIC_URL, config)
      .then(res => {
        setHistoric(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        toast.error(`Erro: ${err.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
      });
  }

  useEffect(getHistoric, []);

  if (loading) {
    return (
      <HistoricComponent>
        <ToastContainer />
        <MutatingDots
          height='100'
          width='100'
          color='#52B6FF'
          secondaryColor='#52B6FF'
          radius='20'
          ariaLabel='mutating-dots-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      </HistoricComponent>
    );
  } else if (error) {
    return (
      <HistoricComponent>
        <ToastContainer />
        Um erro ocorreu!
        Não foi possível carregar o histórico!
      </HistoricComponent>
    );
  } else {
    return (
      <HistoricComponent>
        <ToastContainer />
        <Calendar
          onChange={onChange}
          value={value}
        />
      </HistoricComponent>
    );
  }

}

const HistoricComponent = styled.section`
  max-width: 375px;
  width: 100%;
  font-family: 'Lexend Deca', sans-serif; 
  font-size: 18px;
  line-height: 22px;
  color: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
`;  