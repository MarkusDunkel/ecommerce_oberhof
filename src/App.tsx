import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import MainLayout from './layout/MainLayout';
import HomepageLayout from './layout/HomepageLayout';
import Login from './pages/Login';
import Registration from './components/Registration';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';
import Homepage from './pages/Homepage';

const initialState = { currentUser: null };

interface UserState { currentUser: null | any };

function App() {
  const [userState, setUserState] = useState<UserState>(initialState);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef?.onSnapshot(snapshot => {
          setUserState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      setUserState({
        ...initialState
      });
    });
  }, []);

  const currentUser = userState['currentUser'];
  console.log(currentUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <HomepageLayout currentUser={currentUser}>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path="/registration" element={
          currentUser ? (<Navigate replace to={"/"} />) :
            (<MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>)
        } />
        <Route path="/login" element={
          !currentUser ?
            (<MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>) :
            (<Navigate replace to={"/"} />)
        } />
        {/* <Route path="/recovery" element={
          <MainLayout>
            <Recovery />
          </MainLayout>
        } /> */}
      </Routes>
    </div>
  );
}

export default App;
