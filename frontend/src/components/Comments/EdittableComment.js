import { useState } from "react";
import { useDispatch } from 'react-redux';
import { thunkEditComment } from "../../store/comments";

export default function EdittableComment({ user, comment, index }) {
    const dispatch = useDispatch();
    const [editComment, setEditComment] = useState(false);
    const [commentBody, setCommentBody] = useState(comment.body);

    async function handleSubmit(e) {
        e.preventDefault();
        let newComment = await dispatch(thunkEditComment(comment.id, commentBody, user, index))

        setEditComment(false);
        setCommentBody(newComment.body);
    }

    return (
        <div>
            {editComment ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        type='text'
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                    <button type='submit'>commit changes</button>
                    <button type='button' onClick={() => setEditComment(false)}>cancel</button>
                </form>
            ) : (
                <div>
                    {commentBody}
                    {<i className="fa-solid fa-pen-to-square" onClick={() => setEditComment(true)} style={{ cursor: 'pointer' }} />}
                </div>
            )}
        </div>
    )
}
