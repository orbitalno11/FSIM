import React, { Component, Fragment } from "react";

import {
    Container,
    Header,
    Card,
    Divider
} from "semantic-ui-react";
import { Row, Col} from 'react-bootstrap'

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

    // async componentDidUpdate() {
    //     let { dept_id } = this.state
    //     let id = this.props.match.params.id
    //     if (dept_id !== id) {
    //         await this.fetchData(id)
    //         this.setupGraph()
    //     }
    // }

    render() {
        let { department, studentByBranch, studentByYear, branchByStatus } = this.state

        return (
            <Fragment>
                <Container >
                    <Header className="my-5" textAlign="center" as="h2" style={{ marginBottom: "5%" }}>
                        จำนวนนักศึกษาทุกชั้นปี {department}
                    </Header>
                    <Divider/>
                    <Container className="mb-5">
                        <Row >
                            <Col sm={12} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h5" style={{textAlign:'center',padding:'1%'}}>
                                        จำนวนนักศึกษาต่อสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        <Piechart data={studentByBranch} />
                                    </Card.Content>
                                </Card>
                            </Col>
                            <Col sm={12} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h5" style={{textAlign:'center',padding:'1%'}}>
                                       สถานะของนักศึกษาแต่ละชั้นปี
                                    </Card.Header>
                                    <Card.Content>
                                        <Barchart data={studentByYear} />
                                    </Card.Content>
                                </Card>
                            </Col>
                        
                            <Col sm={12} lg={12} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h5" style={{textAlign:'center',padding:'1%'}}>
                                        สถานะของนักศึกษาแต่ละสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        <Horizontal data={branchByStatus} />
                                    </Card.Content>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Fragment>
        )
    }
}

export default DepartmentStudent