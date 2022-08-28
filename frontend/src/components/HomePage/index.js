import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';
import { thunkLoginUser } from '../../store/session';
import './HomePage.css';


export default function HomePage() {
    const dispatch = useDispatch();
    const [headerBanner, setHeaderBanner] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('triggered')
            setHeaderBanner((val) => !val);
        }, 3000)
        return () => clearInterval(interval);
    }, [])


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
                            <button id='readme-button'>
                                README
                            </button>
                            <button id='github-button'>
                                Github Repo
                            </button>
                        </span></>) : (<span>
                            OTHER CONTENT
                        </span>)}
                <div id='header-switch-buttons'>
                    <div className={'switch-button' + (headerBanner ? ' this-one' : '')}>{''}
                    </div>
                    <div className={'switch-button' + (!headerBanner ? ' this-one' : '')}>{''}
                    </div>
                </div>
            </div>
            <div id='homepage-random-songs'>
                <ul>

                </ul>
            </div>
        </>
    )
}
