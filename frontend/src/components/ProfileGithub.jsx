import { Link } from 'react-router-dom';
import Loader from './Loader';


import { useGetGitHubReposQuery } from "../slices/profileApiSlice"



const ProfileGithub = ({username}) => {
    const {
        data: repos,
        isLoading,
    }= useGetGitHubReposQuery(username);
   
  return (
    <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        {repos === null || isLoading ? (
            <Loader/>
        ) : (
            repos.map((repo) => (
                <div key={repo.id} className='repo bg-white p-1 my-1'>
                    <div>
                        <h4>
                            <Link to={repo.html_url} traget='_blank' rel='noopener noreferrer'>
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {repos.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Watchers: {repos.watchers_count}
                            </li>
                            <li className="badge badge-light">
                                Forks: {repos.forks_count}
                            </li>
                        </ul>
                    </div>
                </div>
                
            ))
        )}
    </div>
    
  )
}

export default ProfileGithub;