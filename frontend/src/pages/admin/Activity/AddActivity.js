import React, { Component, Fragment } from 'react'

import { FormControl, Container, Nav, Tab, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'

import axios from 'axios'

import { connect } from 'react-redux'
import { addProject, addActivity } from '../../../redux/action/adminActivityAction'

const AddActivityData = ({ project_list, submit }) => (
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
                    รหัสกิจกรรม (ไม่เกิน 10 ตัวอักษร)
                </Form.Label>
                <InputGroup>
                    <Form.Control id="activityId" type="text" placeholder="กรุณาใส่รหัสกิจกรรม" maxLength="10" required />
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
                    ลิงก์ Google Sheet
                </Form.Label>
                <InputGroup>
                    <Form.Control type="text" placeholder="วางลิงก์ Google Sheet" />
                    <Button>ตรวจสอบ</Button>
                </InputGroup>
            </Form.Group>
            <Button type="reset" className="btn-EditData interval-1" >RESET</Button>
            <Button type="submit" className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)

const AddProject = ({ project_type, onSubmit }) => (
    <Fragment>
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>
                    รหัสโครงการ (ไม่เกิน 8 ตัวอักษร)
                </Form.Label>
                <InputGroup>
                    <Form.Control id="project_id" type="text" placeholder="กรุณาใส่รหัสโครงการ" maxLength="8" required />
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
            tabKey: '1'
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

        let data = {
            activity_id: `${element.projectId.value}_${element.activityId.value}`,
            project_id: element.projectId.value,
            activity_name: element.activityName.value,
            activity_budget: parseFloat(element.activityBudget.value),
            year: parseInt(element.educationYear.value)
        }

        this.props.addActivity(data)

        // axios.post('/admin/activity/', data)
        //     .then(res => {
        //         console.log(res.data.data)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })
    }


    render() {
        let { tabKey, project_type } = this.state

        let { projectList } = this.props.activity
        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="1" className="sub-nav" >กิจกรรม</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2" className="sub-nav" >โครงการใหม่</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="1">
                                            {
                                                projectList !== null && (
                                                    <AddActivityData project_list={projectList} submit={this.handleActivitySubmit} />
                                                )
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                            {
                                                project_type !== null && (
                                                    <AddProject project_type={project_type} onSubmit={this.handleProjectSubmit} />
                                                )
                                            }
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
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