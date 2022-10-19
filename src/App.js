import GlobalStyle from './assets/styles/GlobalStyle';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import TodayPage from './pages/TodayPage/TodayPage';
import HistoricPage from './pages/HistoricPage/HistoricPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <HistoricPage />
    </>
  );
}

export default App;