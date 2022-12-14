import ReactAudioPlayer from 'react-audio-player';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionGoToInQueue, actionProgressQueue, resetQueue } from '../../store/queue';
import { default_album_image } from '../../utils/default_images';
import './MusicPlayer.css';

export default function MyMusicPlayer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [volume, setVolume] = useState(0.5);
    const { currentIndex, queue } = useSelector(state => state.queue);
    const [songUrl, setSongUrl] = useState('');
    const [showQueue, setShowQueue] = useState(false);

    useEffect(() => {
        if (queue[currentIndex]) {
            setSongUrl(queue[currentIndex].url);
        }
    }, [currentIndex, queue])

    useEffect(() => {
        setShowQueue(true)
    }, [queue])

    const onEnd = () => {
        setSongUrl('');
        dispatch(actionProgressQueue())
    }

    const toggleQueueDisplay = () => {
        setShowQueue(!showQueue);
    }

    const redirectTo = (e, path) => {
        e.stopPropagation();
        history.push(path)
    }

    return (
        <>
            <div id='audio-container'>
                <ReactAudioPlayer
                    autoPlay={true}
                    src={songUrl} controls
                    onEnded={onEnd}
                    onError={() => dispatch(actionProgressQueue())}
                    volume={volume}
                    onVolumeChanged={(e) => { setVolume(e.target.volume) }}
                />
                <div id='display-queue' onClick={toggleQueueDisplay}>
                    <i className='fa-solid fa-bars'>
                        <i className='fa-solid fa-play' />
                    </i>
                </div>
                {showQueue && (<ul id='queue-list'>
                    <li id='next-up'>
                        {'Next Up'}
                        <span style={{ cursor: 'pointer' }} onClick={() => dispatch(resetQueue())}>{'Clear Queue'}</span>
                    </li>
                    <div />
                    {queue.map((song, idx) => (
                        <li
                            key={idx}
                            className={(idx < currentIndex ? 'played' : idx > currentIndex ? 'to-be-played' : 'playing')}
                            onClick={() => dispatch(actionGoToInQueue(idx))}
                        >
                            <img src={song.previewImage || default_album_image} alt='thumbnail' onError={(e) => e.target.src = default_album_image} />
                            <span>
                                <span onClick={(e) => redirectTo(e, `/users/${song.userId}`)}>
                                    {song.Artist.username}
                                </span>
                                <span onClick={(e) => redirectTo(e, `/songs/${song.id}`)}>
                                    {song.title}
                                </span>
                            </span>
                            <i className='fas fa-play' />
                        </li>
                    ))}
                </ul>)
                }
            </div >

        </>
    )
}
