import { useState } from "react";
import { csrfFetch } from "../../store/csrf";

export default function EdittableComment({ user, comment, commentsArr, setCommentsArr }) {
    const [editComment, setEditComment] = useState(false);
    const [commentBody, setCommentBody] = useState(comment.body);

    function handleSubmit(e) {
        e.preventDefault();
        csrfFetch(`/api/comments/${comment.id}`, { method: 'PUT', body: JSON.stringify({ body: commentBody }) })
            .then(res => res.json()).then(resBody => {
                let newComment = {
                    ...resBody,
                    User: { id: user.id, username: user.username }
                }
                console.log(newComment)
                setCommentsArr(commentsArr.map(ele => {
                    if (ele.id === comment.id) { return newComment }
                    return ele
                }));
                setEditComment(false);
                setCommentBody(newComment.body);
            }).catch((err) => console.log('what happened?', err))
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
                <div onClick={() => setEditComment(true)}>
                    {comment.body}
                    <i className="fa-solid fa-pen-to-square" />
                </div>
            )}
        </div>
    )
}
