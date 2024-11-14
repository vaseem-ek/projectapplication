import React,{useContext, useEffect, useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import Edit from '../components/Edit'
import Header from '../components/Header'
import Add from '../components/Add'
import { getProjectApi,deleteProjectApi } from '../services/allApi'
import { responseContext } from '../contextApI/ContextProvid';
import Profile from '../components/Profile'

function Dashboard() {

  const [uname,setUname]=useState("")
  const [project,setProject]=useState([])
  
  const {response}=useContext(responseContext)

  // getData using for display all projects
  const getData=async()=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await getProjectApi(header)
    // console.log(res.data);
    if(res.status==200){

      setProject(res.data)
    }
    
  }

  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      setUname(sessionStorage.getItem('user'))
    }
    getData()
    
  },[response])


  const handleDelete=async(id)=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await deleteProjectApi(id,header)
    console.log(res);
    
    getData()
    
  }

  
  return (
    <>

      <Header />
      <div className='container-fluid p-3'>
        <h2 className='text-center text-danger'>WELCOME <span className='text-warning'><u>{uname}</u> </span> </h2>
        <Row>
          <Col md={8} sm={12}>
            <h3>Projects</h3>
            <div className='border border-3 shadow p-2 rounded'>
              <Add />
              <div className='my-3'>
                {
                  project.length>0?
                  project.map(item=>(
                    <div className='border p-2 border-2 rounded border-info shadow mb-3 d-flex justify-content-between'>
                  
                    <h5>{item.title}</h5>
                    
                    <div>
                      <a href="" className='me-2 btn'><i className='fa-brands fa-github fa-xl' /></a>
                      <Edit project={item}/>
                      <button className='btn' onClick={()=>handleDelete(item._id)}>
                        <i className='fa-solid fa-trash fa-xl' style={{ color: "#df1163" }} />
                      </button>
  
                    </div>
                  </div>

                  ))
                 
                
                :
                <h4>no data</h4>
                }
               

              </div>

            </div>
          </Col>
          <Col md={4} sm={12}>
          <Profile/>
          </Col>
        </Row>

      </div></>
  )
}

export default Dashboard
