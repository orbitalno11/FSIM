import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from '../../option/year';
import Around from '../../option/admission_channel'
import Project from '../../option/project'


class AddNewStudent extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            project: 0,
            channel: 0,
            year: 0,
            files: []


        }


        this.handleSubmit = this.handleSubmit.bind(this)

    }



    handleChangeAround = (search) => {
        // console.log(search.target.value);
        this.setState({ channel: search.target.value });
    }

    handleChangeProject = (search) => {
        // console.log(search.target.value);
        this.setState({ project: search.target.value });
        this.setState({ channel: 0 });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search.target.value });
    }

    onChange(e) {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        this.setState({ files: [...filesArr] });
        alert(this.state.year + " " + this.state.channel + " " + this.state.project)
    }

    removeFile(f) {
        this.setState({ files: this.state.files.filter(x => x !== f) });
    }

    handleReset=(event)=>{
        this.setState({
            project: 0,
            channel: 0,
            year: 0,
            files: []
        });
    }

    handleSubmit(event) {
        alert("OK")
        let data = this.state
        // alert(data)

        fetch("https://...", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }









    render() {

        const project_name = [
            { id: 1, fK: 1, name: "รอบที่ 1/1 โครงการ 2B-KMUTT" },
            { id: 2, fK: 1, name: "รอบที่ 1/1 โครงการ Active Recruitment" },
            { id: 3, fK: 1, name: "รอบที่ 1/1 โครงการคัดเลือกตรง ประเภทเรียนดี" },
            { id: 4, fK: 1, name: "รอบที่ 1/1 โครงการคัดเลือกตรงความสามารถพิเศษ และทุนเพชรพระจอมเกล้า" },
            { id: 5, fK: 1, name: "รอบที่ 1/2 โครงการ Active Recruitment" },
            { id: 6, fK: 1, name: "รอบที่ 1/2 โครงการ Active Recruitment (จากโครงการ I am SCI)" },
            { id: 7, fK: 1, name: "รอบที่ 1/2 โครงการรับนักศึกษาจากโรงเรียนเทคโนโลยีฐานวิทยาศาสตร์ 	" },
            { id: 8, fK: 1, name: "รอบที่ 1/2 โครงการรับนักศึกษาพิการ" },
            { id: 9, fK: 1, name: "รอบที่ 1/2 โครงการรับนักเรียน โครงการ วมว." },
            { id: 10, fK: 1, name: "รอบที่ 1/2 โครงการรับนักเรียน จากมูลนิธิ สอวน." },
            { id: 11, fK: 1, name: "รอบที่ 1/2 โครงการรับนักศึกษาโดยใช้สิทธิ์บุตรบุคลากร ของ มจธ." },
            { id: 12, fK: 2, name: "รอบที่ 2 โครงการคัดเลือกตรงโดยใช้คะแนน GAT/PAT เพื่อผู้เรียนดี มีคุณธรรม (รับนักเรียนเขต* 1,3,4,5,9 เเละกรุงเทพฯ))" },
            { id: 13, fK: 2, name: "รอบที่ 2 โครงการคัดเลือกตรงโดยใช้คะแนน GAT/PAT เพื่อการกระจายโอกาสทางการศึกษา (รับนักเรียนทุกเขต* ยกเว้นเขต 1 เเละกรุงเทพฯ)" },
            { id: 14, fK: 2, name: "รอบที่ 2 โครงการคัดเลือกตรง มจธ. รักษาธรรม เพิ่มโอกาสทางการศึกษา" },
            { id: 15, fK: 2, name: "รอบที่ 2 โครงการคัดเลือกตรงกลุ่ม ปวช." },
            { id: 16, fK: 2, name: "รอบที่ 2 โครงการ Active Recruitment" },
            { id: 17, fK: 3, name: "รอบที่ 3/1 โครงการรับตรงร่วมกัน" },
            { id: 18, fK: 3, name: "รอบที่ 3/2 โครงการรับตรงร่วมกัน" },
            { id: 19, fK: 4, name: "รอบที่ 4 โครงการรับนักศึกษาผ่านระบบ Admissions" },
            { id: 20, fK: 5, name: "รอบที่ 5 โครงการคัดเลือกตรงเพื่อผลิตบุคลากรด้านวิทยาศาสตร์เทคโนโลยีเเละนวัตกรรม (ครั้งที่ 2) ;" }
        ]

        let CheckProject = (num_project) =>
            project_name.filter(function (p) {
                return p.fK == num_project;
            });

            const year=[
                {
                    id:1,
                    name:'2012'
                },
                {
                    id:2,
                    name:'2013'
                }
            ]



        return (

        

            <React.Fragment>

                <Form style={{ padding: '5%' }} onSubmit={this.handleSubmit}>


                    <Row className="style-addData" >
                        <Col sm='3' >
                            <label>ปีที่รับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            {/* <Year option={this.handleChangeYear} value={this.state.year} year={year}/> */}

                        </Col>
                    </Row>
                    <Row className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>โครงการรับเข้า</label>
                        </Col>
                        <Col sm='6'>

                            <Project option={this.handleChangeProject} value={this.state.project}/>
                        </Col>
                    </Row>
                    <Row className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>รอบรับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Around option={this.handleChangeAround} project={CheckProject(this.state.project)} value={this.state.channel} />

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
                            onClick={this.handleReset}
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