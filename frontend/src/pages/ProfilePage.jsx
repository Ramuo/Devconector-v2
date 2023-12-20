
import {Link, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ProfileTop from '../components/ProfileTop';
import ProfileAbout from '../components/ProfileAbout';
import ProfileExperience from '../components/ProfileExperience';
import ProfileEducation from '../components/Profile.Education';
import ProfileGithub from '../components/ProfileGithub';



import { useGetProfileByIdQuery } from '../slices/profileApiSlice';



const ProfilePage = () => {
    const {id: profileId} = useParams();


    const {
        data: userProfile,
        isLoading,
        refetch,
        error,
    } = useGetProfileByIdQuery(profileId);

    const {userInfo} = useSelector((state) => state.auth);

    
    return (
    <main className='container'>
        {userProfile === null || isLoading ? (
            <Loader/>
        ):(
            <>
              <Link to={'/profiles'} className='btn btn-light'>
                Retour
              </Link>
              {
                userInfo._id  === userProfile.user._id && (<Link to={'/edit-profile'} className='btn btn-dark'>Éditer le profil</Link>)
              }
              <div className="profile-grid my-1">
                <ProfileTop userProfile={userProfile}/>
                <ProfileAbout userProfile={userProfile}/>
                <div className="profile-exp bg-white p-y">
                    <h2 className="text-primary">Expérience</h2>
                    {
                    userProfile.length > 0 ? (
                        <h4>Aucune Expérience</h4>
                    ) : (
                        <>
                            {userProfile.experience.map((experience) => (
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                        </>
                    )}
                </div>
                <div className="profile-edu bg-white p-y">
                    <h2 className="text-primary">Formation</h2>
                    {
                    userProfile.length > 0 ? (
                        <h4>Aucune Formation</h4>
                    ) : (
                        <>
                            {userProfile.education.map((education) => (
                                <ProfileEducation key={education._id} education={education}/>
                            ))}
                        </>
                    )}
                </div>
                {userProfile.githubusername && (
                    <ProfileGithub username={userProfile.githubusername}/>
                )}
              </div>
            </>
            
        )}
    </main>
    )
}

export default ProfilePage;