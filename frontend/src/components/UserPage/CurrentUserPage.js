import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import UserHeader from "./UserHeader";
import { csrfFetch } from "../../store/csrf";
import SongList, { SongListActions } from "../SongList/SongList";
import './UserPage.css';

function UserPage() {
    // const { username } = useParams();
    const route = useRouteMatch();
    const [username, setUsername] = useState(route.url.split('/')[2]);

    useEffect(() => {
        setUsername(route.url.split('/')[2]);
    }, [route])
    console.log('is entering UserPage', username)
    const currentUser = useSelector(state => state.session.user);
    const isCurrentUser = currentUser?.username === username;
    const [user, setUser] = useState(null)
    useEffect(() => {
        // console.log('in useEffect')
        if (isCurrentUser) {
            console.log('is current user');
            setUser(currentUser);
            return
        }
        const getByUsername = async (username) => {
            const res = await csrfFetch(`/api/users/username/${username}`)
            console.log('queried with new route', res);
            const foundUser = await res.json();
            setUser(foundUser);
        }
        getByUsername(username)
    }, [])

    return (user && (<>
        <UserHeader user={user} />
        <nav>
            <NavLink exact to={`/users/${user.username}`}>All</NavLink>
            <NavLink to={`/users/${user.username}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.username}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.username}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongList user={user} />
                </Route>
            </Switch>
            <Switch>
                <Route path={`/users/${user.username}/tracks`}>
                    <SongListActions isCurrentUser={isCurrentUser} />
                </Route>
            </Switch>
        </div>
    </>)
    )
}

export default UserPage
