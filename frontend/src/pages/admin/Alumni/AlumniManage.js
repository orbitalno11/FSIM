import React, { Component, Fragment } from 'react'

import { Table, Button, Modal, ButtonGroup } from 'react-bootstrap'

import AlumniAddSurvey from './AlumniAddSurvey'
import ReactModal from '../../../components/ReactModal'

//redux 
import { connect } from 'react-redux'
import { getSurveyList } from '../../../redux/action/adminAlumniAction'
import { deleteItem } from '../../../redux/action/adminAlumniAction'
import { openModal } from '../../../redux/action/modalAction'

class AlumniManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showDelete: false,
            deleteItem: null,
            showEdit: false,
            editData: null,
            messageSuccessAlert: false,
            messageErrorAlert: false,
            statusEdit: null

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
            index: this.state.index,
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

    checkStatus = (status) => {
        this.setState({
            showEdit: false,
            statusEdit: status
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { statusEdit } = this.state
        if (prevState.statusEdit !== statusEdit) {
            if (statusEdit === false) {
                this.props.openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }])
                this.setState({ statusEdit: null })
            } else if (statusEdit) {
                this.props.openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }])
                this.setState({ statusEdit: null })
            }
        }
    }

    render() {
        let { deleteItem, showDelete, showEdit, editData } = this.state

        let { surveyList } = this.props.alumni
        return (
            <Fragment>
                <ReactModal />
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
                                <AlumniAddSurvey checkStatus={this.checkStatus} editData={editData} />
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
                            <th>ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveyList !== null ? (
                                surveyList.slice(0).reverse().map((item, index) => (

                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{item['educationYear']}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <ButtonGroup aria-label="Basic example" style={{ width: '80%' }}>

                                                <Button size="lg" variant="warning" onClick={() => this.onEditClick(item)} >แก้ไข</Button>
                                                <Button size="lg" variant="danger" onClick={() => this.onDeleteClick(item)} >ลบ</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center"><h2>ไม่พบข้อมูล</h2></td>
                                    </tr>
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
        deleteItem: (data) => dispatch(deleteItem(data)),
        openModal: (bool, data) => dispatch(openModal(bool, data)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlumniManage)