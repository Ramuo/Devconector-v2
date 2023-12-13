import {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignInAlt} from "react-icons/fa";
import Loader from '../components/Loader';
import {toast} from 'react-toastify';


import { useLoginMutation } from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [login, { isLoading }] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    //FUNCTIONS:
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    };

    return (
    <main className="container">
        <h1 className="large text-primary">Se Connecter</h1>
        <p className="lead">
            <FaSignInAlt/> Connectez-vous à votre compte
        </p>
        <form 
        onSubmit={submitHandler}
        className="form"
        >
          <div className="form-group">
              <input 
              type="email" 
              value={email} 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
              />
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
            <input 
            type="submit" 
            className="btn btn-primary" 
            value="Connexion" 
            disabled={isLoading}
            />

            {isLoading && <Loader/>}
        </form>
        <p className="my-1">
            Vous n'avez pas de compte ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>S'inscrire</Link>
        </p>
    </main>
    );
};

export default LoginPage;