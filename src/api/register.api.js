import axios from 'axios'

const registersApi = axios.create({
    baseURL: "http://3.144.164.243:8000",
    responseType: 'json',
    withCredentials: true
});



export const getAllRegister = () => registersApi.get('/')

export const getRegister  = (id) => registersApi.get(/${id}/)

export const createRegisterClient = (data) => registersApi.post('/users/api/v1/clients/', data)

export const createRegisterRent = (data) => registersApi.post('/rents/rents/', data)

export const createRegisterFriend = (data) => registersApi.post('/users/api/v1/friends/', data)

export const getFriends = (data) => registersApi.get('/users/api/v1/friends/')

export const getClient = (data) => registersApi.get('/users/api/v1/clients/')

export const createLikes = (data) => registersApi.post('/users/api/v1/user_tastes/', data)

export const deleteRegister = (id) => registersApi.delete(/${id}/)

export const updateRegister = (id, date) => registersApi.put(/${id}/, date)

export const getLikes = () => registersApi.get('/users/api/v1/likes/')

export const getOutfit = () => registersApi.get('/rents/outfits/')

export const getEvent = () => registersApi.get('/rents/events/')

export const getRent = () =>  registersApi.get('/rents/rents/')

export const deleteRent = (id) => registersApi.delete(`/rents/rents/${id}/`)

export const getPrice =  () => registersApi.get("/rents/price/")

/* export const getTime = (id) => registersApi.get(`/rents/time_elapsed/${id}/`) */