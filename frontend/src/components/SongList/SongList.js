import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { csrfFetch } from "../../store/csrf";
import SongListItem from './SongListItem.js'
import './SongList.css';

export default function SongList({ listType, id, user }) {
    const history = useHistory();
    const currentUserSongs = useSelector(state => state.songs);

    const [songsArr, setSongsArr] = useState([]);

    useEffect(() => {
        getSongs();

        async function getSongs() {
            let Songs;
            let res;
            switch (listType) {
                case 'currentUser':
                    Songs = Object.values(currentUserSongs);
                    break;
                case 'user':
                    res = await csrfFetch(`/api/users/${id}/songs`);
                    let parsedRes = await res.json();
                    Songs = parsedRes.Songs;
                    break;
                case 'playlist':
                // if state.playlists[id] => playlist.Songs
                // else Songs=await csrfFetch(`/api/playlists/${id}`)
            }
            setSongsArr(Songs.map(song => {
                return { ...song, Artist: { id: user.id, username: user.username, previewImage: user.previewImage } }
            }))
        }
    }, [currentUserSongs])


    return (
        <ul className="song-list" style={{ gridColumn: 1 }}>
            {songsArr.map((song) => (
                <SongListItem key={song.id} song={song} />
            ))}
        </ul>
    )
}

export function SongListActions() {
    const history = useHistory();
    const goToSongPage = () => {
        history.push('/songs/upload');
    }

    return (
        <ul style={{ gridColumn: 2 }}>
            <li>
                <button id='create-song' onClick={goToSongPage}>
                    Upload a Song
                </button>
            </li>
        </ul>
    )
}
