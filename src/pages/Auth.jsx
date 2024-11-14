import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { registerApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { loginApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextApI/AuthContext'

function Auth() {

  const [authStatus, setAuthStatus] = useState(false)
  const navigate= useNavigate()

  const {setLogStatus}=useContext(logContext)

  const [user,setUser]=useState({
    email:"",username:"",password:""
  })

  
  const changeStatus = () => {
    setAuthStatus(!authStatus)
  }


  const handleRegister=async()=>{
    console.log(user)
    const {email,username,password}=user
    if(!email || !username || !password){
      toast.warning('enter valid data')
    }else{
      const res= await registerApi(user)
      console.log(res)
      if(res.status==200){
        toast.success('registration success')
        changeStatus()
        setUser({
          email:"",username:"",password:""
        })
      }else{
        toast.error('registration failed')
      }
      
    }
  }

  const handleLogin=async()=>{
    console.log(user)
    const {email,password}=user
    if(!email || !password){
      toast.warning('enter valid data')
      
    }else{
      const res=await loginApi(user)
      console.log(res);
      if(res.status==200){
        toast.success('logined success')
        setUser({
         email:"",password:"",username:""
        })


        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.username)
        sessionStorage.setItem('profile',res.data.profile)
        sessionStorage.setItem('github',res.data.github)
        sessionStorage.setItem('linkedin',res.data.linkedin)
        navigate('/')
        setLogStatus(true)
  

      }else{
        toast.error('login failed')
      }
    }
  }

  return (
    <>
      <div className='container-fluid d-flex w-100 justify-content-center align-items-center ' style={{ height: "100vh" }}>
        <div className='w-75 border border-2 dhadow rounded bg-light'>
          <Row>
            <Col>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developing-development-secure-mobile-webapp-and-pack-design-illustrations-3783954.png?f=webp" alt="" />
            </Col>
            <Col className='m-auto'>
              <h4>

                {
                  
                    authStatus?
                    <>Registration</>
  
                      :
                     <>Login</> 
                  
                }

              </h4>
              <div className='pe-1'>
                <input type="text" className='form-control my-3' value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder='Enter Email ID' />
                {
                  authStatus &&
                  <input type="text" className='form-control my-3' value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}} placeholder='Enter Your Name' />

                }
                <input type="password" className='form-control my-3' value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder='Password' />
              </div>
              <div className='d-flex justify-content-between'>

                {
                  authStatus?
                  <button className='btn btn-success m-1' onClick={handleRegister}>Registration</button>

                  :
                  <button className='btn btn-warning' onClick={handleLogin}>Login</button>

                }
                <button className='btn btn-link text-info' onClick={changeStatus}>
                  {
                    authStatus?
                    <>Already A User</>
                    :
                    <>New User</>
                  }
                </button>

              </div>

            </Col>
          </Row>


        </div>

      </div>
    </>
  )
}

export default Auth
