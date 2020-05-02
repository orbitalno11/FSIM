import React, {Component, Fragment} from "react";

import axios from 'axios'

// import graph data control
import * as graphController from '../../../components/Graph/GraphController'

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
import GraphPie from "../../../components/Graph/Pie";
import GraphBar from "../../../components/Graph/Bar";
import { Bar } from 'react-chartjs-2';
import AlumniTypePanel from "../../../components/AlumniTypePanel";


class AlumniSummary extends Component {
    
    constructor(props) {
        super(props)
        let year = new Date()
        year = year.getFullYear() + 543
        this.state = {
            branch: null,
            year: year - 3,
            salaryBranch: null,
            salaryData: null,
            salarySelect: null,
            branchStudentChart: null,
            workChart: null,
            trainingChart: null,
            gpaChart: null,
            salaryChart: null
        }
    }

    async componentDidMount() {
        await this.fetchBranch()
        this.fetchWorkData()
    }

    fetchBranch = async () => {
        await axios.get('/branch')
        .then(res => {
            let data = res.data.data
            this.setState({
                branch: data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    fetchWorkData = () => {
        let { year } = this.state

        axios.get(`/alumni/analyze/work?year=${year}`)
        .then(res => {
            let recieved_data = res.data.data

            console.log(recieved_data)

            if (recieved_data['count_by_branch'] == null) return
            let branchData = recieved_data['count_by_branch']
            let workStatus = recieved_data['count_by_status']
            let trainingData = recieved_data['count_by_training']
            let gpaChart = recieved_data['gpax_by_branch']
            let salaryData = recieved_data['salary_all_branch_training']
            let salaryChart = salaryData['all']['salary_all_branch_training']

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
                gpaChart: graphController.setupNoneStackBarChart(gpaChart),
                salaryData: salaryData,
                salaryChart: graphController.setupNoneStackBarChart(salaryChart, null, true)
            })

        })
        .catch(err => {
            console.error(err)
        })
    }

    setupBranchSelect = () => {
        let { branch } = this.state
        let options = []
        let first = {
            key: "0all",
            value: "all",
            text: "ทุกสาขาวิชา"
        }
        options.push(first)
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

    handleSalarySelect = event => {
        let value = event.target.value
        let { salaryData } = this.state
        this.setState({
            salaryChart: graphController.setupNoneStackBarChart(salaryData[value]['salary_all_branch_training'], null, true)
        })
    }

    render() {
        let {branch_list} = this.props

        let {branch, branchStudentChart, workChart, trainingChart, gpaChart, salaryChart } = this.state

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
                                    { gpaChart !== null && <GraphBar data={gpaChart} legend={ {display: false} } />}
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
                                        <select className="form-control" onChange={this.handleSalarySelect}>
                                            <option value="all">ทุกสาขาวิชา</option>
                                            {
                                                branch !== null && (
                                                    branch.map((item, index) => (
                                                        <option key={index} value={item['branch_id']}>{item['branch_name']}</option>
                                                        ))
                                                )
                                            }
                                        </select>
                                    </Card.Header>

                                    <Card.Content>
                                    
                                    { salaryChart !== null && <Bar data={salaryChart} legend={ {display: true}  } />}
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
                                            options={this.setupBranchSelect()}
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
                                            options={this.setupBranchSelect()}
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

export default  AlumniSummary