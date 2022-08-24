import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { csrfFetch } from "../../store/csrf";
import EdittableComment from "./EdittableComment";

export default function CommentsSection({ song }) {
    const user = useSelector(state => state.session.user);

    const [commentsArr, setCommentsArr] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const commentBodyRef = useRef(null);

    useEffect(() => {
        fetchComments()

        function fetchComments() {
            csrfFetch(`/api/songs/${song.id}/comments`)
                .then((res) => res.json())
                .then((allComments) => setCommentsArr(allComments.Comments))
        }
    }, [])

    useEffect(() => {
        if (commentBodyRef.current) {
            commentBodyRef.current.focus();
        }
    }, [showCommentForm])

    function handleAddCommentClick() {
        setShowCommentForm(true);
    }

    function handleSubmitComment(e) {
        e.preventDefault();
        csrfFetch(`/api/songs/${song.id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ body: commentBody })
        }).then(res => res.json()).then(resBody => {
            let newComment = {
                ...resBody,
                User: { id: user.id, username: user.username }
            }
            setCommentsArr([...commentsArr, newComment]);
            setShowCommentForm(false);
            setCommentBody('');
        }).catch((err) => console.log('what happened?', err))
    }

    function handleDelete(commentId) {
        csrfFetch(`/api/comments/${commentId}`, { method: 'DELETE' })
            .then(() => {
                let comments = [...commentsArr];
                setCommentsArr(comments.filter((comment) => comment.id !== commentId))
            })
    }

    return user && commentsArr && (
        <div>
            <h3>Comments:</h3>
            <ul>
                {commentsArr.map(comment => (
                    <li key={comment.id}>
                        <span className="comment-username">{comment.User.username}</span>
                        {comment.userId === user.id && <button onClick={() => handleDelete(comment.id)}>DELETE</button>}
                        <p className="comment-content" style={{ paddingLeft: 30 }}>
                            {user.id === comment.userId ? <EdittableComment user={user} comment={comment} commentsArr={commentsArr} setCommentsArr={setCommentsArr} /> : comment.body}
                        </p>
                    </li>
                ))}
            </ul>
            {!showCommentForm && <button onClick={handleAddCommentClick}>Add a comment</button>}
            {showCommentForm && (<form className="comment-form" onSubmit={handleSubmitComment}>
                <textarea
                    type='text'
                    id='comment-body'
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder='add a comment...'
                    ref={commentBodyRef}
                    onBlur={() => {
                        setTimeout(() => setShowCommentForm(false), 100);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleSubmitComment(e);
                        }
                    }}
                />
                <button type='submit'>Submit</button>
            </form>)}
        </div>
    )

}
