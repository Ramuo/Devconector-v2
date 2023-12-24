
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import {FaConnectdevelop} from 'react-icons/fa';
import ProfileItem from '../components/ProfileItem';

import { useGetProfilesQuery } from '../slices/profileApiSlice';


const ProfilesPage = () => {
  const {
    data: profiles, 
    isLoading, 
    error, 
  }= useGetProfilesQuery();


  return (
    <main className='container'>
      {isLoading ? (
        <Loader/>
      ): error ? (
        <>
           <h2 className='text-error'>{error?.data?.message || error.error}</h2>
            <Link to='/profiles' className='btn btn-primary my-1'>
              Retour
            </Link>
        </>
      ): (
        <>
          <h1 className="large text-primary">Développeurs</h1>
          <p className="lead">
            <FaConnectdevelop/> Echanger avec des développeurs
          </p>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile}/>
            ))
          ) : (<h4>Aucun Profil trouvé</h4>) }
        </>
      )}
    </main>
  )
}

export default ProfilesPage;