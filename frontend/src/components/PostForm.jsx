import {useState} from 'react';
import {toast} from 'react-toastify';
import Loader from './Loader';

import { useCreatPostMutation } from '../slices/postApiSlice';

const PostForm = () => {
   
    const [text, setText] = useState('');


    const [createPost, {isLoading}] = useCreatPostMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createPost({text}).unwrap();
            setText(' ')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
    <div>
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Exprimez-vous...</h3>
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

export default PostForm;