
import {Link, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import PostItem from '../components/PostItem';
import CommentForm from '../components/CommentForm';


import { 
    useGetPostQuery,
} from '../slices/postApiSlice';

const PostPage = () => {
    const {id: postId} = useParams();

    const {
        data: post,
        isLoading,
        error,
    } = useGetPostQuery(postId);
    console.log(post);



    return (
    <main className='container'>
        {isLoading || post === null ? (
                <Loader/>
            ): error ? (
                <>
                    <h2 className='text-error'>{error?.data?.message || error.error}</h2>
                    <Link to='/posts' className='btn btn-primary my-1'>
                        Retour
                    </Link>
                </>
            ): (
                <>
                    <Link to='/posts' className='btn my-1'>
                        Retour
                    </Link>
                    <PostItem post={post} showAction={false}/>
                    <CommentForm postId={post._id}/>
                    
                </>
            )
        } 
    </main>
    )
}

export default PostPage;