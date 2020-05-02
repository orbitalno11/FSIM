import React, { Component, Fragment } from 'react'

import axios from 'axios'

import { Table, Button } from 'react-bootstrap'


class AlumniManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            surveyList: null
        }
    }

    componentDidMount() {
        axios.get('/admin/alumni/survey')
            .then(res => {
                let data = res.data.data[0]
                let surList = []
                let surveyKeys = Object.keys(data)

                surveyKeys.forEach(item => {
                    let surData = {
                        ...data[item],
                        id: item
                    }
                    surList.push(surData)
                })

                this.setState({
                    surveyList: surList
                })

            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        let { surveyList } = this.state

        return (
            <Fragment>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>ลำดับ</th>
                            <th>ปีการศึกษา</th>
                            <th>ตารางที่เลือก</th>
                            <th>ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveyList !== null && (
                                surveyList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item['educationYear']}</td>
                                        <td>{item['tableHeader']}</td>
                                        <td>
                                            <Button>แก้ไข</Button>
                                            <Button>ลบ</Button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

export default AlumniManage