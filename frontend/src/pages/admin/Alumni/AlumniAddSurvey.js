import React, { Component, Fragment, createRef } from 'react'

import { Form, Button, InputGroup } from 'react-bootstrap'

import axios from 'axios'


class AlumniAddSurvey extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sheetUrl: null,
            tableHeader: null,
            headerSelect: []
        }

        this.urlRef = React.createRef()
    }

    handleVerifyUrl = () => {
        let url = this.urlRef.current.value
        axios.get(`/admin/readsheet?header=true&sheet_url=${url}`)
            .then(res => {
                let data = res.data.data
                this.setState({
                    tableHeader: data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleHeaderSelect = event => {
        let value = event.target.value
        let { headerSelect } = this.state
        let arr = headerSelect

        if (arr.includes(value)) {
            const index = arr.indexOf(value)
            if (index > -1) arr.splice(index, 1)
        } else {
            arr.push(value)
        }

        this.setState({
            headerSelect: arr
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        let elements = event.target.elements

        const sheetUrl = elements.sheetUrl.value
        const educationYear = elements.educationYear.value
        const tableHeader = this.state.headerSelect

        const data = {
            year: parseInt(educationYear),
            table_header: tableHeader,
            sheet_url: sheetUrl
        }

        axios.post('/admin/alumni/survey/add', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })

    }

    render() {
        let { tableHeader } = this.state
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>ปีการศึกษา</Form.Label>
                        <InputGroup>
                            <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ลิงก์ Google Sheet</Form.Label>
                        <InputGroup>
                            <Form.Control id="sheetUrl" type="text" placeholder="วางลิงก์ Google Sheet" ref={this.urlRef} />
                            <InputGroup.Append>
                                <Button onClick={this.handleVerifyUrl}>ตรวจสอบ</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>เลือกหัวข้อที่ต้องการ</Form.Label>
                        <div onChange={this.handleHeaderSelect}>
                            {
                                tableHeader !== null && tableHeader.map((item, index) => (
                                    <Form.Check
                                        type='checkbox'
                                        value={item}
                                        id={index}
                                        label={item}
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                    </Form.Group>
                    <Button variant="success" type="submit">ยืนยันข้อมูล</Button>
                </Form>
            </Fragment>
        )
    }
}

export default AlumniAddSurvey