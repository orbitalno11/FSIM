import React, { Component, Fragment } from 'react'

import axios from 'axios'

import { Table, Button, Modal ,ButtonGroup} from 'react-bootstrap'

import AlumniAddSurvey from './AlumniAddSurvey'

//redux 
import { connect } from 'react-redux'
import { getSurveyList } from '../../../redux/action/adminAlumniAction'
import {MessageError,MessageSuccess} from '../../../components/MessageAlert'
import { deleteItem } from '../../../redux/action/adminAlumniAction'

class AlumniManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showDelete: false,
            deleteItem: null,
            showEdit: false,
            editData: null,
            messageSuccessAlert : false,
            messageErrorAlert : false,
            statusEdit:null
           
        }
    }

    componentDidMount() {
        this.props.loadSurveyList()
    }

    onDeleteClick = (item) => {
        this.setState({
            showDelete: true,
            deleteItem: item
        })

    }

    handleDelete = async event => {
        let { id, educationYear } = this.state.deleteItem
        const data = {
            index:this.state.index,
            id: id,
            educationYear: educationYear,
        }
        this.setState({
            showDelete: false,
            deleteItem: null
        })

        await this.props.deleteItem(data)
    }

    handleDeleteClose = () => {
        this.setState({
            showDelete: false,
            deleteItem: null
        })
    }

    onEditClick = data => {
        this.setState({
            showEdit: true,
            editData: data
        })

    }

    handleEditClose = () => {
        this.setState({
            showEdit: false,
            editData: null
        })
    }

    checkStatus=(status)=>{
        this.setState({
            showEdit: false,
            statusEdit:status
        })

     
    }

    messageAlert = () => {
        let set_alert=null
        const {statusEdit}=this.state
        if (this.props.status == false || statusEdit==false) {
            set_alert=<MessageError header='บันทึกล้มเหลว' body='กรุณาตรวจสอบการบันทึกอีกครั้ง'  />
            
        }else if(this.props.status == true || statusEdit) {
            set_alert=<MessageSuccess header='บันทึกสำเร็จ' body=''  />
        }
        return set_alert
    }

 
    render() {
        let { deleteItem, showDelete, showEdit, editData, messageSuccessAlert,messageErrorAlert } = this.state

        let { surveyList } = this.props.alumni
        console.log(this.props.status)
        return (
            <Fragment>
              {this.messageAlert()}
                
                {
                    deleteItem !== null && (
                        <Modal
                            size="lg"
                            centered
                            show={showDelete}
                            onHide={this.handleDeleteClose}
                        >
                            <Modal.Header closeButton>
                                <h2>ต้องการลบข้อมูลแบบสอบถาม ปีการศึกษา {deleteItem['educationYear']}</h2>
                            </Modal.Header>
                            <Modal.Body>
                                หากลบข้อมูลแบบสอบถาม ปีการศึกษา {deleteItem['educationYear']} แล้วจะไม่สามารถยกเลิกได้ 
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={this.handleDelete}>ลบ</Button>
                                <Button variant="success" onClick={this.handleDeleteClose}>ยกเลิก</Button>
                            </Modal.Footer>
                        </Modal>
                    )
                }

                {
                    editData !== null && (
                        <Modal
                            size="lg"
                            centered
                            show={showEdit}
                            onHide={this.handleEditClose}
                        >
                            <Modal.Header closeButton>
                                <h2>แก้ไขข้อมูลแบบสอบถาม ปีการศึกษา {editData['educationYear']}</h2>
                            </Modal.Header>
                            <Modal.Body>
                                <AlumniAddSurvey  checkStatus={this.checkStatus}  editData={editData} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={this.handleEditClose}>ยกเลิก</Button>
                            </Modal.Footer>
                        </Modal>
                    )
                }
                <Table >
                    <thead>
                        <tr className="text-center">
                            <th >ลำดับ</th>
                            <th>ปีการศึกษา</th>
                            <th style={{width:'60%'}}>ตารางที่เลือก</th>
                            <th>ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            surveyList !== null && (
                                surveyList.slice(0).reverse().map((item, index) => (
                                   
                                    <tr key={index}>
                                        <td style={{textAlign:'center'}}>{index + 1}</td>
                                        <td style={{textAlign:'center'}}>{item['educationYear']}</td>
                                        <td>
                                        
                                            <ul>
                                                { item['tableHeader'] !== null && item['tableHeader'].map((item,index)=>
                                                <li key={index}>{item}</li>)}
                                            </ul>
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            <ButtonGroup aria-label="Basic example" style={{width:'80%'}}>

                                            <Button size="lg"  variant="warning" onClick={() => this.onEditClick(item)} >แก้ไข</Button>
                                            <Button size="lg"  variant="danger"  onClick={() => this.onDeleteClick(item)} >ลบ</Button>
                                            </ButtonGroup>
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

const mapStateToProps = state => (
    {
        website: state.website,
        alumni: state.admin_alumni,
        status: state.admin_alumni.surveyDeleteStatus
    }
)

const mapDispatchToProps = dispatch => (
    {
        loadSurveyList: () => dispatch(getSurveyList()),
        deleteItem: (data) => dispatch(deleteItem(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps) (AlumniManage)