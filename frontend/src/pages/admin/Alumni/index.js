import React, { Component, Fragment } from 'react'

import { Spinner } from 'react-bootstrap'

import TabDialog from '../../../components/TabDialog'

import AlumniManage from './AlumniManage'
import AlumniSummary from "./AlumniSummary";
import AlumniSurvey from "./AlumniSurvey";
import AlumniAddSurvey from './AlumniAddSurvey'

import { connect } from 'react-redux'
import { getAllAlumniYear } from '../../../redux/action/adminAlumniAction'
import LoadingComponent from '../../../components/LoadingComponent';

class Alumni extends Component {

    componentDidMount() {
        this.props.loadAllYear()
    }

    render() {
        let tabName = ["สรุปข้อมูลศิษย์เก่า", "สรุปข้อมูลแบบสอบถาม", "จัดการรายการแบบสอบถาม", "เพิ่มข้อมูลแบบสอบถาม"]
        let paneTab = [<AlumniSummary />, <AlumniSurvey />, <AlumniManage />, <AlumniAddSurvey/>]
        let { loading } = this.props.website
        return (
            <Fragment>
                {
                    loading && (
                        <LoadingComponent />
                    )
                }
                <TabDialog
                    dialogName="ข้อมูลศิษย์เก่า"
                    tabList={tabName}
                    paneList={paneTab}
                />
            </Fragment>
        )
    }
}


const mapStateToProps = state => (
    {
        website: state.website,
        alumni: state.admin_alumni
    }
)

const mapDispatchToProps = dispatch => (
    {
        loadAllYear: () => dispatch(getAllAlumniYear())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Alumni)