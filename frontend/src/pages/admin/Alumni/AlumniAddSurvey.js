import React, { Component, Fragment, createRef } from 'react'

import { Form, Button, InputGroup, Col } from 'react-bootstrap'

import axios from 'axios'

import {MessageError,MessageSuccess} from '../../../components/MessageAlert'

// redux
import { connect } from 'react-redux'
import { addSurvey } from '../../../redux/action/adminAlumniAction'

const initialState = {
   
    educationYear: null,
    sheetUrl: null,
    tableHeader: null,
    headerSelect: [],
    personalHeader: []
};



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
            personalHeader: editData != null ? editData['personalHeader'] : []
        }
        
        this.urlRef = React.createRef()
    }

   
    componentWillReceiveProps(nextProps){
       if(nextProps.status){
            this.setState({
                ...initialState
            })
            document.getElementById("addData").reset();
       }
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

    messageAlert = () => {
        if (this.props.status == false) {
            return (
                <MessageError header='บันทึกล้มเหลว' body='กรุณาตรวจสอบการบันทึกอีกครั้ง'  />
            )
        }else if(this.props.status == true) {
          
            return (
                <MessageSuccess header='บันทึกสำเร็จ' body=''  />
            )
        }
    }
   
   
    

    render() {
        let { tableHeader, sheetUrl, headerSelect, educationYear, personalHeader } = this.state
        let {editData} = this.props

     
        return (
            <Fragment>
                {this.messageAlert()}
               
                <Form id="addData" onSubmit={educationYear !== null || sheetUrl !== null ? this.handleEdit : this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>ปีการศึกษา</Form.Label>
                        <InputGroup>
                            <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" defaultValue={educationYear} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ลิงก์ Google Sheet</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="sheetUrl" 
                                type="text" 
                                placeholder="วางลิงก์ Google Sheet" 
                                ref={this.urlRef} 
                                defaultValue={sheetUrl} 
                                readOnly={!editData ? false:true} 
                                />
                            <InputGroup.Append   >
                                <Button onClick={this.handleVerifyUrl } disabled={!editData ? false:true} >ตรวจสอบ</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    {editData ? 
                        <p style={{color:'red'}}>หากต้องการแก้ไข ลิงก์ Google Sheet กรุณาลบข้อมูลและกรอกข้อมูลใหม่</p>
                        :null}
                    <Form.Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>เลือกหัวข้อสำหรับข้อมูลส่วนตัว</Form.Label>
                                <div onChange={this.handlePersonalSelect}>
                                    {
                                        !editData ?
                                        (tableHeader !== null && tableHeader.map((item, index) => (
                                            <Form.Check
                                                type='checkbox'
                                                value={item}
                                                id={"p-" + index}
                                                label={item}
                                                key={index}
                                                defaultChecked={headerSelect.includes(item)
                                                }
                                            />
                                        )))
                                        :
                                        (personalHeader !== null && personalHeader.map((item, index) => (
                                            <Form.Check
                                                type='checkbox'
                                                value={item}
                                                id={"p-" + index}
                                                label={item}
                                                key={index}
                                                defaultChecked={headerSelect.includes(item)}
                                            />
                                        )))
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
        alumni: state.admin_alumni,
        status: state.admin_alumni.surveyActionStatus
    }
)

const mapDispatchToProps = dispatch => (
    {
        addSurvey: (data) => dispatch(addSurvey(data)),
        
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniAddSurvey)