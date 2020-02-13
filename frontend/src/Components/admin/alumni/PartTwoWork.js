import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row ,Container} from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import CheckT from '../../option/checkT';
import Work from '../../option/work';
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
            
        }
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
                    <h6 style = {{ textAlign :"left"}}>สำหรับผู้ที่ทำงานแล้ว</h6><br></br>
                
                    <Row  className="style-addData" >
                        <Col sm='4' >
                            <label>ชื่อตำแหน่งงาน</label> <a>*</a>
                        </Col>
                        <Col sm='8'style = {{marginLeft :'-2%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='4' >
                            <label>ชื่อหน่วยงาน/บริษัท</label> 
                        </Col>
                        <Col sm='8'style = {{marginLeft :'-2%'}}>
                            <Form.Control type="name" placeholder="" />     

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top" >
                        <Col sm='4' >
                            <label>เงินเดือนหรือรายได้เฉลี่ยต่อเดือน</label> 
                        </Col>
                        <Col sm='8'style = {{marginLeft :'-2%'}}>
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
                        <Col sm='2'>
                            <label>ลักษณะงาน</label>
                        </Col>
                        <Col sm='4'>
                           
                            <Work option={this.handleChangeWork} />
                        </Col>
                        <Col sm='2'>
                            <label style={{marginLeft :'30%'}}>อื่นๆ</label>
                        </Col>
                        <Col sm='4'style = {{marginLeft :'-2%'}}>
                        <Form.Control type="gread" placeholder="" /> 
                          
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