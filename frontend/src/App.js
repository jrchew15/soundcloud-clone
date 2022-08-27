import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { thunkRestoreUser } from './store/session';
import { actionGetSongs, thunkGetSongs } from './store/songs';
import { resetQueue } from './store/queue';
import components from './components';

const { SignupFormPage,
  Navigation,
  AlbumCarousel,
  CurrentUserPage,
  UserPage,
  SongForm,
  MyMusicPlayer,
  SongDetails,
  OfferSignup,
  SongsCarousel,
  AlbumPage
} = components;



function App() {
  const routeMatch = useRouteMatch();
  const contentRef = useRef(null);
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
      <div id='content-container' ref={contentRef}>
        <Switch>
          <Route exact path='/'>
            {currentUser && <Redirect to='/discover' />}
          </Route>
          <Route exact path='/discover'>
            <AlbumCarousel />
            <SongsCarousel artistId={'4'} username={'Run River North'} />
            <SongsCarousel artistId={'5'} username='The Avett Brothers' />
            <SongsCarousel artistId={'6'} username='The Lumineers' />
            <SongsCarousel artistId={'7'} username='Pixabay' />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          {isLoaded && !currentUser && (<Route path='/'>
            <OfferSignup />
          </Route>)}
          {currentUser && (<Route path={`/users/${currentUser.id}`}>
            <CurrentUserPage />
          </Route>)}
          <Route path='/users/:userId'>
            <UserPage />
          </Route>
          <Route path={['/songs/upload', '/songs/:songId/edit']}>
            <SongForm contentRef={contentRef}/>
          </Route>
          <Route path='/songs/:songId'>
            <SongDetails />
          </Route>
          <Route path='/albums/:albumId'>
            <AlbumPage />
          </Route>
        </Switch>
      </div>
      {queue.length > 0 && <MyMusicPlayer />}
    </>
  );
}

export default App;
