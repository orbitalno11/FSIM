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
import StudentManage from "./StudentManage";

const AddTab = () => (
    <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกปีการศึกษา</option>
                        {/* {list.map(item => (<option value={item.id} key={item.id}>{item.name}</option>))} */}
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ภาควิชา
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกภาควิชา</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                   สาขา
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกสาขา</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลนักศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".excel,.xlsx,.csv">
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button className="btn-EditData interval-1" >RESET</Button>
            <Button className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)


class Student extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    componentDidMount() {
        this.props.loadAllYear()
    }

    render() {
        let tabName = ["สรุปข้อมูลผลการศึกษา", "Student tracking", "จัดการข้อมูล", "เพิ่มข้อมูล"]
        let pane = [<StudentSummary/>, <StudentTracking/>,< StudentManage/>, <StudentAdd/>]
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
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        loadAllYear: () => dispatch(getStudentList())
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Student)