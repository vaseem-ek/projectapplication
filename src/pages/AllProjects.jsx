import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { allProjectApi, searchApi } from '../services/allApi'



function AllProjects() {
    const [data,setData]=useState([])
    const [keys,setKeys]=useState('')


    useEffect(()=>{
        getData()
    },[keys])

   

    const getData=async()=>{
        const res=await searchApi(keys)
        setData(res.data)
    }
    console.log(data);

    
   
    
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className=' d-flex justify-content-center m-3'>
                    <input type="text" onChange={(e)=>setKeys(e.target.value)}  className='form-control w-50 p-2 fs-4'  placeholder='search for title' />
                </div>
                <h3 className='text-center m-3 text-danger'>All Projects</h3>
                <div className='row gap-3 mx-3 justify-content-around'>
                    {
                        data.length>0?
                        data.map((item)=>(

                            <ProductCard project={item}/>
                        ))
                        :
                        <h3>no data available</h3>
                    }
                </div>
            </div>

        </>
    )
}

export default AllProjects
