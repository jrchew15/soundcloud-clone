import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { thunkLogoutUser } from '../../store/session';
// import './Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
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
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
                {isLoaded && (
                    <button onClick={handleLogoutClick}>
                        Logout
                    </button>
                )}
            </li>
        </ul>
    );

    async function handleLogoutClick() {
        await dispatch(thunkLogoutUser())
        history.push('/login');
    }
}

export default Navigation;
