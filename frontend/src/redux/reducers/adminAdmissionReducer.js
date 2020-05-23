import * as types from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    admissionList: null,
    admissionData: null,
    admissionListByYear: null,
    yearList: [2560,2559],
    selectedYear: year,
    actionResult: null,
    admissionTable:null,
    admissionTableTwo:null,
    admissionTableThree:null,
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
            // ตารางแรก
             case types.LOAD_ADMISSION_TABLE_START:
                return {
                    ...state
                }

            case types.LOAD_ADMISSION_TABLE_SUCCESS:
                return {
                    ...state,
                    admissionTable: action. admissionTable
                }

            case types.LOAD_ADMISSION_TABLE_FAILED:
                return {
                    ...state,
                    admissionTable: null,
                    error: action.error
                }
            // ตาราง 2

            case types.LOAD_ADMISSION_TABLE_TWO_START:
                return {
                    ...state
                }

            case types.LOAD_ADMISSION_TABLE_TWO_SUCCESS:
                return {
                    ...state,
                    admissionTableTwo: action. admissionTableTwo
                }

            case types.LOAD_ADMISSION_TABLE_TWO_FAILED:
                return {
                    ...state,
                    admissionTableTwo: null,
                    error: action.error
                }    

                // ตาราง 3
            case types.LOAD_ADMISSION_TABLE_THREE_START:
                return {
                        ...state
                    }
    
            case types.LOAD_ADMISSION_TABLE_THREE_SUCCESS:
                return {
                        ...state,
                        admissionTableThree: action. admissionTableThree
                    }
    
            case types.LOAD_ADMISSION_TABLE_THREE_FAILED:
                return {
                        ...state,
                        admissionTableThree: null,
                        error: action.error
                    }   

                //หน้ากราฟ
            case types.LOAD_ADMISSION_DATA_START:
                return {
                            ...state
                        }
        
            case types.LOAD_ADMISSION_DATA_SUCCESS:
                return {
                            ...state,
                            admissionData: action. admissionData
                        }
        
            case types.LOAD_ADMISSION_DATA_FAILED:
                return {
                            ...state,
                            admissionData: null,
                            error: action.error
                        }    
                        
            //yerlist
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