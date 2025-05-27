import axios from "axios"

export const getEstudiantes = () => {
    return axios.get('http://127.0.0.1:8000/estudiantes/')
}