import { getApiUrl } from "../utils/getApi";

const API_URL = getApiUrl()

const postHeader = (body)=>{
    return {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
}
}


export const createProject = (body)=>{
    return fetch(`${API_URL}companies/`, postHeader(body)).then((res)=> {
        res.json()
    })
}