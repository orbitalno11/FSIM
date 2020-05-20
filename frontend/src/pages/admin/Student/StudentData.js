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

import { setupPieChart, setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'


import { connect } from 'react-redux'
import { getStudentData, getStudentList, selectYear } from '../../../redux/action/adminStudentAction'


//  wait other
import 'chartjs-plugin-datalabels'

import axios from 'axios'

// import color set
import { colorSet } from '../../../Constant'

class StudentData extends Component {

    componentDidMount() {
        this.getData()
    }

    handleSelectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.student
        this.props.getStudentData(selectedYear)
        this.props.getStudentList()
    }




    render() {
        
        let { studentData , studentList, selectedYear , yearList} = this.props.student
        console.log(studentData)
        return (
            <Fragment>
                
                <Container style={{backgroundColor:"#FFFFFF",padding:"2%"}}>
                    <Header as="h3" align = 'center'>
                            ค้นหาข้อมูลการรับเข้าของปีการศึกษา{" "}
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
                        จำนวนนักศึกษาทุกชั้นปี {}
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
                                                <Piechart data={setupNoneStackBarChart(studentData.joinByStudent)} legend={{ display: false }} />
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
                                                <Barchart data={setupNoneStackBarChart(studentData.joinByStudent)} legend={{ display: false }} />
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
                                            <Horizontal  />
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
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        getStudentData: (year) => dispatch(getStudentData(year)),
        getStudentList: () => dispatch(getStudentList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(StudentData)

