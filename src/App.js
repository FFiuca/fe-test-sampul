import logo from './logo.svg';
import './App.css';

import { React, ReactFragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useNavigation } from 'react-router-dom';

import MainContext from './contexts/MainContext';

import Main from './components/main/Main';
import WrapNav from './contexts/MainContext';
import ChatPage from './pages/ChatPage';

function App() {
  const navigate = useNavigate() // duduk useNavigation ye

  return (
    <div>
        <MainContext navigate={navigate}>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
          </Routes>
        </MainContext>
    </div>
  );
}

export default App;
