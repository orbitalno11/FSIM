import React, { Component, Fragment } from "react";

import {
    Header,
    Divider,
    Grid,
    Card,
    Container,
    Table
} from "semantic-ui-react";

import axios from 'axios'


import GraphBar from "../../../components/Graph/Bar";

import { setupPieChart, setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import { Bar, Pie } from "react-chartjs-2";


class ActivitySummary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2563,
            yearList: [2560, 2561],
            activityList: null,
            joinByActivity: null,
            compareByPreviousYear: null
        }
    }

    componentDidMount() {
        this.getActivityList()
        this.getJoinNumberByYear()
    }

    getActivityList = () => {
        axios.get('/admin/activity/list?year=' + this.state.year)
            .then(res => {
                let data = res.data.data

                if (data.length < 1) return

                this.setState({
                    activityList: data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    getJoinNumberByYear = () => {
        let { year } = this.state

        axios.get(`/activity/analyze/activity?year=${year}`)
            .then(res => {
                let data = res.data.data

                let joinByActivity = data['activity_count']
                let compareByPreviousYear = data['activity_year_compare']

                this.setState({
                    joinByActivity: setupNoneStackBarChart(joinByActivity),
                    compareByPreviousYear: setupStackBarChart(compareByPreviousYear)
                })

                console.log(this.state.joinByActivity)
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        let { year, yearList, activityList, joinByActivity, compareByPreviousYear } = this.state
        return (
            <Fragment>
                <Container>
                    <Header as="h5" textAlign="center">
                        ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา

                        {
                            <select id="selectYear" defaultValue={year}>
                                {
                                    yearList !== null && yearList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        }

                    </Header>
                    <Divider />
                    <Grid>

                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนที่เข้าร่วมกิจกรรมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            joinByActivity !== null && (
                                                <Bar data={joinByActivity} />
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนคนที่เข้าร่วมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            compareByPreviousYear !== null && (
                                                <Bar data={compareByPreviousYear} />
                                            )
                                        }
                                        <GraphBar />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Header as="h3" align='center'> งบประมาณที่ใช่ในการจัดกิจกรรมแต่ละโครงการ</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ปีการศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ชื่อโครงการ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            งบประมาณที่ใช้
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        activityList !== null && (
                                            activityList.map((item, index) => (
                                                <Table.Row key={index}>
                                                    <Table.Cell textAlign="center">{item['education_year']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['activity_name']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['activity_budget']}</Table.Cell>
                                                </Table.Row>
                                            ))
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>

                </Container>
            </Fragment>
        )
    }
}


export default ActivitySummary