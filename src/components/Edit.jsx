import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { responseContext } from '../contextApI/ContextProvid';
import base_url from '../services/base_url';
import { updateProApi } from '../services/allApi';
import { toast } from 'react-toastify';

function Edit({ project }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { setResponse } = useContext(responseContext)

    const [preview, setPreview] = useState('')

    const [data, setData] = useState({})
    useEffect(() => {
        setData({ ...project })
    }, [])

    useEffect(() => {
        if (data.image?.type) {
            setPreview(URL.createObjectURL(data.image))
        } else {
            setPreview('')
        }
    }, [data.image])

    const handleUpdate = async () => {
        console.log(data);
        const { title, description, github, demo, image, languages } = data
        if( !title || !description  ||  !github || !demo || !image || !languages){
        
        toast.warning('data not avilable')
        }else{

            if (data.image.type) {
    
                const fd = new FormData()
                fd.append('title', title)
                fd.append('image', image)
                fd.append('description', description)
                fd.append('demo', demo)
                fd.append('languages', languages)
                fd.append('github', github)
                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateProApi(data._id,header,fd)
                setResponse(res)
                if(res.status==200){

                    toast.success('updated successfull')
                    handleClose()
                }
            } else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res=await updateProApi(data._id ,header,data)
                setResponse(res)
                if(res.status==200){

                    toast.success('updated successfull')
                    handleClose()
                }
            }
        }
        



    }
    return (
        <>
            <button className='btn' onClick={handleShow}><i className="fa-regular fa-pen-to-square fa-xl" /></button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Projects</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" onChange={(e) => { setData({ ...data, image: e.target.files[0] }) }} style={{ display: 'none' }} />
                                <img src={preview ? preview : `${base_url}/upload/${data.image}`} className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" onChange={(e) => { setData({ ...data, title: e.target.value }) }} defaultValue={data.title} placeholder='Title' className='form-control my-1' />
                            <input type="text" onChange={(e) => { setData({ ...data, description: e.target.value }) }} defaultValue={data.description} placeholder='Description' className='form-control my-1' />
                            <input type="text" onChange={(e) => { setData({ ...data, languages: e.target.value }) }} defaultValue={data.languages} placeholder='Language Used' className='form-control my-1' />
                            <input type="text" onChange={(e) => { setData({ ...data, github: e.target.value }) }} defaultValue={data.github} placeholder='Git Repository Link' className='form-control my-1' />
                            <input type="text" onChange={(e) => { setData({ ...data, demo: e.target.value }) }} defaultValue={data.demo} placeholder='Demo Link' className='form-control my-1' />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit