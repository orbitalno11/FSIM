import React, {Component, Fragment} from "react";

import { connect } from 'react-redux'
import LoadingComponent from '../../../components/LoadingComponent'

import TabDialog from '../../../components/TabDialog'

import StudentSummary from "./SummaryTab";
import StudentTracking from "./StudentTracking";
import StudentAdd from "./StudentAdd";


class Student extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    render() {
        let tabName = ["สรุปข้อมูลผลการศึกษา", "Student tracking", "เพิ่มข้อมูล"]
        let pane = [<StudentSummary/>, <StudentTracking/>, <StudentAdd/>]
        let { loading } = this.props.website

        return (
            <Fragment>
                {
                    loading && (
                        <LoadingComponent/>
                    )
                }
                <TabDialog
                    dialogName="ข้อมูลนักศึกษาปัจจุบัน"
                    tabList={tabName}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}



const mapStateToProps = state => (
    {
        website: state.website,
       
    }
)

const mapDispatchToProps = dispatch => (
    {

    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Student)