import {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";



import { useRegisterMutation } from '../slices/userApiSlice';
import {setCredentials} from '../slices/authSlice';



const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPossword, setConfirmPassword] = useState('');

    const [register, {isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';


    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);


    //FUNCTION
    const submitHandler = async (e) => {
        e.preventDefault();

        //Let'us check is the pwd match
        if(password !== confirmPossword){
            toast.error('Mot de passe et corfimer mot de passe ne sont pas identiques');
        }else{
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        };
    };

    return (
    <main className="container">
        <h1 className="large text-primary">S'inscrire</h1>
        <p className="lead">
            <FaUser/> Créez votre compte
        </p>
        <form 
        onSubmit={submitHandler}
        className="form"
        >
            <div className="form-group">
                <input 
                type="text"
                value={name} 
                placeholder="Nom" 
                required
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                type="email" 
                value={email} 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
                />
                <small className="form-text">
                    Ce site utilise Gravatar donc si vous souhaitez une image de profil, utilisez un
                    votre compte
                </small>
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={password} 
                    placeholder="Mot de passe"
                    minLength="6"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={confirmPossword} 
                    placeholder="Confirmer le Mot de passe"
                    minLength="6"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <input 
            type="submit" 
            className="btn btn-primary" 
            value="S'inscrire" 
            />

            {isLoading && <Loader/>}
        </form>
        <p className="my-1">
            Vous avez déjà un compte? <Link to={redirect ? `/redirect?redirect=${redirect}`: '/login'}>Se Connecter</Link>
        </p>
    </main>
    );
};

export default RegisterPage;