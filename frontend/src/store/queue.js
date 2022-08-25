const CONCAT_TO_QUEUE = '/queue/concat';
const PROGRESS_QUEUE = '/queue/progress';
const GO_TO_IN_QUEUE = '/queue/goto';
const RESET_QUEUE = '/queue/reset';
const PLAY_THIS = '/queue/play-this';

export const actionConcatToQueue = (songs) => {
    let formattedSongs = songs.map(song => ({
        id: song.id,
        title: song.title,
        userId: song.userId,
        albumId: song.albumId,
        description: song.description,
        url: song.url,
        imageUrl: song.previewImage,
        Artist: song.Artist
    }));
    return {
        type: CONCAT_TO_QUEUE,
        songs: formattedSongs
    }
}

export const actionProgressQueue = () => {
    return { type: PROGRESS_QUEUE }
}

export const actionGoToInQueue = (index) => {
    return { type: GO_TO_IN_QUEUE, index }
}

export const resetQueue = () => {
    return { type: RESET_QUEUE }
}

export const playThis = (song) => {
    return { type: PLAY_THIS, song }
}

const initialState = { currentIndex: -1, queue: [] };

export default function queueReducer(state = initialState, action) {
    let newState; let index;
    switch (action.type) {
        case CONCAT_TO_QUEUE:
            index = state.currentIndex === -1 ? 0 : state.currentIndex;
            newState = { currentIndex: index, queue: [...state.queue, ...action.songs] };
            return newState;
        case PROGRESS_QUEUE:
            index = state.currentIndex + 1;
            return { ...state, currentIndex: index }
        case GO_TO_IN_QUEUE:
            return { ...state, currentIndex: action.index }
        case PLAY_THIS:
            index = state.currentIndex + 1;
            let queue = [...state.queue];
            queue.splice(state.currentIndex, 0, action.song);
            newState = { currentIndex: index, queue }
            return newState
        case RESET_QUEUE:
            return { currentIndex: -1, queue: [] };
        default:
            return state
    }
}
