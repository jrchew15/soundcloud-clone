import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div id='topbar'>
                <div id='navbar'>
                    <div id='home-container'>
                        <NavLink to='/'>
                            <i className="fab fa-cloudflare">
                                <span>NoiseFog</span>
                            </i>
                        </NavLink>
                        <ul>
                            <NavLink exact to="/discover"><li>Home</li></NavLink>
                            {sessionUser && <NavLink exact to={`/users/${sessionUser.id}/tracks`}><li>Library</li></NavLink>}
                        </ul>
                    </div>
                    <div style={{ display: 'flex', height: '100%' }}>
                        {sessionUser ? (sessionUser && <>
                            <NavLink to='/songs/upload'><span id='upload-button'>Upload</span></NavLink>
                            <span id='profile-button' className={showMenu && sessionUser ? 'menu-open' : ''} onClick={openMenu}>
                                {sessionUser && <ProfileButton user={sessionUser} showMenu={showMenu} />}
                            </span>
                        </>
                        ) : (
                            <>
                                <LoginFormModal />
                                <SignupFormModal />
                            </>
                        )}
                    </div>
                </div >
            </div >
            <div id='top-bar-offset'>{' '}</div>
        </>
    );
}

export default Navigation;
