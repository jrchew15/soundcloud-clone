import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
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

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} showMenu={showMenu} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Create Account</NavLink>
            </>
        );
    }

    return (
        <div id='topbar'>
            <div id='navbar'>
                <div id='home-container'>
                    <NavLink to='/'>
                        <i className="fa-brands fa-soundcloud"></i>
                    </NavLink>
                    <ul>
                        <NavLink exact to="/"><li>Home</li></NavLink>
                        <NavLink exact to="/library"><li>Library</li></NavLink>
                    </ul>
                </div>
                <span id='profile-button' className={showMenu ? 'menu-open' : ''} onClick={openMenu}>
                    {isLoaded && sessionLinks}
                </span>
            </div>
        </div>
    );
}

export default Navigation;
