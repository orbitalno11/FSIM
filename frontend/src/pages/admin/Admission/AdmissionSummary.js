import React, { Component, Fragment } from "react";

import {
    Divider,
    Grid,
    Header,
    Container,
    Table
} from "semantic-ui-react";

import YearSelect from '../../../components/YearSelect'

// redux
import { connect } from 'react-redux'
import { getAdmissionTable, selectYear } from '../../../redux/action/adminAdmissionAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'



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
        this.props.getDepartmentList()
    }

    render() {
        let { admissionTable, selectedYear, yearList } = this.props.admission

        let { departmentList } = this.props.information
        console.log(departmentList)
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
                    {
                        (admissionTable !== null) ?
                            (

                                <Fragment>
                                    <Grid>
                                        <Grid.Row>
                                            <Header as="h3">
                                                จำนวนประเภทการเข้าศึกษาแต่ละสาขาวิชา ของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                   </Header>
                                            <Divider />
                                            <Table celled structured>
                                                <Table.Header>
                                                    <Table.Row active>
                                                        <Table.HeaderCell width={2} textAlign="center">
                                                            ประเภทการเข้าศึกษา
                                           </Table.HeaderCell>
                                                        {
                                                            admissionTable['branch'].map((item, index) => {
                                                                return (
                                                                    <Table.HeaderCell key={index} width={1} textAlign="center">
                                                                        {item}
                                                                    </Table.HeaderCell>
                                                                )
                                                            })
                                                        }

                                                    </Table.Row>
                                                </Table.Header>

                                                <Table.Body>
                                                    {admissionTable !== null && (


                                                        admissionTable['branchData'].map((item, index) => (
                                                            <Table.Row textAlign="center" key={index}>

                                                                <Table.Cell>{item[0]}</Table.Cell>
                                                                {
                                                                    admissionTable['branch'].map((item1, index) => {
                                                                        return (
                                                                            <Table.Cell key={index}>{item[1][item1]}</Table.Cell>
                                                                        )
                                                                    })
                                                                }

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
                                            <Header as="h3">
                                                ค่าเฉลี่ยประเภทการเข้าศึกษาแต่ละสาขาวิชาของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                   </Header>
                                            <Divider />
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
                                                        admissionTable['admissionTableTwo'] !== null && (
                                                            admissionTable['admissionTableTwo'].map((item, index) => (
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
                                            <Header as="h3">
                                                ประเภทการรับเข้าศึกษาของคณะวิทยาศาสตร์ มจธ.
                                   </Header>
                                            <Divider />
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
                                                            จำนวนนักศึกษาตกออก(คน)
                                           </Table.HeaderCell>
                                                        <Table.HeaderCell width={1} textAlign="center">
                                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาแต่ละประเภท)
                                           </Table.HeaderCell>
                                                        <Table.HeaderCell width={1} textAlign="center">
                                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาทั้งหมด)
                                           </Table.HeaderCell>
                                                        <Table.HeaderCell width={1} textAlign="center">
                                                            จำนวนนักศึกษาติดวิทยาทัณฑ์(คน)
                                           </Table.HeaderCell>
                                                        <Table.HeaderCell width={1} textAlign="center">
                                                            ร้อยละของนักศึกษาวิทยาทัณฑ์(จากแต่ละประเภท)
                                           </Table.HeaderCell>
                                                        <Table.HeaderCell width={1} textAlign="center">
                                                            ร้อยละนักศึกษาวิทยาทัณฑ์จากนักศึกษาทั้งหมด
                                           </Table.HeaderCell>


                                                    </Table.Row>
                                                </Table.Header>

                                                <Table.Body>
                                                    {
                                                        admissionTable['admissionTableThree'] !== null && (
                                                            admissionTable['admissionTableThree'].map((item, index) => (
                                                                <Table.Row textAlign="center" key={index}>
                                                                    <Table.Cell>{item[0]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["all"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["per_all_student"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["drop"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["per_Type_drop"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["per_Stu_drop"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["probation"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["per_Type_probation"]}</Table.Cell>
                                                                    <Table.Cell>{item[1]["per_Stu_probation"]}</Table.Cell>
                                                                </Table.Row>
                                                            ))
                                                        )
                                                    }
                                                </Table.Body>
                                            </Table>
                                        </Grid.Row>
                                    </Grid>
                                </Fragment>
                            ) : (<Fragment>
                                <h3 style={{ marginTop: '5%' }} className="text-center">ไม่พบข้อมูล</h3>
                                <p className="text-center"> การวิเคราะห์ในส่วนนี้ต้องรอข้อมูลนักศึกษาเข้าสู่ระบบ </p>
                            </Fragment>
                            )
                    }

                </Container>

            </Fragment>
        )
    }
}
const mapStateToProps = state => (
    {
        admission: state.admin_admission,
        information: state.admin_information
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAdmissionTable: (year) => dispatch(getAdmissionTable(year)),
        setYear: (year) => dispatch(selectYear(year)),
        getDepartmentList: () => dispatch(getDepartmentList())

    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionSummary)