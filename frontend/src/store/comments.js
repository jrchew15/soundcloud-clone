import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = '/comments/load';



export const thunkLoadComments = (userId) => async dispatch => {
    const res = await csrfFetch(``)
}

let initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
