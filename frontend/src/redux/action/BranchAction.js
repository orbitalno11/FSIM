import axios from 'axios'

import {GET_BRANCH_STARTED, GET_BRANCH_SUCCESS, GET_BRANCH_FAILED} from "../types";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api/v1/"
})

const startGetData = () => ({
    type: GET_BRANCH_STARTED,
})

const getDataSuccess = data => ({
    type: GET_BRANCH_SUCCESS,
    branch: data
})

const getDataFailed = error => ({
    type: GET_BRANCH_FAILED,
    branch: error
})

export const getAllBranch = () => (dispatch, getState)=> {
    dispatch(startGetData())
    api.get('/branch')
        .then(res => {
            let received = res.data
            if (received.response === true) {
                dispatch(getDataSuccess(received.data))
            } else {
                dispatch(getDataFailed(received.data))
            }
        })
        .catch(error => {
            dispatch(getDataFailed(error))
        })
}

