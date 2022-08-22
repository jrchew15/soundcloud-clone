import { useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongs } from "../../store/songs";
// import { csrfFetch } from "../../store/csrf";
import './SongList.css';

export default function SongList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    console.log('match', match);

    const [songsArr, setSongsArr] = useState([])
    const songs = useSelector(state => state.songs);
    // const user = useSelector(state => state.session.user);
    // useEffect(() => {
    //     const getSongs = async () => {
    //         const songsRes = await csrfFetch('/api/songs/current');
    //         const { Songs } = await songsRes.json();
    //         setSongsArr(Songs);
    //     }
    //     getSongs();
    // }, [])

    useEffect(() => {
        dispatch(thunkGetSongs())
    }, [])

    useEffect(() => {
        setSongsArr(Object.values(songs))
    }, [songs])

    const redirectToEdit = (songId) => {
        history.push(`/songs/${songId}/edit`);
    }

    return (
        <ul className="song-list" style={{ gridColumn: 1 }}>
            {songsArr.map((song) => (
                <li key={`${song.id}`}>
                    <img src={song.previewImage} alt={song.title} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
                    <span>
                        {song.title}
                        <button onClick={() => redirectToEdit(song.id)}>Edit</button>
                        <button>Delete</button>
                    </span>
                </li>
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
