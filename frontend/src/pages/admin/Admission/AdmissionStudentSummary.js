import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import {
    Header,
    Grid,
    Card,
    Container,
    Button,
} from "semantic-ui-react";

import YearSelect from '../../../components/YearSelect'

// redux
import { connect } from 'react-redux'
import { getAdmissionData, selectYear } from '../../../redux/action/adminAdmissionAction'

import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import Bar from '../../../components/Graph/Bar'


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
                <Container>
                    <Header as="h5" textAlign="center">

                        {
                            yearList !== null && (
                                <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                            )
                        }
                    </Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/1
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round1)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/2
                                    </Card.Header>
                                    <Card.Content>
                                    {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round2)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 2
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round3)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/1
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round4)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/2
                                    </Card.Header>
                                    <Card.Content>
                                    {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round5)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 4
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round6)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 5
                                    </Card.Header>
                                    <Card.Content>
                                    {
                                            admissionData !== null ? (
                                                <Bar data={setupNoneStackBarChart(admissionData.round7)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid.Row className="my-5 float-right">
                        <Button  as={Link} to="/admission">
                            เพิ่มเติม
                        {
                            admissionData !== null ? (
                                admissionData.map((item, index) => {
                                    return (
                                        <Grid.Column mobile="16" computer="8" className="my-3" key={index}>
                                            <Card className="fs-cd-default">
                                                <Card.Header as="h3">
                                                    กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ {item.name}
                                                </Card.Header>
                                                <Card.Content >
                                                    {
                                                        admissionData !== null ? (
                                                            <Bar data={setupNoneStackBarChart(item.analyze[0])} legend={{ display: false }} />
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
                            <Button as={Link} to="/admission" className="btn-info interval-1" style={{ color: '#FFFFFF' }}>
                                ดูผลการวิเคราะห์เพิ่มเติม
                        </Button>
                        </Container>
                    ) : null}
                </Container>
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