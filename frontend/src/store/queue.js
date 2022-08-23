const PUSH_TO_QUEUE = '/queue/push';
const PROGRESS_QUEUE = '/queue/progress';
const RESET_QUEUE = '/queue/reset';

export const actionPushToQueue = (song) => {
    let formattedSong = {
        id: song.id,
        userId: song.userId,
        albumId: song.albumId,
        description: song.description,
        url: song.url,
        imageUrl: song.imageUrl
    };
    return {
        type: PUSH_TO_QUEUE,
        song: formattedSong
    }
}

export const actionProgressQueue = () => {
    return { type: PROGRESS_QUEUE }
}

export const resetQueue = () => {
    return { type: RESET_QUEUE }
}

const initialState = { currentIndex: -1, queue: [] };

export default function queueReducer(state = initialState, action) {
    let newState; let index;
    switch (action.type) {
        case PUSH_TO_QUEUE:
            index = state.currentIndex === -1 ? 0 : state.currentIndex;
            newState = { currentIndex: index, queue: [...state.queue, action.song] };
            return newState;
        case PROGRESS_QUEUE:
            index = state.currentIndex + 1;
            return { ...state, currentIndex: index }
        case RESET_QUEUE:
            return { currentIndex: -1, queue: [] };
        default:
            return state
    }
}
