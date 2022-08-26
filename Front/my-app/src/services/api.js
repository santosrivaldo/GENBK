import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:3200",

})

export const createSession = async (email, senha) => {
    return api.post("/usuarios/login", {email, senha})
}