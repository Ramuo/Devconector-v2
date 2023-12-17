import {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';


import { useAddEducationMutation } from '../slices/profileApiSlice';

const AddEducationPage = () => {
    const navigate = useNavigate();

    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [fieldofstudy, setFieldofstudy] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [current, setCurrent] = useState(false);
    const [description, setDescription] = useState('');


    const [addEducation, {isLoading} ] = useAddEducationMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addEducation({school, degree, fieldofstudy, from, to, current, description});
            toast.success('Expérience ajouter avec succès');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        };

    };

    
    return (
        <main className='container'>
            <h1 className="large text-primary">
                Ajouter vos Formations
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Ajoutez les établissement que vous avez fréquenté dans votre formation
            </p>
            <small>* = Champs requis</small>
            <form className="form"
            onSubmit={submitHandler}
            >
                <div className="form-group">
                    <input 
                    type="text"
                    value={school} 
                    placeholder="* Établissement" 
                    name="title" 
                    required 
                    onChange={(e) => setSchool(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={degree} 
                    placeholder="* Diplôme" 
                    name="company" 
                    required 
                    onChange={(e) => setDegree(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    value={fieldofstudy} 
                    placeholder="Ville & Pays" 
                    name="Champs d'étude" 
                    onChange={(e) => setFieldofstudy(e.target.value)}
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
                    placeholder="Description de la formation"
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

export default AddEducationPage;

