import React, { Component, Fragment } from "react";

import {
    Container,
    Header,
    Card,
    Divider
} from "semantic-ui-react";
import { Row, Col } from 'react-bootstrap'

import Piechart from "../../components/Graph/Pie";
import Barchart from "../../components/Graph/Bar";
import Horizontal from "../../components/Graph/BarHorizontal";

import { setupPieChart, setupStackBarChart } from '../../components/Graph/GraphController'


import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../Constant'

import axios from 'axios'

class DepartmentStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dept_id: null,
            isLoaded: false,
            department: null,
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
                this.setState({
                    departmentName: null,
                    branch: [],
                    byYear: [],
                    byBranch: [],
                    dept_id: null,
                    studentByBranch: [],
                    studentByYear: [],
                    branchByStatus: []
                })
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

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            await this.fetchData(this.props.match.params.id)
            this.setupGraph()
        }
    }

    render() {
        let { department, studentByBranch, studentByYear, branchByStatus } = this.state

        return (
            <Fragment>
                <MediaQuery minDeviceWidth={minDeviceWidth}>
                    <Container>
                        <Header textAlign="center" as="h2" className="my-5">
                            กราฟแสดงการวิเคราะห์นักศึกษาปัจจุบัน {department}
                        </Header>
                        <Divider />
                        <Row >
                            <Col sm={12} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        จำนวนนักศึกษาต่อสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null? <Piechart data={studentByBranch} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                       
                                    </Card.Content>
                                </Card>
                            </Col>
                            {
                                console.log(department)
                            }
                            <Col sm={12} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        สถานะของนักศึกษาแต่ละชั้นปี
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null? <Barchart data={studentByYear} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                   
                                    </Card.Content>
                                </Card>
                            </Col>

                            <Col sm={12} lg={12} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        สถานะของนักศึกษาแต่ละสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null?   <Horizontal data={branchByStatus} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                      
                                    </Card.Content>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                    <Container>
                        <Header textAlign="center" as="h4" className="my-5">
                            จำนวนนักศึกษาทุกชั้นปี {department}
                        </Header>
                        <Divider />
                        <Row >
                            <Col lg={6} md={4} sm={12} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        จำนวนนักศึกษาต่อสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null?   <Piechart data={studentByBranch} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                        
                                    </Card.Content>
                                </Card>
                            </Col>
                            <Col sm={12} md={4} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        สถานะของนักศึกษาแต่ละชั้นปี
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null? <Barchart data={studentByYear} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                        
                                    </Card.Content>
                                </Card>
                            </Col>

                            <Col sm={12} md={4} lg={6} className="my-2">
                                <Card fluid>
                                    <Card.Header as="h4" style={{ textAlign: 'center', padding: '1%' }}>
                                        สถานะของนักศึกษาแต่ละสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            department!==null?<Horizontal data={branchByStatus} />: <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        }
                                        
                                    </Card.Content>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </MediaQuery>
            </Fragment >
        )
    }
}

export default DepartmentStudent