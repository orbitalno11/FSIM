import { START_LOADING, STOP_LOADING, GET_BRANCH_STARTED, GET_BRANCH_LIST_SUCCESS, GET_BRANCH_LIST_FAILED } from '../types'

import axios from 'axios'

export const startLoading = () => (
    {
        type: START_LOADING,
        loading: true
    }
)

export const stopLoading = () => (
    {
        type: STOP_LOADING,
        loading: false
    }
)

// get branch 
const getBranchListStart = () => (
    {
        type: GET_BRANCH_STARTED
    }
)

const getBranchListSuccess = data => (
    {
        type: GET_BRANCH_LIST_SUCCESS,
        branchList: data
    }
)

const getBranchListFailed = error => (
    {
        type: GET_BRANCH_LIST_FAILED,
        error: error
    }
)

export const getBranchList = () => dispatch => {
    dispatch(getBranchListStart())
    dispatch(startLoading())

    axios.get('/department/branch')
        .then(res => {
            let data = res.data.data
            dispatch(getBranchListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(getBranchListFailed(err))
            dispatch(stopLoading())
        })
}