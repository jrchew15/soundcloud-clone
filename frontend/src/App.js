import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { thunkRestoreUser } from './store/session';
import { actionGetSongs, thunkGetSongs } from './store/songs';
import { resetQueue } from './store/queue';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import AlbumCarousel from './components/Carousel/AlbumCarousel';
import CurrentUserPage from './components/UserPage/CurrentUserPage';
import UserPage from './components/UserPage/UserPage';
import SongForm from './components/SongForm';
import MyMusicPlayer from './components/MusicPlayer';
import SongDetails from './components/SongDetails';
import OfferSignup from './components/LoggedOut';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const { queue } = useSelector(state => state.queue);

  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(thunkGetSongs());
      return
    }
    dispatch(actionGetSongs({}));
  }, [isLoaded, dispatch, currentUser])

  useEffect(() => {
    dispatch(resetQueue())
  }, [dispatch, currentUser])



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id='content-container'>
        <Switch>
          <Route exact path='/'>
            {currentUser && <AlbumCarousel />}
            {/* Logged out splash page here */}
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          {!currentUser && (<Route path='/'>
            <OfferSignup />
          </Route>)}
          {currentUser && (<Route path={`/users/${currentUser.id}`}>
            <CurrentUserPage />
          </Route>)}
          <Route path='/users/:userId'>
            <UserPage />
          </Route>
          <Route path={['/songs/upload', '/songs/:songId/edit']}>
            <SongForm />
          </Route>
          <Route path='/songs/:songId'>
            <SongDetails />
          </Route>
        </Switch>
      </div>
      {queue.length > 0 && <MyMusicPlayer />}
    </>
  );
}

export default App;
