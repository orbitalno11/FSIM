import React, { Component, Fragment } from 'react'

import {
    Grid,
    Container,
    Card
} from "semantic-ui-react";

import { Bar } from 'react-chartjs-2';

import { labelTopOfChart } from '../../../Constant'

const options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                min: 0,
                max: 4,
                stepSize: 0.2
            }
        }]
    },
    ...labelTopOfChart
};



class ARSchool extends Component {

    constructor(props) {
        super(props)

        this.state = {
            numberBySchool: props.number || null,
            gpaBySchool: props.gpa || null
        }
    }

    render() {
        let { numberBySchool, gpaBySchool } = this.state
        return (
            <Fragment>
                <Container>
                    <Grid>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักเรียนที่เข้าศึกษาจากแต่ละโรงเรียน
                                        </Card.Header>
                                    <Card.Content>
                                        {
                                            numberBySchool !== null ? <Bar data={numberBySchool} legend={{ display: false }} options={labelTopOfChart} /> : <h1>ไม่พบข้อมูล</h1>
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากแต่ละโรงเรียน
                                        </Card.Header>
                                    <Card.Content>
                                        {
                                            gpaBySchool !== null ? <Bar data={gpaBySchool} legend={{ display: false }} options={options} /> : <h1>ไม่พบข้อมูล</h1>
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

export default ARSchool