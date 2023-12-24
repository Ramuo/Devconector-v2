import { useState } from 'react';
import {Link} from 'react-router-dom';
import {FaThumbsUp, FaThumbsDown, FaTimes} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Loader from './Loader';


import { 
    useLikePostMutation,
    useUnlikePostMutation,
    useDeletePostMutation
 } from '../slices/postApiSlice';


const PostItem = ({post: {_id, text, name, user, avatar, likes, comments, date}, showAction}) => {
 
    const [like, {isLoading: loadingLike}] = useLikePostMutation();
    const [unLike, {isLoading: loadingUnlike}] = useUnlikePostMutation();
    const [deletePost, {isLoading: loadingDeletePost}] = useDeletePostMutation();


    const likePosHandler = async (id) =>{
        try {
            await like(id);
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
            
        }
    }

    const unLikePosHandler = async (id) =>{
        try {
            await unLike(id);
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
            
        }
    }
    const deletePosHandler = async (id) =>{
        try {
            await deletePost(id);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            
        }
    }

    return (
        <div className="post bg-white p-1 my-1">
            {loadingLike && <Loader/>}
            {loadingUnlike && <Loader/>}
            {loadingDeletePost && <Loader/>}
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt="Avatar"
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
             <p className="post-date">
                {date.substring(0, 10)}
            </p>

            {showAction && 
              <>
                <button type="button" className="btn btn-light">
                  <FaThumbsUp
                  onClick={() => likePosHandler(_id)}
                  /> {' '}
                  <span>
                  {likes.length > 0 && (
                    <span>{likes.length}</span>
                  )}
                  </span>
                </button>
                <button type="button" className="btn btn-light">
                    <FaThumbsDown
                    onClick={() => unLikePosHandler(_id)}
                    /> {' '}
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion {' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>

                <button      
                    type="button"
                    className="btn btn-danger"
                    >
                    <FaTimes
                    onClick={() => deletePosHandler(_id)}
                    />
                </button>
              </>
            }
          </div>
        </div>
    );
};

PostItem.defaultProps = {
  showAction: true
}



export default PostItem;