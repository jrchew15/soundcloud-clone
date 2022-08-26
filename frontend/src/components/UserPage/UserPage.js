import { useState, useEffect } from "react";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import SongList, { SongListActions } from "../SongList/SongList";
import AlbumItem from "../AlbumPage/AlbumItem";
import { csrfFetch } from "../../store/csrf";
import './UserPage.css';

function UserPage() {
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([])

    const { userId } = useParams();

    useEffect(() => {
        getUserById(userId);

        fetchAlbums();

        async function getUserById(id) {
            const res = await csrfFetch(`/api/users/${id}`);
            const user = await res.json();
            setUser(user);
            return user;
        }

        async function fetchAlbums() {
            const res = await csrfFetch(`/api/users/${userId}/albums`);
            const { Albums } = await res.json();
            setAlbums(Albums.map(ele => ele.id))
        }
    }, [])

    return (user && (<>
        <UserHeader user={user} />
        <nav id='user-tabs'>
            <NavLink exact to={`/users/${user.id}`}>All</NavLink>
            <NavLink to={`/users/${user.id}/tracks`}>Tracks</NavLink>
            <NavLink to={`/users/${user.id}/albums`}>Albums</NavLink>
            <NavLink to={`/users/${user.id}/playlists`}>Playlists</NavLink>
        </nav>
        <div id='user-page-content'>
            <Switch>
                <Route exact path={`/users/${user.id}`}>
                    <SongList listType='user' id={user.id} user={user} />
                </Route>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongList listType='user' id={user.id} user={user} />
                </Route>
                <Route path={`/users/${user.id}/albums`}>
                    <ul style={{ display: 'flex', flexDirection: 'column' }}>
                        {albums.map(albumId => (
                            <li key={albumId} style={{ display: 'flex' }}>
                                <AlbumItem albumId={albumId} />
                            </li>
                        ))}
                    </ul>
                </Route>
            </Switch>
            {/* <Switch>
                <Route path={`/users/${user.id}/tracks`}>
                    <SongListActions isCurrentUser={false} user={user} />
                </Route>
            </Switch> */}
        </div>
    </>)
    )
}

export default UserPage
