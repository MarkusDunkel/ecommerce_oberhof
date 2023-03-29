import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import { useFormatState, useMobileState, useResizeEvent } from './customHooks';
import './default.scss';
import { auth, handleUserProfile } from './firebase/utils';
import WithAuth from './hoc/withAuth';
import HomepageLayout from './layout/HomepageLayout';
import MainLayout from './layout/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import { setUser } from "./redux/features/User/userSlice";
import { RootState } from './redux/store';


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

    return () => {
      authListener();
    };
  }, []);


  const currentUser = useSelector(selectCurrentUser).id;

  console.log('Current user', currentUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <HomepageLayout isMobile={isMobile}>
            <Homepage isFormat={isFormat} isViewportSize={isViewportSize} />
          </HomepageLayout>
        )} />
        <Route path="/shop" element={(
          <WithAuth>
            <MainLayout isMobile={isMobile}>
              <Shop />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/registration" element={
          <MainLayout isMobile={isMobile}>
            <Registration />
          </MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout isMobile={isMobile}>
            <Login />
          </MainLayout>
        } />
        <Route path="/recovery" element={
          <MainLayout isMobile={isMobile}>
            <Recovery />
          </MainLayout>
        } />
        <Route path="/dashboard" element={
          <WithAuth>
            <MainLayout isMobile={isMobile}>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        } />
      </Routes>
    </div>
  );
}

export default App;
