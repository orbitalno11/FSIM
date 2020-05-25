import React, { Component, Fragment } from "react";

import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'
import { Divider } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faUserTie, faFileAlt, faHiking } from '@fortawesome/free-solid-svg-icons'

// image resource
import KMUTT from '../../img/slide1.JPG'

// chart
import PieChart from '../../components/Graph/Pie'
import Bar from '../../components/Graph/Bar'


import { setupPieChart, setupStackBarChart } from '../../components/Graph/GraphController'

// axios
import axios from 'axios'

// redux
import { connect } from 'react-redux'
import { Link } from "react-router-dom";


class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amountStudent: [],
            statusStudent: [],
            alumniWork: [],
            amountStudentStatus: [],
            amountWorkingStatus: [],
            amountAdmissionStudent: [],
            amountStudentPie: "",
            user: props.user
        }
    }

    fetchAmountStudent = async () => {
        await axios.get('/student/department')
            .then(res => {
                let recieve = res.data
                if (recieve.response === true) {
                    this.setState({
                        amountStudent: recieve.data.branch[0],
                        statusStudent: recieve.data.df_status_by_branch[0]
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    fetchAmountAlumni = async () => {
        await axios.get('/alumni/analyze/work')
            .then(res => {
                let recieve = res.data
                if (recieve.response === true) {
                    this.setState({
                        alumniWork: recieve.data.count_by_status
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    setUpAmountStudentChart = () => {
        let { amountStudent, statusStudent, alumniWork } = this.state
        this.setState({
            amountStudentPie: setupPieChart(amountStudent),
            amountStudentStatus: setupStackBarChart(statusStudent),
            amountWorkingStatus: setupPieChart(alumniWork)
        })
    }

    async componentDidMount() {
        await this.fetchAmountStudent()
        await this.fetchAmountAlumni()
        this.setUpAmountStudentChart()
    }

    render() {
        let { amountStudentPie, amountStudentStatus, amountWorkingStatus, amountStudent, statusStudent, alumniWork } = this.state

        return (
            <Fragment>
                <Image src={KMUTT} alt="KMUTT" fluid />
                <Container  className="mt-5">
                    <Row >
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/student">
                                <div className="fs-btn-circle-admin mx-auto">
                                    <FontAwesomeIcon icon={faUserTie} size="5x" />
                                </div>
                                <label>ข้อมูลนักศึกษาปัจจุบัน</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/admission">
                                <div className="fs-btn-circle-admin mx-auto">
                                    <FontAwesomeIcon icon={faFileAlt} size="5x" />
                                </div>
                                <label>ข้อมูลการรับนักศึกษา</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/activity">
                                <div className="fs-btn-circle-admin mx-auto">
                                    <FontAwesomeIcon icon={faHiking} size="5x" />
                                </div>
                                <label>ข้อมูลกิจกรรม</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/alumni">
                                <div className="fs-btn-circle-admin mx-auto">
                                    <FontAwesomeIcon icon={faGraduationCap} size="5x" />
                                </div>
                                <label>ข้อมูลศิษย์เก่า</label>
                            </Link>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="fs-cd-hm-admin">
                                <Card.Title className="fs-cd-hd-admin">
                                    <strong>จำนวนนักศึกษาในคณะวิทยาศาสตร์</strong>
                                </Card.Title>
                                <div style={{ textAlign: 'center', height: '100%' }}>
                                    {
                                        amountStudent.length !== 0 ? <PieChart data={amountStudentPie} /> : <h2 className="text-center">ไม่พบข้อมูล</h2>
                                    }
                                </div>
                                <Button variant="secondary" to='/admin/student' as={Link}>ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="fs-cd-hm-admin">
                                <Card.Title className="fs-cd-hd-admin">
                                    <strong>อัตราการมีงานทำของศิษย์เก่า</strong>
                                </Card.Title>
                                <div style={{ textAlign: 'center', height: '100%' }}>
                                    {
                                        alumniWork.length !== 0 ? <PieChart data={amountWorkingStatus} /> : <h2 className="text-center" text-align="center" >ไม่พบข้อมูล</h2>
                                    }

                                </div>

                                <Button variant="secondary" to='/admin/alumni' as={Link}>ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={12} className="my-2">
                            <Card className="fs-cd-hm-admin">
                                <Card.Title className="fs-cd-hd-admin">
                                    <strong>สถานะทางการศึกษาของนักศึกษาในคณะวิทยาศาสตร์</strong>
                                </Card.Title>
                                <div style={{ textAlign: 'center', height: '100%' }}>
                                    {
                                        statusStudent.length !== 0 ? <Bar data={amountStudentStatus} /> : <h2 className="text-center">ไม่พบข้อมูล</h2>
                                    }
                                </div>
                                <Button variant="secondary" to='/admin/student' as={Link}>ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth
})

export default connect(mapStateToProps)(AdminHome)