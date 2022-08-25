import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EdittableComment from './EdittableComment';
import { thunkAddComment, thunkGetCommentsBySongId, thunkDeleteComment, actionClearComments } from "../../store/comments";
import { default_album_image } from "../../utils/default_images";
import { parsedDate } from "../../utils/functions";

export default function CommentsSection({ song }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const commentsArr = useSelector(state => state.comments);
    const [commentBody, setCommentBody] = useState('');

    useEffect(() => {
        console.log('on mount of comments section')
        dispatch(thunkGetCommentsBySongId(song.id))

        return () => { dispatch(actionClearComments()) }
    }, [])


    async function handleSubmitComment(e) {
        e.preventDefault();
        const res = await dispatch(thunkAddComment(song.id, commentBody, user));

        setCommentBody('');
    }

    return user && commentsArr && (
        <div id='comments-container'>
            <div id='comment-form-container'>
                <img src={user.previewImage || default_album_image} alt={user.username} onError={e => e.target.src = default_album_image} />
                <form id="comment-form" onSubmit={handleSubmitComment}>
                    <input
                        type='text'
                        id='comment-body'
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        placeholder='Write a comment'
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
                <img src={song.Artist.previewImage || default_album_image} alt={song.Artist.username} onError={e => e.target.src = default_album_image} onClick={() => history.push(`/users/${song.userId}`)} />
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
                {commentsArr.map((comment, index) => (
                    <li key={comment.id} className='comment-item'>
                        <img src={comment.User.imageUrl || default_album_image} alt={comment.User.username} onError={e => e.target.src = default_album_image} />
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="comment-username">{comment.User.username}</span>
                            {comment.userId === user.id && <button onClick={() => dispatch(thunkDeleteComment(comment.id, index))}>DELETE</button>}
                            <span className="comment-content">
                                {user.id === comment.userId ? <EdittableComment user={user} comment={comment} index={index} /> : comment.body}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )

}
