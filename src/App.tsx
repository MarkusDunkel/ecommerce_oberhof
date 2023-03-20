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

const isViewportWidthInitial = window.innerWidth;
const isViewportHeightInitial = window.innerHeight

let isPortraitInitial: undefined | Boolean = undefined;
isViewportWidthInitial < isViewportHeightInitial ? isPortraitInitial = true : isPortraitInitial = false;

let isMobileInitial: undefined | Boolean = undefined;
isViewportWidthInitial < 600 ? isMobileInitial = true : isMobileInitial = false;

function useResizeEvent() {
  const [isViewportSize, setViewportSize] = useState([isViewportWidthInitial, isViewportHeightInitial]);
  window.onresize = () => {
    setViewportSize([
      window.innerWidth,
      window.innerHeight
    ]);
  };
  return (isViewportSize);
}

function useFormatState(isViewportSize: number[]): undefined | Boolean {
  const [isPortrait, setIsPortrait] = useState(isPortraitInitial);
  useEffect(() => {
    let ip = undefined;
    isViewportSize[0] < isViewportSize[1] ? ip = true : ip = false;
    setIsPortrait(ip)
  }, [isViewportSize]
  )

  return isPortrait;
}

function useMobileState(isViewportSize: number[]): undefined | Boolean {
  const [isMobile, setIsMobile] = useState(isMobileInitial);
  useEffect(() => {
    let im = undefined;
    isViewportSize[0] < 600 ? im = true : im = false;
    setIsMobile(im)
  }, [isViewportSize]
  )

  return isMobile;
}


function App() {
  const isViewportSize = useResizeEvent();
  const isPortrait = useFormatState(isViewportSize);
  const isMobile = useMobileState(isViewportSize);

  const root = document.documentElement;
  isMobile ?
    (root.style.setProperty('--font-size', 8 + "px"))
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
