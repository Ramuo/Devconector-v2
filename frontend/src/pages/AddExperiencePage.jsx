import {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';


import { useAddExperianceMutation } from '../slices/profileApiSlice';

const AddExperiencePage = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [current, setCurrent] = useState(false);
    const [description, setDescription] = useState('');


    const [addExperience, {isLoading} ] = useAddExperianceMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addExperience({company, title, location, from, to, current, description});
            toast.success('Expérience ajouter avec succès');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        };

    };

    
    return (
        <main className='container'>
            <h1 className="large text-primary">
                Ajouter une Expérience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Ajouter les postes 
                    que vous avez occupés comme développeur dans le passé
            </p>
            <small>* = Champs requis</small>
            <form className="form"
            onSubmit={submitHandler}
            >
                <div className="form-group">
                    <input 
                    type="text"
                    value={title} 
                    placeholder="* Intitulé du Poste" 
                    name="title" 
                    required 
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={company} 
                    placeholder="* Entreprise" 
                    name="company" 
                    required 
                    onChange={(e) => setCompany(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={location} 
                    placeholder="Ville & Pays" 
                    name="location" 
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <h4>De</h4>
                    <input 
                    type="date" 
                    value={from} 
                    name="from" 
                    onChange={(e) => setFrom(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <p>
                        <input 
                        type="checkbox"
                        name="current"
                        checked={current} 
                        value={current} 
                        onChange={(e) => setCurrent(e.target.value, {current: !current })}
                        /> {' '}Poste Actuel
                    </p>
                </div>

                <div className="form-group">
                    <h4>À</h4>
                    <input 
                    type="date" 
                    value={to} 
                    name="to" 
                    onChange={(e) => setTo(e.target.value)}
                    disabled={current }
                    />
                </div>

                <div className="form-group">
                <textarea
                    name="description"
                    value={description} 
                    cols="30"
                    rows="5"
                    placeholder="Description du Poste"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </div>

                <input 
                type="submit" 
                className="btn btn-primary my-1" 
                />
                <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>

                {isLoading && <Loader/>}
            </form>
        </main>
    )
}

export default AddExperiencePage;



// return (
//     <main className='container'>
//         <h1 className="large text-primary">
//         Tableau de bord
//     </h1>
//     <p className="lead">
//         <FaUser/> Bienvenue John Doe
//     </p>
//     <div className="dash-buttons">
//         <Link to="/edit-profile" className="btn btn-light">
//         <FaUserCircle/> Éditer votre Profil
//         </Link>
//         <Link to="/experience" className="btn btn-light">
//         <FaBlackTie/> Ajouter vos Expérience
//         </Link>
//         <Link to="/education" className="btn btn-light">
//         <FaGraduationCap/> Ajouter vos Formations
//         </Link>
//     </div>

//     <h2 className="my-2">Expériences</h2>
//     <table className="table">
//         <thead>
//         <tr>
//             <th>Entreprise</th>
//             <th className="hide-sm">Postes</th>
//             <th className="hide-sm">Années</th>
//             <th></th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//             <td>Tech Guy Web Solutions</td>
//             <td className="hide-sm">Senior Developer</td>
//             <td className="hide-sm">
//             02-03-2009 - 01-02-2014
//             </td>
//             <td>
//             <button className="btn btn-danger">
//                 Supprimer
//             </button>
//             </td>
//         </tr>
//         <tr>
//             <td>Traversy Media</td>
//             <td className="hide-sm">Instructor & Developer</td>
//             <td className="hide-sm">
//             02-03-2015 - Now
//             </td>
//             <td>
//             <button className="btn btn-danger">
//                 Supprimer
//             </button>
//             </td>
//         </tr>
//         </tbody>
//     </table>

//     <h2 className="my-2">Formations</h2>
//     <table className="table">
//         <thead>
//             <tr>
//             <th>Organismes de formation</th>
//             <th className="hide-sm">Diplôme</th>
//             <th className="hide-sm">Années</th>
//             <th />
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//             <td>Northern Essex</td>
//             <td className="hide-sm">Associates</td>
//             <td className="hide-sm">
//                 02-03-2007 - 01-02-2009
//             </td>
//             <td>
//                 <button className="btn btn-danger">
//                     Supprimer
//                 </button>
//             </td>
//             </tr>
//         </tbody>
//         </table>

//         <div className="my-2">
//             <button className="btn btn-danger">
//                 <FaUserMinus/> Supprimer votre compte
//             </button>
//         </div>
//     </main>
// )