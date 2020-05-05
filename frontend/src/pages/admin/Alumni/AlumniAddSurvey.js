import React, { Component, Fragment, createRef } from 'react'

import { Form, Button, InputGroup, Col } from 'react-bootstrap'

import axios from 'axios'

// redux
import { connect } from 'react-redux'
import { addSurvey } from '../../../redux/action/adminAlumniAction'


class AlumniAddSurvey extends Component {

    constructor(props) {
        super(props)
        let editData = props.editData
        this.state = {
            key: editData != null ? editData['id'] : null,
            educationYear: editData != null ? editData['educationYear'] : null,
            sheetUrl: editData != null ? editData['sheetUrl'] : null,
            tableHeader: editData != null ? editData['tableHeader'] : null,
            headerSelect: editData != null ? editData['tableHeader'] : [],
            personalHeader: editData != null ? editData['tableHeader'] : []
        }

        this.urlRef = React.createRef()
    }

    handleVerifyUrl = () => {
        let url = this.urlRef.current.value
        this.setState({
            tableHeader: null
        })
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

    handlePersonalSelect = event => {
        let value = event.target.value
        let { personalHeader } = this.state
        let arr = personalHeader

        if (arr.includes(value)) {
            const index = arr.indexOf(value)
            if (index > -1) arr.splice(index, 1)
        } else {
            arr.push(value)
        }

        this.setState({
            personalHeader: arr
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        let elements = event.target.elements

        const sheetUrl = elements.sheetUrl.value
        const educationYear = elements.educationYear.value
        const tableHeader = this.state.headerSelect
        const personalHeader = this.state.personalHeader

        const data = {
            year: parseInt(educationYear),
            table_header: tableHeader,
            sheet_url: sheetUrl,
            personal_header: personalHeader
        }

        await this.props.addSurvey(data)
    }

    handleEdit = event => {
        event.preventDefault()
        let elements = event.target.elements

        const sheetUrl = elements.sheetUrl.value
        const educationYear = elements.educationYear.value
        const tableHeader = this.state.headerSelect
        const personalHeader = this.state.personalHeader

        const data = {
            key: this.state.key,
            year: parseInt(educationYear),
            table_header: tableHeader,
            sheet_url: sheetUrl,
            personal_header: personalHeader
        }

        axios.put(`/admin/alumni/survey`, data)
            .then(res => {
                let message = res.data.message
                console.log(message)
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        let { tableHeader, sheetUrl, headerSelect, educationYear, personalHeader } = this.state

        return (
            <Fragment>
                <Form onSubmit={educationYear !== null || sheetUrl !== null ? this.handleEdit : this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>ปีการศึกษา</Form.Label>
                        <InputGroup>
                            <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" defaultValue={educationYear} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ลิงก์ Google Sheet</Form.Label>
                        <InputGroup>
                            <Form.Control id="sheetUrl" type="text" placeholder="วางลิงก์ Google Sheet" ref={this.urlRef} defaultValue={sheetUrl} />
                            <InputGroup.Append>
                                <Button onClick={this.handleVerifyUrl}>ตรวจสอบ</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>เลือกหัวข้อสำหรับข้อมูลส่วนตัว</Form.Label>
                                <div onChange={this.handlePersonalSelect}>
                                    {
                                        tableHeader !== null && tableHeader.map((item, index) => (
                                            <Form.Check
                                                type='checkbox'
                                                value={item}
                                                id={"p-" + index}
                                                label={item}
                                                key={index}
                                                defaultChecked={headerSelect.includes(item)}
                                            />
                                        ))
                                    }
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>เลือกหัวข้อสำหรับการคำนวณความพึงพอใจ</Form.Label>
                                <div onChange={this.handleHeaderSelect}>
                                    {
                                        tableHeader !== null && tableHeader.map((item, index) => (
                                            <Form.Check
                                                type='checkbox'
                                                value={item}
                                                id={"h-" + index}
                                                label={item}
                                                key={index}
                                                defaultChecked={personalHeader.includes(item)}
                                            />
                                        ))
                                    }
                                </div>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button variant="success" type="submit">ยืนยันข้อมูล</Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        alumni: state.admin_alumni
    }
)

const mapDispatchToProps = dispatch => (
    {
        addSurvey: (data) => dispatch(addSurvey(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniAddSurvey)