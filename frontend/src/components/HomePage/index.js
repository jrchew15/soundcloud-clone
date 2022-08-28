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
    const [randomSong1, setRandomSong1] = useState(null);
    const [randomSong2, setRandomSong2] = useState(null);

    useEffect(() => {
        const headerTimeout = setTimeout(() => {
            setHeaderBanner((val) => !val);
        }, 3000)
        return () => clearTimeout(headerTimeout);
    }, [headerBanner])

    useEffect(() => {
        getRandomSongs();
        async function getRandomSongs() {
            const num1 = Math.ceil(Math.random() * 145);
            const num2 = Math.ceil(Math.random() * 145);

            const res1 = await csrfFetch(`/api/songs/${num1}`);
            const song1 = await res1.json();
            setRandomSong1(song1);

            const res2 = await csrfFetch(`/api/songs/${num2}`);
            const song2 = await res2.json();
            setRandomSong2(song2);
        }
    }, [])

    async function getNewRandomSong1() {
        const num = Math.ceil(Math.random() * 145);

        const res = await csrfFetch(`/api/songs/${num}`);
        const song = await res.json();
        setRandomSong1(song);
    }

    async function getNewRandomSong2() {
        const num = Math.ceil(Math.random() * 145);

        const res = await csrfFetch(`/api/songs/${num}`);
        const song = await res.json();
        setRandomSong2(song);
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
                {randomSong1 && randomSong2 && (<div style={{ width: '95%' }}>
                    <h2>Try the Song Queue:</h2>
                    <div id='queue-test'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={randomSong1.previewImage || default_album_image} style={{ width: '240px' }} onError={(e) => e.target.src = default_album_image} />
                                <div className='queue-test-song-info' >
                                    <span onClick={() => history.push(`/songs/${randomSong1.id}`)}>{randomSong1.title}</span>
                                    {' by '}
                                    <span onClick={() => history.push(`/users/${randomSong1.Artist.id}`)}>{randomSong1.Artist.username}</span>
                                </div>
                            </div>
                            <div className='queue-test-buttons'>
                                <button onClick={() => dispatch(playThis(randomSong1))}>Play song now</button>
                                <button onClick={() => dispatch(actionConcatToQueue([randomSong1]))}>Add to queue</button>
                                <button onClick={getNewRandomSong1}>Get a different song</button>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={randomSong2.previewImage || default_album_image} style={{ width: '240px' }} onError={(e) => e.target.src = default_album_image} />
                                <div className='queue-test-song-info' >
                                    <span onClick={() => history.push(`/songs/${randomSong2.id}`)}>{randomSong2.title}</span>
                                    {' by '}
                                    <span onClick={() => history.push(`/users/${randomSong2.Artist.id}`)}>{randomSong2.Artist.username}</span>
                                </div>
                            </div>
                            <div className='queue-test-buttons'>
                                <button onClick={() => dispatch(playThis(randomSong2))}>Play song now</button>
                                <button onClick={() => dispatch(actionConcatToQueue([randomSong2]))}>Add to queue</button>
                                <button onClick={getNewRandomSong2}>Get a different song</button>
                            </div>
                        </div>
                    </div>
                </div>)}
                <Separator />
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

    function Separator() {
        return <div style={{ minHeight: '2px', width: '90%', backgroundColor: '#ebebeb' }}></div>
    }
}
