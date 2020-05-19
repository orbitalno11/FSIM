import React, { Component, Fragment } from "react";
import axios from 'axios'

import {
    Header,
    Grid,
    Card,
    Container,
    Image
} from "semantic-ui-react";
import { connect } from 'react-redux'

import { Bar } from 'react-chartjs-2';

import { startLoading, stopLoading } from '../../redux/action/generalAction'

import { setupNoneStackBarChart } from '../../components/Graph/GraphController'

import { getYearList, selectYear } from '../../redux/action/adminActivityAction'

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

    async componentDidMount() {
        this.props.getYearList()
        this.fetchData()
    }

    fetchData = () => {
        let { selectedYear } = this.props.activity
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

    handleSeclectYear = async event => {
        let value = event.target.value
        if(value ==0) 
            value=null 
        await this.props.setYear(value)
        this.fetchData()
    }

    render() {
        let { yearList, selectedYear } = this.props.activity
        let { project_set } = this.state

        console.log(selectedYear)

        return (
            <Fragment>
                <Container className="white-background">
                    <Header as="h5" align='center'>
                        ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา
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
                    {
                        project_set.length !== 0 ?
                            (project_set.map((item, index) => {
                                return (
                                    <Grid key={item['project_name']} style={{ marginTop: '2%' }}>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <Card className="card-default">
                                                    <Card.Header as="h5">
                                                        กราฟแสดงจำนวนนักเรียนแต่ละสาขาที่รับเข้ามาจากโครงการ {item['project_name']} แต่ละสาขา
                                            </Card.Header>
                                                    <Card.Content>

                                                        <Bar data={setupNoneStackBarChart(item['analyze_by_activity'])} legend={{ display: false }} />
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>

                                            <Grid.Column width={8}>
                                                <Card className="card-default">
                                                    <Card.Header as="h5">
                                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากโครงกการ{item['project_name']} แต่ละสาขา
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
                                <h1 className="text-center" style={{ marginTop: '2%' }}>ไม่พบข้อมูล</h1>
                            )
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
        stopLoading: () => dispatch(stopLoading()),
        getYearList: () => dispatch(getYearList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ActiveRecruitment)