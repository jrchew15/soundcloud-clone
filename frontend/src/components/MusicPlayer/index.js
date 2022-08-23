import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { actionProgressQueue } from '../../store/queue';

export default function MyMusicPlayer() {
    const dispatch = useDispatch();
    const { currentIndex, queue } = useSelector(state => state.queue);
    const songUrl = queue[currentIndex]?.url;

    const onEnd = () => {
        dispatch(actionProgressQueue())
    }

    return <ReactAudioPlayer autoPlay={true} src={songUrl} controls onEnded={onEnd} />
}
