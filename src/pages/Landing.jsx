import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { allProjectApi } from '../services/allApi'

function Landing() {

    const [logStatus,setLogStatus]=useState(false)
    const [data,setData]=useState([])

    useEffect(()=>{
        
        if (sessionStorage.getItem('token')){
            setLogStatus(true)

        }else{
            setLogStatus(false)
        }
        getData()
    },[])
    
    const getData=async()=>{
        const res=await allProjectApi()
        if(res.status==200){
            setData(res.data)
        }
    }
    console.log(data)
    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "90vh", backgroundColor: "bisque" }}>
                <Row>
                    <Col className='d-flex flex-column justify-content-center'>
                        <h3 className='text-warning'>Project Fair</h3>
                        <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro enim quam nulla labore sequi doloribus animi eum? Quod quas aperiam repudiandae! Quas vitae nisi atque nam maxime debitis rem nulla!</p>
                        <div className='d-grid'>
                            {
                                logStatus?
                                <Link to={'/dash'} className='btn btn-success'>go to dashboard</Link>

                                :
                            <Link to={'/auth'} className='btn btn-success'>start to explore</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img className='img-fluid' src="https://png.pngtree.com/png-clipart/20231016/original/pngtree-professional-web-developer-3d-illustration-png-image_13322701.png" alt="" />
                    </Col>
                </Row>

            </div>
            <div className='my-5'>
                {
                    data.length>0?

                <div className='d-flex justify-content-around'>
                    {
                    data.slice(-4,-1).map(item=>(

                        <ProductCard project={item}/>
                    ))
                    
                    }
                    

                </div>
                :
                <h3>not avilable</h3>
                }
                <div className='text-center my-3'>
                    <Link to={'/projects'} className='text-warning fs-4'>view more</Link>

                </div>
            </div>
        </>
    )
}

export default Landing
