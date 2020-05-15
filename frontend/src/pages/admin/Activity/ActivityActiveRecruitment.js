import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'

import { Header } from 'semantic-ui-react'

import axios from 'axios'

import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'

import ActiveRecruitmentDetail from './ActivityActiveRecruitementDetail'
import ARSchool from './ActiveRecruitmentSchool'


class ActivityActiveRecruitment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectList: null,
            projectDataBranch: null,
            projectDataGPAX: null,
            numberBySchool: null,
            gpaBySchool: null,
            year: 2563,
            yearList: [2560, 2561, 2562, 2563],
            tabKey: 2
        }
    }

    async componentDidMount() {
        this.getProjectList()
    }

    getProjectList = () => {
        axios.get('/activity/project?project_type=1')
            .then(res => {
                let data = res.data.data

                if (data.length < 1) return

                this.setState({
                    projectList: data
                }, this.getProjectData)
            })
            .catch(err => {
                console.error(err)
            })
    }

    getProjectData = () => {
        let { year } = this.state

        axios.get(`/admin/activity/analyze/project/ar?year=${year}`)
            .then(res => {
                let data = res.data.data

                let activityByBranch = data['activity_by_branch_count'][0]
                let activityByGPAX = data['activity_by_branch_gpax'][0]
                let numberBySchool = data['count_school']
                let gpaBySchool = data['gpax']

                this.setState({
                    projectDataBranch: activityByBranch,
                    projectDataGPAX: activityByGPAX,
                    numberBySchool: setupNoneStackBarChart(numberBySchool),
                    gpaBySchool: setupNoneStackBarChart(gpaBySchool)
                })

            })
            .catch(err => {
                console.error(err)
                this.setState({
                    projectDataBranch: null,
                    projectDataGPAX: null,
                    numberBySchool: null,
                    gpaBySchool: null
                })
            })
    }

    handleYearSelect = event => {
        let value = event.target.value

        this.setState({
            year: parseInt(value)
        }, this.getProjectList)
    }

    render() {
        let { year, yearList, tabKey, projectList, projectDataBranch, projectDataGPAX, numberBySchool, gpaBySchool } = this.state
        return (
            <Fragment>

                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Header as="h4" align='center'>
                            ค้นหาข้อมูล Active Recruitment ของปีการศึกษา
                            <select defaultValue={year} onChange={this.handleYearSelect} >
                                {
                                    yearList !== null && (
                                        yearList.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    )
                                }
                            </select>
                        </Header>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect}
                                        className="flex-column sub-nav">
                                        {
                                            projectList !== null && (
                                                projectList.map((item, index) => (
                                                    <Nav.Item key={index}>
                                                        <Nav.Link eventKey={item['project_id']}
                                                            className="sub-nav">{item['project_name']}</Nav.Link>
                                                    </Nav.Item>
                                                ))
                                            )
                                        }
                                        <Nav.Item>
                                            <hr />
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey={'ar_school'} className="sub-nav">ข้อมูลการโครงการ AR
                                                ระดับโรงเรียน</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        {
                                            projectList !== null && projectDataGPAX !== null && projectDataBranch !== null ? (
                                                projectList.map((item, index) => (
                                                    <Tab.Pane key={index} eventKey={item['project_id']}>
                                                        <ActiveRecruitmentDetail data={item}
                                                            dataByBranch={projectDataBranch[item['project_id']]}
                                                            dataByGPAX={projectDataGPAX[item['project_id']]} />
                                                    </Tab.Pane>
                                                ))
                                            ): (
                                                <div className="text-center">
                                                    <h1>ไม่พบข้อมูล</h1>
                                                </div>
                                            )
                                        }
                                        {
                                            numberBySchool !== null && gpaBySchool !== null && (
                                                <Tab.Pane eventKey={'ar_school'}>
                                                    <ARSchool number={numberBySchool} gpa={gpaBySchool} />
                                                </Tab.Pane>
                                            )
                                        }
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </div>
            </Fragment>
        )
    }
}

export default ActivityActiveRecruitment