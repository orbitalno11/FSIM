import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'

// set select year
const setSelectedYear = year => (
    {
        type: types.SET_ADMISSION_SELECTED_YEAR,
        year: year
    }
)

// admission list
const loadAdmissionListStart = () => (
    {
        type: types.LOAD_ADMISSION_LIST_START
    }
)

const loadAdmissionListSuccess = (list) => (
    {
        type: types.LOAD_ADMISSION_LIST_SUCCESS,
        admissionList: list
    }
)

const loadAdmissionListFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_LIST_FAILED,
        error: error
    }
)

// delete admission
const deleteAdmissionStart = () => (
    {
        type: types.DELETE_ADMISSION_START
    }
)

const deleteAdmissionSuccess = (result) => (
    {
        type: types.DELETE_ADMISSION_SUCCESS,
        actionResult: result
    }
)

const deleteAdmissionFalied = (error, result) => (
    {
        type: types.DELETE_ADMISSION_FAILED,
        actionResult: result,
        error: error
    }
)

// add admission
const addAdmissionStart = () => (
    {
        type: types.ADD_ADMISSION_START
    }
)

const addAdmissionSuccess = (result) => (
    {
        type: types.ADD_ADMISSION_SUCCESS,
        actionResult: result
    }
)

const addAdmissionFalied = (error, result) => (
    {
        type: types.ADD_ADMISSION_FAILED,
        actionResult: result,
        error: error
    }
)

// admission table1
const loadAdmissionTableStart = () => (
    {
        type: types.LOAD_ADMISSION_TABLE_START
    }
)

const loadAdmissionTableSuccess = (data) => (
    {
        type: types.LOAD_ADMISSION_TABLE_SUCCESS,
        admissionTable: data
    }
)

const loadAdmissionTableFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_TABLE_FAILED,
        error: error
    }
)


// admission table2
const loadAdmissionTableTwoStart = () => (
    {
        type: types.LOAD_ADMISSION_TABLE_TWO_START
    }
)

const loadAdmissionTableTwoSuccess = (data) => (
    {
        type: types.LOAD_ADMISSION_TABLE_TWO_SUCCESS,
        admissionTableTwo: data
    }
)

const loadAdmissionTableTwoFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_TABLE_TWO_FAILED,
        error: error
    }
)




// admission table3
const loadAdmissionTableThreeStart = () => (
    {
        type: types.LOAD_ADMISSION_TABLE_THREE_START
    }
)

const loadAdmissionTableThreeSuccess = (data) => (
    {
        type: types.LOAD_ADMISSION_TABLE_THREE_SUCCESS,
        admissionTableThree: data
    }
)

const loadAdmissionTableThreeFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_TABLE_THREE_FAILED,
        error: error
    }
)


//  admission data
const loadAdmissionDataStart = () => (
    {
        type: types.LOAD_ADMISSION_DATA_START
    }
)

const loadAdmissionDataSuccess = (data) => (
    {
        type: types.LOAD_ADMISSION_DATA_SUCCESS,
        admissionData: data
    }
)

const loadAdmissionDataFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_DATA_FAILED,
        error: error
    }
)

// admission year list
const loadAdmissionYearListStart = () => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_START
    }
)

const loadAdmissionYearListSuccess = (list) => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_SUCCESS,
        yearList: list
    }
)

const loadAdmissionYearListFalied = (error) => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_FAILED,
        error: error
    }
)


export const selectYear = year => dispatch => {
    dispatch(setSelectedYear(year))
}

export const getAdmissionList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionListStart())

    axios.get(`/admin/admission/list`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            dispatch(loadAdmissionListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionListFalied(err))
            dispatch(stopLoading())
        })
}

export const deleteAdmission = (year,round_id,channel_id) => (dispatch, getState) => {
    dispatch(deleteAdmissionStart())
    dispatch(startLoading())
    axios.delete(`/admin/admission?year=${year}&round_id=${round_id}&channel_id=${channel_id}`)
        .then(res => {
            dispatch(deleteAdmissionSuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_admission.selectedYear
            dispatch(getAdmissionList(year))
            // dispatch(getAdmissionData(year))
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))
        })
        .catch(err => {
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(deleteAdmissionFalied(err, false))
            dispatch(stopLoading())
        })
}

export const addAdmission = (year,channel)=> (dispatch, getState) => {
    dispatch(addAdmissionStart())
    dispatch(startLoading())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/admission/?year=${year}&channel=${channel}')
        .then(res => {
            dispatch(addAdmissionSuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_admission.selectedYear
            dispatch(getAdmissionList(year))
            //dispatch(getActivityData(year))
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))
        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addAdmissionFalied(err, false))
            dispatch(stopLoading())
        })
}

// ตารางแรก 1
export const getAdmissionTable = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionTableStart())

    axios.get(`/admin/admission/analyze/status`)
        .then(res => {
            let data = res.data.data
            

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionTableFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }
            
        
            let branchData = data.count_by_brance
         
            const admissionTable = Object.entries(branchData);
              
            admissionTable.forEach(([key, value]) => {
                // console.log(key); 
                // console.log(value); 
              });

            dispatch(loadAdmissionTableSuccess(admissionTable))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionTableFalied(err))
            dispatch(stopLoading())
        })
}
// ตาราง 2
export const getAdmissionTableTwo = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionTableTwoStart())

    axios.get(`/admin/admission/analyze/status`)
        .then(res => {
            let data = res.data.data
            

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionTableTwoFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }
            
        
            let Datacount = data.table
         
            const admissionTableTwo = Object.entries(Datacount);
              
            admissionTableTwo.forEach(([key, value]) => {
                // console.log(key); 
                // console.log(value); 
              });

            dispatch(loadAdmissionTableTwoSuccess(admissionTableTwo))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionTableTwoFalied(err))
            dispatch(stopLoading())
        })
}


// ตาราง3
export const getAdmissionTableThree = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionTableThreeStart())

    axios.get(`/admin/admission/analyze/status`)
        .then(res => {
            let data = res.data.data
            

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionTableThreeFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }
            
        
            let tableData = data.table
            console.log(tableData);

            const admissionTableThree = Object.entries(tableData);
              
            admissionTableThree.forEach(([key, value]) => {
                // console.log(key); 
                // console.log(value); 
              });

            dispatch(loadAdmissionTableThreeSuccess(admissionTableThree))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionTableThreeFalied(err))
            dispatch(stopLoading())
        })
}

export const getAdmissionData = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionDataStart())

    axios.get(`/admin/admission/analyze/channel`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            let round1 = data['analyze_by_round'][0]['รอบที่ 1/1']
            let round2 = data['analyze_by_round'][1]['รอบที่ 1/2']
            let round3 = data['analyze_by_round'][2]['รอบที่ 2']
            let round4 = data['analyze_by_round'][3]['รอบที่ 3/1']
            let round5 = data['analyze_by_round'][4]['รอบที่ 3/2']
            let round6 = data['analyze_by_round'][5]['รอบที่ 4']
            let round7 = data['analyze_by_round'][6]['รอบที่ 5']
            let admissionData  = {
                round1,
                round2,
                round3,
                round4,
                round5,
                round6,
                round7
            }
            dispatch(loadAdmissionDataSuccess(admissionData))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionDataFalied(err))
            dispatch(stopLoading())
        })
}

export const getYearList = () => (dispatch) => {
    dispatch(loadAdmissionYearListStart())
    dispatch(startLoading())
    axios.get('')
        .then(res => {
            let data = res.data.data

            let cur_year = new Date()
            cur_year = cur_year.getFullYear() + 543

            if (!data.includes(cur_year))
                data.push(cur_year)
            
            data.sort((prev, cur) => (cur - prev))

            dispatch(loadAdmissionYearListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadAdmissionYearListFalied())
            dispatch(stopLoading())
        })
}