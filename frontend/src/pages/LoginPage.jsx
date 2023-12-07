import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt} from "react-icons/fa";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    


    //FUNCTION
    const submitHandler = (e) => {
        e.preventDefault();
       
    }

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
            />
        </form>
        <p className="my-1">
            Vous n'avez pas de compte ? <Link to="/login">S'inscrire</Link>
        </p>
    </main>
    );
};

export default LoginPage;