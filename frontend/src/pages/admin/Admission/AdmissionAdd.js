import React, { Component, Fragment } from "react"

import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'

import axios from 'axios'

import ReactModal from '../../../components/ReactModal'

import { connect } from 'react-redux'
import { addAdmission } from '../../../redux/action/adminAdmissionAction'


class Addadmission extends Component {

    constructor(props) {
        super(props)
        this.state = {
            channel: [],
            selectedFile: null
        }
    }

    componentDidMount() {
        this.fetchChannel()
    }

    componentDidUpdate(prevProps, prevState) {
        let status = this.props.admission.admissionStatus
        if ((prevProps.admissionStatus !== status) && (status === true)) {
            // this.setState({
            //     ...initialState
            // })
            document.getElementById("addData").reset();
        }
    }

    fetchChannel = () => {
        axios.get(`/admission/channel`)
            .then(res => {
                let data = res.data.data
                this.setState({
                    channel: data
                })

            })
            .catch(err => {
                console.error(err)
            })
    }

    handleSelectFile = event => {
        let file = event.target.files[0]
        this.setState({
            selectedFile: file
        })
    }



    handleSubmit = event => {
        event.preventDefault()
        let element = event.target.elements

        let form = new FormData()
        form.append('year', element.year.value)
        form.append('channel', element.channel.value)
        form.append('upload', this.state.selectedFile)
        this.props.addAdmission(form)
    }



    render() {
        let { channel } = this.state

        return (
            <Fragment>
                <ReactModal />
                <Form id="addData" onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            ปีที่รับเข้า
                    </Form.Label>
                        <InputGroup>
                            <FormControl id="year" type="number" placeholder="ระบุปีการศึกษาที่รับเข้า" required ></FormControl>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            โครงการที่รับเข้า
                    </Form.Label>
                        <InputGroup>
                            <FormControl id="channel" as="select" required>
                                <option>กรุณาเลือกโครงการที่รับเข้า</option>
                                {
                                    channel !== null && (
                                        channel.map((item, index) => (
                                            <option value={item.channel_id} key={index}>{item.channel_name}</option>
                                        ))
                                    )
                                }
                            </FormControl>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            ข้อมูลการรับนักศึกษา
                    </Form.Label>
                        <InputGroup>
                            <FormControl onChange={event => this.handleSelectFile(event)} type="file" accept=".excel,.xlsx,.csv">
                            </FormControl>
                        </InputGroup>
                    </Form.Group>
                    <Button type="submit" className="btn-info fs-interval-1" >SUBMIT</Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        admission: state.admin_admission

    }
)

const mapDispatchToProps = dispatch => (
    {
        addAdmission: (data) => dispatch(addAdmission(data))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Addadmission)