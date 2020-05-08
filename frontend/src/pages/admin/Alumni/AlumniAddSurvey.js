import React, { Component, Fragment, createRef } from 'react'

import { Form, Button, InputGroup, Col } from 'react-bootstrap'

import axios from 'axios'

import { MessageError, MessageSuccess } from '../../../components/MessageAlert'

// redux
import { connect } from 'react-redux'
import { addSurvey } from '../../../redux/action/adminAlumniAction'

import { startLoading, stopLoading } from '../../../redux/action/generalAction'

const initialState = {

    educationYear: null,
    sheetUrl: null,
    tableHeader: null,
    headerSelect: [],
    personalHeader: [],

};

const  list_personal= [{
    name_th: 'รหัสนักศึกษา',
    name_en: 'idStudent'
    
},{
    name_th: 'คะแนนเฉลี่ยตลอดหลักสูตร (GPAX)',
    name_en: 'gpax'
},{
    name_th: 'หลักสูตร',
    name_en: 'branch'
},
{
    name_th: 'ชื่อหน่วยงาน / บริษัท',
    name_en: 'company'
},
{
    name_th: 'สถานะการทำงาน(Ex: ทำงานแล้ว,..)',
    name_en: 'status'
},
{
    name_th: 'ชื่อตำแหน่งงาน',
    name_en: 'position'
},
{
    name_th: 'เงินเดือนหรือรายได้เฉลี่ยต่อเดือน',
    name_en: 'salary'
},
{
    name_th: 'ชื่อสถาบันที่ท่านศึกษาต่อ',
    name_en: 'nameUniver'
},
{
    name_th: 'คณะวิชา(ที่ศึกษาต่อ)',
    name_en: 'Adep'
},
{
    name_th: 'สาขาวิชา(ที่ศึกษาต่อ)',
    name_en: 'Abranch'
},
{
    name_th: 'รูปแบบการฝึกงาน',
    name_en: 'typeTraining'
}
]



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
            personalHeader: editData != null ? editData['personalHeader'] : [],
            editVerify: editData != null ? true : false,
            list_person:{
                idStudent : null,
                gpax:null,
                branch:null,
                company:null,
                status:null,
                position:null,
                salary:null,
                nameUniver:null,
                Adep:null,
                Abranch:null,
                typeTraining:null
            }
           
        }

        this.urlRef = React.createRef()
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.status) {
            this.setState({
                ...initialState
            })
            document.getElementById("addData").reset();
        }
    }


    handleVerifyUrl = async () => {
        await this.props.startLoading()
        let url = this.urlRef.current.value
        this.setState({
            tableHeader: null
        })

        axios.get(`/admin/readsheet?header=true&sheet_url=${url}`)
            .then(res => {
                let data = res.data.data
                this.setState({
                    tableHeader: data,
                    editVerify: false
                })
                this.props.stopLoading()
            })
            .catch(err => {
                console.error(err)
                this.props.stopLoading()
            })


    }

    handleHeaderSelect = event => {
        let value = event.target.value
        let { headerSelect, editVerify } = this.state
        let arr = headerSelect
        if (!editVerify) {
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
    }

    // handlePersonalSelect = event => {
    //     let value = event.target.value
    //     let { personalHeader, editVerify } = this.state
    //     let arr = personalHeader

    //     if (!editVerify) {
    //         if (arr.includes(value)) {
    //             const index = arr.indexOf(value)
    //             if (index > -1) arr.splice(index, 1)
    //         } else {
    //             arr.push(value)
    //         }

    //         this.setState({
    //             personalHeader: arr
    //         })
    //     }
    // }

    handleSubmit = async event => {
        event.preventDefault()
        let elements = event.target.elements
        const {list_person} = this.state
        const sheetUrl = elements.sheetUrl.value
        const educationYear = elements.educationYear.value
        const tableHeader = this.state.headerSelect
        const personalHeader = this.state.personalHeader  
        
        let list_p = [list_person.idStudent,
            list_person.gpax,
            list_person.branch,
            list_person.company,
            list_person.status,
            list_person.position,
            list_person.salary,
            list_person.nameUniver,
            list_person.Adep,
            list_person.Abranch,
            list_person.typeTraining]
       
        const data = {
            year: parseInt(educationYear),
            table_header: tableHeader,
            sheet_url: sheetUrl,
            personal_header: list_p
        }

        this.setState({
            personalHeader:list_p
        })

        await this.props .addSurvey(data)
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
                // console.log(message)
                this.props.checkStatus(true)
            })
            .catch(err => {
                // console.error(err)
                this.props.checkStatus(false)
            })

    }

    messageAlert = () => {
        let set_alert = null
        if (this.props.status == false) {
            set_alert = <MessageError header='บันทึกล้มเหลว' body='กรุณาตรวจสอบการบันทึกอีกครั้ง' />

        } else if (this.props.status == true) {
            set_alert = <MessageSuccess header='บันทึกสำเร็จ' body='' />
        }
        return set_alert
    }


    handleFormChange = (e) => {
        const { name, value ,id} = e.target;
       
    
        let list_p = Object.assign({}, this.state.list_person);
        list_p[name] = value;
        this.setState({list_person: list_p});
       
        
    }






    render() {
        let { tableHeader, sheetUrl, headerSelect, educationYear, idStudent, personalHeader, editVerify} = this.state
        let { editData } = this.props
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
                                readOnly={!editData ? false : true}
                                required
                            />
                            <InputGroup.Append   >
                                <Button onClick={this.handleVerifyUrl} >ตรวจสอบ</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    {editData ?
                        <p style={{ color: 'red' }}>หากต้องการแก้ไข ลิงก์ Google Sheet กรุณาลบข้อมูลและกรอกข้อมูลใหม่</p>
                        : null}
                    <Form.Row >
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>เลือกหัวข้อสำหรับข้อมูลส่วนตัว</Form.Label>
                                {/* <div onChange={this.handlePersonalSelect}> */}
                                <div onChange={this.handleFormChange}>
                                    { 
                                    tableHeader !== null &&list_personal.map((item, index) => (
                                        <Form.Group
                                            style={{ width: '70%' }}
                                           >
                                            <Form.Label>{item.name_th}</Form.Label>
                                            <Form.Control  key={index} id={index} name={item.name_en} defaultValue={idStudent} as="select">
                                                <option value='0'>กรุณาเลือก{item.name_th}</option>
                                                {
                                                     tableHeader !== null && tableHeader.map((item, index) => (
                                                        <option value={item} key={index}>{item}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>))
                                    }


                                </div>

                                {

                                    // !editVerify 
                                    // ?

                                    // (
                                    //      tableHeader!== null && tableHeader.map((item, index) => (
                                    //     <Form.Check
                                    //         type='checkbox'
                                    //         value={item}
                                    //         id={"p-" + index}
                                    //         label={item}
                                    //         key={index}
                                    //         defaultChecked={personalHeader.includes(item)
                                    //         }
                                    //     />

                                    // )
                                    // ))
                                    // :
                                    // ( tableHeader!== null && personalHeader.map((item, index) => (
                                    //     <Form.Check
                                    //         type='checkbox'
                                    //         value={item}
                                    //         id={"p-" + index}
                                    //         label={item}
                                    //         key={index}
                                    //         defaultChecked={personalHeader.includes(item)
                                    //         }
                                    //     />
                                    // )))
                                }

                                {/* </div> */}
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
                                                defaultChecked={headerSelect.includes(item)}
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
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading())

    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniAddSurvey)