import base_url from "./base_url";
import commonApi from "./commonApi/commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,'POST',"",data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,'POST',"",data)
}

export const addProjectApi=async(data,header)=>{
    return await commonApi(`${base_url}/addproject`,'POST',header,data)
}

export const getProjectApi=async(header)=>{
    return await commonApi(`${base_url}/getpro`,'GET',header,'')
}

export const deleteProjectApi=async(id,header)=>{
    return await commonApi(`${base_url}/deletepro/${id}`,'DELETE',header,{})
}

export const updateProApi=async(id,header,data)=>{
    return await commonApi(`${base_url}/updatepro/${id}`,'PUT',header,data)
}

export const updateProfileApi=async(header,data)=>{
    return await commonApi(`${base_url}/updateuser`,'PUT',header,data)
}
//its only using landing page data get in landing.jsx
export const allProjectApi=async()=>{
    return await commonApi(`${base_url}/allproject`,'GET','','')
}

// its using all project get and search functionality in allproject .jsx
export const searchApi=async(keyword)=>{
    return await commonApi(`${base_url}/search?search=${keyword}`,'GET','','')
}