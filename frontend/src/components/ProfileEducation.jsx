

const ProfileEducation = ({education}) => {
  return (
    <div>
        <h3 className="text-dark">{education.school}</h3>
        <p>
            {/* {education.from.substring(0, 10)} */}
            {education.from.substring(0, 10)} - {!education.to.substring(0, 10) ? "Poste Actuellement" : education.to.substring(0, 10)}
        </p>
        <p>
            <strong>Diplôme</strong> {education.degree}
        </p>
        <p>
            <strong>Champs d'étude</strong> {education.fieldofstudy}
        </p>
        <p>
            <strong>Description</strong> {education.description}
        </p>
    </div>
  )
}

export default ProfileEducation;