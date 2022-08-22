import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import './SongList.css';

export default function SongList() {
    const match = useRouteMatch();
    console.log('match', match);

    const [songsArr, setSongsArr] = useState([])

    useEffect(() => {
        const getSongs = async () => {
            const songsRes = await csrfFetch('/api/songs/current');
            const { Songs } = await songsRes.json();
            setSongsArr(Songs);
        }
        getSongs();
    }, [])

    return (
        <ul className="song-list">
            {songsArr.map((song) => (
                <li key={`song.id`}>
                    <img src={song.previewImage} alt={song.title} onError={(e) => { e.target.src = 'url(../../../public/default_album_300_g4.png)' }} />
                    {song.title}
                </li>
            ))}
        </ul>
    )
}
