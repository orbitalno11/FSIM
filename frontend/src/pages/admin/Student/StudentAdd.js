import React, { Component, Fragment } from 'react'

import { FormControl,Container, Nav, Tab, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'


import { connect } from 'react-redux'
import { selectYear, addStudent } from '../../../redux/action/adminStudentAction'

//
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 
// import TabDialog from '../../../components/TabDialog'
// import ARDetail from "../Activity/ARDetail";
// import AMSci from "../Activity/AMSci";

// 
// import LineChart from '../../../components/Graph/Line'

const AddTab = ({submit , selectFile , selectYear}) => (
    <Fragment>
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกปีการศึกษา</option>
                        <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" required >
                        {/* {
                                selectYear.map((item, index) => (
                                    <option key={index} value={item['year']}>{item['year']}</option>
                                ))
                            } */}
                        </Form.Control>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลเกรด
                </Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".excel,.xlsx,.csv"  onChange={event => selectFile(event)}>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button type="reset" className="btn-EditData interval-1" >RESET</Button>
            <Button  type="submit" className="btn-info interval-1" >SUBMIT</Button>
           
        </Form>
    </Fragment>
)

const AddNew = () => (
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

class StudentAdd extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: '1',
            selectedFile: null
        }
    }

    // componentDidMount() {
    //     this.addStudent()
    // }

  

    render() {
        let { selectYear } = this.props.student
        let { tabKey } = this.state

        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    {/* <h1 className="admin-page-header">ข้อมูลภาควิชา</h1>
                    <hr className="yellow-hr" /> */}
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="1" className="sub-nav" >เพิ่มข้อมูลเกรด</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2" className="sub-nav" >เพิ่มข้อมูลนักศึกษาปัจจุบัน</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        
                                        <Tab.Pane eventKey="1">
                                            <AddTab />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                           <AddNew/>
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
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        addStudent: (data) => dispatch(addStudent(data)),
        selectYear: (year) => dispatch(selectYear(year))
        
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd) 

