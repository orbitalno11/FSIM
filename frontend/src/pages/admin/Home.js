import React, { Component, Fragment } from "react";

import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faUserTie, faFileAlt, faHiking } from '@fortawesome/free-solid-svg-icons'


// image resource
import KMUTT from '../../img/slide1.JPG'

// chart
import PieChart from '../../components/Graph/Pie'
import Linechart from '../../components/Graph/Line'

// axios
import axios from 'axios'

// color
import { colorSet } from '../../Constant'

// redux
import { connect } from 'react-redux'
import { Link } from "react-router-dom";


class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amountStudent: [],
            amountStudentStatus: [],
            amountWorkingStatus: [],
            amountAdmissionStudent: [],
            amountStudentPie: "",
            user: props.user
        }
    }

    fetchAmountStudent = async () => {
        await axios.get('/department')
            .then(res => {
                let recieve = res.data
                if (recieve.response === true) {
                    this.setState({
                        amountStudent: recieve.data
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    setUpAmountStudentChart = () => {
        let { amountStudent } = this.state
        let label = []
        let amount = []
        let background = []
        let hoverColor = []
        for (let index in amountStudent) {
            let b_temp = amountStudent[index]['branch']
            for (let j in b_temp) {
                label.push(b_temp[j].branch_name)
                amount.push(b_temp[j].amount_student)
            }
        }

        for (let i in label) {
            background.push(colorSet[i])
            hoverColor.push(colorSet[i] + "75")
        }

        this.setState({
            amountStudentPie: {
                labels: label,
                datasets: [
                    {
                        data: amount,
                        backgroundColor: background,
                        hoverBackgroundColor: hoverColor
                    }
                ]
            }
        })
    }

    async componentDidMount() {
        await this.fetchAmountStudent()
        this.setUpAmountStudentChart()
    }

    render() {
        let { user, amountStudentPie } = this.state
        return (
            <Fragment>
                <Image src={KMUTT} alt="KMUTT" fluid />
                <Container fluid className="mt-5 mx-2">
                    <Row>
                        <Col sm={6} lg={3} className="text-center">
                            <Link to="/admin/student">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faUserTie} size="5x" />
                                </div>
                                <label>ข้อมูลนักศึกษาปัจจุบัน</label>
                            </Link>
                        </Col>
                        <Col sm={6} lg={3} className="text-center">
                            <Link to="/admin/admission">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faFileAlt} size="5x" />
                                </div>
                                <label>ข้อมูลการรับนักศึกษา</label>
                            </Link>
                        </Col>
                        <Col sm={6} lg={3} className="text-center">
                            <Link to="/admin/activity">
                                <div className="circle mx-auto">
                                    <FontAwesomeIcon icon={faHiking} size="5x" />
                                </div>
                                <label>ข้อมูลกิจกรรม</label>
                            </Link>
                        </Col>
                        <Col sm={6} lg={3} className="text-center">
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
                                <Button variant="secondary">ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>สถานะทางการศึกษาของนักศึกษาในคณะวิทยาศาสตร์</strong>
                                </Card.Title>
                                <PieChart data={amountStudentPie} />
                                <Button variant="secondary">ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>จำนวนการรับนักศึกษาจากโครงการต่าง ๆ 5 ปีย้อนหลัง</strong>
                                </Card.Title>
                                <Linechart />
                                <Button variant="secondary">ดูเพิ่มเติม</Button>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card className="admin-home-card">
                                <Card.Title className="card-header">
                                    <strong>อัตราการมีงานทำของศิษย์เก่า</strong>
                                </Card.Title>
                                <PieChart data={amountStudentPie} />
                                <Button variant="secondary">ดูเพิ่มเติม</Button>
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