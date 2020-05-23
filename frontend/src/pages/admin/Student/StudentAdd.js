import React, { Component, Fragment } from 'react'

import { FormControl, Container, Nav, Tab, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import ReactModal from '../../../components/ReactModal'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


import { connect } from 'react-redux'
import { addStudentGpax, addStudent } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'



const AddGpax = ({ submit, selectFile, year }) => (
    <Fragment>
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>

                    <FormControl id="educationYear" as="select" placeholder="ระบุปีการศึกษา" required >
                        <option value='0'>กรุณาเลือกปีการศึกษา</option>
                        {
                            year.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </FormControl>

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
            <Button type="reset" className="btn-EditData interval-1" >RESET</Button>
            <Button type="submit" className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)

const AddStudent = ({submit, selectFile, year}) => (
    <Fragment>
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>
                <FormControl id="educationYear" as="select" placeholder="ระบุปีการศึกษา" required >
                        <option value='0'>กรุณาเลือกปีการศึกษา</option>
                        {
                            year.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                            
                        } 
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
                <FormControl type="file" accept=".excel,.xlsx,.csv" onChange={event => selectFile(event)}>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button  type="reset" className="btn-EditData interval-1" >RESET</Button>
            <Button  type="submit" className="btn-info interval-1" >SUBMIT</Button>
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

        let data = {
            educationYear :  element.educationYear.value,
            upload  :  this.state.selectedFile
        }
        this.props.addStudent(data)
    }

    handleStudentSubmit = event => {
        event.preventDefault()
        let element = event.target.elements

        let form = new FormData()
        form.append('educationYear', element.educationYear.value)
        form.append('upload', this.state.selectedFile)
        this.props.addStudentGpax(form)
    }

    handleSelectFile = event => {
        let file = event.target.files[0]
        this.setState({
            selectedFile: file
        })
    }



    render() {

        let { yearList } = this.props.student
        let { departmentList } = this.props.information
        let key = departmentList !== null && departmentList[0]['dept_id']
        // console.log("key")
        // console.log(key)
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
        information: state.admin_information
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

