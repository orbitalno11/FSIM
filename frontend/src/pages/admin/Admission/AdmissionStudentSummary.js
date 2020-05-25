import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import {
    Grid,
    Card,
    Container,
    Button,
} from "semantic-ui-react";
import {  Col, Row } from 'react-bootstrap'
import YearSelect from '../../../components/YearSelect'

// redux
import { connect } from 'react-redux'
import { getAdmissionData, selectYear } from '../../../redux/action/adminAdmissionAction'

import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import Barchart from "../../../components/Graph/Bar";


import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../../Constant'

class AdmissionStudentSummary extends Component {

    componentDidMount() {
        this.getData()
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.admission
        this.props.getAdmissionData(selectedYear)


    }

    render() {
        let { admissionData, selectedYear, yearList } = this.props.admission
        return (
            <Fragment>
                <MediaQuery minDeviceWidth={minDeviceWidth}>
                    <Container>
                        {
                            yearList !== null && (
                                <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                            )
                        }
                        <Grid>
                            {
                                admissionData !== null ? (
                                    admissionData.map((item, index) => {
                                        return (
                                            <Grid.Column mobile="16" computer="auto" className="my-3" key={index}>
                                                <Card className="fs-cd-default">
                                                    <Card.Header as="h4">
                                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ {item.name}
                                                    </Card.Header>
                                                    <Card.Content >
                                                        {
                                                            admissionData !== null ? (
                                                                <Barchart data={setupNoneStackBarChart(item.analyze[0])} legend={{ display: false }}  />
                                                            ) : (
                                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                                )
                                                        }
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        )
                                    })
                                ) : (
                                        <Container> <h3 style={{ marginTop: '5%' }} className="text-center">ไม่พบข้อมูล</h3> </Container>
                                    )
                            }
                        </Grid>
                        {admissionData !== null ? (
                            <Container textAlign="center" style={{ marginTop: '5%', marginBottom: '5%' }}>
                                <Button as={Link} to="/admission" className="btn-info fs-interval-1" style={{ color: '#FFFFFF' }}>
                                    ดูผลการวิเคราะห์เพิ่มเติม
                        </Button>
                            </Container>
                        ) : null}
                    </Container>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                    <Container >
                        {
                            yearList !== null && (
                                <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                            )
                        }
                        <Grid>
                            {
                                admissionData !== null ? (
                                    admissionData.map((item, index) => {
                                        return (
                                            <Row>
                                                <Col xs={12} lg={12} sm={12}>
                                                    <Card className="fs-cd-default">
                                                        <Card.Header as="h6">
                                                            กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ {item.name}
                                                        </Card.Header>
                                                        <Card.Content >
                                                            {
                                                                admissionData !== null ? (
                                                                    <Barchart data={setupNoneStackBarChart(item.analyze[0])} legend={false} />
                                                                ) : (
                                                                        <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                                    )
                                                            }
                                                        </Card.Content>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                ) : (
                                        <Container> <h3 style={{ marginTop: '5%' }} className="text-center">ไม่พบข้อมูล</h3> </Container>
                                    )
                            }
                        </Grid>
                        {admissionData !== null ? (
                            <Container textAlign="center" style={{ marginTop: '5%', marginBottom: '5%' }}>
                                <Button as={Link} to="/admission" className="btn-info fs-interval-1" style={{ color: '#FFFFFF' }}>
                                    ดูผลการวิเคราะห์เพิ่มเติม
                        </Button>
                            </Container>
                        ) : null}
                    </Container>
                </MediaQuery>

            </Fragment>
        )
    }
}
const mapStateToProps = state => (
    {
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAdmissionData: (year) => dispatch(getAdmissionData(year)),
        setYear: (year) => dispatch(selectYear(year))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionStudentSummary)