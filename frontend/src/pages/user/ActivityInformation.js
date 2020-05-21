import React, {Component, Fragment} from "react";

import {
    Header,
    Divider,
    Grid,
    Card,
    Container,
    Table
} from "semantic-ui-react";
import { connect } from 'react-redux'
import { Row, Col} from 'react-bootstrap'

import { Bar} from "react-chartjs-2";

import GraphBar from "../../components/Graph/Bar";
import { setupStackBarChart, setupNoneStackBarChart } from '../../components/Graph/GraphController'
import { getActivityData, getActivityList, selectYear } from '../../redux/action/adminActivityAction'
import { getYearList } from '../../redux/action/adminActivityAction'

class ActivityInformation extends Component {

    componentDidMount() {
        this.props.getYearList()
        this.getData()
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        if(value ==0) 
            value=null 
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.activity
        this.props.getActivityData(selectedYear)
        this.props.getActivityList()
    }

    render() {
        let { activityData, activityList, selectedYear, yearList } = this.props.activity

        return (
            <Fragment>
                <Container className="white-background">
                    <Header as="h5" textAlign="center">
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
                    <Divider />
                    <Container className="mb-5">
                        <Row>
                            <Col  sm={12} lg={6} className="my-2">
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนที่เข้าร่วมกิจกรรมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            activityData !== null ? (
                                                <Bar data={setupNoneStackBarChart(activityData.joinByActivity)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Col>
                            <Col  sm={12} lg={6} className="my-2">
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนคนที่เข้าร่วมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            activityData !== null ? (
                                                <Bar data={setupStackBarChart(activityData.compareByPreviousYear)} legend={{ display: true }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                        <GraphBar />
                                    </Card.Content>
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                        <Grid.Row>
                            <Header as="h3" align='center'> งบประมาณที่ใช่ในการจัดกิจกรรมแต่ละโครงการ</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ปีการศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ชื่อโครงการ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            งบประมาณที่ใช้
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        activityList !== null ? (
                                            activityList.filter(data => data['education_year'] === parseInt(selectedYear)).map((item, index) => (
                                                <Table.Row key={index}>
                                                    <Table.Cell textAlign="center">{item['education_year']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['activity_name']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['activity_budget']}</Table.Cell>
                                                </Table.Row>
                                            ))
                                        ) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan={3}>
                                                        <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Container>

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
        getActivityData: (year) => dispatch(getActivityData(year)),
        getActivityList: () => dispatch(getActivityList()),
        setYear: (year) => dispatch(selectYear(year)),
        getYearList: () => dispatch(getYearList())
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ActivityInformation)