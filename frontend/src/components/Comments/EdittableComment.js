import { useState } from "react";
import { csrfFetch } from "../../store/csrf";

export default function EdittableComment({ user, comment }) {
    const [editComment, setEditComment] = useState(false);
    const [commentBody, setCommentBody] = useState(comment.body);

    function handleSubmit(e) {
        e.preventDefault();
        
    }

    return null;
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
                <div onClick={() => setEditComment(true)}>
                    {comment.body}
                    <i className="fa-solid fa-pen-to-square" />
                </div>
            )}
        </div>
    )
}
