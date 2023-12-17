import React from 'react';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';
import { FaUserPlus } from "react-icons/fa";
import EditProfileHeader from '../components/EditProfileHeader';


import { useGetProfileQuery } from '../slices/profileApiSlice';

const DashboardPage = () => {

  const {
    data: profile,
    isLoading,
    refetch,
    error
  } = useGetProfileQuery();

 console.log(profile)

  return(
    <main className="container">
     {isLoading ? (
                <Loader/>
            ) : error ? (
                <>
                  <h2 className='text-error'>{error?.data?.message || error.error}</h2>
                  <Link to='/create-profile' className='btn btn-primary my-1'>
                    Créer un profil
                  </Link>
                </>

            ) : (
              <>
                <h1 className="large text-primary">Tableau de board</h1>
                <p className="lead">
                  <FaUserPlus/> Bienvenue {profile.user.name}
                </p>
                <EditProfileHeader/>
              </>
                    
            )}
    </main>
  ) 
}

export default DashboardPage