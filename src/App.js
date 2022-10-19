import GlobalStyle from './assets/styles/GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import TodayPage from './pages/TodayPage/TodayPage';
import HistoricPage from './pages/HistoricPage/HistoricPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<SignInPage />}/>
        <Route path='/cadastro' element={<SignUpPage />}/>
        <Route path='/habitos' element={<HabitsPage />}/>
        <Route path='/hoje' element={<TodayPage />}/>
        <Route path='/historico' element={<HistoricPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;