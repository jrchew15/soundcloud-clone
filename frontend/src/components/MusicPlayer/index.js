import ReactAudioPlayer from 'react-audio-player';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionGoToInQueue, actionProgressQueue } from '../../store/queue';
import './MusicPlayer.css';

export default function MyMusicPlayer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentIndex, queue } = useSelector(state => state.queue);
    const [songUrl, setSongUrl] = useState('');
    const [showQueue, setShowQueue] = useState(false);

    useEffect(() => {
        if (queue[currentIndex]) {
            setSongUrl(queue[currentIndex].url);
        }
    }, [currentIndex])

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
        <div id='audio-container'>
            <ReactAudioPlayer autoPlay={false} src={songUrl} controls onEnded={onEnd} />
            <div id='display-queue' onClick={toggleQueueDisplay}>
                <i className='fa-solid fa-bars'>
                    <i className='fa-solid fa-play' />
                </i>
            </div>
            {showQueue && (<ul id='queue-list'>
                {queue.map((song, idx) => (
                    <li
                        key={idx}
                        className={idx < currentIndex ? 'played' : idx > currentIndex ? 'to-be-played' : 'playing'}
                        onClick={() => dispatch(actionGoToInQueue(idx))}
                    >
                        <img src={song.previewImage} alt='thumbnail' />
                        <span>
                            <span onClick={(e) => redirectTo(e, `/users/${song.userId}`)}>
                                {song.Artist.username}
                            </span>
                            <span onClick={(e) => redirectTo(e, `/songs/${song.id}`)}>
                                {song.title}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>)
            }
        </div >
    )
}
