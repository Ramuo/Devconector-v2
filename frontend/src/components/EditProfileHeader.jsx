import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBlackTie, FaGraduationCap } from 'react-icons/fa';

function EditProfileHeader() {
  return (
    <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
            <FaUserCircle className='text-primary'/> Éditer votre profil
        </Link>
        <Link to="/experience" className="btn btn-light">
            <FaBlackTie className='text-primary'/>Ajouter vos expériences
        </Link>
        <Link to="/education" className="btn btn-light">
            <FaGraduationCap className='text-primary'/> Ajouter une formation
        </Link>
    </div>
  )
}

export default EditProfileHeader;