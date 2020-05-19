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


import GraphBar from "../../../components/Graph/Bar";
import { setupLineChart, setupNoneStackBarChart, setupStackBarChart } from '../../../components/Graph/GraphController';


import Axios from "axios";
import Barchart from "../../../components/Graph/Bar";


class AdmissionStudentSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: 2560,
            yearList: [2560, 2561, 2562, 2563],
            branch: props.branch_list,
            admissionRound: []
        }
    }

    componentDidMount() {
        this.getCountChannel()
    }

    fetchBranch = () => {

    }

    getCountChannel = () => {
        let { year } = this.state
        Axios.get(`/admin/admission/analyze/channel`)
            .then(res => {
               
                let data = res.data.data

                let admissionRound = data['analyze_by_round'][0]
                // let countChannel = data['count_channel']
                // let countSchool = data['count_by_school']
                // let compareYear = data['compare_year'][0]
                // let countStatus = data['count_by_status'][0]
                // let countGrade = data['count_by_branch'][0]

               
                // console.log(countChannel)

                this.setState({
                    admissionRound: setupStackBarChart(admissionRound)
                    // countChannel: setupNoneStackBarChart(countChannel),
                    // countSchool: setupStackBarChart(countSchool),
                    // compareYear: setupStackBarChart(compareYear),
                    // countStatus: setupStackBarChart(countStatus),
                    // countGrade: setupStackBarChart(countGrade)

                })
                // console.log(this.state.countChannel)
            })
            .catch(error => {
                console.error(error)
                this.setState({
                    loadTime: 1
                })
            })
    }

    render() {
        let {branch_list, admissionRound} = this.props
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
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนที่รับเข้านักศึกษาของโครงการแต่ละประเภท
                                    </Card.Header>
                                    <Card.Content>
                                        <Barchart data={admissionRound}/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/1
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/2 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 2
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/1 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/2
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 4
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 5
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        เกรดเฉลี่ยของนักศึกษาแต่ละรอบที่รับเข้า
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
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


export default AdmissionStudentSummary