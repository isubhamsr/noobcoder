import { API } from '../../backend'
import { cartEmpty } from '../../core/helper/cartHelper'

export const signup = (user) =>{
    return fetch(`${API}user/`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(responce =>{
        return responce.json()
    })
    .catch( error => { return error.message })
}

export const signin = (user) =>{
    const formData = new FormData()
    
    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`,{
        method : "POST",
        body : formData
    })
    .then(responce =>{
        return responce.json()
    })
    .catch( error => { return error.message })
}

export const authenticate = (data, next) =>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () =>{
    if(typeof window === undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
        // TODO - compare jwt (localStorage vallue) with the database session storage value
    }else{
        return false
    }
}

export const signout = (next) =>{
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        // cartEmpty(()=>{ console.log("cart is empty") })

        return fetch(`${API}user/logout/${userId}/`,{
            method : "GET"
        })
        .then(responce =>{
            next()
            return responce.json()
        })
        .catch( error => { return error.message })
    }
}