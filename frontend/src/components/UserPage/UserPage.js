import { useState, useEffect } from "react";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import SongList, { SongListActions } from "../SongList/SongList";
import { csrfFetch } from "../../store/csrf";
import './UserPage.css';

function UserPage() {
    const [user, setUser] = useState(null);

    const { userId } = useParams();

    useEffect(() => {
        getUserById(userId);

        async function getUserById(id) {
            const res = await csrfFetch(`/api/users/${id}`);
            const user = await res.json();
            setUser(user);
            return user;
        }
    }, [])

    return (user && (<>
        <UserHeader user={user} />
        <nav>
            <NavLink exact to={`/users/${user.id}`}>All</NavLink>
            <NavLink to={`/users/${user.id}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.id}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.id}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongList isCurrentUser={false} />
                </Route>
            </Switch>
            <Switch>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongListActions isCurrentUser={false} />
                </Route>
            </Switch>
        </div>
    </>)
    )
}

export default UserPage