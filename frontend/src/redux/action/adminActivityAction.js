import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'


// set select year
const setSelectedYear = year => (
    {
        type: types.SET_ACTIVITY_SELECTED_YEAR,
        year: year
    }
)

// load activity
const loadActivityStart = () => (
    {
        type: types.LOAD_ACTIVITY_DATA_START
    }
)

const loadActivitySuccess = (activityData) => (
    {
        type: types.LOAD_ACTIVITY_DATA_SUCCESS,
        activityData: activityData
    }
)

const loadActivityFalied = (error) => (
    {
        type: types.LOAD_ACTIVITY_DATA_FAILED,
        error: error
    }
)


// load activity AR
const loadActivityARStart = () => (
    {
        type: types.LOAD_AR_DATA_START
    }
)

const loadActivityARSuccess = (activityData) => (
    {
        type: types.LOAD_AR_DATA_SUCCESS,
        arData: activityData
    }
)

const loadActivityARFalied = (error) => (
    {
        type: types.LOAD_AR_DATA_FAILED,
        error: error
    }
)


// activity list
const loadActivityListStart = () => (
    {
        type: types.LOAD_ACTIVITY_LIST_START
    }
)

const loadActivityListSuccess = (list) => (
    {
        type: types.LOAD_ACTIVITY_LIST_SUCCESS,
        activityList: list
    }
)

const loadActivityListFalied = (error) => (
    {
        type: types.LOAD_ACTIVITY_LIST_FAILED,
        error: error
    }
)

// project list
const loadProjectListStart = () => (
    {
        type: types.LOAD_PROJECT_LIST_START
    }
)

const loadProjectListSuccess = (list) => (
    {
        type: types.LOAD_PROJECT_LIST_SUCCESS,
        projectList: list
    }
)

const loadProjectListFalied = (error) => (
    {
        type: types.LOAD_PROJECT_LIST_FAILED,
        error: error
    }
)

// add project
const addProjectStart = () => (
    {
        type: types.ADD_PROJECT_START
    }
)

const addProjectSuccess = (result) => (
    {
        type: types.ADD_PROJECT_SUCCESS,
        actionResult: result
    }
)

const addProjectFalied = (error, result) => (
    {
        type: types.ADD_SURVEY_FAILED,
        actionResult: result,
        error: error
    }
)

// add activity
const addActivityStart = () => (
    {
        type: types.ADD_ACTIVITY_START
    }
)

const addActivitySuccess = (result) => (
    {
        type: types.ADD_ACTIVITY_SUCCESS,
        actionResult: result
    }
)

const addActivityFalied = (error, result) => (
    {
        type: types.ADD_ACTIVITY_FAILED,
        actionResult: result,
        error: error
    }
)

// delete activity
const deleteActivityStart = () => (
    {
        type: types.DELETE_ACTIVITY_START
    }
)

const deleteActivitySuccess = (result) => (
    {
        type: types.DELETE_ACTIVITY_SUCCESS,
        actionResult: result
    }
)

const deleteActivityFalied = (error, result) => (
    {
        type: types.DELETE_ACTIVITY_FAILED,
        actionResult: result,
        error: error
    }
)

export const selectYear = year => dispatch => {
    dispatch(setSelectedYear(year))
}


export const getActivityData = year => dispatch => {
    dispatch(startLoading())
    dispatch(loadActivityStart)

    let activityData = {}

    axios.get(`/activity/analyze/activity?year=${year}`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadActivityFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            let joinByActivity = data['activity_count']
            let compareByPreviousYear = data['activity_year_compare']

            activityData = {
                joinByActivity: joinByActivity,
                compareByPreviousYear: compareByPreviousYear
            }

            dispatch(loadActivitySuccess(activityData))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadActivityFalied(err))
            dispatch(stopLoading())
        })
}

export const getARActivityData = year => dispatch => {
    dispatch(startLoading())
    dispatch(loadActivityARStart)

    let activityData = {}

    axios.get(`/admin/activity/analyze/project/ar?year=${year}`)
        .then(res => {
            let data = res.data.data

            let activityByBranch = data['activity_by_branch_count'][0]
            let activityByGPAX = data['activity_by_branch_gpax'][0]
            let numberBySchool = data['count_school']
            let gpaBySchool = data['gpax']

            activityData = {
                projectDataBranch: activityByBranch,
                projectDataGPAX: activityByGPAX,
                numberBySchool: numberBySchool,
                gpaBySchool: gpaBySchool
            }

            dispatch(loadActivityARSuccess(activityData))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadActivityARFalied(err))
            dispatch(stopLoading())
        })
}

export const getActivityList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadActivityListStart)

    axios.get(`/admin/activity/list`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadActivityListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            dispatch(loadActivityListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadActivityListFalied(err))
            dispatch(stopLoading())
        })
}

export const getProjectList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadProjectListStart)

    axios.get('/activity/project')
        .then(res => {
            let data = res.data.data

            if (data.length < 1) {
                dispatch(loadProjectListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            dispatch(loadProjectListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadProjectListFalied(err))
            dispatch(stopLoading())
        })
}

export const addProject = data => dispatch => {
    dispatch(addProjectStart)
    dispatch(startLoading())
    axios.post('/admin/activity/project', data)
        .then(res => {
            dispatch(addProjectSuccess(true))
            dispatch(stopLoading())
            dispatch(getProjectList())
            dispatch(openModal(true,[{text:'บันทึกสำเร็จ',color:'#33cc33',type:true}]))

        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true,[{text:'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง',color:'#C0392B',type:false}]))
            dispatch(addProjectFalied(err, false))
            dispatch(stopLoading())
        })
}

export const addActivity = data => (dispatch, getState) => {
    dispatch(addActivityStart)
    dispatch(startLoading())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/activity/', data, config)
        .then(res => {
            dispatch(addActivitySuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_activity.selectedYear
            dispatch(getActivityList(year))
            dispatch(getActivityData(year))
            dispatch(getARActivityData(year))
            dispatch(openModal(true,[{text:'บันทึกสำเร็จ',color:'#33cc33',type:true}]))
        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true,[{text:'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง',color:'#C0392B',type:false}]))
            dispatch(addActivityFalied(err, false))
            dispatch(stopLoading())
        })
}

export const delelteActivity = act_id => (dispatch, getState) => {
    dispatch(deleteActivityStart())
    dispatch(startLoading())
    axios.delete(`/admin/activity?act_id=${act_id}`)
        .then(res => {
            dispatch(deleteActivitySuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_activity.selectedYear
            dispatch(getActivityList(year))
            dispatch(getActivityData(year))
            dispatch(getARActivityData(year))
            dispatch(openModal(true,[{text:'บันทึกสำเร็จ',color:'#33cc33',type:true}]))
        })
        .catch(err => {
            dispatch(openModal(true,[{text:'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง',color:'#C0392B',type:false}]))
            dispatch(deleteActivityFalied(err, false))
            dispatch(stopLoading())
        })
}
