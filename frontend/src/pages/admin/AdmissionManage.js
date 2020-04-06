import React, { Component, Fragment } from "react";

import TabDialog from "../../components/TabDialog";

class NewStudent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchNewStudent",
            branch: []
        }
    }

    render() {
        let tab = ["สรุปข้อมูลนักศึกษาใหม่", "สรุปข้อมูลการรับนักศึกษา", "จัดการข้อมูล", "เพิ่มข้อมูลการรับนักศึกษาใหม่"]
        let pane = []
        return (
            <Fragment>
                <TabDialog
                    dialogName="ข้อมูลการรับนักศึกษา"
                    tabList={tab}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default NewStudent