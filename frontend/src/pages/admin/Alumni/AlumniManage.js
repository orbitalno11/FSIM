import React, { Component, Fragment } from 'react'

import axios from 'axios'

import { Table, Button, Modal } from 'react-bootstrap'

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
            index : null,
            alert : {
                header : '',
                body : '',
            }
        }
    }

    componentDidMount() {
        this.props.loadSurveyList()
    }

    onDeleteClick = (item,index) => {
        this.setState({
            showDelete: true,
            deleteItem: item,
            index:index
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

    checkStatus=(type,status)=>{
        this.setState({
            showEdit: false,
        })

        if(status){
            this.setState({
                messageSuccessAlert:true,
                alert:{
                    header:"แก้ไขสำเร็จ"
                }
            })
        }else{
            this.setState({
                messageErrorAlert:true,
                alert:{
                    header:"แก้ไขล้มเหลว",
                    body:"กรุณาลองใหม่อีกครั้ง"
                }
            })
        }
        
    }

    messageAlert = () => {
        let set_alert=null
        if (this.props.status == false) {
            set_alert=<MessageError header='บันทึกล้มเหลว' body='กรุณาตรวจสอบการบันทึกอีกครั้ง'  />
            
        }else if(this.props.status == true) {
            set_alert=<MessageSuccess header='บันทึกสำเร็จ' body=''  />
        }
        return set_alert
    }

 
    render() {
        let { deleteItem, showDelete, showEdit, editData, messageSuccessAlert,messageErrorAlert } = this.state

        let { surveyList } = this.props.alumni
        
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
                            <Modal.Body>
                                <h1>ต้องการลบข้อมูลแบบสอบถาม ปีการศึกษา {deleteItem['educationYear']}</h1>
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
                                <h1>แก้ไขข้อมูลแบบสอบถาม ปีการศึกษา {editData['educationYear']}</h1>
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
                                        <td>{item.tableHeader}</td>
                                        <td>
                                            <Button onClick={() => this.onEditClick(item)}>แก้ไข</Button>
                                            <Button onClick={() => this.onDeleteClick(item,index)}>ลบ</Button>
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