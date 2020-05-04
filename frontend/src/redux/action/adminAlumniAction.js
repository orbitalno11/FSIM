import {
    LOAD_SURVEY_YEAR_START,
    LOAD_SURVEY_YEAR_SUCCESS,
    LOAD_SURVEY_YEAR_FAILED,
    ADD_SURVEY_START,
    ADD_SURVEY_SUCCESS,
    ADD_SURVEY_FAILED,
    SET_SURVEY_SELECTED_YEAR,
    LOAD_SURVEY_LIST_START,
    LOAD_SURVEY_LIST_SUCCESS,
    LOAD_SURVEY_LIST_FAILED
} from '../types'

import axios from 'axios'

const selectedYear = year => (
    {
        type: SET_SURVEY_SELECTED_YEAR,
        selectedYear: year
    }
)

// load year data
const loadYearStart = () => (
    {
        type: LOAD_SURVEY_YEAR_START
    }
)

const loadYearSuccess = (yearList) => (
    {
        type: LOAD_SURVEY_YEAR_SUCCESS,
        yearList: yearList
    }
)

const loadYearFailed = (error) => (
    {
        type: LOAD_SURVEY_YEAR_FAILED,
        yearList: ["ไม่พบข้อมูล"],
        error: error

    }
)

// load survey list
const loadListStart = () => (
    {
        type: LOAD_SURVEY_LIST_START
    }
)

const loadListSuccess = (data) => (
    {
        type: LOAD_SURVEY_LIST_SUCCESS,
        surveyList: data
    }
)

const loadListFailed = (error) => (
    {
        type: LOAD_SURVEY_LIST_FAILED,
        surveyList: ["ไม่พบข้อมูล"],
        error: error

    }
)

// load survey list
const addSurveyStart = () => (
    {
        type: ADD_SURVEY_START
    }
)

const addSurveySuccess = (data) => (
    {
        type: ADD_SURVEY_SUCCESS
    }
)

const addSurveyFailed = (error) => (
    {
        type: ADD_SURVEY_FAILED,
        error: error

    }
)

export const setSelectedYear = year => dispatch => dispatch(selectedYear(year))

// load all survey year
export const getAllAlumniYear = () => dispatch => {
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
        })
        .catch(err => {
            console.error(err)
            dispatch(loadYearFailed(err.code))
        })
}

export const getSurveyList = () => dispatch => {
    dispatch(loadListStart)
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

        })
        .catch(err => {
            console.error(err)
            dispatch(loadListFailed(err))
        })
}

export const addSurvey = data => dispatch => {
    dispatch(addSurveyStart)
    axios.post('/admin/alumni/survey', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
}
