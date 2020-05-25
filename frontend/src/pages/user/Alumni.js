import React, { Component, Fragment } from "react";

import {
    Grid,
    Container,
    Card
} from "semantic-ui-react";

import { setupStackBarChart, setupPieChart, setupNoneStackBarChart } from '../../components/Graph/GraphController'

import { Bar } from 'react-chartjs-2';
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";

import { connect } from 'react-redux'

import { getBranchList } from '../../redux/action/generalAction'
import { getAllAlumniYear, setSelectedYear, loadWorkData, setSalaryChart } from '../../redux/action/adminAlumniAction'
import YearSelect from '../../components/YearSelect'

class Alumni extends Component {

    constructor(props) {
        super(props)
        this.state = {
            year: null,
            loadTime: 0
        }
    }

    componentDidMount() {
        this.props.loadAllYear()
        this.props.getBranchList()
        this.fetchWorkData()

    }

    fetchWorkData = async () => {
        let { selectedYear } = this.props.alumni
        this.props.loadWorkData(selectedYear)
    }

    handleYearSelect = async event => {
        let value = event.target.value
        let n_year = parseInt(value)
        if (n_year === 0)
            n_year = null

        await this.props.setSelectedYear(n_year)

        this.fetchWorkData()
    }

    handleSalarySelect = event => {
        let value = event.target.value
        let { salaryData } = this.props.alumni.workData
        this.props.setSalaryChart(salaryData[value]['salary_all_branch_training'])
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
        let { branchList } = this.props.website

        let { selectedYear, yearList, workData } = this.props.alumni

        return (
            <Fragment>

                <Container  className="white-background">

                    {

                        yearList.length > 0 ?
                            yearList !== null && (
                                <YearSelect yearList={yearList}
                                    selectedYear={selectedYear}
                                    onSelectYear={this.handleYearSelect}
                                    title={"ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา"} />
                            ) : null


                    }
                    <Grid textAlign="center">
                        <Grid.Row >
                            <Grid.Column mobile="16" computer="8" className="my-3">
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนศิษย์เก่าแยกตามสาขา
                                    </Card.Header>
                                    <Card.Content >
                                        {workData !== null ? <GraphPie data={setupPieChart(workData.branchStudentChart)} /> : (<h5 className="text-center">ไม่พบข้อมูล</h5>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column mobile="16" computer="8" className="mt-3 mb-2">
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนภาวะการทำงานของศิษย์เก่า
                                        </Card.Header>
                                    <Card.Content>
                                        {workData !== null ? <GraphPie data={setupPieChart(workData.workChart)} /> : (<h5 className="text-center">ไม่พบข้อมูล</h5>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row  >
                            <Grid.Column >
                                <Card className="card-default" >
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษที่เข้าร่วมฝึกงาน
                                        </Card.Header>
                                    <Card.Content  >
                                        {workData !== null ? <GraphPie data={setupPieChart(workData.trainingChart)} /> : (<h5 className="text-center">ไม่พบข้อมูล</h5>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column >
                                <Card className="card-default" >
                                    <Card.Header as="h5">
                                        กราฟแสดงเกรดเฉลี่ยตลอดหลักสูตร
                                    </Card.Header>
                                    <Card.Content>
                                        {workData !== null ? <GraphBar data={setupNoneStackBarChart(workData.gpaChart)} legend={{ display: false }} /> : (<h5 className="text-center">ไม่พบข้อมูล</h5>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default" >
                                    <Card.Header as="h5">
                                        กราฟแสดงช่วงเงินเดือนของศิษย์เก่า
                                    </Card.Header>
                                    <Card.Header as="h5" align='right' className='branch'>
                                        <select className="form-control" onChange={workData !== null ? this.handleSalarySelect : null}>
                                            <option value="all">ทุกสาขาวิชา</option>
                                            {
                                                branchList !== null && (
                                                    branchList.map((item, index) => (
                                                        <option key={index}
                                                            value={item['branch_id']}>{item['branch_name']}</option>
                                                    ))
                                                )
                                            }
                                        </select>
                                    </Card.Header>
                                    <Card.Content>
                                        {workData !== null ? <Bar data={setupStackBarChart(this.reorderSalary(workData.salaryChart))} legend={{ display: true }} /> : (<h3 className="text-center">ไม่พบข้อมูล</h3>)}
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
        getBranchList: () => dispatch(getBranchList()),
        loadWorkData: (year) => dispatch(loadWorkData(year)),
        setSalaryChart: (data) => dispatch(setSalaryChart(data)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Alumni)