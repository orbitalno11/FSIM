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
    DELETE_SURVEY_FAILED
} from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    selectedYear: null,
    yearList: [],
    surveyList: [],
    surveyActionStatus: null,
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

        default:
            return state
    }
}