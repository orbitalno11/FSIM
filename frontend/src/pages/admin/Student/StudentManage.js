import React, { Component, Fragment } from 'react'

import { Table, Button } from 'semantic-ui-react'
import {  Modal } from 'react-bootstrap'
import  ReactModal  from '../../../components/ReactModal'



import { connect } from 'react-redux'
import { getEducationList, deleteEducation } from '../../../redux/action/adminStudentAction'
import { openModal } from '../../../redux/action/modalAction'
class ActivityManage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            educationList: null,
        }
    }

    componentDidMount() {
        this.props.getEducationList()
    }

    handleDeleteActivity = (item) => {
        this.props.deleteEducation(item)
    }


    // handleDeleteActivity = (act_id) => {
    //     this.props.delelteActivity(act_id)
    // }

    render() {
        let { educationList } = this.props.student
        return (
            <Fragment>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell> ลำดับ </Table.HeaderCell>
                            <Table.HeaderCell> ปีการศึกษา </Table.HeaderCell>
                            <Table.HeaderCell>ภาควิชา</Table.HeaderCell>
                            <Table.HeaderCell> สาขา </Table.HeaderCell>
                            <Table.HeaderCell>ดำเนินการ</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            educationList !== null ? (
                                educationList.map((item, index) => (
                                    <Table.Row textAlign="center" key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item['education_year']}</Table.Cell>
                                        <Table.Cell>{item['dept_name']}</Table.Cell>
                                        <Table.Cell>{item['branch_name']}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.handleDeleteActivity(item['educationYear'])}>ลบ</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan="5">
                                            <h2 className="text-center">ไม่พบข้อมูล</h2>
                                        </Table.Cell>
                                    </Table.Row>
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
        website: state.website,
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        getEducationList: () => dispatch(getEducationList()),
        deleteEducation: (item) => dispatch(deleteEducation(item)),
     
        // delelteActivity: (act_id) => dispatch(delelteActivity(act_id))
    }
)

export default connect(mapStateTpProps, mapDispatchToProps)(ActivityManage)