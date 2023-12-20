import React from 'react';
import { Link } from 'react-router-dom';
import {FaGlobe, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaInstagram} from 'react-icons/fa';

const ProfileTop = ({userProfile}) => {
  return (
    <div className="profile-top bg-primary p-2">
        <img
        className="round-img my-1"
        src={userProfile.user.avatar}
        alt=""
        />
        <h1 className="large">{userProfile.user.name}</h1>
        <p className="lead">{userProfile.status } {userProfile.company && <span>chez {userProfile.company}</span>} </p>
        <p>{userProfile.location}</p>
        <div className="icons my-1">
            {
                userProfile.website && (
                    <Link to={userProfile.website} target="_blank" rel="noopener noreferrer">
                        <FaGlobe/>
                    </Link>
                )
            }
            {
               userProfile.social && userProfile.social.twitter && (
                    <Link to={ userProfile.social.twitter} target="_blank" rel="noopener noreferrer">
                         <FaTwitter/>
                    </Link>
                )
            }
            {
               userProfile.social && userProfile.social.facebook && (
                    <Link to={ userProfile.social.facebook} target="_blank" rel="noopener noreferrer">
                         <FaFacebook/>
                    </Link>
                )
            }
            {
               userProfile.social && userProfile.social.linkedin && (
                    <Link to={ userProfile.social.linkedin} target="_blank" rel="noopener noreferrer">
                         <FaLinkedin/>
                    </Link>
                )
            }
            {
               userProfile.social && userProfile.social.youtube && (
                    <Link to={ userProfile.social.youtube} target="_blank" rel="noopener noreferrer">
                         <FaYoutube/>
                    </Link>
                )
            }
            {
               userProfile.social && userProfile.social.instagram && (
                    <Link to={ userProfile.social.instagram} target="_blank" rel="noopener noreferrer">
                         <FaInstagram/>
                    </Link>
                )
            }
        </div>
    </div>
  )
}

export default ProfileTop