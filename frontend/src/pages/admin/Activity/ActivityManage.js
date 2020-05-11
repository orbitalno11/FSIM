import React, { Component, Fragment } from 'react'

import { Table, Button } from 'semantic-ui-react'

import axios from 'axios'

class ActivityManage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activityList: null
        }
    }

    componentDidMount() {
        axios.get('/admin/activity/list')
            .then(res => {
                let data = res.data.data

                console.log(data)

                if (data.length < 1) return

                this.setState({
                    activityList: data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleDeleteActivity = (act_id, project_type) => {
        // axios.delete(`/admin/activity?act_id=${act_id}&project_type=${project_type}`)
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.error(err)
        // })
    }

    render() {
        let { activityList } = this.state
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
                            activityList !== null && (
                                activityList.map((item, index) => (
                                    <Table.Row textAlign="center" key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item['education_year']}</Table.Cell>
                                        <Table.Cell>{item['project_type_name']}</Table.Cell>
                                        <Table.Cell>{item['activity_name']}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.handleDeleteActivity(item['activity_id'], item['project_type'])}>ลบ</Button>
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

export default ActivityManage