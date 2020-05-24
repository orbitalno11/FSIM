import React, { Component, Fragment } from 'react'

import { FormControl, Container, Button, Form, InputGroup } from 'react-bootstrap'

import SideTab from '../../../components/SideTabDialog'

import ReactModal from '../../../components/ReactModal'

import { AddActivityData, UploadPaticipant } from './ActivityAddComponent'

import axios from 'axios'

import { connect } from 'react-redux'
import { addProject, addActivity, uploadParticipant } from '../../../redux/action/adminActivityAction'

const AddProject = ({ project_type, onSubmit }) => (
    <Fragment>
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>
                    รหัสโครงการ (ไม่เกิน 10 ตัวอักษร)
                </Form.Label>
                <InputGroup>
                    <Form.Control id="project_id" type="text" placeholder="กรุณาใส่รหัสโครงการ" maxLength="10" required />
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

        this.props.addActivity(form)
    }

    handleUpload = event => {
        event.preventDefault()
        let element = event.target.elements
        let data = JSON.parse(element.activityDetail.value)
        let form = new FormData()

        form.append('activity_id', data['activity_id'])
        form.append('project_id', data['project_id'])
        form.append('project_type', data['project_type'])
        form.append('year', data['education_year'])
        form.append('upload', this.state.selectedFile)

        console.log(data)

        this.props.uploadParticipant(form)
    }

    handleSelectFile = event => {
        let file = event.target.files[0]
        this.setState({
            selectedFile: file
        })
    }


    render() {
        let { project_type } = this.state
        
        let tabDetail = null

        let tabName = [
            {
                tabId: '1',
                tabTitle: 'สร้างโครงการใหม่'
            },
            {
                tabId: '2',
                tabTitle: 'สร้างกิจกรรมใหม่'
            },
            {
                tabId: '3',
                tabTitle: 'เพิ่มข้อมูลผู้เข้าร่วมกิจกรรม'
            }
        ]

        if (project_type !== null) {
            tabDetail = [
                {
                    tabId: '1',
                    tabDetail: <AddProject project_type={project_type} onSubmit={this.handleProjectSubmit} />
                },
                {
                    tabId: '2',
                    tabDetail: <AddActivityData submit={this.handleActivitySubmit} />
                },
                {
                    tabId: '3',
                    tabDetail: <UploadPaticipant submit={this.handleUpload} selectFile={this.handleSelectFile} />
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
        addActivity: (data) => dispatch(addActivity(data)),
        uploadParticipant: (data) => dispatch(uploadParticipant(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity) 