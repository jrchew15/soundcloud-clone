import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { default_album_image } from "../../utils/default_images";
import './Carousel.css';

export default function AlbumCarousel() {
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
                    <img src={album.previewImage || default_album_image} alt='album img' onError={(e) => { e.target.src = default_album_image }} />
                    <div>{album.title}</div>
                    <div>Album</div>
                </li>
            ))}
        </ul>
    )
}
