import React, { Component, Fragment } from "react";


import { Table, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAdmissionList, deleteAdmission} from '../../../redux/action/adminAdmissionAction'

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

    handleDeleteAdmission = (year,round_id,channel_id) => {
        this.props.deleteAdmission(year,round_id,channel_id)
    }

    render() {
        let { admissionList } = this.props.admission
        return (
            <Fragment>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell > ลำดับ </Table.HeaderCell>
                            <Table.HeaderCell > ปีการศึกษา </Table.HeaderCell>
                            <Table.HeaderCell>รอบรับเข้า</Table.HeaderCell>
                            <Table.HeaderCell style={{width:'50%'}} > โครงการที่รับเข้า </Table.HeaderCell>
                            <Table.HeaderCell>ดำเนินการ</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            admissionList !== null && (
                                admissionList.map((item, index) => (
                                    <Table.Row textAlign="center" key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item['admission_year']}</Table.Cell>
                                        <Table.Cell>{item['round_name']}</Table.Cell>
                                        <Table.Cell textAlign="left">{item['channel_name']}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.handleDeleteAdmission(item['admission_year'],item['round_id'],item['channel_id'])}>ลบ</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )
                        }
                    </Table.Body>
                </Table>
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
        deleteAdmission: (year,round_id,channel_id) => dispatch(deleteAdmission(year,round_id,channel_id))
    }
)

export default connect(mapStateTpProps, mapDispatchToProps)(AdmissionManage)