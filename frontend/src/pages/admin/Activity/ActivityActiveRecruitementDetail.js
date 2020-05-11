import React, { Component, Fragment } from 'react'

import {
    Grid,
    Container,
    Card,

} from "semantic-ui-react";

import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import { Bar } from 'react-chartjs-2';


class ActiveRecruitment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project_id: props.data['project_id'] || null,
            project_name: props.data['project_name'] || null,
            dataByBranch: setupNoneStackBarChart(props.dataByBranch) || null,
            dataByGPAX: setupNoneStackBarChart(props.dataByGPAX) || null
        }
    }

    render() {

        let { project_name, dataByBranch, dataByGPAX } = this.state

        return (
            <Fragment>
                <Container>
                    <Grid>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักเรียนแต่ละสาขาที่รับเข้ามาจากโครงการ {project_name} แต่ละสาขา
                                        </Card.Header>
                                    <Card.Content>
                                        {
                                            dataByBranch !== null && (
                                                <Bar data={dataByBranch} legend={{display: false}} />
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากโครงกการ {project_name} แต่ละสาขา
                                        </Card.Header>
                                    <Card.Content>
                                    {
                                            dataByGPAX !== null && (
                                                <Bar data={dataByGPAX} legend={{display: false}} />
                                            )
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

export default ActiveRecruitment