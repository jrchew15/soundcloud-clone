import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div id='navbar'>
            <span>
                <i className="fa-solid fa-music"></i>
                <i className="fa-solid fa-cloud">cloud</i>
                <NavLink exact to="/">Home</NavLink>
            </span>
            <span>
                {isLoaded && sessionLinks}
            </span>
        </div>
    );
}

export default Navigation;
