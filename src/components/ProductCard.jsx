import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import base_url from '../services/base_url';


function ProductCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" onClick={handleShow} style={{cursor:"pointer"}} src={`${base_url}/upload/${project.image}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <img className='img-fluid' src={`${base_url}/upload/${project.image}`} alt="" />
            </Col>
            <Col>
            <h3>Project Title</h3>
            <hr className='w-50' />
            <h5><span className='text-info'>desocription:</span>{project.description} </h5>
            
            <h5><span className='text-info'>Language:</span>{project.languages}</h5>

            <div className='mt-3 d-flex justify-content-around'>
                <a href={project.github}>
                <i className="fa-brands fa-github fa-xl" />
                </a>
                <a href={project.demo}>
                <i className="fa-solid fa-link fa-xl" />
                </a>

            </div>
            
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}

export default ProductCard
