import React, { Component, Fragment } from "react";
import axios from 'axios'

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    CardContent,
    Container,
    Image
} from "semantic-ui-react";
import { connect } from 'react-redux'

import bgyel from "../img/bg-head3.png";

import { Bar } from 'react-chartjs-2';

import { startLoading, stopLoading } from '../redux/action/generalAction'

import { setupNoneStackBarChart } from '../components/Graph/GraphController'


class ActiveRecruitment extends Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedYear: null,
            project: null,
            project_set: [],
            loadTime: 0
        }
    }

    componentDidMount() {
        if (this.state.loadTime === 0) {
            this.fetchkData()
        }
    }
   

    fetchkData = () => {
        let { selectedYear } = this.state
        axios.get(`/activity/analyze/ar?year=${selectedYear}`)
            .then(res => {
                let recieved_data = res.data.data

                let project_set = recieved_data['project_set']
                this.setState({
                    project_set: project_set,
                    loadTime: 1
                })
            })
            .catch(err => {
                console.error(err)
                this.setState({
                    project_set: [],

                })
            })
    }


    handleYearSelect= async event => {
        let value = event.target.value
       
        this.setState({
            selectedYear: value
        }, () => {
            this.fetchkData()
        })

       
       
    }

    render() {
        let { yearList } = this.props.activity
        let { selectedYear, project_set, project } = this.state

        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel} />
                <Header as="h5" align='center'>
                    ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา
                        {
                        <select id="selectYear" defaultValue={selectedYear} onChange={this.handleYearSelect}>
                            <option value='0'>แสดงทุกปี</option>
                            {
                                yearList !== null && yearList.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    }
                </Header>
                <Container>
                    {
                        project_set.length !== 0?
                            (project_set.map((item, index) => {
                                return (
                                    <Grid key={ item['project_name']} style={{marginTop:'2%'}}>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <Card className="card-default">
                                                    <Card.Header as="h5">
                                                        กราฟแสดงจำนวนนักเรียนแต่ละสาขาที่รับเข้ามาจากโครงการ { item['project_name']} แต่ละสาขา
                                            </Card.Header>
                                                    <Card.Content>
                                                      
                                                        <Bar data={setupNoneStackBarChart(item['analyze_by_activity'])} legend={{ display: false }} /> 
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                       
                                            <Grid.Column width={8}>
                                                <Card className="card-default">
                                                    <Card.Header as="h5">
                                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากโครงกการ{ item['project_name']} แต่ละสาขา
                                            </Card.Header>
                                                    <Card.Content>
                                                        <Bar data={setupNoneStackBarChart(item['analyze_by_activity_gpax'])} legend={{ display: false }} /> 
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                )
                              

                            }))
                            : (
                                <h1 className="text-center" style={{marginTop:'2%'}}>ไม่พบข้อมูล</h1>
                            )
                    }
                    {

                    }


                </Container>
            </Fragment>
        )
    }
}


const mapStateToProps = state => (
    {
        activity: state.admin_activity
    }
)


const mapDispatchToProps = dispatch => (
    {
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading())
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ActiveRecruitment)