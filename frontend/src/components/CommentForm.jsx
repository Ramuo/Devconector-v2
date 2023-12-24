import {useState} from 'react';
import { useParams} from 'react-router-dom';
import Loader from './Loader';
import {toast} from 'react-toastify';

import { useCommentPostMutation } from '../slices/postApiSlice';

const CommentForm = () => {
    const [text, setText] = useState('');

    const {id: postId} = useParams();

    const [commentPost, {isLoading}] = useCommentPostMutation(postId);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await commentPost({text}).unwrap();
            setText(' ');
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
    <div>
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Poster une publication...</h3>
            </div>
            <form 
            className="form my-1"
            onSubmit={submitHandler}
            >
            <textarea
                name="text"
                value={text}
                cols="30"
                rows="5"
                placeholder="Create a post"
                required
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            {isLoading && <Loader/>}
            </form>
        </div>
    </div>
    )
}

export default CommentForm;