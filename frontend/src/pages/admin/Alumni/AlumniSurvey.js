import React, { Component, Fragment } from "react";

import {
    Divider,
    Grid,
    Header,
    Container,
    Table
} from "semantic-ui-react";

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
                    <Header as="h5" align='center'>
                        ค้นหาข้อมูลแบบสอบถามของปีการศึกษา
                        {
                            yearList !== null && (
                                <select id="selectYear" defaultValue={selectedYear} onChange={this.handleYearSelect}>
                                    <option value="0">เลือกปีการศึกษา</option>
                                    {
                                        yearList !== null && yearList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            )
                        }
                    </Header>
                    <Divider />
                    <Grid>
                        <Grid.Row>
                            <Header as="h3">
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน {selectedYear}
                            </Header>
                            <Divider />
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ระดับความพึงพอใจเฉลี่ย
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ส่วนเบี่ยงเบนมาตรฐาน
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        surveyAnalyze !== null && surveyAnalyze.length !== 0
                                            ? surveyAnalyze.map((item, index) => (
                                                <Table.Row key={index}>
                                                    <Table.Cell style={{ paddingLeft: "4%" }}>{item['topic']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['mean']}</Table.Cell>
                                                    <Table.Cell textAlign="center">{item['std']}</Table.Cell>
                                                </Table.Row>
                                            )) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan={3}><h2 className="text-center">ไม่พบข้อมูล</h2></Table.Cell>
                                                </Table.Row>
                                            )
                                    }
                                </Table.Body>
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