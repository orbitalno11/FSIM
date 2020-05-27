import React, { Component, Fragment } from "react";


import {  Button,Container } from 'semantic-ui-react'
import { Table} from 'react-bootstrap'

import { connect } from 'react-redux'
import { getAdmissionList, deleteAdmission } from '../../../redux/action/adminAdmissionAction'

class AdmissionManage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            admissionList: null
        }
    }

    componentDidMount() {
        this.props.getAdmissionList()
    }

    handleDeleteAdmission = (year, round_id, channel_id) => {
        this.props.deleteAdmission(year, round_id, channel_id)
    }

    render() {
        let { admissionList } = this.props.admission
        return (
            <Fragment>
                <Table  responsive   hover>
                    <thead>
                        <tr align="center">
                            <th > ลำดับ </th>
                            <th > ปีการศึกษา </th>
                            <th>รอบรับเข้า</th>
                            <th style={{ width: '50%' }} > โครงการที่รับเข้า </th>
                            <th>ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admissionList !== null && (
                                admissionList.map((item, index) => (
                                    <tr align="center" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item['admission_year']}</td>
                                        <td>{item['round_name']}</td>
                                        <td  >{item['channel_name']}</td>
                                        <td>
                                            <Button color='red' onClick={() => this.handleDeleteAdmission(item['admission_year'], item['round_id'], item['channel_id'])}>ลบ</Button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }


                    </tbody>
                </Table>
                {
                    admissionList == null ? (
                    <Container> <h3 style={{ marginTop: '5%' }} className="text-center">ไม่พบข้อมูล</h3>
                    </Container>) : null}

            </Fragment>
        )
    }
}

const mapStateTpProps = state => (
    {
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAdmissionList: () => dispatch(getAdmissionList()),
        deleteAdmission: (year, round_id, channel_id) => dispatch(deleteAdmission(year, round_id, channel_id))
    }
)

export default connect(mapStateTpProps, mapDispatchToProps)(AdmissionManage)