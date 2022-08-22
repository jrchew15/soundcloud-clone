import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { thunkRestoreUser } from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import AlbumCarousel from './components/Carousel/AlbumCarousel';
import CurrentUserPage from './components/UserPage/CurrentUserPage';
import SongForm from './components/SongForm';

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
          {currentUser && (<Route path={`/users/${currentUser.username}`}>
            <CurrentUserPage />
          </Route>)}
          <Route path={['/songs/upload','/songs/:songId/edit']}>
            <SongForm />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
