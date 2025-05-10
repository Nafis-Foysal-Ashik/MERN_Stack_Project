import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  //we will check if there is any token is present or not if present then don't reload to login page
  //if not present then reload to login page
  //here we are passing token as parameter so that the system can know that the admin is logged in if the token is available in the Route Section
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    //when the token is updated we will store it
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token==="" ? <Login setToken={setToken}/> : 
      <>
      <NavBar setToken={setToken}/>
      <hr />
      <div className="flex w-full">
        <Sidebar/>
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Routes>
            <Route path='/add' element={<Add token={token}/> /*here we are passing token as parameter so that the system can know that the admin is logged in if the token is available */ }/>
            <Route path='/list' element={<List token={token}/>}/>
            <Route path='/orders' element={<Orders token={token}/>}/>
          </Routes>
          </div>
      </div>
      </>
      }
    </div>
  )
}

export default App