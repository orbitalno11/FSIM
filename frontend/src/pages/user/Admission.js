import React, { Component, Fragment } from "react";

import {
    Header,
    Divider,
    Grid,
    Card,
    Container,
} from "semantic-ui-react";


import Barchart from "../../components/Graph/Bar";
import { setupNoneStackBarChart, setupStackBarChart } from '../../components/Graph/GraphController';
import { Bar} from "react-chartjs-2";

import YearSelect from '../../components/YearSelect'

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
            compareYear: null,
            countStatus: [],
            countGrade: []
        }
    }

    componentDidMount() {
        this.getCountChannel()
        // this.setupGraph()
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
                let compareYear = data['compare_year'][0]
                let countStatus = data['count_by_status'][0]
                let countGrade = data['count_by_branch'][0]


                this.setState({
                    countChannel: setupNoneStackBarChart(countChannel),
                    countSchool: setupStackBarChart(countSchool),
                    compareYear: setupStackBarChart(compareYear),
                    countStatus: setupStackBarChart(countStatus),
                    countGrade: setupStackBarChart(countGrade)

                })
                console.log(this.state.countChannel)
            })
            .catch(error => {
                console.error(error)
                this.setState({
                    loadTime: 1
                })
            })
    }

    // setUpDropDown = branch => {
    //     let options = []
    //     for (const item in branch) {
    //         let b = {
    //             key: branch[item].branch_id,
    //             value: branch[item].branch_id,
    //             text: branch[item].branch_name
    //         }
    //         options.push(b)
    //     }
    //     return options.sort()
    // }

    render() {
        let { year, yearList, countChannel, countSchool, compareYear, countStatus, countGrade } = this.state
        return (
            <Fragment>
                <Container className="white-background">
                    {
                        yearList !== null && (
                            <YearSelect yearList={yearList} selectedYear={yearList} title="ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา" />
                        )
                    }
                    <Grid textAlign="center">
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
                                                <Barchart data={countChannel}  />
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
                                        <Barchart data={countStatus} />
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
                                        <Barchart data={countGrade} legend={{ display: false }} />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดง 5 อันดับโรงเรียน 2560
                                    </Card.Header>
                                    <Card.Content>
                                    {
                                            countSchool !== null && (
                                                <Bar data={countSchool} legend={{ display: true }}  />
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
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                                        2560 และ 2561
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            compareYear !== null && (
                                                <Barchart data={compareYear} />
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