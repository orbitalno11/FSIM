import React, { Component, Fragment } from 'react'

import { Container } from 'react-bootstrap'

import YearSelect from '../../../components/YearSelect'

import ActiveRecruitmentDetail from './ActivityActiveRecruitementDetail'
import ARSchool from './ActiveRecruitmentSchool'

import { connect } from 'react-redux'
import { getARActivityData, getProjectList, selectYear } from '../../../redux/action/adminActivityAction'
import { setupNoneStackBarChart } from '../../../components/Graph/GraphController'

import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


class ActivityActiveRecruitment extends Component {

    componentDidMount() {
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

        let { arData, projectList, selectedYear, yearList } = this.props.activity

        let key = false, tabName = null, tabDetail = []

        console.log(projectList)

        if (projectList !== null) {
            let temp = projectList.filter(data => data['project_type'] !== 0)
            key = temp[0]['project_id']

            tabName = convertTabName(temp, 'project_id', 'project_name')

            let arSchoolTab = {
                tabId: 'arSchool',
                tabTitle: "ข้อมูลการโครงการ AR ระดับโรงเรียน"
            }

            tabName.push(arSchoolTab)

            if (projectList !== null && arData !== null) {
                temp.forEach(item => {
                    tabDetail.push(convertDetail(item['project_id'],
                        <ActiveRecruitmentDetail data={item}
                            dataByBranch={arData['projectDataBranch'][item['project_id']]}
                            dataByGPAX={arData['projectDataGPAX'][item['project_id']]} />))
                })

                tabDetail.push(convertDetail('arSchool', <ARSchool number={setupNoneStackBarChart(arData['numberBySchool'])} gpa={setupNoneStackBarChart(arData['gpaBySchool'])} />))
            }
        }

        return (
            <Fragment>

                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        {
                            yearList !== null && (
                                <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleYearSelect} title={"ค้นหาข้อมูล Active Recruitment ของปีการศึกษา"} />
                            )
                        }
                        {
                            key ? (
                                tabName !== null && arData !== null && (
                                    <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />
                                )
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