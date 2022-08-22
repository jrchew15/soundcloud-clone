import { useSelector } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import UserHeader from "./UserHeader";
import SongList, { SongListActions } from "../SongList/SongList";
import './UserPage.css';

function CurrentUserPage() {
    const user = useSelector(state => state.session.user);
    return (user && (<>
        <UserHeader user={user} />
        <nav>
            <NavLink exact to={`/users/${user.username}`}>All</NavLink>
            <NavLink to={`/users/${user.username}/popular-tracks`}>Popular Tracks</NavLink>
            <NavLink to={`/users/${user.username}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.username}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.username}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongList />
                </Route>
            </Switch>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongListActions />
                </Route>
            </Switch>
        </div>
    </>)
    )
}

export default CurrentUserPage
