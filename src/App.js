import GlobalStyle from './assets/styles/GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './UserContext';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import TodayPage from './pages/TodayPage/TodayPage';
import HistoricPage from './pages/HistoricPage/HistoricPage';

function App() {

  const [user, setUser] = useState('');
  const [progress, setProgress] = useState({done:[], notDone:[]});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        progress,
        setProgress
      }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/cadastro' element={<SignUpPage />} />
          <Route path='/habitos' element={<HabitsPage />} />
          <Route path='/hoje' element={<TodayPage />} />
          <Route path='/historico' element={<HistoricPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;