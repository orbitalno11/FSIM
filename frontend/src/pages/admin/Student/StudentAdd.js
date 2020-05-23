import React, { Component, Fragment } from 'react'

import { FormControl, Container, Nav, Tab, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import ReactModal from '../../../components/ReactModal'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


import { connect } from 'react-redux'
import { addStudentGpax, addStudent } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'



const AddGpax = ({ submit, selectFile, year }) => (
    <Fragment>
        <Form id="addGpax" onSubmit={submit}>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl id="educationYear" type="number" placeholder="ระบุปีการศึกษา" required ></FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    เทอมการศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl id="semester" type="number" placeholder="ระบุเทอมการศึกษา" required ></FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลเกรด
                </Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".excel,.xlsx,.csv" onChange={event => selectFile(event)}>
                    </FormControl>
                </InputGroup>
            </Form.Group >
            <Button type="submit" className="btn-info interval-1" style={{marginTop:'3%'}}>SUBMIT</Button>
        </Form>
    </Fragment>
)

const AddStudent = ({submit, selectFile, year}) => (
    <Fragment>
        <Form  id="addStudent" onSubmit={submit}>
            <Form.Group>
                <Form.Label>
                    ข้อมูลนักศึกษา
                </Form.Label>
                <InputGroup>
                <FormControl type="file" accept=".excel,.xlsx,.csv" onChange={event => selectFile(event)}>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button  type="submit" className="btn-info interval-1"  style={{marginTop:'3%'}} >SUBMIT</Button>
        </Form>
    </Fragment>
)

class StudentAdd extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null
        }
    }

    handleGpaxSubmit = event => {
        event.preventDefault()
        let element = event.target.elements
        let form = new FormData()
        form.append('year',element.educationYear.value)
        form.append('semester',element.semester.value)
        form.append('upload', this.state.selectedFile)
        this.props.addStudentGpax(form)
    }

    handleStudentSubmit = event => {
        event.preventDefault()
        let element = event.target.elements

        let form = new FormData()
        form.append('upload', this.state.selectedFile)
        this.props.addStudent(form)
    }

    handleSelectFile = event => {
        let file = event.target.files[0]
        this.setState({
            selectedFile: file
        })
    }

    componentDidUpdate(prevProps, prevState){
        let status =this.props.student.actionResult
        if ((prevProps.actionResult!==status)&&(status==true)) {
            // this.setState({
            //     ...initialState
            // })
            document.getElementById("addStudent").reset();
            document.getElementById("addGpax").reset();
        }
    }



    render() {

        let { yearList } = this.props.student
        let tabName = [
            {
                tabId: '1',
                tabTitle: 'เพิ่มข้อมูลเกรด'
            },
            {
                tabId: '2',
                tabTitle: 'เพิ่มข้อมูลนักศึกษาปัจจุบัน'
            }
        ]

        let tabDetail = [
            {
                tabId: '1',
                tabDetail: <AddGpax submit={this.handleGpaxSubmit} selectFile={this.handleSelectFile} year={yearList} />
            },
            {
                tabId: '2',
                tabDetail: <AddStudent submit={this.handleStudentSubmit} selectFile={this.handleSelectFile} year={yearList} />
            }
        ]



        return (
            <Fragment>
                 <ReactModal />
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        {
                            tabDetail !== null && yearList !== null && (
                                <SideTab startKey={"1"} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />
                            )
                        }
                    </Container>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = state => (
    {
        student: state.admin_student,
    }
)

const mapDispatchToProps = dispatch => (
    {
        addStudent: (data) => dispatch(addStudent(data)),
        addStudentGpax :(data) => dispatch(addStudentGpax(data)),
        getDepartmentList: () => dispatch(getDepartmentList()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd)

