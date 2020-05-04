import React, { Component, Fragment } from 'react'

import axios from 'axios'

import { Table, Button, Modal } from 'react-bootstrap'

import AlumniAddSurvey from './AlumniAddSurvey'

//redux 
import { connect } from 'react-redux'
import { getSurveyList } from '../../../redux/action/adminAlumniAction'

class AlumniManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showDelete: false,
            deleteItem: null,
            showEdit: false,
            editData: null
        }
    }

    componentDidMount() {
        this.props.loadSurveyList()
    }

    onDeleteClick = item => {
        console.log(item)
        this.setState({
            showDelete: true,
            deleteItem: item
        })
    }

    handleDelete = () => {
        let { id } = this.state.deleteItem

        axios.delete(`/admin/alumni/survey?key=${id}`)
            .then(res => {
                let message = res.data.message
                console.log(message)
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleDeleteClose = () => {
        this.setState({
            showDelete: false,
            deleteItem: null
        })
    }

    onEditClick = data => {
        console.log(data)
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

    render() {
        let { deleteItem, showDelete, showEdit, editData } = this.state

        let { surveyList } = this.props.alumni

        return (
            <Fragment>
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
                                <AlumniAddSurvey editData={editData} />
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
                                        <td>{item['tableHeader']}</td>
                                        <td>
                                            <Button onClick={() => this.onEditClick(item)}>แก้ไข</Button>
                                            <Button onClick={() => this.onDeleteClick(item)}>ลบ</Button>
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
        alumni: state.admin_alumni
    }
)

const mapDispatchToProps = dispatch => (
    {
        loadSurveyList: () => dispatch(getSurveyList())
    }
)

export default connect(mapStateToProps, mapDispatchToProps) (AlumniManage)