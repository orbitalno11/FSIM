import React, { Component, Fragment } from "react"

import {Form,InputGroup,FormControl,Button} from 'react-bootstrap'

import axios from 'axios'

import ReactModal from '../../../components/ReactModal'

import { connect } from 'react-redux'
import { addAdmission } from '../../../redux/action/adminAdmissionAction'

const AddTab = () => (
    <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>
                    ปีที่รับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกโครงการที่รับเข้า</option>
                        {/* {list.map(item => (<option value={item.id} key={item.id}>{item.name}</option>))} */}
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    รอบรับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกรอบที่รับเข้า</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    โครงการที่รับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกโครงการที่รับเข้า</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลการรับนักศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".excel,.xlsx,.csv">
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button className="btn-EditData interval-1" >RESET</Button>
            <Button className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)

export default AddTab

// const AddAdmissionData = ({ submit, admission_list , selectFile }) => {
//     return (
//         <Fragment>
//             <Form onSubmit={submit}>
//                 <Form.Group>
//                     <Form.Label>ปีการศึกษา</Form.Label>
//                     <InputGroup>
//                         <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" required />
//                     </InputGroup>
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>รอบรับเข้า</Form.Label>
//                     <InputGroup>
//                         <FormControl id="projectId" as="select" required>
//                             <option>กรุณาเลือกรอบรับเข้า</option>
//                             {
//                                 admission_list !== null && (
//                                     admission_list.map((item, index) => (
//                                         <option key={index} value={item['round_id']}>{item['round_name']}</option>
//                                     ))
//                                 )
//                             }
//                         </FormControl>
//                     </InputGroup>
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>
//                         โครงการที่รับเข้า
//                 </Form.Label>
//                     <InputGroup>
//                         <Form.Control id="admissionName" type="text" placeholder="กรุณาใส่ชื่อกิจกรรม" required />
//                     </InputGroup>
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>
//                         ไฟล์ข้อมูลการรับนักศึกษา
//                 </Form.Label>
//                     <InputGroup>
//                         <FormControl id="file" type="file" accept=".xlsx, .xls" onChange={event => selectFile(event)}>
//                         </FormControl>
//                     </InputGroup>
//                 </Form.Group>
//                 <Button type="reset" className="btn-EditData interval-1" >RESET</Button>
//                 <Button type="submit" className="btn-info interval-1" >SUBMIT</Button>
//             </Form>
//         </Fragment>
//     )
// }

// class Addadmission extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             project_type: null,
//             tabKey: '1',
//             selectedFile: null
//         }
//     }

//     componentDidMount() {
//         this.getProjectType()
//     }

//     getProjectType = () => {
//         axios.get('/admin/activity/project/type')
//             .then(res => {
//                 let data = res.data.data

//                 if (data.length < 1) return

//                 this.setState({
//                     project_type: data
//                 })
//             })
//             .then(err => {
//                 console.error(err)
//             })
//     }

//     handleProjectSubmit = event => {
//         event.preventDefault()
//         let element = event.target.elements

//         let data = {
//             project_id: element.project_id.value,
//             project_name: element.project_name.value,
//             project_type: parseInt(element.project_type.value)
//         }

//         this.props.addProject(data)
//     }

//     handleActivitySubmit = event => {
//         event.preventDefault()
//         let element = event.target.elements

//         let form = new FormData()
//         form.append('activity_id', `${element.projectId.value}_${element.activityId.value}`)
//         form.append('project_id', element.projectId.value)
//         form.append('activity_name', element.activityName.value)
//         form.append('budget', parseFloat(element.activityBudget.value))
//         form.append('year', parseInt(element.educationYear.value))
//         form.append('upload', this.state.selectedFile)

//         this.props.addActivity(form)
//     }

//     handleSelectFile = event => {
//         let file = event.target.files[0]
//         this.setState({
//             selectedFile: file
//         })
//     }


//     render() {
//         let { project_type } = this.state

//         let { projectList } = this.props.activity

//         let tabDetail = null

//         let tabName = [
//             {
//                 tabId: '1',
//                 tabTitle: 'กิจกรรม'
//             },
//             {
//                 tabId: '2',
//                 tabTitle: 'โครงการใหม่'
//             }
//         ]

//         if (project_type !== null) {
//             tabDetail = [
//                 {
//                     tabId: '1',
//                     tabDetail: <AddActivityData project_list={projectList} submit={this.handleActivitySubmit} selectFile={this.handleSelectFile} />
//                 },
//                 {
//                     tabId: '2',
//                     tabDetail: <AddProject project_type={project_type} onSubmit={this.handleProjectSubmit} />
//                 }
//             ]
//         }

//         return (
//             <Fragment>
//                 <ReactModal />
//                 <div className="my-2 w-100 mx-auto">
//                     <Container fluid>
//                         {
//                             tabDetail !== null && (
//                                 <SideTab startKey={"1"} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />
//                             )
//                         }
//                     </Container>
//                 </div>
//             </Fragment>
//         )
//     }
// }

// const mapStateToProps = state => (
//     {
//         admission: state.admin_admission
//     }
// )

// const mapDispatchToProps = dispatch => (
//     {
//         addAdmission: (data) => dispatch(addAdmission(data))
//     }
// )

// export default connect(mapStateToProps, mapDispatchToProps)(Addadmission)