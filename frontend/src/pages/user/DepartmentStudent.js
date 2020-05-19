import React, { Component, Fragment } from "react";

import {
    Image,
    Container,
    Grid,
    Header,
    Card
} from "semantic-ui-react";


import Piechart from "../../components/Graph/Pie";
import Barchart from "../../components/Graph/Bar";
import Horizontal from "../../components/Graph/BarHorizontal";

import { setupPieChart, setupStackBarChart } from '../../components/Graph/GraphController'

import axios from 'axios'

class DepartmentStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dept_id: null,
            isLoaded: false,
            department: "",
            loadTime: 0,
            departmentName: "",
            branch: [],
            byYear: [],
            byBranch: [],
            studentByBranch: [],
            studentByYear: [],
            branchByStatus: []
        }
    }

    fetchData = async (dept_id) => {
        await axios.get(`/student/department?dept_id=${dept_id}`)
            .then(res => {
                let received = res.data

                if (received.response === true) {
                    let data = received.data

                    this.setState({
                        department: data.dept_name,
                        branch: data.branch[0],
                        byYear: data.status_by_year[0],
                        byBranch: data.df_status_by_branch[0],
                        dept_id: dept_id
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    setupGraph = () => {
        let { branch, byYear, byBranch } = this.state

        this.setState({
            studentByBranch: setupPieChart(branch),
            studentByYear: setupStackBarChart(byYear),
            branchByStatus: setupStackBarChart(byBranch)
        })
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        await this.fetchData(id)
        this.setupGraph()
    }

    async componentDidUpdate() {
        let { dept_id } = this.state
        let id = this.props.match.params.id
        if (dept_id !== id) {
            await this.fetchData(id)
            this.setupGraph()
        }
    }

    render() {
        let { department, studentByBranch, studentByYear, branchByStatus } = this.state

        return (
            <Fragment>
                <Container className="white-background">
                    <Header textAlign="center" as="h2" style={{ marginBottom: "5%" }}>
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
                                        <Piechart data={studentByBranch} />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Header textAlign={"center"}>
                                        <h3>สถานะของนักศึกษาแต่ละชั้นปี</h3>
                                    </Card.Header>
                                    <Card.Content>
                                        <Barchart data={studentByYear} />
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
                                        <Horizontal data={branchByStatus} />
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

export default DepartmentStudent