import React, { Component, Fragment } from 'react'

import { Container, Row, Col, FormControl, Form, InputGroup, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


class DepartmentManagement extends Component {

    constructor(props){
        super(props)

        this.state = {
            selectedDept: null
        }
    }

    componentDidMount() {
        this.props.getDepartmentList()
    }

    handleDeptSelect = event => {
        let value = event.target.value
        let { departmentList } = this.props.information

        let result = departmentList.find( item => item['dept_id'] === value)

        this.setState({
            selectedDept: result
        })
    }

    render() {
        let { departmentList } = this.props.information
        let { selectedDept } = this.state
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col ex={12}>
                            <FormControl as="select" custom onChange={this.handleDeptSelect}>
                                {
                                    departmentList !== null && (
                                        departmentList.map((item, index) => (
                                            <option key={index} value={item['dept_id']}>{item['dept_name']}</option>
                                        ))
                                    )
                                }
                            </FormControl>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={12}>
                            <Form>
                                <h2 className="fs-tx-sub-hd">ชื่อภาควิชา</h2>
                                <InputGroup className="w-100">
                                    <Form.Control type="text" placeholder="ชื่อภาควิชา" required defaultValue={selectedDept !== null ? selectedDept['dept_name'] : null} />
                                    <InputGroup.Append>
                                        <Button variant="success">บันทึก</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        information: state.admin_information
    }
)

const mapDispatchToProps = dispatch => (
    {
        getDepartmentList: () => dispatch(getDepartmentList())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentManagement)