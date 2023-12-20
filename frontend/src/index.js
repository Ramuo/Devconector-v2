import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import './index.css';
import App from './App';


//TO PROTECT ROUTES
import PrivateRoutes from './components/PrivateRoutes';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateProfilePage from './pages/CreateProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AddExperiencePage from './pages/AddExperiencePage';
import AddEducation from './pages/AddEducation';
import ProfilesPage from './pages/ProfilesPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/profiles' element={<ProfilesPage/>}/>
      <Route path='/profile/:id' element={<ProfilePage/>}/>
      
      <Route path='' element={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/create-profile' element={<CreateProfilePage/>}/>
        <Route path='/edit-profile' element={<EditProfilePage/>}/>
        <Route path='/experience' element={<AddExperiencePage/>}/>
        <Route path='/education' element={<AddEducation/>}/>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


