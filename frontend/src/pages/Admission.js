import React, { Component, Fragment } from "react";

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    Image
} from "semantic-ui-react";

// redux
import { connect } from 'react-redux'

import { setupPieChart, setupNoneStackBarChart, setupStackBarChart } from '../components/Graph/GraphController';
import { Bar, Pie } from "react-chartjs-2";

import bgyel from "../img/bg-head3.png";
import GraphLine from "../components/Graph/Line";
import GraphBar from "../components/Graph/Bar";
import AdmissionTypePanel from "../components/AddmissionTypePanel";
import Axios from "axios";

class Admission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: 2560,
            yearList: [2560, 2561, 2562, 2563],
            branch: props.branch_list,
            countChannel: null,
            countSchool: null,
            compareYear: null
        }
    }

    componentDidMount() {
        this.getCountChannel()
    }

    fetchBranch = () => {

    }

    getCountChannel = () => {
        let { year } = this.state
        Axios.get(`/admission/analyze`)
            .then(res => {
                let data = res.data.data

                let countChannel = data['count_channel']
                let countSchool = data['count_by_school']
                let compareYear = data['compare_year']
                // console.log(countChannel)

                this.setState({
                    countChannel: setupNoneStackBarChart(countChannel),
                    countSchool: setupStackBarChart(countSchool),
                    compareYear: setupNoneStackBarChart(compareYear)

                })
                // console.log(this.state.countChannel)
            })
            .catch(error => {
                console.error(error)
            })
    }


    setUpDropDown = branch => {
        let options = []
        for (const item in branch) {
            let b = {
                key: branch[item].branch_id,
                value: branch[item].branch_id,
                text: branch[item].branch_name
            }
            options.push(b)
        }
        return options.sort()
    }

    render() {
        let { year, yearList, branch_list, countChannel, countSchool, compareYear } = this.state
        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel} />
                <Container>
                    <Header as="h5" textAlign="center">
                        ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา
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
                            <Card fluid={true}>
                                <AdmissionTypePanel />
                            </Card>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                                        2560
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countChannel !== null && (
                                                <Bar data={countChannel} legend={{ display: false }} />
                                            )
                                        }

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี 2560
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา 2560
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                                        2560 และ 2561
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            compareYear !== null && (
                                                <Bar data={compareYear} legend={{ display: false }} />
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


export default Admission