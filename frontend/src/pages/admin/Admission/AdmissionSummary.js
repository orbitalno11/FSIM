import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Table
} from "semantic-ui-react";

import YearSelect from '../../../components/YearSelect'

// redux
import {connect} from 'react-redux'
import { getAdmissionTable,getAdmissionTableTwo,getAdmissionTableThree, selectYear } from '../../../redux/action/adminAdmissionAction'



const option = {
    scales: {
        xAxes: [{
            ticks: {
                display: false
            }
        }]
    }
}


class AdmissionSummary extends Component {

    componentDidMount() {
        this.getData()
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.admission
        this.props.getAdmissionTable(selectedYear)
        this.props.getAdmissionTableThree()
        this.props.getAdmissionTableTwo()
        
    }

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         admissionTable: null,
    //         admissionTableThree: null,
    //         admissionTableTwo: null
    //     }
    // }

    // componentDidMount() {
    //     this.props.getAdmissionTable()
    //     this.props.getAdmissionTableThree()
    //     this.props.getAdmissionTableTwo()
    // }
    // handleSeclectYear = async event => {
    //     let value = event.target.value
    //     await this.props.setYear(value)
    //     this.getData()
    // }
  
    render() {
        let { admissionTable,admissionTableTwo,admissionTableThree, selectedYear,yearList } = this.props.admission
        return (
            <Fragment>
                 <Container>
                 <Header as="h5" textAlign="center">
                        
                        {
                        yearList !== null && (
                            <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                        )
                    }
                    </Header>
                        <Divider/>
                     <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                จำนวนประเภทการเข้าศึกษาแต่ละสาขาวิชา ของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            เคมี
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            คณิตศาสตร์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            สถิติ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาการคอมพิวเตอร์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ฟิสิกส์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จุลชีววิทยา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาศาสตร์และเทคโนโลยีการอาหาร
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                {
                                    admissionTable !== null && (
                                        admissionTable.map((item, index) => (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell>{item[0]}</Table.Cell>
                                                <Table.Cell>{item[1]["เคมี "]}</Table.Cell>
                                                <Table.Cell>{item[1]["คณิตศาสตร์ "]}</Table.Cell>
                                                <Table.Cell>{item[1]["สถิติ "]}</Table.Cell>
                                                <Table.Cell>{item[1]["วิทยาการคอมพิวเตอร์ประยุกต์ "]}</Table.Cell>
                                                <Table.Cell>{item[1]["ฟิสิกส์ประยุกต์ (หลักสูตรสองภาษา) "]}</Table.Cell>
                                                <Table.Cell>{item[1]["จุลชีววิทยา "]}</Table.Cell>
                                                <Table.Cell>{item[1]["วิทยาศาสตร์และเทคโนโลยีการอาหาร "]}</Table.Cell>
                                            </Table.Row>
                                        ))
                                    )
                                }
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ค่าเฉลี่ยประเภทการเข้าศึกษาแต่ละสาขาวิชาของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            จำนวนคน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Max
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Min
                                        </Table.HeaderCell>
                                    
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                {
                                    admissionTableTwo !== null && (
                                        admissionTableTwo.map((item, index) => (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell>{item["channel"]}</Table.Cell>
                                                <Table.Cell>{item["count"]}</Table.Cell>
                                                <Table.Cell>{item["max_data"]}</Table.Cell>
                                                <Table.Cell>{item["min_data"]}</Table.Cell>
                                            </Table.Row>
                                        ))
                                    )
                                }
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>   
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ประเภทการรับเข้าศึกษาของคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            รวมจำนวนนักศึกษา (คน)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละ(จากนักศึกษาทั้งหมด)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาตกออก(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาทั้งหมด)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาติดวิทยาทัณฑ์(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละของนักศึกษาวิทยาทัณฑ์(จากแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาวิทยาทัณฑ์จากนักศึกษาทั้งหมด​
                                        </Table.HeaderCell>

                                     
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                {
                                    admissionTableThree !== null && (
                                        admissionTableThree.map((item, index) => (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell>{item[0]}</Table.Cell>
                                                <Table.Cell>{item[1]["all"]}</Table.Cell>
                                                <Table.Cell>{item[1]["per_all_student"]}</Table.Cell>
                                                <Table.Cell>{item[1]["ตกออก"]}</Table.Cell>
                                                <Table.Cell>{item[1]["per_Type_ตกออก"]}</Table.Cell>
                                                <Table.Cell>{item[1]["per_Stu_ตกออก"]}</Table.Cell>
                                                <Table.Cell>{item[1]["วิทยาฑัณฑ์"]}</Table.Cell>
                                                <Table.Cell>{item[1]["per_Type_วิทยาฑัณฑ์"]}</Table.Cell>
                                                <Table.Cell>{item[1]["per_Stu_วิทยาฑัณฑ์"]}</Table.Cell>
                                            </Table.Row>
                                        ))
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
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAdmissionTable: (year) => dispatch(getAdmissionTable(year)),
        getAdmissionTableTwo: () => dispatch(getAdmissionTableTwo()),
        getAdmissionTableThree: () => dispatch(getAdmissionTableThree()),
        setYear: (year) => dispatch(selectYear(year))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionSummary)