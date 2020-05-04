import {
    LOAD_SURVEY_YEAR_START,
    LOAD_SURVEY_YEAR_SUCCESS,
    LOAD_SURVEY_YEAR_FAILED,
    ADD_SURVEY_START,
    ADD_SURVEY_SUCCESS,
    ADD_SURVEY_FAILED,
    DELETE_SURVEY_START,
    DELETE_SURVEY_SUCCESS,
    DELETE_SURVEY_FAILED,
    SET_SURVEY_SELECTED_YEAR,
    LOAD_SURVEY_LIST_START,
    LOAD_SURVEY_LIST_SUCCESS,
    LOAD_SURVEY_LIST_FAILED,
    RESET_SURVEY_ACTION_STATUS
} from '../types'

import axios from 'axios'

import { startLoading, stopLoading } from './generalAction'

const selectedYear = year => (
    {
        type: SET_SURVEY_SELECTED_YEAR,
        selectedYear: year
    }
)

const resetSurveyAction = () => (
    {
        type: RESET_SURVEY_ACTION_STATUS,
        selectedYear: null
    }
)

// load year data
const loadYearStart = () => {
    return {
        type: LOAD_SURVEY_YEAR_START
    }
}

const loadYearSuccess = (yearList) => {
    return {
        type: LOAD_SURVEY_YEAR_SUCCESS,
        yearList: yearList
    }
}

const loadYearFailed = (error) => {
    // stopLoading()
    return {
        type: LOAD_SURVEY_YEAR_FAILED,
        yearList: ["ไม่พบข้อมูล"],
        error: error

    }
}

// load survey list
const loadListStart = () => {
    return {
        type: LOAD_SURVEY_LIST_START
    }
}

const loadListSuccess = (data) => {
    return {
        type: LOAD_SURVEY_LIST_SUCCESS,
        surveyList: data
    }
}

const loadListFailed = (error) => {
    return {
        type: LOAD_SURVEY_LIST_FAILED,
        surveyList: ["ไม่พบข้อมูล"],
        error: error

    }
}

// add survey list
const addSurveyStart = () => (
    {
        type: ADD_SURVEY_START
    }
)

const addSurveySuccess = () => (
    {
        type: ADD_SURVEY_SUCCESS,
        surveyActionStatus: true
    }
)

const addSurveyFailed = (error) => (
    {
        type: ADD_SURVEY_FAILED,
        surveyActionStatus: false,
        error: error

    }
)

// delete survey list
const deleteSurveyStart = () => (
    {
        type: DELETE_SURVEY_START
    }
)

const deleteSurveySuccess = () => (
    {
        type: DELETE_SURVEY_SUCCESS,
        surveyActionStatus: true
    }
)

const deleteSurveyFailed = (error) => (
    {
        type: DELETE_SURVEY_FAILED,
        surveyActionStatus: false,
        error: error

    }
)

export const setSelectedYear = year => dispatch => dispatch(selectedYear(year))
export const resetSurveyActionStatus = () => dispatch => dispatch(resetSurveyAction())

// load all survey year
export const getAllAlumniYear = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadYearStart())
    axios.get('/alumni/survey')
        .then(res => {
            let data = res.data

            if (!data['response']) {
                dispatch(loadYearFailed("CAN NOT FIND DATA"))
                return
            }

            data = data.data[0]
            let keys = Object.keys(data)
            let list = []

            keys.forEach(key => {
                list.push(data[key]['educationYear'])
            })

            list.sort((prev, curr) => curr - prev)

            let lastestYear = list[0]

            dispatch(loadYearSuccess(list))
            dispatch(selectedYear(lastestYear))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadYearFailed(err.code))
            dispatch(stopLoading())
        })
}

export const getSurveyList = () => dispatch => {
    dispatch(loadListStart)
    dispatch(startLoading())
    axios.get('/alumni/survey')
        .then(res => {
            let data = res.data.data[0]
            let surList = []
            let surveyKeys = Object.keys(data)

            surveyKeys.forEach(item => {
                let surData = {
                    ...data[item],
                    id: item
                }
                surList.push(surData)
            })

            dispatch(loadListSuccess(surList))
            dispatch(stopLoading())

        })
        .catch(err => {
            console.error(err)
            dispatch(loadListFailed(err))
            dispatch(stopLoading())
        })
}

export const addSurvey = data => dispatch => {
    dispatch(addSurveyStart)
    dispatch(startLoading())
    axios.post('/admin/alumni/survey', data)
        .then(res => {
            let data = res.data

            if (data['response']){
                dispatch(addSurveySuccess())
                dispatch(getSurveyList())
            }else{
                dispatch(addSurveyFailed("Response Error"))
            }

            dispatch(stopLoading())

        })
        .catch(err => {
            console.error(err)
            dispatch(addSurveyFailed(err))
            dispatch(stopLoading())
        })
}
