import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { thunkRestoreUser } from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import AlbumCarousel from './components/Carousel/AlbumCarousel';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id='content-container'>
        <Switch>
          <Route exact path='/'>
            {currentUser && <AlbumCarousel />}
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
