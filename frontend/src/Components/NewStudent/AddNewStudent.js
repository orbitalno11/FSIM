import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from '../option/year';
import Faulty from '../option/faulty'


class AddNewStudent extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            faulty: 0,
            year: 0,
            files: []

        }
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleSubmit(event) {
        alert("OK")
        let data = this.state
        // alert(data)

        fetch("https://google.com", {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }

    handleChangeFaulty = (search) => {
        // console.log(search.target.value);
        this.setState({ faulty: search.target.value });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search.target.value });
    }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...filesArr] });
    }

    removeFile(f) {
        this.setState({ files: this.state.files.filter(x => x !== f) });
    }


    render() {

        return (
            <React.Fragment>
                <Form style={{ padding: '5%' }} onSubmit={this.handleSubmit}>
                    <Row className="style-addData" >
                        <Col sm='3' >
                            <label>ปีที่รับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Year option={this.handleChangeYear} />

                        </Col>
                    </Row>
                    <Row className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ภาควิชา</label>
                        </Col>
                        <Col sm='6'>

                            <Faulty option={this.handleChangeFaulty} />
                        </Col>
                    </Row>
                    
                    <Row className="style-addData interval-top" >
                        <Col sm='3'>
                            <label>ข้อมูลนักศึกษารับเข้า</label>
                        </Col>
                        <Col sm='9'>
                            <input type="file" />
                            <label className="custom-file-upload">
                                <input type="file" accept=".excel,.csv" onChange={this.onChange} />
                                <FaCloudUploadAlt style={{ color: '#FFFFFF' }} /> UPLOAD CSV FILE </label>
                            {this.state.files.map(x =>
                                <div className="file-preview" onClick={this.removeFile.bind(this, x)} key={x.name}>{x.name}</div>
                            )}
                        </Col>
                    </Row>
                    <div className="style-addData " style={{ marginTop: '5%' }} >
                        <Button
                            className='btn-EditData interval-1'
                            onClick={this.handleSearch}
                        >RESET</Button>

                        <Button
                            type="submit"
                            className='btn-info interval-1'
                            onClick={this.onSubmit}
                        >SUBMIT</Button>

                    </div>

                </Form>
            </React.Fragment>


        )
    }
}

export default AddNewStudent