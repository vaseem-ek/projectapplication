import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { responseContext } from '../contextApI/ContextProvid';
function Add() {

    const [project,setProject]=useState({
        title:'',description:"",languages:"",github:"",demo:"",image:""
    })

    const {setResponse}=useContext(responseContext)

    const [preview,setPreview]=useState("")

    useEffect(()=>{
        if(project.image){
            setPreview(URL.createObjectURL(project.image))
        }else{
            setPreview("")
        }

    },[project.image])

    const handleaddProject=async()=>{
        console.log(project);
        const {title,description,languages,github,demo,image}=project
        if(!title || !description || !languages || !github || !demo || !image){
            toast.warning('fill in the valid input')
        }else{
            const fd=new FormData()
            fd.append('title',title)
            fd.append('description',description)
            fd.append('languages',languages)
            fd.append('github',github)
            fd.append('demo',demo)
            fd.append('image',image)

            const header={
                'Content-Type':'multipart/form-data',
                'Authorization':`Token ${sessionStorage.getItem('token')}`
            }

            const res=await addProjectApi(fd,header)
            console.log(res);
            toast.success('added succefully')
            handleClose()
            setResponse(res)
            
        }
        
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    setProject({
        title:'',description:"",languages:"",github:"",demo:"",image:""

    })
    }
    const handleShow = () => setShow(true);



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add projects
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Projects</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" onChange={(e)=>{setProject({...project,image:e.target.files[0]})}} style={{ display: 'none' }} />
                                <img src={preview?preview: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZxHi8puv-4pu0Gg_WFqCbX4xRYgWVTpKGg&s" }className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                        <input type="text" onChange={(e)=>{setProject({...project,title:e.target.value})}} placeholder='Title' className='form-control my-1' />
                        <input type="text"  onChange={(e)=>{setProject({...project,description:e.target.value})}} placeholder='Description' className='form-control my-1' />
                        <input type="text"  onChange={(e)=>{setProject({...project,languages:e.target.value})}}placeholder='Language Used' className='form-control my-1' />
                        <input type="text"  onChange={(e)=>{setProject({...project,github:e.target.value})}} placeholder='Git Repository Link' className='form-control my-1' />
                        <input type="text"  onChange={(e)=>{setProject({...project,demo:e.target.value})}} placeholder='Demo Link' className='form-control my-1' />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleaddProject}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add
