import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "./redux/features/User/userSlice";
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomepageLayout from './layout/HomepageLayout';
import Login from './pages/Login';
import Registration from './components/Registration';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';
import Homepage from './pages/Homepage';
import Shop from './pages/Shop';
import Recovery from './pages/Recovery';
import { RootState } from './redux/store';
import { useFormatState, useMobileState, useResizeEvent } from './customHooks';

const selectCurrentUser = (state: RootState) => state.user

const App = () => {
  const isViewportSize = useResizeEvent();
  const isFormat = useFormatState(isViewportSize);
  const isMobile = useMobileState(isViewportSize);

  const root = document.documentElement;
  isMobile ?
    (root.style.setProperty('--font-size', 8 + "px"))
    :
    (root.style.setProperty('--font-size', 10 + "px"))

  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      console.log('Auth state has changed');
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef?.onSnapshot(snapshot => {
          let data = { ...snapshot.data() }
          data.createdDate = data.createdDate.toString()

          dispatch(setUser({
            id: snapshot.id,
            ...data
          }))
        })
      }
      dispatch(setUser(null))
    });
  }, []);


  const currentUser = useSelector(selectCurrentUser).id;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <HomepageLayout isMobile={isMobile}>
            <Homepage isFormat={isFormat} isViewportSize={isViewportSize} />
          </HomepageLayout>
        )} />
        <Route path="/shop" element={(
          <MainLayout isMobile={isMobile}>
            <Shop />
          </MainLayout>
        )} />
        <Route path="/registration" element={
          currentUser ? (<Navigate replace to={"/"} />) :
            (<MainLayout isMobile={isMobile}>
              <Registration />
            </MainLayout>)
        } />
        <Route path="/login" element={
          !currentUser ?
            (<MainLayout isMobile={isMobile}>
              <Login />
            </MainLayout>) :
            (<Navigate replace to={"/"} />)
        } />
        <Route path="/recovery" element={
          <MainLayout isMobile={isMobile}>
            <Recovery />
          </MainLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;
