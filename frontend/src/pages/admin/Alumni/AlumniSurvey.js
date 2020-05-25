import React, { Component, Fragment } from "react";

import {
    Divider,
    Grid,
    Header,
    Container,
} from "semantic-ui-react";
import { Table} from 'react-bootstrap'

import YearSelect from '../../../components/YearSelect'

// redux
import { connect } from 'react-redux'
import { setSelectedYear, loadSurveyData } from '../../../redux/action/adminAlumniAction'


class AlumniSurvey extends Component {

    componentDidMount() {
        this.fetchSurveyData()
    }

    handleYearSelect = async event => {
        let value = event.target.value
        let n_year = parseInt(value)

        if (n_year === 0)
            n_year = null

        if (n_year != null) {
            await this.props.setSelectedYear(n_year)
            this.fetchSurveyData()
        }
    }

    fetchSurveyData = async () => {
        let { selectedYear } = this.props.alumni
        this.props.loadSurveyData(selectedYear)
    }

    render() {
        let { selectedYear, yearList, surveyAnalyze } = this.props.alumni

        return (
            <Fragment>
                <Container>
                   
                    {
                         (yearList!==null&&yearList.length>0) ? (
                            <YearSelect yearList={yearList}
                                selectedYear={selectedYear}
                                onSelectYear={this.handleYearSelect}
                                title={"ค้นหาข้อมูลแบบสอบถามของปีการศึกษา"} />
                        ):null
                    }
                    <Grid>
                        <Grid.Row>
                            <Header as="h3">
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน {selectedYear}
                            </Header>
                            <Divider />
                            <Table responsive hover  style={{marginTop:'2%'}}>
                                <thead>
                                    <tr align="center">
                                        <th width={12} >
                                            ประเด็นการประเมิน
                                        </th>
                                        <th width={2} >
                                            ระดับความพึงพอใจเฉลี่ย
                                        </th>
                                        <th width={2} >
                                            ส่วนเบี่ยงเบนมาตรฐาน
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        surveyAnalyze !== null && surveyAnalyze.length !== 0
                                            ? surveyAnalyze.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ paddingLeft: "4%" }}>{item['topic']}</td>
                                                    <td textAlign="center">{item['mean']}</td>
                                                    <td textAlign="center">{item['std']}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={3} ><h2 className="text-center">ไม่พบข้อมูล</h2></td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </Table>
                        </Grid.Row>
                    </Grid>

                </Container>

            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        website: state.website,
        alumni: state.admin_alumni
    }
)

const mapDispatchToProps = dispatch => (
    {
        setSelectedYear: (year) => dispatch(setSelectedYear(year)),
        loadSurveyData: (year) => dispatch(loadSurveyData(year))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniSurvey)