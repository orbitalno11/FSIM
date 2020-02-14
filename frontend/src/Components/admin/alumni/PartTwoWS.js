import React from 'react'
// import ReactDOM from 'react-dom';
import { Form, Col, Row ,Container} from 'react-bootstrap';
// import { FaCloudUploadAlt } from "react-icons/fa";
import CheckT from '../../option/checkT';
import Work from '../../option/work';
import Education from '../../option/education';
import PartThree from './PartThree';
import PartFive from './PartFive';
import PartFour from './PartFour';

// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartTwoWork extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            checkT:'',
            work:0,
            education:0,
            
        }
    }

    handleChangeEducation = (search) => {
        this.setState({ education: search.target.value });
    }
 
    handleChangeCheckT = (e, { value }) => {
        this.setState({ value });
    }
    
    handleChangeWork = (search) => {
        this.setState({ work: search.target.value });
    }
 

    render() {

        return (


            <React.Fragment>

            <Container className="contrain_css" >
                <Form style={{ marginLeft: '-6%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 2 : ข้อมูลสถานภาพปัจุบัน/ภาวะการทำงาน</h5><br></br>
                    <h6 style = {{ textAlign :"left"}}>สำหรับผู้ที่ทำงานพร้อมกับศึกษาต่อ</h6><br></br>
                
                    <Row  className="style-addData" >
                        <Col sm='5' >
                            <label>ชื่อตำแหน่งงาน</label> <a>*</a>
                        </Col>
                        <Col sm='7'style = {{marginLeft :'-7%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='5' >
                            <label>ชื่อหน่วยงาน/บริษัท</label> 
                        </Col>
                        <Col sm='7'style = {{marginLeft :'-7%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='5' >
                            <label>เงินเดือนหรือรายได้เฉลี่ยต่อเดือน</label> 
                        </Col>
                        <Col sm='7'style = {{marginLeft :'-7%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='6' >
                            <label>ช่วงเวลาที่ท่านได้ทำงาน (นับจากเดือน มิ.ย. 62)</label> 
                        </Col>
                        
                    </Row>
                     < CheckT option={this.handleChangCheckT} />
                     <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ลักษณะงาน</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :'-7%'}}>
                           
                            <Work option={this.handleChangeWork} />
                        </Col>
                        <Col sm='1'>
                            <label style={{marginLeft :'20%'}}>อื่นๆ</label>
                        </Col>
                        <Col sm='5'style = {{marginLeft :'%'}}>
                        <Form.Control type="gread" placeholder="" /> 
                          
                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
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
            <PartThree/> 
            <PartFour/>
            <PartFive/>  
           
            </React.Fragment>


        )
    }
}

export default PartTwoWork