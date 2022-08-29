import { useState } from "react";
import { useDispatch } from 'react-redux';
import { thunkEditComment } from "../../store/comments";

export default function EdittableComment({ user, comment, index }) {
    const dispatch = useDispatch();
    const [editComment, setEditComment] = useState(false);
    const [commentBody, setCommentBody] = useState(comment.body);

    async function handleSubmit(e) {
        e.preventDefault();
        setEditComment(false);
        if (!commentBody) {
            setCommentBody(comment.body);
            return
        }
        let newComment = await dispatch(thunkEditComment(comment.id, commentBody, user, index))

        setCommentBody(newComment.body);
    }

    return (
        <div>
            {editComment ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button type='submit'>commit changes</button>
                    <button type='button' onClick={() => {
                        setEditComment(false);
                        setCommentBody(comment.body)
                    }}>cancel</button>
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
