import { Link } from "react-router-dom";
import {FaCheck} from 'react-icons/fa';


const ProfileItem = ({profile}) => {
  return (
    <div className="profile bg-light">
        <img src={profile.user.avatar} alt="" className="round-img" />
        <div>
            <h2>{profile.user.name}</h2>
            <p>{profile.status} {profile.company && <span>Chez {profile.company}</span>}</p>
            <p className="my-1">{profile.status} {profile.location && <span> à {profile.location}</span>}</p>
            <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
                Voir le profil
            </Link>
        </div>
        <ul>
            {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="text-primary">
                    <FaCheck/> {skill}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProfileItem