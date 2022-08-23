import { csrfFetch } from "./csrf";

const PUSH_TO_QUEUE = '/queue/push';
const PROGRESS_QUEUE = '/queue/progress';

export const actionPushToQueue = (song) => {
    return {
        type: PUSH_TO_QUEUE,
        song
    }
}

export const progressQueue = () => {
    return { type: PROGRESS_QUEUE }
}

const initialState = { currentIndex: -1, queue: [] };

export default function queueReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case PUSH_TO_QUEUE:
            newState = { ...state, queue: [...state.queue, action.song] };
            return newState;
        case PROGRESS_QUEUE:
            let index = state.currentIndex + 1;
            return { ...state, currentIndex: index }
        default:
            return state
    }
}
