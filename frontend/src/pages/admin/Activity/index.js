import React, {Component, Fragment} from "react";

import TabDialog from '../../../components/TabDialog'

import ActivitySummary from "./ActivitySummary";
import ActivityActiveRecruitment from "./ActivityActiveRecruitment";
import AddActivity  from "./AddActivity";
import ActivityManage from './ActivityManage'

class Activity extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let tabName = ["ข้อมูลกิจกรรมประชาสัมพันธ์", "ข้อมูล Active Recruitment", "จัดการข้อมูลกิจกรรม", "เพิ่มข้อมูล"]
        let pane = [<ActivitySummary/>, <ActivityActiveRecruitment /> , <ActivityManage />, <AddActivity />]
        return (
            <Fragment>
                <TabDialog
                    dialogName="กิจกรรมประชาสัมพันธ์ และ Active Recruitment"
                    tabList={tabName}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default Activity