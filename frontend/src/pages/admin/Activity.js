import React, {Component, Fragment} from "react";

import SearchActivity from "../../components/SearchActivity";
import AddActivity from "../../components/AddActivity";
import TabDialog from '../../components/TabDialog'

class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    render() {
        let tabName = ["ข้อมูลกิจกรรมประชาสัมพันธ์", "ข้อมูล Active Recruitment", "จัดการข้อมูลกิจกรรม", "เพิ่มข้อมูล"]
        let pane = [null, null, <SearchActivity />, <AddActivity />]
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