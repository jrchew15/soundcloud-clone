import { useSelector } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import UserHeader from "./UserHeader";
import SongList, { SongListActions } from "../SongList/SongList";
import './UserPage.css';

function CurrentUserPage() {
    const user = useSelector(state => state.session.user);
    return (user && (<>
        <UserHeader user={user} />
        <nav id="user-tabs">
            <NavLink exact to={`/users/${user.id}`}>All</NavLink>
            <NavLink to={`/users/${user.id}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.id}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.id}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route exact path={`/users/${user.id}`}>
                    <SongList isCurrentUser={true} user={user} />
                </Route>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongList isCurrentUser={true} user={user} />
                </Route>
            </Switch>
            <Switch>
                <Route exact path={`/users/${user.id}`}>
                    <SongListActions isCurrentUser={true} />
                </Route>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongListActions isCurrentUser={true} />
                </Route>
            </Switch>
        </div>
    </>)
    )
}

export default CurrentUserPage
