import React, { Component, Fragment } from 'react'

import { Table, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getEducationList } from '../../../redux/action/adminStudentAction'

class ActivityManage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            educationList: null
        }
    }

    componentDidMount() {
        this.props.getEducationList()
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
                            <Table.HeaderCell> ไฟล์ </Table.HeaderCell>
                            <Table.HeaderCell>ดำเนินการ</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {/* <Table.Body>
                        {
                            activityList !== null ? (
                                activityList.map((item, index) => (
                                    <Table.Row textAlign="center" key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item['education_year']}</Table.Cell>
                                        <Table.Cell>{item['project_type_name']}</Table.Cell>
                                        <Table.Cell>{item['activity_name']}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.handleDeleteActivity(item['activity_id'])}>ลบ</Button>
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
                    </Table.Body> */}
                </Table>
            </Fragment>
        )
    }
}

const mapStateTpProps = state => (
    {
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        getEducationList: () => dispatch(getEducationList()),
        // delelteActivity: (act_id) => dispatch(delelteActivity(act_id))
    }
)

export default connect(mapStateTpProps, mapDispatchToProps)(ActivityManage)