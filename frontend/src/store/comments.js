import { csrfFetch } from "./csrf";
import { default_album_image } from "../utils/default_images";

const LOAD_COMMENTS = '/comments/load';
const CLEAR_COMMENTS = '/comments/clear';
const ADD_COMMENT = '/comments/add';
const EDIT_COMMENT = '/comments/edit';
const DELETE_COMMENT = '/comments/delete';

export const actionClearComments = () => {
    return {
        type: CLEAR_COMMENTS
    }
}

const actionAddComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const actionEditComment = (index, comment) => {
    return {
        type: EDIT_COMMENT,
        index,
        comment
    }
}

const actionDeleteComment = (index) => {
    return {
        type: DELETE_COMMENT,
        index
    }
}

export const thunkGetCommentsBySongId = (songId) => dispatch => {

    csrfFetch(`/api/songs/${songId}/comments`)
        .then((res) => res.json())
        .then((allComments) => {
            let comments = allComments.Comments;
            dispatch({
                type: LOAD_COMMENTS,
                comments
            })
        })
}

export const thunkAddComment = (songId, body, user) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ body })
    });
    const resBody = await res.json();
    let newComment = {
        ...resBody,
        User: { id: user.id, username: user.username, imageUrl: user.previewImage || default_album_image }
    }
    dispatch(actionAddComment(newComment))
    return res;
};

export const thunkEditComment = (commentId, body, user, index) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, { method: 'PUT', body: JSON.stringify({ body }) });

    const resBody = await res.json();
    let newComment = {
        ...resBody,
        User: { id: user.id, username: user.username, imageUrl: user.previewImage }
    }
    dispatch(actionEditComment(index, newComment))
    return newComment;
}

export const thunkDeleteComment = (id, index) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${id}`, { method: 'DELETE' })
    dispatch(actionDeleteComment(index))
    return res;
}

export default function commentsReducer(state = [], action) {
    let newState;
    switch (action.type) {
        case LOAD_COMMENTS:
            return [...action.comments];
        case ADD_COMMENT:
            return [...state, action.comment];
        case EDIT_COMMENT:
            return state.map((comment, idx) => idx === action.index ? action.comment : comment)
        case DELETE_COMMENT:
            newState = [...state];
            newState.splice(action.index, 1);
            return newState;
        case CLEAR_COMMENTS:
            return [];
        default:
            return state;
    }
}
