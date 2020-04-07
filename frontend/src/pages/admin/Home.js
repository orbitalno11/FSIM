import React, { Component, Fragment } from "react";

import { Container, Row, Col, Card, Image } from 'react-bootstrap'

// image resource
import KMUTT from '../../img/slide1.JPG'

// chart
import PieChart from '../../components/Graph/Pie'

// axios
import axios from 'axios'

// color
import {colorSet} from '../../Constant'


class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amountStudent: [],
            amountStudentStatus: [],
            amountWorkingStatus: [],
            amountAdmissionStudent: [],
            amountStudentPie: ""
        }
    }

    fetchAmountStudent = async () => {
        await axios.get('/department')
            .then(res => {
                let recieve = res.data
                if(recieve.response === true){
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
        let { amountStudent } =this.state
        let label = []
        let amount = []
        let background = []
        let hoverColor = []
        for (let index in amountStudent) {
            let b_temp = amountStudent[index]['branch']
            for(let j in b_temp){
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

    async componentDidMount(){
        await this.fetchAmountStudent()
        this.setUpAmountStudentChart()
    }

    render() {
        let { amountStudentPie } = this.state

        return (
            <Fragment>
                <Image src={KMUTT} alt="KMUTT" fluid />
                <Container>
                    <Row>
                        <Col sm={12} lg={6} className="my-2">
                            <Card>
                                <Card.Title>
                                    จำนวนนักศึกษาในคณะวิทยาศาสตร์ มจธ.
                                </Card.Title>
                                <PieChart data={amountStudentPie} />
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card>
                                <Card.Title>
                                    สถานะทางการศึกษาของนักศึกษาในคณะวิทยาศาสตร์ มจธ.
                                </Card.Title>
                                <PieChart />
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card>
                                <Card.Title>
                                    จำนวนการรับนักศึกษาจากโครงการต่าง ๆ ปีการศึกษา XXXX
                                </Card.Title>
                                <PieChart />
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card>
                                <Card.Title>
                                    อัตราการมีงานทำของศิษย์เก่า
                                </Card.Title>
                                <PieChart />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default AdminHome