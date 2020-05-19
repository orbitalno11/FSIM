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
    LOAD_SURVEY_LIST_FAILED,
    DELETE_SURVEY_START,
    DELETE_SURVEY_SUCCESS,
    DELETE_SURVEY_FAILED,
    LOAD_ALUMNI_WORK_DATA_START,
    LOAD_ALUMNI_WORK_DATA_SUCCESS,
    LOAD_ALUMNI_WORK_DATA_FAILED,
    SET_SALARY_CHART,
    LOAD_ALUMNI_SURVEY_DATA_START,
    LOAD_ALUMNI_SURVEY_DATA_SUCCESS,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_START,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_SUCCESS,
    LOAD_ALUMNI_SURVEY_ANALYZE_DATA_FAILED
} from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    selectedYear: null,
    yearList: [],
    surveyList: [],
    surveyActionStatus: null,
    workData: null,
    surveyData: null,
    surveyAnalyze: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SURVEY_SELECTED_YEAR:
            return {
                ...state,
                selectedYear: action.selectedYear
            }

        case LOAD_SURVEY_YEAR_START:
            return {
                ...state
            }

        case LOAD_SURVEY_YEAR_SUCCESS:
            return {
                ...state,
                yearList: action.yearList
            }

        case LOAD_SURVEY_YEAR_FAILED:
            return {
                ...state,
                yearList: action.yearList,
                error: action.error
            }

        case LOAD_SURVEY_LIST_START:
            return {
                ...state,
            }

        case LOAD_SURVEY_LIST_SUCCESS:
            return {
                ...state,
                surveyList: action.surveyList
            }

        case LOAD_SURVEY_LIST_FAILED:
            return {
                ...state,
                surveyList: action.surveyList,
                error: action.error
            }

        case ADD_SURVEY_START:
            return {
                ...state,
            }

        case ADD_SURVEY_SUCCESS:
            return {
                ...state,
                surveyActionStatus: action.surveyActionStatus
            }

        case ADD_SURVEY_FAILED:
            return {
                ...state,
                surveyActionStatus: action.surveyActionStatus,
                error: action.error
            }

        case DELETE_SURVEY_START:
            return {
                ...state,
            }

        case DELETE_SURVEY_SUCCESS:
            return {
                ...state,
                surveyDeleteStatus: action.surveyDeleteStatus
            }

        case DELETE_SURVEY_FAILED:
            return {
                ...state,
                surveyDeleteStatus: action.surveyDeleteStatus,
                error: action.error
            }

        case LOAD_ALUMNI_WORK_DATA_START:
            return {
                ...state,
            }

        case LOAD_ALUMNI_WORK_DATA_SUCCESS:
            return {
                ...state,
                workData: action.workData
            }

        case LOAD_ALUMNI_WORK_DATA_FAILED:
            return {
                ...state,
                error: action.error
            }

        case SET_SALARY_CHART:
            return {
                ...state,
                workData: {
                    ...state.workData,
                    salaryChart: action.data
                }
            }

        case LOAD_ALUMNI_SURVEY_DATA_START:
            return {
                ...state,
            }

        case LOAD_ALUMNI_SURVEY_DATA_SUCCESS:
            return {
                ...state,
                surveyData: action.surveyData
            }

        case LOAD_SURVEY_YEAR_FAILED:
            return {
                ...state,
                error: action.error
            }

        case LOAD_ALUMNI_SURVEY_ANALYZE_DATA_START:
            return {
                ...state,
            }

        case LOAD_ALUMNI_SURVEY_ANALYZE_DATA_SUCCESS:
            return {
                ...state,
                surveyAnalyze: action.surveyAnalyze
            }

        case LOAD_ALUMNI_SURVEY_ANALYZE_DATA_FAILED:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}