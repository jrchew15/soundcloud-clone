import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
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
  SongsCarousel
} = components;



function App() {
  const routeMatch = useRouteMatch();
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const { queue } = useSelector(state => state.queue);

  const [contentHeight, setContentHeight] = useState({});

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

  useEffect(() => {
    console.log('routechange')
    const timeout = setTimeout(() => {
      console.log(contentRef)
      if (contentRef.current.clientHeight < window.innerHeight) {
        setContentHeight({ height: window.innerHeight })
      }
    }, 400);
    return () => {
      setContentHeight({})
      clearTimeout(timeout);
    }
  }, [routeMatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id='content-container' ref={contentRef} style={contentHeight}>
        <Switch>
          <Route exact path='/'>
            <AlbumCarousel />
            <SongsCarousel artistId={'4'} username={'Run River North'} />
            <SongsCarousel artistId={'5'} username='The Avett Brothers' />
            <SongsCarousel artistId={'6'} username='The Lumineers' />
            {/* Logged out splash page here */}
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
