import React, { Component, Fragment } from "react";

import {
    Divider,
    Grid,
    Header,
    Container,
    Table
} from "semantic-ui-react";

import axios from 'axios'

import GraphPie from "../../../components/Graph/Pie";
import GraphBar from "../../../components/Graph/Bar";
import AlumniTypePanel from "../../../components/AlumniTypePanel";

// redux
import { connect } from 'react-redux'
import { setSelectedYear } from '../../../redux/action/adminAlumniAction'


class AlumniSurvey extends Component {

    constructor(props) {
        super(props)

        this.state = {
            surveyDetail: null,
            analyzeData: null
        }
    }

    componentDidUpdate() {
        if (this.props.website.loading) {
            this.fetchSurveyData()
        }
    }

    handleYearSelect = async event => {
        let value = event.target.value
        let n_year = parseInt(value)

        await this.props.setSelectedYear(n_year)

        this.fetchSurveyData()
    }

    fetchSurveyData = () => {
        let { selectedYear } = this.props.alumni

        if (selectedYear === null) return

        axios.get(`/alumni/survey?year=${selectedYear}`)
            .then(res => {
                let data = res.data.data[0]
                let key = Object.keys(data)

                if (key.length > 1 || key.length < 1) {
                    alert("Check alumni survey list for year" + setSelectedYear)
                    this.setState({
                        surveyDetail: null,
                        analyzeData: null
                    })
                    return
                }

                let detail = data[key[0]]

                this.setState({
                    surveyDetail: detail
                })

                this.fetchAnalyzeSurvey()

            })
            .catch(err => {
                console.error(err)
            })
    }

    fetchAnalyzeSurvey = () => {
        let { surveyDetail } = this.state

        if (surveyDetail === null) return

        let { sheetUrl, tableHeader } = surveyDetail

        let sendData = {
            sheet_url: sheetUrl,
            table_header: tableHeader
        }

        axios.post('/alumni/analyze/survey', sendData)
            .then(res => {
                let data = res.data.data[0]
                let key = Object.keys(data)

                let analyze_sur = []
                key.forEach(key => {
                    let result = {
                        topic: key,
                        mean: data[key]['mean'],
                        std: data[key]['std']
                    }
                    analyze_sur.push(result)
                })

                this.setState({
                    analyzeData: analyze_sur
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {

        let { analyzeData } = this.state

        let { alumni, website } = this.props

        return (
            <Fragment>
                <Container>
                    <Header as="h5" align='center'>
                        ค้นหาข้อมูลแบบสอบถามของปีการศึกษา
                        {
                            !website.loading && (
                                <select id="selectYear" defaultValue={alumni.selectedYear} onChange={this.handleYearSelect}>
                                    {
                                        alumni.yearList !== null && alumni.yearList.map((item, index) => (
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
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน
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
                                        analyzeData !== null && (analyzeData.length !== 0 && analyzeData.map((item, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell style={{ paddingLeft: "4%" }}>{item['topic']}</Table.Cell>
                                                <Table.Cell textAlign="center">{item['mean']}</Table.Cell>
                                                <Table.Cell textAlign="center">{item['std']}</Table.Cell>
                                            </Table.Row>
                                        )))
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
        setSelectedYear: (year) => dispatch(setSelectedYear(year))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniSurvey)