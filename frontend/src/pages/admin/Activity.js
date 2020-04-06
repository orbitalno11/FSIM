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
        let tabName = ["ดูข้อมูลกิจกรรม", "เพิ่มข้อมูลกิจกรรม"]
        let pane = [<SearchActivity />, <AddActivity />]
        return (
            <Fragment>
                <TabDialog
                    dialogName="จัดการข้อมูลกิจกรรมรับเข้า"
                    tabList={tabName}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default Activity