import {FaCheck} from 'react-icons/fa';

const ProfileAbout = ({userProfile}) => {
  return (
    <div className="profile-about bg-light p-2">
        {userProfile.bio && (
            <>
                <h2 className="text-primary">
                    {userProfile.user.name.trim().split(' ')[0]} Biographie
                </h2>
                <p>
                    {userProfile.bio}
                </p>
                <div className="line"></div>
            </>
        )}
        <h2 className="text-primary">{userProfile.skills}</h2>
        <div className="skills">
            {userProfile.skills.map((skill, index) => (
                <div key={index} className="p_1">
                    <FaCheck/> {skill}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProfileAbout;