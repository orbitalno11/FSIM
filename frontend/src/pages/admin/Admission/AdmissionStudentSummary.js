import React, {Component, Fragment} from "react";
import { Link } from 'react-router-dom'
import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    Button,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import { getAdmissionData } from '../../../redux/action/adminAdmissionAction'

import GraphBar from "../../../components/Graph/Bar";
import { setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import { Bar } from "react-chartjs-2";






class AdmissionStudentSummary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            admissionData : null
         
        }
    }
    componentDidMount() {
        this.props.getAdmissionData()
    }
    render() {
        let {admissionData} = this.props.admission
        return (
            <Fragment>
                <Container>
                    <Header as="h5" textAlign="center">
                        ค้นหาการรับเข้าโดยปีการศึกษา{" "}
                       
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
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                                <Card className="card-default">
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
                    <Grid.Row>
                        <Button as={Link} to="/admission">
                            เพิ่มเติม
                        </Button>
                    </Grid.Row>
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
        getAdmissionData: () => dispatch(getAdmissionData())
       
        // setYear: (2560) => dispatch(selectYear())
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionStudentSummary)