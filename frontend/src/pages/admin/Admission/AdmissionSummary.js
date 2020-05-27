import React, { Component, Fragment } from "react";

import {
    Divider,
    Grid,
    Header,
    Container
} from "semantic-ui-react";
import { Table} from 'react-bootstrap'

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

        return (
            <Fragment>
                <Container>
                    {
                        yearList !== null && (
                            <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                        )
                    }
                    {
                        (admissionTable !== null) ?
                            (
                                <Fragment>
                                    <Grid>
                                        <Grid.Row>
                                            <Header as="h3">จำนวนประเภทการเข้าศึกษาแต่ละสาขาวิชา ของนักศึกษาคณะวิทยาศาสตร์ มจธ.</Header>
                                            <Divider />
                                            <Table responsive   hover>
                                                <thead>
                                                    <tr >
                                                        <th style={{width:'40%'}} >ประเภทการเข้าศึกษา </th>
                                                        {
                                                            admissionTable['branch'].map((item, index) => {
                                                                return (
                                                                    <th className="text-center" key={index} >
                                                                        {item}
                                                                    </th>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        admissionTable !== null && (
                                                            admissionTable['branchData'].map((item, index) => (
                                                                <tr   key={index}>
                                                                    <td>{item[0]}</td>
                                                                    {
                                                                        admissionTable['branch'].map((item1, index) => {
                                                                            return (
                                                                                <td className="text-center" key={index}>{item[1][item1]}</td>
                                                                            )
                                                                        })
                                                                    }

                                                                </tr>
                                                            ))
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </Grid.Row>
                                    </Grid>
                                    <Grid>
                                        <Grid.Row>
                                            <Header as="h3">ค่าเฉลี่ยประเภทการเข้าศึกษาแต่ละสาขาวิชาของนักศึกษาคณะวิทยาศาสตร์ มจธ.</Header>
                                            <Divider />
                                            <Table responsive   hover>
                                                <thead>
                                                    <tr >
                                                        <th style={{width:'40%'}}  >ประเภทการเข้าศึกษา</th>
                                                        <th style={{width:'20%'}} className="text-center">จำนวนคน</th>
                                                        <th style={{width:'20%'}} className="text-center">จำนวนสูงสุด</th>
                                                        <th style={{width:'20%'}} className="text-center">จำนวนต่ำสุด</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        admissionTable['admissionTableTwo'] !== null && (
                                                            admissionTable['admissionTableTwo'].map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item["channel"]}</td>
                                                                    <td className="text-center">{item["count"]}</td>
                                                                    <td className="text-center">{item["max_data"]}</td>
                                                                    <td className="text-center">{item["min_data"]}</td>
                                                                </tr>
                                                            ))
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </Grid.Row>
                                    </Grid>
                                    <Grid>
                                        <Grid.Row>
                                            <Header as="h3">ประเภทการรับเข้าศึกษาของคณะวิทยาศาสตร์ มจธ.</Header>
                                            <Divider />
                                            <Table responsive   hover>
                                                <thead>
                                                    <tr >
                                                        <th width={2} >ประเภทการเข้าศึกษา </th>
                                                        <th width={1} >รวมจำนวนนักศึกษา (คน)</th>
                                                        <th width={1} >ร้อยละ(จากนักศึกษาทั้งหมด)</th>
                                                        <th width={1} >จำนวนนักศึกษาตกออก(คน)</th>
                                                        <th width={1} >ร้อยละนักศึกษาตกออก(จากนักศึกษาแต่ละประเภท)</th>
                                                        <th width={1} >ร้อยละนักศึกษาตกออก(จากนักศึกษาทั้งหมด)</th>
                                                        <th width={1} >จำนวนนักศึกษาติดวิทยาทัณฑ์(คน)</th>
                                                        <th width={1} >ร้อยละของนักศึกษาวิทยาทัณฑ์(จากแต่ละประเภท)</th>
                                                        <th width={1} >ร้อยละนักศึกษาวิทยาทัณฑ์จากนักศึกษาทั้งหมด</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        admissionTable['admissionTableThree'] !== null && (
                                                            admissionTable['admissionTableThree'].map((item, index) => (
                                                                <tr  key={index}>
                                                                    <td>{item[0]}</td>
                                                                    <td>{item[1]["all"]}</td>
                                                                    <td>{item[1]["per_all_student"]}</td>
                                                                    <td>{item[1]["drop"]}</td>
                                                                    <td>{item[1]["per_Type_drop"]}</td>
                                                                    <td>{item[1]["per_Stu_drop"]}</td>
                                                                    <td>{item[1]["probation"]}</td>
                                                                    <td>{item[1]["per_Type_probation"]}</td>
                                                                    <td>{item[1]["per_Stu_probation"]}</td>
                                                                </tr>
                                                            ))
                                                        )
                                                    }
                                                </tbody>
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