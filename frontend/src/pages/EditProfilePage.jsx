import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaUserPlus, FaFacebook, FaYoutube, FaLinkedin, FaInstagram, FaTwitter} from 'react-icons/fa';
import Loader from '../components/Loader';
import {toast} from 'react-toastify';


import { 
    useCreateProfileMutation,
    useGetProfileQuery,
} from '../slices/profileApiSlice';


const EditProfilePage = () => {

  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [githubusername, setGithubusername] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');

  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    refetch,
    error
  } = useGetProfileQuery();

  const [
    updateProfile, 
    {isLoading: loadingUpdate}
] = useCreateProfileMutation();


  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() =>{
    if(profile){
        setCompany(profile.company);
        setWebsite(profile.website);
        setLocation(profile.location);
        setStatus(profile.status);
        setSkills(profile.skills);
        setGithubusername(profile.githubusername);
        setBio(profile.bio);
        setTwitter(profile.twitter);
        setYoutube(profile.youtube);
        setFacebook(profile.facebook);
        setLinkedin(profile.linkedin);
        setInstagram(profile.instagram)
    }
  }, [profile]);

  //FUNCTIONS:
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, instagram, youtube}).unwrap();
      toast.success('Profil mis à jour avec succès ');
      refetch();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
  
    <section className='container'>
      <h1 className="large text-primary">
          Créer votre Profil
      </h1>
      <p className="lead">
          <FaUserPlus/> Quelques informations pour démarquer votre profil 
    </p>
    <small>* = Champs requis</small>
    {loadingUpdate && <Loader/>}

    {isLoading ? (
        <Loader/>
    ) : error ? (
        <>
            <h2 className='text-error'>{error?.data?.message || error.error}</h2>
            <Link to='/dashboard' className='btn btn-primary my-1'>Retour</Link>
        </>
    ): (
        <>
            <form 
            onSubmit={submitHandler}
            className="form"
            >
                <div className="form-group">
                    <select 
                    name="status"
                    value={status}
                    required
                    onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="0">* Sélectionnez un statut professionnel</option>
                        <option value="Developer">Développeur</option>
                        <option value="Junior Developer">Junior Développeur</option>
                        <option value="Senior Developer">Senior Développeur</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Étudiant</option>
                        <option value="Instructor">Instructeur ou Enseignant</option>
                        <option value="Intern">Stagiaire</option>
                        <option value="Other">Autres</option>
                    </select>
                    <small className="form-text">
                        Donnez-nous une idée où vous en êtes dans votre carrière
                    </small>
                </div>

                <div className="form-group">
                    <input type="text" 
                    value={company}
                    placeholder="Company" 
                    name="company"
                    onChange={(e) => setCompany(e.target.value)} 
                    />
                    <small className="form-text">
                    Il peut s'agir de votre propre entreprise ou de celle pour laquelle vous travaillez
                    </small>
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={website}
                    placeholder="Website" 
                    name="website" 
                    onChange={(e) => setWebsite(e.target.value)}
                    />
                    <small className="form-text">
                    Il peut s'agir de votre propre site Web ou de celui d'une entreprise
                    </small>
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={location}
                    placeholder="Ville & Pays" 
                    name="location"
                    onChange={(e) => setLocation(e.target.value)} 
                    />
                    <small className="form-text">
                    Ville & Pays 
                    </small>
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={skills}
                    placeholder="* Skills" 
                    name="skills" 
                    required
                    onChange={(e) => setSkills(e.target.value)}
                    />
                    <small className="form-text">
                    Veuillez utiliser des valeurs séparées par des virgules (eg.HTML,CSS,JavaScript,PHP)
                    </small>
                </div>

                <div className="form-group">
                    <input
                    type="text"
                    value={githubusername}
                    placeholder="Github Username"
                    name="githubusername"
                    onChange={(e) => setGithubusername(e.target.value)}
                    />
                    <small className="form-text">
                    Si vous souhaitez vos derniers dépôts et un lien Github, incluez votre nom d'utilisateur
                    </small>
                </div>

                <div className="form-group">
                    <textarea 
                    value={bio}
                    placeholder="Laisser une courte description de votre profil" 
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    >
                    </textarea>
                    <small className="form-text">
                    Parle-nous un peu de toi
                    </small>
                </div>

                <div className="my-2">
                    <button 
                    type="button" 
                    className="btn btn-light"
                    onClick={() => toggleSocialInputs(!displaySocialInputs)}
                    >
                    Ajouter vos réseaux sociaux
                    </button>
                    <span>Facultatif</span>
                </div>

                {displaySocialInputs && 
                    <>
                    <div className="form-group social-input">
                        <FaTwitter className="text-icons" color="#1C9CEA"/>
                        <input 
                        type="text" 
                        value={twitter}
                        placeholder="Twitter URL" 
                        name="twitter"
                        onChange={(e) => setTwitter(e.target.value)} 
                        />
                    </div>

                    <div className="form-group social-input">
                        <FaFacebook className="text-icons" color="#1773EA"/>
                        <input 
                        type="text" 
                        value={facebook}
                        placeholder="Facebook URL" 
                        name="facebook" 
                        onChange={(e) => setFacebook(e.target.value)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <FaYoutube color="red" className="text-icons "/>
                        <input 
                        type="text"
                        value={youtube} 
                        placeholder="YouTube URL" 
                        name="youtube" 
                        onChange={(e) => setYoutube(e.target.value)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <FaLinkedin className="text-icons" color="#1773EA"/>
                        <input 
                        type="text" 
                        value={linkedin}
                        placeholder="Linkedin URL" 
                        name="linkedin" 
                        onChange={(e) => setLinkedin(e.target.value)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <FaInstagram className="text-icons" color="#B32E87"/>
                        <input 
                        type="text" 
                        value={instagram}
                        placeholder="Instagram URL" 
                        name="instagram" 
                        onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                    </>
                }
      
                    <input 
                    type="submit" 
                    className="btn btn-primary my-1" 
                    />
                    <Link 
                    to="/dashboard"
                    className="btn btn-light my-1"
                    >
                        Retour
                    </Link>

                {isLoading && <Loader/>}
            </form>
        </>
    )}
    </section>
  );
};
    

export default EditProfilePage;