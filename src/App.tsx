import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import MainLayout from './layout/MainLayout';

const initialState = { currentUser: null };

interface UserState { currentUser: null | string };

function App() {
  const [userState, setUserState] = useState<UserState>(initialState);

  const currentUser = userState['currentUser'];

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <MainLayout currentUser={currentUser}>
            <div>
              Hello World!
            </div>
          </MainLayout>
        )} />
      </Routes>
    </div>
  );
}

export default App;
