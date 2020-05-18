import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'

import { Header } from 'semantic-ui-react'

import ActiveRecruitmentDetail from './ActivityActiveRecruitementDetail'
import ARSchool from './ActiveRecruitmentSchool'

import { connect } from 'react-redux'
import { getARActivityData, getProjectList, selectYear } from '../../../redux/action/adminActivityAction'
import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'


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
            yearList: [2560, 2561, 2562, 2563]
        }
    }

    async componentDidMount() {
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.activity
        this.props.getProjectList()
        this.props.getARData(selectedYear)
    }


    handleYearSelect = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    render() {
        let { tabKey } = this.state

        let { arData, projectList, selectedYear, yearList } = this.props.activity

        let key = false

        if (projectList !== null) {
            let temp = projectList.filter(data => data['project_type'] !== 0)
            key = temp[0]['project_id']
        }

        return (
            <Fragment>

                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Header as="h4" align='center'>
                            ค้นหาข้อมูล Active Recruitment ของปีการศึกษา
                            <select defaultValue={selectedYear} onChange={this.handleYearSelect} >
                                {
                                    yearList !== null && (
                                        yearList.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    )
                                }
                            </select>
                        </Header>
                        {
                            key ? (
                                <Tab.Container defaultActiveKey={key}>
                                    <Row>
                                        <Col lg={3}>
                                            <Nav variant="pills" activeKey={tabKey}
                                                className="flex-column sub-nav">
                                                {
                                                    projectList !== null && (
                                                        projectList.filter(data => data['project_type'] !== 0).map((item, index) => (
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
                                                    projectList !== null && arData !== null ? (
                                                        arData['projectDataBranch'] !== null && arData['projectDataBranch'] !== undefined ? (
                                                            projectList.filter(data => data['project_type'] !== 0).map((item, index) => (
                                                                <Tab.Pane key={index} eventKey={item['project_id']}>
                                                                    <ActiveRecruitmentDetail data={item}
                                                                        dataByBranch={arData['projectDataBranch'][item['project_id']]}
                                                                        dataByGPAX={arData['projectDataGPAX'][item['project_id']]} />
                                                                </Tab.Pane>
                                                            ))
                                                        ) : (
                                                                <h1 className="text-center">ไม่พบข้อมูล</h1>
                                                            )
                                                    ) : (
                                                            <h1 className="text-center">ไม่พบข้อมูล</h1>
                                                        )
                                                }
                                                {
                                                    arData !== null && (
                                                        arData['numberBySchool'] !== null && arData['gpaBySchool'] !== null && (
                                                            <Tab.Pane eventKey={'ar_school'}>
                                                                <ARSchool number={setupNoneStackBarChart(arData['numberBySchool'])} gpa={setupNoneStackBarChart(arData['gpaBySchool'])} />
                                                            </Tab.Pane>
                                                        )
                                                    )
                                                }
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            ) : (
                                    <h1 className="text-center">ไม่พบข้อมูล</h1>
                                )
                        }
                    </Container>
                </div>
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
        getARData: (year) => dispatch(getARActivityData(year)),
        getProjectList: () => dispatch(getProjectList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ActivityActiveRecruitment)