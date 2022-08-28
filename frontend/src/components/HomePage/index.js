import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';
import { thunkLoginUser } from '../../store/session';
import { playThis, actionConcatToQueue } from "../../store/queue";
import { csrfFetch } from "../../store/csrf";
import { default_album_image } from "../../utils/default_images";
import './HomePage.css';


export default function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [headerBanner, setHeaderBanner] = useState(true);
    const [randomSong, setRandomSong] = useState(null);

    useEffect(() => {
        const headerTimeout = setTimeout(() => {
            setHeaderBanner((val) => !val);
        }, 3000)
        return () => clearTimeout(headerTimeout);
    }, [headerBanner])

    useEffect(() => {
        getRandomSong();
        async function getRandomSong() {
            const num = Math.ceil(Math.random() * 145);

            const res = await csrfFetch(`/api/songs/${num}`);
            const song = await res.json();
            setRandomSong(song);
        }
    }, [])

    async function getNewRandomSong() {
        const num = Math.ceil(Math.random() * 145);

        const res = await csrfFetch(`/api/songs/${num}`);
        const song = await res.json();
        setRandomSong(song);
    }

    const rightButtons = (
        <>
            {process.env.NODE_ENV !== 'production' && (
                <button onClick={(e) => {
                    dispatch(thunkLoginUser({ credential: 'The Lumineers', password: 'password' }))
                }}>
                    Demo User (Lumineers)
                </button>
            )}
            <LoginFormModal />
            <SignupFormModal />
        </>
    );

    return (
        <>
            <div id='homepage-topbar'>
                <div id='homepage-navbar'>
                    <div id='homepage-home-container'>
                        <NavLink to='/'>
                            <i className="fab fa-cloudflare" />
                            {'NoiseFog'}
                        </NavLink>
                    </div>
                    <div style={{ display: 'flex', height: '100%' }}>
                        {rightButtons}
                    </div>
                </div >
            </div >
            <div id='homepage-header' className={headerBanner ? 'banner1' : 'banner2'}>
                {headerBanner ? (
                    <><h2>More about the project</h2>
                        <span style={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
                            <a href='https://github.com/jrchew15/soundcloud-clone/wiki'>
                                <button id='readme-button'>
                                    README
                                </button>
                            </a>
                            <a href='https://github.com/jrchew15/soundcloud-clone'>
                                <button id='github-button'>
                                    Github Repo
                                </button>
                            </a>
                        </span></>) : (<><h2>Explore without creating an account:</h2>
                            <span style={{ width: '30%', display: 'flex', justifyContent: 'center' }}>
                                <button id='readme-button' onClick={() => history.push('/discover')}>
                                    {'Albums & Songs'}
                                </button>
                            </span></>)}
                <div id='header-switch-buttons'>
                    <div className={'switch-button' + (headerBanner ? ' this-one' : '')} onClick={() => setHeaderBanner(true)}>{''}
                    </div>
                    <div className={'switch-button' + (!headerBanner ? ' this-one' : '')} onClick={() => setHeaderBanner(false)}>{''}
                    </div>
                </div>
            </div >
            <div id='homepage-content'>
                {randomSong && (<div>
                    <h2>Try the Song Queue:</h2>
                    <div id='queue-test'>
                        <img src={randomSong.previewImage || default_album_image} style={{ gridRow: '1/3', gridColumn: '1', width: '100%' }} onError={(e) => e.target.src = default_album_image} />
                        <button onClick={() => dispatch(playThis(randomSong))}>Play song now</button>
                        <button onClick={() => dispatch(actionConcatToQueue([randomSong]))}>Add to queue</button>
                        <button onClick={getNewRandomSong}>get a different song</button>
                        <span id='queue-test-song-info' style={{ gridRow: 3 }}>
                            <span onClick={() => history.push(`/songs/${randomSong.id}`)}>{randomSong.title}</span>
                            {' by '}
                            <span onClick={() => history.push(`/users/${randomSong.Artist.id}`)}>{randomSong.Artist.username}</span>
                        </span>
                    </div>
                </div>)}
                <div id='homepage-sampler'>
                    <h2>A Sampling of Detail Pages:</h2>
                    <ul>
                        <li>Artist</li>
                        <li>Album</li>
                        <li>Song</li>
                        <li>Become a User</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
