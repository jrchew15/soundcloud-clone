import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import EdittableComment from "./EdittableComment";

export default function CommentsSection({ song }) {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [commentsArr, setCommentsArr] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const commentBodyRef = useRef(null);

    useEffect(() => {
        fetchComments()

        function fetchComments() {
            csrfFetch(`/api/songs/${song.id}/comments`)
                .then((res) => res.json())
                .then((allComments) => setCommentsArr(allComments.Comments))
        }
    }, [])

    function parsedDate(date) {
        let jsDate = new Date(date);
        return jsDate.toDateString().slice(3);
    }

    function handleSubmitComment(e) {
        e.preventDefault();
        csrfFetch(`/api/songs/${song.id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ body: commentBody })
        }).then(res => res.json()).then(resBody => {
            let newComment = {
                ...resBody,
                User: { id: user.id, username: user.username, imageUrl: user.previewImage }
            }
            setCommentsArr([...commentsArr, newComment]);
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
        <div id='comments-container'>
            <div id='comment-form-container'>
                <img src={user.previewImage} alt={user.username} />
                <form id="comment-form" onSubmit={handleSubmitComment}>
                    <input
                        type='text'
                        id='comment-body'
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        placeholder='Write a comment'
                        ref={commentBodyRef}
                        onBlur={() => { }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmitComment(e);
                            }
                        }}
                    />
                </form>
            </div>
            <div id='artist-details'>
                <img src={song.Artist.previewImage} alt={song.Artist.username} onClick={() => history.push(`/users/${song.userId}`)} />
                <div onClick={() => history.push(`/users/${song.userId}`)}>{song.Artist.username}</div>
            </div>
            <div id='song-details'>
                <ul>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>Released by:</span>
                        <span>{song.Artist.username}</span>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>Released date:</span>
                        <span>{parsedDate(song.createdAt)}</span>
                    </li>
                </ul>
            </div>
            <ul id="comments-ul">
                {commentsArr.map(comment => (
                    <li key={comment.id} className='comment-item'>
                        <img src={comment.User.imageUrl} alt={comment.User.username} />
                        <span>
                            <span className="comment-username">{comment.User.username}</span>
                            {comment.userId === user.id && <button onClick={() => handleDelete(comment.id)}>DELETE</button>}
                            <span className="comment-content" style={{ paddingLeft: 30 }}>
                                {user.id === comment.userId ? <EdittableComment user={user} comment={comment} commentsArr={commentsArr} setCommentsArr={setCommentsArr} /> : comment.body}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )

}
