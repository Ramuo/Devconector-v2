import React from 'react'

const ProfileExperience = ({experience}) => {
  return (
    <div>
        <h3 className="text-dark">{experience.company}</h3>
        <p>
            {experience.from.substring(0, 10)}
            {/* {experience.from.substring(0, 10)} - {!experience.to.substring(0, 10) ? "Poste Actuellement" : experience.to.substring(0, 10)} */}
        </p>
        <p>
            <strong>Poste</strong> {experience.title}
        </p>
        <p>
            <strong>Description du Poste</strong> {experience.description}
        </p>
    </div>
  )
}

export default ProfileExperience;