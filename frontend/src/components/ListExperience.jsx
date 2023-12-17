import React from 'react';


const ListExperience = ({experience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
           <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                    {exp.from.substring(0, 10)} - {' '}
                    {exp.to === null ? ('Actuel') : exp.to.substring(0, 10)}
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
        <h2 className="my-2">Expériences</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Entreprises</th>
                    <th className="hide-sm">Postes</th>
                    <th className="hide-sm">Années</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {experiences}
            </tbody>
        </table>
       
    </>
    );
};

export default ListExperience;