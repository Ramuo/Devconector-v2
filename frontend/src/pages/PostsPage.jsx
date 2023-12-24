import {Link} from 'react-router-dom';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import PostForm from '../components/PostForm';


import {
  useGetPostsQuery,
} from '../slices/postApiSlice';

const PostsPage = () => {

  const {
    data: posts,
    isLoading,
    // refetch,
    error
  } = useGetPostsQuery();
  
  return (
    <main className='container'>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <>
          <h2 className='text-error'>{error?.data?.message || error.error}</h2>
          <Link to='/posts' className='btn btn-primary my-1'>
              Retour
          </Link>
        </>
      ) : (
        <>
          <h1 className='large text-primary'>Publications</h1>
          <PostForm/>
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post}/>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default PostsPage;