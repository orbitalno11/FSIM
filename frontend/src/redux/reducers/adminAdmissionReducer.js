import * as types from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    admissionList: null,
    admissionListByYear: null,
    yearList: null,
    selectedYear: year,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
            case types.SET_ADMISSION_SELECTED_YEAR:
                return {
                    ...state,
                    selectedYear: action.year
                }
            case types.LOAD_ADMISSION_LIST_START:
                return {
                    ...state
                }
    
            case types.LOAD_ADMISSION_LIST_SUCCESS:
                return {
                    ...state,
                    admissionList: action.admissionList
                }
    
            case types.LOAD_ADMISSION_LIST_FAILED:
                return {
                    ...state,
                    admissionList: null,
                    error: action.error
                }
            case types.GET_ADMISSION_YEAR_LIST_START:
                return {
                     ...state
                    }
        
            case types.GET_ADMISSION_YEAR_LIST_SUCCESS:
                return {
                    ...state,
                    yearList: action.yearList
                    }
        
            case types.GET_ADMISSION_YEAR_LIST_FAILED:
                return {
                    ...state,
                    yearList: null,
                    error: action.error
                    }
            default: return state
        }
    }