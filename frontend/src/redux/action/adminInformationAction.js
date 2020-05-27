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

// get department 
const getDepartmentListStart = () => (
    {
        type: types.GET_DEPT_STARTED
    }
)

const getDepartmentListSuccess = data => (
    {
        type: types.GET_DEPT_LIST_SUCCESS,
        deptList: data
    }
)

const getDepartmentListFailed = error => (
    {
        type: types.GET_DEPT_LIST_FAILED,
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
            dispatch(getCoureDataFailed(err))
            dispatch(stopLoading())
        })
}

export const getDepartmentList = () => dispatch => {
    dispatch(getDepartmentListStart())
    dispatch(startLoading())

    axios.get('/admin/information')
        .then(res => {
            let data = res.data.data

            if (data.length < 1) {
                dispatch(getDepartmentListFailed("Can not find data."))
                dispatch(stopLoading())
            }

            data.sort((prev, curr) => {
                let comparison = 0
                if (prev['dept_name'] > curr['dept_name']) {
                    comparison = 1
                } else if (prev['dept_name'] < curr['dept_name']) {
                    comparison = -1
                }
                return comparison
            })

            dispatch(getDepartmentListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(getDepartmentListFailed(err))
            dispatch(stopLoading())
        })
}