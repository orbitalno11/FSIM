import React, { Component, Fragment } from 'react'

import { FormControl, Container, Nav, Tab, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'

import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import ReactModal from '../../../components/ReactModal'

import axios from 'axios'

import { connect } from 'react-redux'
import { addProject, addActivity } from '../../../redux/action/adminActivityAction'

const AddActivityData = ({ submit, project_list, selectFile }) => {
    return (
        <Fragment>
            <Form onSubmit={submit}>
                <Form.Group>
                    <Form.Label>ปีการศึกษา</Form.Label>
                    <InputGroup>
                        <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ประเภทโครงการ
                </Form.Label>
                    <InputGroup>
                        <FormControl id="projectId" as="select" required>
                            <option>กรุณาเลือกประเภทโครงการ</option>
                            {
                                project_list.map((item, index) => (
                                    <option key={index} value={item['project_id']}>{item['project_name']}</option>
                                ))
                            }
                        </FormControl>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        รหัสกิจกรรม (ไม่เกิน 5 ตัวอักษร)
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityId" type="text" placeholder="กรุณาใส่รหัสกิจกรรม" maxLength="5" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ชื่อกิจกรรม
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityName" type="text" placeholder="กรุณาใส่ชื่อกิจกรรม" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        งบประมาณ
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityBudget" type="number" step="0.01" placeholder="กรุณาใส่งบประมาณ" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ไฟล์รายชื่อผู้เข้าร่วมกิจกรรม
                </Form.Label>
                    <InputGroup>
                        <FormControl id="file" type="file" accept=".xlsx, .xls" onChange={event => selectFile(event)}>
                        </FormControl>
                    </InputGroup>
                </Form.Group>
                <Button type="reset" className="btn-EditData interval-1" >RESET</Button>
                <Button type="submit" className="btn-info interval-1" >SUBMIT</Button>
            </Form>
        </Fragment>
    )
}

const AddProject = ({ project_type, onSubmit }) => (
    <Fragment>
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>
                    รหัสโครงการ (ไม่เกิน 4 ตัวอักษร)
                </Form.Label>
                <InputGroup>
                    <Form.Control id="project_id" type="text" placeholder="กรุณาใส่รหัสโครงการ" maxLength="4" required />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ชื่อโครงการ
                </Form.Label>
                <InputGroup>
                    <Form.Control id="project_name" type="text" placeholder="กรุณาใส่ชื่อโครงการ" required />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ประเภทโครงการ
                </Form.Label>
                <InputGroup>
                    <FormControl id="project_type" as="select" required>
                        <option>กรุณาเลือกประเภทโครงการ</option>
                        {
                            project_type.map((item, index) => (
                                <option key={index} value={item['project_type']}>{item['type_name']}</option>
                            ))
                        }
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button typr="reset" className="btn-EditData interval-1" >RESET</Button>
            <Button type="submit" className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)

class AddActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            project_type: null,
            tabKey: '1',
            selectedFile: null
        }
    }

    componentDidMount() {
        this.getProjectType()
    }

    getProjectType = () => {
        axios.get('/admin/activity/project/type')
            .then(res => {
                let data = res.data.data

                if (data.length < 1) return

                this.setState({
                    project_type: data
                })
            })
            .then(err => {
                console.error(err)
            })
    }

    handleProjectSubmit = event => {
        event.preventDefault()
        let element = event.target.elements

        let data = {
            project_id: element.project_id.value,
            project_name: element.project_name.value,
            project_type: parseInt(element.project_type.value)
        }

        this.props.addProject(data)
    }

    handleActivitySubmit = event => {
        event.preventDefault()
        let element = event.target.elements

        let form = new FormData()
        form.append('activity_id', `${element.projectId.value}_${element.activityId.value}`)
        form.append('project_id', element.projectId.value)
        form.append('activity_name', element.activityName.value)
        form.append('budget', parseFloat(element.activityBudget.value))
        form.append('year', parseInt(element.educationYear.value))
        form.append('upload', this.state.selectedFile)

        this.props.addActivity(form)
    }

    handleSelectFile = event => {
        let file = event.target.files[0]
        this.setState({
            selectedFile: file
        })
    }


    render() {
        let { tabKey, project_type } = this.state

        let { projectList } = this.props.activity

        let tabDetail = null

        let tabName = [
            {
                tabId: '1',
                tabTitle: 'กิจกรรม'
            },
            {
                tabId: '2',
                tabTitle: 'โครงการใหม่'
            }
        ]

        if (projectList !== null && project_type !== null) {
            tabDetail = [
                {
                    tabId: '1',
                    tabDetail: <AddActivityData project_list={projectList} submit={this.handleActivitySubmit} selectFile={this.handleSelectFile} />
                },
                {
                    tabId: '2',
                    tabDetail: <AddProject project_type={project_type} onSubmit={this.handleProjectSubmit} />
                }
            ]
        }

        return (
            <Fragment>
                <ReactModal />
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        {
                            tabDetail !== null && (
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
        activity: state.admin_activity
    }
)

const mapDispatchToProps = dispatch => (
    {
        addProject: (data) => dispatch(addProject(data)),
        addActivity: (data) => dispatch(addActivity(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity) 