import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const RegisterPage = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPossword, setConfirmPassword] = useState('');


    //FUNCTION
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPossword){
            console.log('Password do not match')
        }else{
            console.log(name)
        }
    }

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
        </form>
        <p className="my-1">
            Vous avez déjà un compte? <Link to="/login">Se Connecter</Link>
        </p>
    </main>
    );
};

export default RegisterPage;