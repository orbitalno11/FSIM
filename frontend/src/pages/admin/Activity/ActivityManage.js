import React, { Component, Fragment } from 'react'

import { Table, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getActivityList, delelteActivity } from '../../../redux/action/adminActivityAction'

class ActivityManage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activityList: null
        }
    }

    componentDidMount() {
        this.props.getActivityList()
    }

    handleDeleteActivity = (act_id) => {
        this.props.delelteActivity(act_id)
    }

    render() {
        let { activityList } = this.props.activity

        return (
            <Fragment>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell> ลำดับ </Table.HeaderCell>
                            <Table.HeaderCell> ปีการศึกษา </Table.HeaderCell>
                            <Table.HeaderCell>ประเภทโครงการ</Table.HeaderCell>
                            <Table.HeaderCell> ชื่อกิจกรรม </Table.HeaderCell>
                            <Table.HeaderCell>ดำเนินการ</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
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
                    </Table.Body>
                </Table>
            </Fragment>
        )
    }
}

const mapStateTpProps = state => (
    {
        activity: state.admin_activity
    }
)

const mapDispatchToProps = dispatch => (
    {
        getActivityList: () => dispatch(getActivityList()),
        delelteActivity: (act_id) => dispatch(delelteActivity(act_id))
    }
)

export default connect(mapStateTpProps, mapDispatchToProps)(ActivityManage)