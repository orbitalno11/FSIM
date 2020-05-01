import * as types from '../types'

import axios from 'axios'

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
export const login = (loginData) => dispatch => {
    dispatch(loginStart())
    axios.post('/auth/login', loginData)
        .then(res => {
            let data = res.data
            if (data['result']) {
                const FSIMIdToken = `Bearer ${data['token']}`
                localStorage.setItem('LSIdToken', FSIMIdToken)
                axios.defaults.headers.common['Authorization'] = FSIMIdToken
                window.location.href = "/"
                dispatch(loginSuccess())
            } else {
                dispatch(loginFailed(data['message']))
            }
        })
        .catch(err => {
            console.error(err)
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