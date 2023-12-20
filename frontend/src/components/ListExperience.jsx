import {toast} from 'react-toastify';
import Loader from '../components/Loader';


import {
    useDeleteExperienceMutation,
} from '../slices/profileApiSlice';



const ListExperience = ({experience}) => {
   
    const [deleteExperience, {isLoading}] = useDeleteExperienceMutation();


    const deleteExperienceHandler = async (id) => {
      if(window.confirm("Êtes-vous sûr de supprimer cette expérience ?")){
        try {
          await deleteExperience(id);
          toast.success("Expérience supprimée avec succès")
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
      }
    }


    const experiences = experience.map(exp => (
        <tr key={exp._id} >
           <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                    {exp.from.substring(0, 10)} - {' '}
                    {/* {exp.to === null ? ('Poste Actuel') : exp.to.substring(0, 10)}
                    {exp.to === null ? ('Poste Actuel') : exp.to.substring(0, 10)} */}
                </td>
                <td>
                    <button 
                    className="btn btn-danger"
                    onClick={() => deleteExperienceHandler(exp._id)}
                    >
                        Supprimer
                    </button>
                    
                </td>   
        </tr>
    ));

   
    return (
    <>
        <h2 className="my-2">Expériences</h2>
        {isLoading && <Loader/>}
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