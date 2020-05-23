import React, { Component, Fragment } from "react";

import {
    Dropdown,
    Divider,
    Image,
    Container,
    Grid,
    Header,
    Card
} from "semantic-ui-react";



// import GraphBar from "../../../components/Graph/Bar";
import Piechart from "../../../components/Graph/Pie";
import Barchart from "../../../components/Graph/Bar";
import Horizontal from "../../../components/Graph/BarHorizontal";
import { Pie } from "react-chartjs-2"

import { setupPieChart, setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'


import { connect } from 'react-redux'
import { getStudentData, getStudentList, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'



//  wait other
import 'chartjs-plugin-datalabels'

import axios from 'axios'

// import color set
import { colorSet } from '../../../Constant'

class StudentData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dept_id : props.id || null,
        }
    }

    async componentDidUpdate() {
        let { dept_id } = this.state
        let id = this.props.id
        if (dept_id !== id) {
            this.getData()
        }
        console.log(id)
        console.log("+")
        console.log(dept_id)
    }

    componentDidMount() {
        this.getData()
    }

    handleSelectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        this.props.getDepartmentList()
        let { dept_id } = this.state
        this.props.getStudentData(dept_id)
        // this.props.getStudentList(selectedYear)
    }

    render() {
        // let { departmentList } = this.props.information
        let { studentData , studentList, selectedYear , yearList, department } = this.props.student
        
        return (
            <Fragment>
                <Container style={{backgroundColor:"#FFFFFF",padding:"2%"}}>
                    <Header as="h3" align = 'center'>
                            ค้นหาข้อมูลการรับเข้าของปีการศึกษา
                            {
                            <select id="selectYear" defaultValue={selectedYear} onChange={this.handleSeclectYear}>
                                {
                                    yearList !== null && yearList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        }
                        </Header>
                        <Divider/>
                    <Header textAlign="center" as="h2" style={{marginBottom:"5%"}}>
                        จำนวนนักศึกษาทุกชั้นปี {department}
                    </Header>

                    <Grid textAlign={"center"}>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>จำนวนนักศึกษาต่อสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                        {
                                            studentData !== null ? (
                                                <Piechart  data={setupPieChart(studentData.branch)}  />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละชั้นปี</h3>
                                        </Card.Header>
                                        <Card.Content>
                                        {
                                            studentData !== null ? (
                                                <Barchart data={setupStackBarChart(studentData.byYear)}  />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                        {
                                            studentData !== null ? (
                                                <Horizontal data={setupStackBarChart(studentData.byBranch)} legend={{display: false}}  />
                                                ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
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

const mapStateToProps = state => (
    {
        student: state.admin_student,
        information: state.admin_information
    }
)

const mapDispatchToProps = dispatch => (
    {
        getStudentData: (dept_id) => dispatch(getStudentData(dept_id)),
        getStudentList: (year) => dispatch(getStudentList(year)),
        setYear: (year) => dispatch(selectYear(year)),
        getDepartmentList: () => dispatch(getDepartmentList())
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(StudentData)
