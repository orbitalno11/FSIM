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

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    selectedYear: null,
    yearList: [],
    surveyList: [],
    addSurveyStatus: false,
    error: null,
    loading: false
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
                ...state,
                loading: true
            }

        case LOAD_SURVEY_YEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                yearList: action.yearList
            }

        case LOAD_SURVEY_YEAR_FAILED:
            return {
                ...state,
                loading: false,
                yearList: action.yearList,
                error: action.error
            }

        case LOAD_SURVEY_LIST_START:
            return {
                ...state,
                loading: true
            }

        case LOAD_SURVEY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                surveyList: action.surveyList
            }

        case LOAD_SURVEY_LIST_FAILED:
            return {
                ...state,
                loading: false,
                surveyList: action.surveyList,
                error: action.error
            }

        default:
            return state
    }
}