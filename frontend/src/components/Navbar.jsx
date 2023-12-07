import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
        <h1>
            <Link to="/">DevConnecteur</Link>
        </h1>
        <ul>
            <li>
                <Link to="#">Dévelopeurs</Link>
            </li>
            <li>
                <Link to="/register">S'inscrire</Link>
            </li>
            <li>
                <Link to="/login">Connexion</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar