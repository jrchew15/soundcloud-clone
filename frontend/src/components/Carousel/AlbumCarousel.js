import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";

export default function AlbumCarousel() {
    const defaultImg = useSelector(state => state.defaultImg);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const loadAlbums = async () => {
            const res = await csrfFetch('/api/albums');
            const { Albums } = await res.json();
            setAlbums(Albums);
        }
        loadAlbums();
    }, [])

    return (
        <ul id='album-carousel'>
            {albums.map(album => (
                <li key={album.id}>
                    <img src={album.previewImage} alt='album img' onError={(e) => { e.target.src = defaultImg || 'http://wiki.theplaz.com/w/images/Windows_Media_Player_9_Default_Album_Art.jpg' }} />
                    {album.title}
                </li>
            ))}
        </ul>
    )
}
