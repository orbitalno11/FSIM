import React, {Component, Fragment} from "react";

import axios from 'axios'

// import graph data control
import * as graphController from '../../components/Graph/GraphController'

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

// import bgyel from "../img/bg-head3.png";
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummaryAlumni extends Component {
    
    constructor(props) {
        super(props)
        let year = new Date()
        year = year.getFullYear() + 543
        this.state = {
            branch: null,
            year: year - 3,
            salaryBranch: null,
            branchStudentChart: null,
            workChart: null,
            trainingChart: null,
            gpaChart: null
        }
    }

    componentDidMount() {
        this.fetchBranch()
        this.fetchWorkData()
    }

    fetchBranch = () => {
    }

    fetchWorkData = () => {
        let { year } = this.state

        axios.get(`/alumni/analyze/work?year=${year}`)
        .then(res => {
            let recieved_data = res.data.data[0]

            if (recieved_data['count_by_branch'] == null) return
            let branchData = recieved_data['count_by_branch']
            let workStatus = recieved_data['count_by_status']
            let trainingData = recieved_data['count_by_training']
            let gpaChart = recieved_data['gpax_by_branch']
            // let branchKey = Object.keys(branchData)
            // let branchStudent = []

            // branchKey.forEach( key => {
            //     let branch = {
            //         name: key,
            //         number: branchData[key]
            //     }
            //     branchStudent.push(branch)
            // })

            this.setState({
                branchStudentChart: graphController.setupPieChart(branchData),
                workChart: graphController.setupPieChart(workStatus),
                trainingChart: graphController.setupPieChart(trainingData),
                gpaChart: graphController.setupNoneStackBarChart(gpaChart)
            })

            console.log(recieved_data)
        })
        .catch(err => {
            console.error(err)
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
        let {branch_list} = this.props

        let { branchStudentChart, workChart, trainingChart, gpaChart } = this.state

        return (
            <Fragment>
                {/* <Image size="big" className="head-right" src={bgyel}/> */}
                <Container>
                    <Header as="h5" align = 'center'>
                        ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา{" "}
                        <Dropdown
                            options={[
                                {key: "2560", value: "2560", text: "2560"},
                                {key: "2561", value: "2561", text: "2561"}
                            ]}
                            placeholder="Select"
                            selection
                        />
                    </Header>
                    <Divider/>
                    <Grid>
                        <Grid.Row>
                            <Card fluid={true}>
                                {/* { branchStudent !== null && <AlumniTypePanel data={branchStudent} />} */}
                            </Card>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนศิษย์เก่าแยกตามสาขา
                                        </Card.Header>
                                    <Card.Content>
                                        { branchStudentChart !== null && <GraphPie data={branchStudentChart} />}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนภาวะการทำงานของศิษย์เก่า
                                        </Card.Header>
                                        <Card.Content>
                                        { workChart !== null && <GraphPie data={workChart} />}
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <br/>
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนนักศึกษที่เข้าร่วมฝึกงาน
                                        </Card.Header>
                                        <Card.Content>
                                        { trainingChart !== null && <GraphPie data={trainingChart} />}
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                        กราฟแสดงเกรดเฉลี่ยตลอดหลักสูตร
                                    </Card.Header>
                                    <Card.Content>
                                    { gpaChart !== null && <GraphBar data={gpaChart} />}
                                    </Card.Content>
                                   
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงช่วงเงินเดือนของศิษย์เก่า
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                            
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงลักษณะงานต่างๆที่นักศึกษาเข้าทำงาน
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                            
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงมหาลัยที่นักศึกษาเลือกศึกษาต่อ
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphPie/>
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

export default  SummaryAlumni