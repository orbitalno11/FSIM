import React, {Component, Fragment} from "react";
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { Table, Button } from 'semantic-ui-react'

// import SearchActivity from "../../../components/SearchActivity";
// import AddActivity from "../../../components/AddActivity";
import { connect } from 'react-redux'
import LoadingComponent from '../../../components/LoadingComponent'
import { getStudentList } from '../../../redux/action/adminStudentAction'

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