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
    RESET_SURVEY_ACTION_STATUS,
    LOAD_ALUMNI_WORK_DATA_START,
    LOAD_ALUMNI_WORK_DATA_SUCCESS,
    LOAD_ALUMNI_WORK_DATA_FAILED,
    SET_SALARY_CHART,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_FAILED,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_START,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_SUCCESS,
    LOAD_ALUMNI_SURVEY_DATA_START,
    LOAD_ALUMNI_SURVEY_DATA_SUCCESS,
    LOAD_ALUMNI_SURVEY_DATA_FAILED
} from '../types'

import axios from 'axios'
import { openModal } from './modalAction'

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
        yearList: null,
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
        surveyList: null,
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
        surveyDeleteStatus: true,
    }
)

const deleteSurveyFailed = (error) => (
    {
        type: DELETE_SURVEY_FAILED,
        surveyDeleteStatus: false,
        error: error

    }
)

// load work data
const loadWorkDataStart = () => (
    {
        type: LOAD_ALUMNI_WORK_DATA_START
    }
)

const loadWorkDataSuccess = (data) => (
    {
        type: LOAD_ALUMNI_WORK_DATA_SUCCESS,
        workData: data,
    }
)

const loadWorkDataFailed = (error) => (
    {
        type: LOAD_ALUMNI_WORK_DATA_FAILED,
        error: error

    }
)

const setSalary = (data) => (
    {
        type: SET_SALARY_CHART,
        data: data
    }
)

// load survey data
const loadSurveyDataStart = () => (
    {
        type: LOAD_ALUMNI_SURVEY_DATA_START
    }
)

const loadSurveyDataSuccess = (data) => (
    {
        type: LOAD_ALUMNI_SURVEY_DATA_SUCCESS,
        surveyData: data,
    }
)

const loadSurveyDataFailed = (error) => (
    {
        type: LOAD_ALUMNI_SURVEY_DATA_FAILED,
        error: error

    }
)

// load survey analyze
const loadSurveyAnalyzeDataStart = () => (
    {
        type: LOAD_ALUMNI_SURVEY_ANALYZE_DATA_START
    }
)

const loadSurveyAnalyzeDataSuccess = (data) => (
    {
        type: LOAD_ALUMNI_SURVEY_ANALYZE_DATA_SUCCESS,
        surveyAnalyze: data,
    }
)

const loadSurveyAnalyzeDataFailed = (error) => (
    {
        type: LOAD_ALUMNI_SURVEY_ANALYZE_DATA_FAILED,
        error: error

    }
)

export const setSelectedYear = year => dispatch => dispatch(selectedYear(year))

export const resetSurveyActionStatus = () => dispatch => dispatch(resetSurveyAction())

export const setSalaryChart = (data) => dispatch => dispatch(setSalary(data))

// load all survey year
export const getAllAlumniYear = () => dispatch => {
    dispatch(loadYearStart())
    dispatch(startLoading())

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
    dispatch(loadListStart())
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
    dispatch(startLoading())
    dispatch(addSurveyStart())

    axios.post('/admin/alumni/survey', data)
        .then(res => {
            let data = res.data

            if (data['response']) {
                dispatch(addSurveySuccess())
                dispatch(getSurveyList())
                dispatch(getAllAlumniYear())
                dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

            } else {
                dispatch(addSurveyFailed("Response Error"))
                dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))

            }

            dispatch(stopLoading())

        })
        .catch(err => {
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            console.error(err)
            dispatch(addSurveyFailed(err))
            dispatch(stopLoading())
        })
}

export const deleteItem = data => dispatch => {
    dispatch(startLoading())
    dispatch(deleteSurveyStart())

    axios.delete(`/admin/alumni/survey?key=${data.id}&year=${data.educationYear}`)
        .then(res => {
            let data = res.data
            if (data['response']) {
                dispatch(deleteSurveySuccess())
                dispatch(getAllAlumniYear())
                dispatch(getSurveyList())
                dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

            } else {
                dispatch(deleteSurveyFailed("Response Error"))
                dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))

            }

            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
        })
}

export const loadWorkData = year => dispatch => {
    dispatch(startLoading())
    dispatch(loadWorkDataStart())

    axios.get(`/alumni/analyze/work?year=${year}`)
        .then(res => {
            let recieved_data = res.data.data

            if (Object.entries(recieved_data).length === 0) {
                dispatch(loadWorkDataFailed("Can not fond data."))
                dispatch(stopLoading())
                return
            }

            let branchData = recieved_data['count_by_branch']
            let workStatus = recieved_data['count_by_status']
            let trainingData = recieved_data['count_by_training']
            let gpaChart = recieved_data['gpax_by_branch']
            let salaryData = recieved_data['salary_all_branch_training']
            let salaryChart = salaryData['all']['salary_all_branch_training']

            let data = {
                branchStudentChart: branchData,
                workChart: workStatus,
                trainingChart: trainingData,
                gpaChart: gpaChart,
                salaryData: salaryData,
                salaryChart: salaryChart,
            }

            dispatch(loadWorkDataSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadWorkDataFailed(err))
            dispatch(stopLoading())
        })
}

export const loadSurveyData = (year) => dispatch => {
    dispatch(startLoading())
    dispatch(loadSurveyDataStart())

    axios.get(`/alumni/survey?year=${year}`)
        .then(res => {
            let data = res.data.data[0]
            let key = Object.keys(data)

            if (Object.entries(data).length === 0) {
                dispatch(loadWorkDataFailed("Can not fond data."))
                dispatch(stopLoading())
                return
            }

            let out = {
                sheet_url: data[key[0]]['sheetUrl'],
                table_header: data[key[0]]['tableHeader']
            }

            dispatch(loadSurveyDataSuccess(out))
            dispatch(stopLoading())
            dispatch(loadSurveyAnalyzeData(out))
            // if (key.length > 1 || key.length < 1) {
            //     // alert("Check alumni survey list for year" + setSelectedYear)
            //     this.setState({
            //         surveyDetail: null,
            //         analyzeData: null,
            //         loadTime: 1,
            //         year: selectedYear
            //     })
            //     this.props.stopLoading()
            //     return
            // } else {
            //     let detail = data[key[0]]
            //     console.log(detail)
            //     this.setState({
            //         surveyDetail: detail,
            //         loadTime: 1,
            //         year: detail.educationYear
            //     })
            //     this.fetchAnalyzeSurvey()
            // }
        })
        .catch(err => {
            console.error(err)
            dispatch(loadSurveyDataFailed(err))
            dispatch(stopLoading())
        })
}

export const loadSurveyAnalyzeData = (sendData) => (dispatch) => {
    dispatch(startLoading())
    dispatch(loadSurveyAnalyzeDataStart())

    axios.post('/alumni/analyze/survey', sendData)
        .then(res => {
            let data = res.data.data[0]
            let key = Object.keys(data)

            let analyze_sur = []
            key.forEach(key => {
                let result = {
                    topic: key,
                    mean: data[key]['mean'],
                    std: data[key]['std']
                }
                analyze_sur.push(result)
            })

            dispatch(loadSurveyAnalyzeDataSuccess(analyze_sur))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadSurveyAnalyzeDataFailed(err))
            dispatch(stopLoading())
        })
}
