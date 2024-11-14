import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logContext } from '../contextApI/AuthContext';

function Header() {
  const nav=useNavigate()
  const {setLogStatus}=useContext(logContext)

  const handleLogout=()=>{
    if(sessionStorage.getItem('token')){
      sessionStorage.clear()
      toast.info('logout successfull')
      setLogStatus(false)
      nav('/auth')
    }else{
      toast.error('eroor')
    }
  }
  
  return (
    <>
     <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <i className='fa-solid fa-diagram-project fa-xl'></i>
            {' '}
            Projrct FAir
          </Navbar.Brand>
          <button className='btn btn-danger' onClick={handleLogout}>logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
