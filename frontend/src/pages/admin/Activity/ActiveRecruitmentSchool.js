import React, { Component, Fragment } from 'react'

import {
    Grid,
    Container,
    Card
} from "semantic-ui-react";

import { Bar } from 'react-chartjs-2';


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
        console.log(numberBySchool)
        return (
            <Fragment>
                <Container>
                    <Grid>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-circle-modal">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักเรียนที่เข้าศึกษาจากแต่ละโรงเรียน
                                        </Card.Header>
                                    <Card.Content>
                                        {
                                            numberBySchool !== null ? <Bar data={numberBySchool} /> : <h1>ไม่พบข้อมูล</h1>
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-circle-modal">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากแต่ละโรงเรียน
                                        </Card.Header>
                                    <Card.Content>
                                        {
                                            gpaBySchool !== null ? <Bar data={gpaBySchool} /> : <h1>ไม่พบข้อมูล</h1>
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