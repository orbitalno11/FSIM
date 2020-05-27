import React, { Component, Fragment } from 'react'

import { Button, Container } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getActivityList, delelteActivity } from '../../../redux/action/adminActivityAction'
import { Table } from 'react-bootstrap'

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
                <Table responsive hover>
                    <thead>
                        <tr align="center">
                            <th>ลำดับ</th>
                            <th>ปีการศึกษา</th>
                            <th>ประเภทโครงการ</th>
                            <th>ชื่อกิจกรรม</th>
                            <th>ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activityList !== null ? (
                                activityList.map((item, index) => (
                                    <tr align="center" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item['education_year']}</td>
                                        <td>{item['project_type_name']}</td>
                                        <td>{item['activity_name']}</td>
                                        <td>
                                            <Button color='red' onClick={() => this.handleDeleteActivity(item['activity_id'])}>ลบ</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                    null
                                )
                        }
                    </tbody>
                </Table>
                {
                    activityList !== null ? null : (<Container align="center">
                        <h3 style={{ marginTop: '5%' }} className="text-center">ไม่พบข้อมูล</h3>
                    </Container>)
                }
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