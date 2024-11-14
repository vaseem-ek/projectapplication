import { useContext, useState } from 'react'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import AllProjects from './pages/AllProjects'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import { logContext } from './contextApI/AuthContext'

function App() {
  const {logStatus}=useContext(logContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/projects' element={logStatus?<AllProjects/>:<Auth/>}/>
      <Route path='/dash' element={logStatus?<Dashboard/>:<Auth/>}/>
     </Routes>
     <Footer />
     <ToastContainer />
     
     </>
  )
}

export default App
