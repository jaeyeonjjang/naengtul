import './App.css';
// import logo from './logo.svg';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
 import Refrigerator from './components/Refrigerator';
// import Login from './components/Login';
import Header from './components/Header';
import MainPage from './pages/MainPage.jsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// JSX의 장점
// 모든 값이 렌더링되기 전에 JSX로 이스케이프를 거치므로 주입 공격이 예방된다.
// 특히 자바스크립트 식을 중괄호 안에 넣어서 포함하는 기능이 유용하다

//js 파일 처음셋팅 단축키 rrc

function App() {


  return (
    <div className="App">
      <Header/>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/refrigerator" element={<Refrigerator/>} />
          </Routes>
        </Router>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            refrigerator
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <Login/> */}
      {/* <MainPage/> */}
    </div>
  );
}


export default App;
