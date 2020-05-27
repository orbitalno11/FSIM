import React, { Component, Fragment } from "react";

import TabDialog from '../../../components/TabDialog'

import ActivitySummary from "./ActivitySummary";
import ActivityActiveRecruitment from "./ActivityActiveRecruitment";
import AddActivity from "./AddActivity";
import ActivityManage from './ActivityManage'

import { connect } from 'react-redux'
import { getYearList } from '../../../redux/action/adminActivityAction'
import LoadingComponent from '../../../components/LoadingComponent';

class Activity extends Component {

    componentDidMount() {
        this.props.getYearList()
    }

    render() {
        let tabName = ["ข้อมูลกิจกรรมประชาสัมพันธ์", "ข้อมูล Active Recruitment", "จัดการข้อมูลกิจกรรม", "เพิ่มข้อมูล"]
        let pane = [<ActivitySummary />, <ActivityActiveRecruitment />, <ActivityManage />, <AddActivity />]
        let { loading } = this.props.website
        return (
            <Fragment>
                {
                    loading && (
                        <LoadingComponent />
                    )
                }
                <TabDialog
                    dialogName="กิจกรรมประชาสัมพันธ์ และ Active Recruitment"
                    tabList={tabName}
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
        getYearList: () => dispatch(getYearList())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)