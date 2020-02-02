import React from 'react'
import Index from "./Index";
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from './option/year';
import Faulty from './option/faulty'


class AddNewStudent extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            faulty: 0,
            year: 0,
            files: [],
        }

    }

    handleChangeFaulty = (search) => {
        this.setState({ faulty: search });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search});
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


                <Form style={{ padding: '5%' }}>
                    <Row style={{ textAlign: 'left', alignSelf: 'stretch' }} >
                        <Col sm='3' >
                            <label>ปีที่รับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Year option={this.handleChangeYear} />

                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'left', alignSelf: 'stretch', marginTop: '3%' }} >
                        <Col sm='3'>
                            <label>ภาควิชา</label>
                        </Col>
                        <Col sm='6'>
                            <Faulty option={this.handleChangeFaulty} />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'left', alignSelf: 'stretch', marginTop: '3%' }} >
                        <Col sm='3'>
                            <label>ข้อมูลนักศึกษารับเข้า</label>
                        </Col>
                        <Col sm='9'>
                            <input type="file" />
                            <label className="custom-file-upload">
                                <input type="file" accept=".excel,.csv" onChange={this.onChange} />
                                <FaCloudUploadAlt style={{ color: '#FFFFFF' }} /> UPLOAD CSV FILE </label>
                            {this.state.files.map(x =>
                                <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                            )}
                        </Col>
                    </Row>

                </Form>
            </React.Fragment>


        )
    }
}

export default AddNewStudent