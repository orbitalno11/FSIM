// "use strict"

import axios from 'axios'

// class ApiConnect {

//     constructor(){
//         this.baseURL = "http://127.0.0.1:5000/api/v1/"
//         this.adminURL = this.baseURL + "admin/"
//     }

//     baseConnect = () => axios.create({
//         baseURL: this.baseURL
//     })

//     adminConnect = () => axios.create({
//         baseURL: this.adminURL
//     })

// }

export default axios.create({
    baseURL: "http://127.0.0.1:5000/api/v1/"
})

// export const adminConnect = axios.create({
//     baseURL: "http://127.0.0.1:5000/api/v1/admin"
// })