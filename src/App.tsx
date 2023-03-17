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
import Shop from './pages/Shop';

const initialState = { currentUser: null };

interface UserState { currentUser: null | any };

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight

let isPortraitInitial: undefined | Boolean = undefined;
viewportWidth < viewportHeight ? isPortraitInitial = true : isPortraitInitial = false;

let isMobileInitial: undefined | Boolean = undefined;
viewportWidth < 600 ? isMobileInitial = true : isMobileInitial = false;

function useFormatState() {
  const [isPortrait, setIsPortrait] = useState(isPortraitInitial);
  window.onresize = () => {
    let ip = undefined;
    window.innerWidth < window.innerHeight ? ip = true : ip = false;
    setIsPortrait(ip);
  };

  return isPortrait;
}

function useMobileState() {
  const [isMobile, setIsMobile] = useState(isMobileInitial);
  window.onresize = () => {
    let im = undefined;
    window.innerWidth < 400 ? im = true : im = false;
    setIsMobile(im);
  };

  return isMobile;
}


function App() {
  const isPortrait = useFormatState();
  const isMobile = useMobileState();

  let root = document.documentElement;
  isMobile ?
    (root.style.setProperty('--font-size', 5 + "px"))
    :
    (root.style.setProperty('--font-size', 10 + "px"))

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
          <HomepageLayout isMobile={isMobile} currentUser={currentUser}>
            <Homepage isPortrait={isPortrait} />
          </HomepageLayout>
        )} />
        <Route path="/shop" element={(
          <MainLayout currentUser={currentUser}>
            <Shop />
          </MainLayout>
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
