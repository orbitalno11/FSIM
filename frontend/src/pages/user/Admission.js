import React, { Component, Fragment } from "react";

import {
    Grid,
    Card,
    Container,
    Header,
    Divider
} from "semantic-ui-react";


import Barchart from "../../components/Graph/Bar";
import { setupNoneStackBarChart, setupStackBarChart } from '../../components/Graph/GraphController';
// import { Bar } from "react-chartjs-2";

import { connect } from 'react-redux'
import { selectYear, getYearList } from '../../redux/action/adminAdmissionAction'


import YearSelect from '../../components/YearSelect'

import Axios from "axios";

class Admission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectYear: null,
            countChannel: null,
            countSchool: null,
            compareYear: null,
            countStatus: [],
            countGrade: []
        }
    }

    componentDidMount() {
        this.props.getYearList()
        this.getCountChannel()
        
      
    }

    // handleSeclectYear = async event => {
    //     let value = event.target.value
    //     await this.props.setYear(value)
    //     this.getCountChannel()
    // }

    getCountChannel = () => {
        let { selectedYear } = this.props.admission

        Axios.get(`/admission/analyze?year=${selectedYear}`)
            .then(res => {

                let data = res.data.data

                let countChannel = data['count_channel']
                let countSchool = data['count_by_school']
                let compareYear = data['compare_year'][0]
                let countStatus = data['count_by_status'][0]
                // let countGrade = data.Data
                // console.log(countGrade)

                this.setState({
                    countChannel: setupNoneStackBarChart(countChannel),
                    countSchool: setupStackBarChart(countSchool),
                    compareYear: setupStackBarChart(compareYear),
                    countStatus: setupStackBarChart(countStatus),
                    // countGrade: setupNoneStackBarChart(countGrade)

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

    handleSeclectYear = async event => {
        let value = event.target.value
        if (value === 0)
            value = null
        await this.props.setYear(value)
        this.getCountChannel()
    }

    // setUpDropDown = branch => {
    //     let options = []
    //     for (const item in branch) {
    //         let b = {
    //             key: branch[item].branch_id,
    //             value: branch[item].branch_id,
    //             text: branch[item].branch_name
    //         }
    //         options.push(b)
    //     }
    //     return options.sort()
    // }

    render() {
        let {  countChannel, countSchool, compareYear, countStatus, countGrade } = this.state
        let { selectedYear, yearList } = this.props.admission
        

        return (
            <Fragment>
                <Container >
                    <Header className="my-5" as="h5" textAlign="center">
                        {
                            yearList !== null && (
                                <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                            )
                        }
                    </Header>
                    <Grid textAlign="center">
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                                        2560
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countChannel !== null && (
                                                <Barchart data={countChannel}  />
                                            )
                                        }

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี 2560
                                    </Card.Header>
                                    <Card.Content>
                                        <Barchart data={countStatus} />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        {/* <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา 2560
                                    </Card.Header>
                                    <Card.Content>
                                       {
                                            countGrade !== null && (
                                                <Barchart data={countGrade} legend={{ display: true }}  />
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row> */}
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟแสดง 5 อันดับโรงเรียน 2560
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countSchool !== null && (
                                                <Barchart data={countSchool} legend={{ display: true }} />
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                                        2560 และ 2561
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            compareYear !== null && (
                                                <Barchart data={compareYear} legend={{ display: true }} />
                                            )
                                        }

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

const mapStateToProps = state => (
    {
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        setYear: (year) => dispatch(selectYear(year)),
        getYearList: () => dispatch(getYearList()),
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Admission)