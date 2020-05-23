import React, { Component, Fragment } from "react";

import TabDialog from '../../../components/TabDialog'

import AdmissionSummary from "./AdmissionSummary";
import AdmissionStudentSummary from "./AdmissionStudentSummary";
import AdmissionManage from './AdmissionManage'
import AdmissionAdd from './AdmissionAdd'

import { connect } from 'react-redux'
import { getYearList } from '../../../redux/action/adminActivityAction'
import LoadingComponent from '../../../components/LoadingComponent';


class Admission extends Component {

    componentDidMount() {
        // this.props.getYearList()
    }

    render() {
        let tab = ["สรุปข้อมูลนักศึกษาใหม่", "สรุปข้อมูลการรับนักศึกษา", "จัดการข้อมูล", "เพิ่มข้อมูลการรับนักศึกษาใหม่"]
        let pane = [<AdmissionSummary/>,<AdmissionStudentSummary/> , < AdmissionManage/>,<AdmissionAdd/>]
        let { loading } = this.props.website
        return (
            <Fragment>
                {
                    loading && (
                        <LoadingComponent />
                    )
                }
                <TabDialog
                    dialogName="ข้อมูลการรับนักศึกษา"
                    tabList={tab}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}


const mapStateToProps = state => (
    {
        website: state.website
    }
)

const mapDispatchToProps = dispatch => (
    {
        // getYearList: () => dispatch(getYearList())
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Admission)