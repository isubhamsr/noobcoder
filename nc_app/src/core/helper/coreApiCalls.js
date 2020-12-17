import { API } from '../../backend'

export const getAllProducts = () =>{
    return fetch(`${API}product/`, {
        method : "GET"
    })
    .then(responce =>{
        return responce.json();
    })
    .catch(error => {return error.message})
}