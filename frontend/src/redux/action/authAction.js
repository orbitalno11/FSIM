import * as types from '../types'

import axios from 'axios'


import { openModal } from './modalAction'


// login
const loginStart = () => (
    {
        type: types.LOGIN_STARTED
    }
)

const loginSuccess = () => (
    {
        type: types.LOGIN_SUCCESS
    }
)

const setUserData = (name, type) => (
    {
        type: types.GET_USER_DATA,
        userName: name,
        userType: type
    }
)

const loginFailed = error => (
    {
        type: types.LOGIN_FAILED,
        error: error
    }
)

//logout
const logout = () => (
    {
        type: types.LOGOUT,
        error: null
    }
)


// login action
export const login = (loginData, history) => dispatch => {
    dispatch(loginStart())
    axios.post('/signin', loginData)
        .then(res => {
            let data = res.data
            if (data['response']) {

                const FSIMIdToken = data['data']['token']
                const userData = data['data']['userData']
                localStorage.setItem('FSIMIdToken', FSIMIdToken)
                localStorage.setItem('userName', userData['name'])
                localStorage.setItem('userType', userData['type'])
                axios.defaults.headers.common['x-access-token'] = FSIMIdToken
                // history.push("/admin")
               
                dispatch(setUserData(userData['name'], userData['type']))
                window.location.href = "/admin"
                dispatch(loginSuccess())
                
            } else {
                dispatch(openModal(true,'LoginFail'))
                dispatch(loginFailed(data['message']))
            }
        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true,[{type:false,text:'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสอีกครั้ง',color:'#C0392B'}]))
            dispatch(loginFailed(err))
        })
}

// logout action
export const userLogout = () => dispatch => {
    localStorage.removeItem('FSIMIdToken')
    delete axios.defaults.headers.common['Authorization']
    window.location.href = "/"
    dispatch(logout)
}

// set user data
export const setUser = (userName, userType) => dispatch => {
    dispatch(setUserData(userName, userType))
}

