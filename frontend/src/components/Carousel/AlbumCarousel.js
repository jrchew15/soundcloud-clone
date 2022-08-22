import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import './Carousel.css';

export default function AlbumCarousel() {
    const defaultImg = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png';
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
        <ul id='album-carousel' className='carousel'>
            {albums.map(album => (
                <li key={album.id}>
                    <img src={album.previewImage} alt='album img' onError={(e) => { e.target.src = defaultImg }} />
                    <div>{album.title}</div>
                    <div>Album</div>
                </li>
            ))}
        </ul>
    )
}
