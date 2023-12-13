import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {FaSignOutAlt} from "react-icons/fa";


import { useLogoutMutation } from '../slices/userApiSlice'; //To logout the api (server) logoutApiCall
import { logout } from '../slices/authSlice'; // To logout localy

const Navbar = () => {
    const {userInfo} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [logoutApiCall] = useLogoutMutation();

    //FUNCTIONS
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard"
                onClick={logoutHandler}
                >
                    <FaSignOutAlt/> <span className='hide-sm'>Déconnexion</span>
                </Link>
            </li>
        </ul>
    );


    const guestLinks = (
        <ul>
            <li>
                <Link to="/dashboard">Dévelopeurs</Link>
            </li>
            <li>
                <Link to="/register">S'inscrire</Link>
            </li>
            <li>
                <Link to="/login">Connexion</Link>
            </li>
        </ul>
    );


    return (
    <nav className="navbar bg-dark">
        <h1>
            <Link to="/">DevConnecteur</Link>
        </h1>
        {userInfo ? (
            authLinks
        ) : (
            guestLinks
        )}
    </nav>
    )
}

export default Navbar