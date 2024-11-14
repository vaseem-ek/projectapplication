import React, { useContext, useEffect, useState } from 'react'
import base_url from '../services/base_url'
import { updateProfileApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextApI/AuthContext'

function Profile() {
  const [view, setView] = useState(false)
  const [details, setDetails] = useState({
    username: '', profile: '', linkedin: '', github: ''
  })

  const {setLogStatus}=useContext(logContext)


  const nav=useNavigate()
  const [preview, setPreview] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setDetails({ username: sessionStorage.getItem('user'), profile: sessionStorage.getItem('profile'), linkedin: sessionStorage.getItem('linkedin'), github: sessionStorage.getItem('github') })
    }
  }, [])
  useEffect(() => {
    if (details.profile.type) {
      setPreview(URL.createObjectURL(details.profile))
    } else {
      setPreview('')
    }
  }, [details.profile])

  const handleChane = () => {
    setView(!view)
  }
  const handlePorfile = async() => {
    console.log(details);
    
    const { profile, github, linkedin, username } = details
    // if (!profile || !github || !linkedin || !username) {
    //   toast.warning('not data avilable')
    // } else {
      if (details.profile.type) {

        const fd = new FormData()
        fd.append('profile', profile)
        fd.append('github', github)
        fd.append('linkedin', linkedin)
        fd.append('username', username)
      
      const header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${sessionStorage.getItem('token')}`
      }
      const resp=await updateProfileApi(header,fd)
      console.log(resp);
      sessionStorage.clear()
      setLogStatus(false)
      sessionStorage.clear()
      nav('/auth')
    }else{
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `token ${sessionStorage.getItem('token')}`
      }
      const resp=await updateProfileApi(header,details)
      console.log(resp);
      sessionStorage.clear()
      setLogStatus(false)
      nav('/auth')

    }
      
    }

  

  return (
    <>
      <div className='w-100 p-2 border mt-5 rounded border-3 shadow'>
        <div className='d-flex justify-content-between'>
          <h4 className='text-danger'>Profile Update</h4>
          <button className='btn' onClick={handleChane}>
            {
              view ?
                <i className='fa-solid fa-chevron-up' />
                :
                <i className='fa-solid fa-chevron-down' />
            }

          </button>

        </div>
        {
          view &&
          <div>
            <label>
              <input type="file" onChange={(e) => { setDetails({ ...details, profile: e.target.files[0] }) }} style={{ display: 'none' }} />
              <img src={preview ? preview : details.profile !== '' ? `${base_url}/upload/${details.profile}` : "https://cdni.iconscout.com/illustration/premium/thumb/upload-file-to-cloud-illustration-download-in-svg-png-gif-formats--uploading-storage-data-internet-web-and-mobile-application-pack-business-illustrations-3722766.png"} className='img-fluid ' alt="" />
            </label>



            <input type="text" onChange={(e) => { setDetails({ ...details, username: e.target.value }) }} defaultValue={details.username} placeholder='username' className="form-control mb-1" />
            <input type="text" onChange={(e) => { setDetails({ ...details, github: e.target.value }) }} defaultValue={details.github} placeholder='git hub link' className="form-control mb-1" />
            <input type="text" onChange={(e) => { setDetails({ ...details, linkedin: e.target.value }) }} defaultValue={details.linkedin} placeholder='linkd in link' className="form-control mb-1" />
            <div className='d-flex justify-content-between'>
              <button className='btn btn-success' onClick={handlePorfile}> update</button>
              <button className='btn btn-warning' onClick={handleChane}> cancel</button>
            </div>

          </div>
        }
      </div>

    </>
  )
}

export default Profile
