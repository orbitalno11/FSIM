import React, { Component, Fragment } from "react";

import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'

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

        axios.get('/admin/information')
        .then(res => {
            let recieved_data = res.data.data

            console.log(res)
        })
        .catch(err => {

        })
    }

    render() {
        let { user, amountStudentPie, amountStudentStatus, amountWorkingStatus } = this.state
        return (
            <Fragment>
                <Image src={KMUTT} alt="KMUTT" fluid />
                <Container fluid className="mt-5 mx-2">
                    <Row>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/student">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faUserTie} size="5x" />
                                </div>
                                <label>ข้อมูลนักศึกษาปัจจุบัน</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/admission">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faFileAlt} size="5x" />
                                </div>
                                <label>ข้อมูลการรับนักศึกษา</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/activity">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faHiking} size="5x" />
                                </div>
                                <label>ข้อมูลกิจกรรม</label>
                            </Link>
                        </Col>
                        <Col xs={6} lg={3} className="text-center">
                            <Link to="/admin/alumni">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faGraduationCap} size="5x" />
                                </div>
                                <label>ข้อมูลศิษย์เก่า</label>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <Container className="mb-5">
                    <Row>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>จำนวนนักศึกษาในคณะวิทยาศาสตร์</strong>
                                </Card.Title>
                                <PieChart data={amountStudentPie} />
                                <Button variant="secondary" to='/admin/student' as={Link}>ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>อัตราการมีงานทำของศิษย์เก่า</strong>
                                </Card.Title>
                                <PieChart data={amountWorkingStatus} />
                                <Button variant="secondary" to='/admin/alumni' as={Link}>ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={12} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>สถานะทางการศึกษาของนักศึกษาในคณะวิทยาศาสตร์</strong>
                                </Card.Title>
                                <Bar data={amountStudentStatus} />
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