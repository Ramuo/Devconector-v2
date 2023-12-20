import Loader from '../components/Loader';
import {toast} from 'react-toastify';


import { useDeleteEducationMutation } from "../slices/profileApiSlice";




const ListEducation = ({education}) => {
    const  [deleteEducation, {isLoading}] = useDeleteEducationMutation();

    const deleteEducationHandler = async (id) => {
        if(window.confirm("Êtes-vous sûr de supprimer cette formation ?")){
            try {
                await deleteEducation(id);
                toast.success("Expérience supprimée avec succès")
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    const educations = education.map(edu => (
        <tr key={edu._id}>
           <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    {edu.from.substring(0, 10)} - {' '}
                    {edu.to === null ? ('Actuel') : edu.to.substring(0, 10)}
                </td>
                <td>
                    <button 
                    className="btn btn-danger"
                    onClick={() => deleteEducationHandler(edu._id)}
                    >
                        Supprimer
                    </button>
                </td>
        </tr>
    ))
   
    return (
    <>
        <h2 className="my-2">Formations</h2>
        {isLoading && <Loader/>}
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