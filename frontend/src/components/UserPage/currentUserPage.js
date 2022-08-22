import { useSelector } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import UserHeader from "./UserHeader";

export default function currentUserPage() {
    const user = useSelector(state => state.session.user);
    return (<div>
        <UserHeader user={user} />
        <nav>
            <NavLink exact to='/'>All</NavLink>
            <NavLink to='/popular-tracks'>Popular Tracks</NavLink>
            <NavLink to='/tracks'>Tracks</NavLink>
            <NavLink to='/albums'>Albums</NavLink>
            <NavLink to='/playlists'>Playlists</NavLink>
        </nav>
        <Switch>
            <Route path='/tracks'>
                <SongItem />
            </Route>
        </Switch>
    </div>)
}
