import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from "./redux/features/User/userSlice";
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

const selectCurrentUser = (state: RootState) => state.user

// const initialState = { currentUser: null };

// interface UserState { currentUser: null | any };

const isViewportWidthInitial = window.innerWidth;
const isViewportHeightInitial = window.innerHeight

let isFormatInitial: undefined | string = undefined;
if (isViewportWidthInitial > 2 * isViewportHeightInitial) {
  isFormatInitial = 'landscape';
} else if (isViewportWidthInitial > isViewportHeightInitial) {
  isFormatInitial = 'squareLandscape';
} else if (isViewportWidthInitial > 2 * isViewportHeightInitial) {
  isFormatInitial = 'squarePortrait';
} else {
  isFormatInitial = 'portrait';
}

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

function useFormatState(isViewportSize: number[]): undefined | string {
  const [isFormat, setIsFormat] = useState(isFormatInitial);
  useEffect(() => {
    if (isViewportSize[0] > 1.5 * isViewportSize[1]) {
      setIsFormat('landscape');
    } else if (isViewportSize[0] > isViewportSize[1]) {
      setIsFormat('squareLandscape');
    } else if (isViewportSize[0] > .5 * isViewportSize[1]) {
      setIsFormat('squarePortrait');
    } else {
      setIsFormat('portrait');
    }
  }, [isViewportSize]);
  return isFormat;
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
  const isFormat = useFormatState(isViewportSize);
  const isMobile = useMobileState(isViewportSize);

  const root = document.documentElement;
  isMobile ?
    (root.style.setProperty('--font-size', 8 + "px"))
    :
    (root.style.setProperty('--font-size', 10 + "px"))

  // const [userState, setUserState] = useState<UserState>(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      console.log('Auth state has changed');
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef?.onSnapshot(snapshot => {
          console.log('snapshot_data', snapshot.data());
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
          // slice.actions.todoAdded)
          // setUserState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // })
        })
      }

      dispatch(setCurrentUser(null))
      // setUserState({
      //   ...initialState
      // });
    });
  }, [dispatch]);


  const currentUser = useSelector(selectCurrentUser).currentUser;
  // const currentUser = userState['currentUser'];
  console.log('current User', currentUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <HomepageLayout isMobile={isMobile} currentUser={currentUser}>
            <Homepage isFormat={isFormat} isViewportSize={isViewportSize} />
          </HomepageLayout>
        )} />
        <Route path="/shop" element={(
          <MainLayout currentUser={currentUser} isMobile={isMobile}>
            <Shop />
          </MainLayout>
        )} />
        <Route path="/registration" element={
          currentUser ? (<Navigate replace to={"/"} />) :
            (<MainLayout currentUser={currentUser} isMobile={isMobile}>
              <Registration />
            </MainLayout>)
        } />
        <Route path="/login" element={
          !currentUser ?
            (<MainLayout currentUser={currentUser} isMobile={isMobile}>
              <Login />
            </MainLayout>) :
            (<Navigate replace to={"/"} />)
        } />
        <Route path="/recovery" element={
          <MainLayout currentUser={currentUser} isMobile={isMobile}>
            <Recovery />
          </MainLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;
