import { Outlet } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <ToastContainer className='toast-position'/>
    </>
  );
}

export default App;
