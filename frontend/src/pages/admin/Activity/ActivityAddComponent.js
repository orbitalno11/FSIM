import React from 'react'

import { FormControl, Button, Form, InputGroup } from 'react-bootstrap'

import { useSelector } from 'react-redux'

export const AddActivityData = ({ submit }) => {
    let { projectList } = useSelector(state => state.admin_activity)
    return (
        <div>
            <Form id="addActivity" onSubmit={submit}>
                <Form.Group>
                    <Form.Label>ปีการศึกษา</Form.Label>
                    <InputGroup>
                        <Form.Control id="educationYear" type="number" placeholder="ระบุปีการศึกษา" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ประเภทโครงการ</Form.Label>
                    <InputGroup>
                        <FormControl id="projectId" as="select" required>
                            <option value="">กรุณาเลือกประเภทโครงการ</option>
                            {
                                projectList !== null && (
                                    projectList.map((item, index) => (
                                        <option key={index} value={item['project_id']}>{item['project_name']}</option>
                                    ))
                                )
                            }
                        </FormControl>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        รหัสกิจกรรม (ไม่เกิน 10 ตัวอักษร)
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityId" type="text" placeholder="กรุณาใส่รหัสกิจกรรม" maxLength="10" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ชื่อกิจกรรม
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityName" type="text" placeholder="กรุณาใส่ชื่อกิจกรรม" required />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        งบประมาณ
                </Form.Label>
                    <InputGroup>
                        <Form.Control id="activityBudget" type="number" step="0.01" placeholder="กรุณาใส่งบประมาณ" required />
                    </InputGroup>
                </Form.Group>
                <Button type="submit" className="btn-info fs-interval-1" >SUBMIT</Button>
            </Form>
        </div>
    )
}

export const UploadPaticipant = ({ selectFile, submit }) => {
    let { activityList } = useSelector(state => state.admin_activity)
    return (
        <div>
            <Form id="UploadActivity" onSubmit={submit}>
                <Form.Group>
                    <Form.Label>ชื่อกิจกรรม</Form.Label>
                    <InputGroup>
                        <FormControl id="activityDetail" as="select" required>
                            <option value="">กรุณาเลือกกิจกรรม</option>
                            {
                                activityList !== null && (
                                    activityList.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item['activity_name']}</option>
                                    ))
                                )
                            }
                        </FormControl>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ไฟล์รายชื่อผู้เข้าร่วมกิจกรรม
                    </Form.Label>
                    <InputGroup>
                        <FormControl id="file" type="file" accept=".xlsx, .xls" onChange={selectFile} required>
                        </FormControl>
                    </InputGroup>
                </Form.Group>
                <Button type="submit" className="btn-info fs-interval-1" >SUBMIT</Button>
            </Form>
        </div>
    )
}