import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row ,Container} from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import CheckT from '../option/checkT';
import Education from '../option/education';

// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartTwoStudy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            checkT:'',
            education:0,
            
        }
    }


    handleChangeCheckT = (e, { value }) => {
        this.setState({ value });
    }
    
    handleChangeEducation = (search) => {
        this.setState({ education: search.target.value });
    }
 

    render() {

        return (


            <React.Fragment>

            <Container className="contrain_css" >
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 2 : ข้อมูลสถานภาพปัจุบัน/ภาวะการทำงาน</h5><br></br>
                    <h6 style = {{ textAlign :"left"}}>สำหรับผู้ที่ศึกษาต่ออย่างเดียว</h6><br></br>
                
                    <Row  className="style-addData" >
                        <Col sm='4' >
                            <label>ชื่อสถาบันที่ท่านศึกษาต่อ</label> <a>*</a>
                        </Col>
                        <Col sm='8'style = {{marginLeft :'-7%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    
                    <Row  className="style-addData interval-top"  >
                        <Col sm='2'>
                            <label>คณะวิชา</label>
                        </Col>
                        <Col sm='4'style = {{marginLeft :'-5%'}}>
                           
                            <Form.Control type="gread" placeholder="" /> 
                        </Col>
                        <Col sm='2'>
                            <label style={{marginLeft :'-1%'}}>ภาควิชา</label>
                        </Col>
                        <Col sm='4'style = {{marginLeft :'-2%'}}>
                             <Form.Control type="gread" placeholder="" /> 
                          
                        </Col>
                    </Row>

                    <Row  className="style-addData interval-top"  >
                        <Col sm='2'>
                            <label>สาขา</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :'-5%'}}>
                           
                        <Form.Control type="gread" placeholder="" />
                        </Col>
                        <Col sm='4'>
                            <label style={{marginLeft :'-1%'}}>ระดับการศึกษาที่ท่านกำลังศึกษาต่อ</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :'-2%'}}>
                         < Education option={this.handleChangeEducation} />
                          
                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='7' >
                            <label>ประเภทของสถาบันการศึกษา/มหาวิทยาลัยที่ท่านกำลังศึกษาต่อ</label> 
                        </Col>
                        <Col sm='5'style = {{marginLeft :'-7%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default PartTwoStudy