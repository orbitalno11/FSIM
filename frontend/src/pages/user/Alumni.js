import React, { Component, Fragment } from "react";

import axios from 'axios'

import {
    Divider,
    Grid,
    Header,
    Container,
    Card
} from "semantic-ui-react";

import { setupStackBarChart, setupPieChart, setupNoneStackBarChart } from '../../components/Graph/GraphController'

import { Bar } from 'react-chartjs-2';
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";

import { connect } from 'react-redux'

import { getAllAlumniYear } from '../../redux/action/adminAlumniAction'
import { startLoading, stopLoading } from '../../redux/action/generalAction'
import { setSelectedYear } from '../../redux/action/adminAlumniAction'

class Alumni extends Component {

    constructor(props) {
        super(props)
        this.state = {
            branch: null,
            salaryBranch: null,
            salaryData: null,
            salarySelect: null,
            branchStudentChart: null,
            workChart: null,
            trainingChart: null,
            gpaChart: null,
            salaryChart: null,
            year: null,
            loadTime: 0

        }
    }

    componentDidUpdate() {
        if (this.state.loadTime === 0) {
            this.fetchWorkData()
        }
    }


    componentDidMount() {
        this.props.loadAllYear()
        this.setState({
            year: this.props.alumni.selectedYear
        })
        this.fetchBranch()
    }

    fetchBranch = () => {
        axios.get('/department/branch')
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
                if (recieved_data['count_by_branch'] == null) {
                    this.setState({
                        branchStudentChart: null,
                        workChart: null,
                        trainingChart: null,
                        gpaChart: null,
                        salaryData: null,
                        salaryChart: null
                    })
                }
                let branchData = recieved_data['count_by_branch']
                let workStatus = recieved_data['count_by_status']
                let trainingData = recieved_data['count_by_training']
                let gpaChart = recieved_data['gpax_by_branch']
                let salaryData = recieved_data['salary_all_branch_training']
                let salaryChart = salaryData['all']['salary_all_branch_training']

                this.setState({
                    branchStudentChart: setupPieChart(branchData),
                    workChart: setupPieChart(workStatus),
                    trainingChart: setupPieChart(trainingData),
                    gpaChart: setupNoneStackBarChart(gpaChart),
                    salaryData: salaryData,
                    salaryChart: setupStackBarChart(this.reorderSalary(salaryChart)),
                    loadTime: 1
                })

            })
            .catch(err => {
                console.error(err)
                this.setState({
                    branchStudentChart: null,
                    workChart: null,
                    trainingChart: null,
                    gpaChart: null,
                    salaryData: null,
                    salaryChart: null
                })
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

    handleYearSelect = async event => {
        let value = event.target.value
        let n_year = parseInt(value)
        // await this.props.startLoading()
        if (n_year === 0)
            n_year = null

        this.setState({
            year: n_year
        })
        await this.props.setSelectedYear(n_year)

        this.fetchWorkData()

    }

    handleSalarySelect = event => {
        let value = event.target.value
        let { salaryData } = this.state
        this.setState({
            salaryChart: setupStackBarChart(this.reorderSalary(salaryData[value]['salary_all_branch_training']))
        })
    }

    reorderSalary = (salaryChart) => {
        return {
            "น้อยกว่า 10,000": salaryChart['น้อยกว่า 10,000'],
            '10,000-19,999': salaryChart['10,000-19,999'],
            '20,000-30,000': salaryChart['20,000-30,000'],
            'มากกว่า 30,000': salaryChart['มากกว่า 30,000']
        }
    }



    render() {
        let { branch, branchStudentChart, workChart, trainingChart, gpaChart, salaryChart, year } = this.state

        let { alumni } = this.props

        return (
            <Fragment>
                <Container className="white-background">
                    <Header as="h5" align='center'>
                        ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา{" "}
                        <select id="selectYear" defaultValue={year}>
                            <option value="0">แสดงทุกปี</option>
                            {
                                alumni.yearList !== null && alumni.yearList.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </Header>
                    <Divider />
                    <Grid>

                        <Grid.Row columns={2} >
                            <Grid.Column >
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                        กราฟแสดงจำนวนศิษย์เก่าแยกตามสาขา
                                    </Card.Header>
                                    <Card.Content >
                                        {branchStudentChart !== null && <GraphPie data={branchStudentChart} />}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                            <Grid.Column>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                        กราฟแสดงจำนวนภาวะการทำงานของศิษย์เก่า
                                        </Card.Header>
                                    <Card.Content>
                                        {workChart !== null && <GraphPie data={workChart} />}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row  >
                            <Grid.Column >
                                <Card className="card-default" >
                                    <Card.Header as="h3">
                                        กราฟแสดงจำนวนนักศึกษที่เข้าร่วมฝึกงาน
                                        </Card.Header>
                                    <Card.Content  >
                                        {trainingChart !== null && <GraphPie data={trainingChart} />}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column >
                                <Card className="card-default" >
                                    <Card.Header as="h3">
                                        กราฟแสดงเกรดเฉลี่ยตลอดหลักสูตร
                                    </Card.Header>
                                    <Card.Content>
                                        {gpaChart !== null && <GraphBar data={gpaChart} legend={{ display: false }} />}
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default" >
                                    <Card.Header as="h3">
                                        กราฟแสดงช่วงเงินเดือนของศิษย์เก่า

                                    </Card.Header>
                                    <Card.Header as="h6" align='right' className='branch'>
                                        <select className="form-control" onChange={this.handleSalarySelect}>
                                            <option value="all">ทุกสาขาวิชา</option>
                                            {
                                                branch !== null && (
                                                    branch.map((item, index) => (
                                                        <option key={index}
                                                            value={item['branch_id']}>{item['branch_name']}</option>
                                                    ))
                                                )
                                            }
                                        </select>
                                    </Card.Header>

                                    <Card.Content>
                                        {salaryChart !== null && <Bar data={salaryChart} legend={{ display: true }} />}
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



const mapStateToProps = state => (
    {
        website: state.website,
        alumni: state.admin_alumni
    }
)

const mapDispatchToProps = dispatch => (
    {
        loadAllYear: () => dispatch(getAllAlumniYear()),
        setSelectedYear: (year) => dispatch(setSelectedYear(year)),
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Alumni)

