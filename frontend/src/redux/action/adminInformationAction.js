import * as types from '../types'

import axios from 'axios'

import { startLoading, stopLoading } from '../action/generalAction'

// get course list
const getCoureListStart = () => (
    {
        type: types.GET_COURSE_LIST_START
    }
)

const getCoureListSuccess = list => (
    {
        type: types.GET_COURSE_LIST_SUCCESS,
        courseList: list
    }
)

const getCoureListFailed = error => (
    {
        type: types.GET_COURSE_LIST_FAILED,
        error: error
    }
)

// get course data
const getCoureDataStart = () => (
    {
        type: types.GET_COURSE_DATA_START
    }
)

const getCoureDataSuccess = data => (
    {
        type: types.GET_COURSE_DATA_SUCCESS,
        courseData: data
    }
)

const getCoureDataFailed = error => (
    {
        type: types.GET_COURSE_DATA_FAILED,
        error: error
    }
)

export const getCourseList = () => dispatch => {
    dispatch(startLoading())
    dispatch(getCoureListStart())

    axios.get('/admin/information/course/list')
    .then(res => {
        let data = res.data.data

        dispatch(getCoureListSuccess(data))
        dispatch(stopLoading())
    })
    .catch(err => {
        console.error(err)
        dispatch(getCoureListFailed(err))
        dispatch(stopLoading())
    })
}

export const getCourseData = () => dispatch => {
    dispatch(startLoading())
    dispatch(getCoureDataStart())

    axios.get('/admin/information/course')
    .then(res => {
        let data = res.data.data
        
        dispatch(getCoureDataSuccess(data))
        dispatch(stopLoading())
    })
    .catch(err => {
        console.error(err)
        dispatch(getCourseData(err))
        dispatch(stopLoading())
    })
}