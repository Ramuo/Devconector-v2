

const ListEducation = ({education}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
           <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    {edu.from.substring(0, 10)} - {' '}
                    {edu.to === null ? ('Actuel') : edu.to.substring(0, 10)}
                </td>
                <td>
                    <button className="btn btn-danger">
                        Supprimer
                    </button>
                </td>
        </tr>
    ))
   
    return (
    <>
        <h2 className="my-2">Formations</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Formations</th>
                    <th className="hide-sm">Établissements</th>
                    <th className="hide-sm">Années</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {educations}
            </tbody>
        </table>
       
    </>
    );
};

export default ListEducation;