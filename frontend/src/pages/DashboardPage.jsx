import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Loader from '../components/Loader';
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import EditProfileHeader from '../components/EditProfileHeader';
import ListExperience from '../components/ListExperience';
import ListEducation from '../components/ListEducation';
import {toast} from 'react-toastify';



import {
  useGetProfileQuery,
  useDeleteProfileMutation,
} from '../slices/profileApiSlice';

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    refetch,
    error
  } = useGetProfileQuery();


  const [deleteProfile, {isLoading: isLoadingDeleteProfile}] = useDeleteProfileMutation();

  const deleteProfileHandler = async () =>{
    if(window.confirm("Êtes-vous sûr de supprimer votre compte ?")){
      try {
        await deleteProfile();
        refetch();
        toast.warning("Le compte a été supprimé")
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }


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
                <ListExperience experience={profile.experience}/> 
                <ListEducation education={profile.education}/> 

                <div className="my-2">
                  <button 
                  className="btn btn-danger"
                  onClick={() => deleteProfileHandler()}
                  >
                    <FaUserMinus/> Supprimer votre Compte
                  </button>
                  {isLoadingDeleteProfile && <Loader/>}
                </div>
              </>
                    
            )}
    </main>
  ) 
}

export default DashboardPage