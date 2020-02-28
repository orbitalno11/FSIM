import React from 'react'
// import ReactDOM from 'react-dom';
import { Form, Col, Row ,Container} from 'react-bootstrap';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Nametitle from '../../option/nametitle';
// import Branch from '../../option/branch';
// import Status from '../../option/status';
import Reason from '../../option/reason';
import PartThree from './PartThree';
import PartFive from './PartFive';
import PartFour from './PartFour';
// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartTwoNotThing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            branch:0,
            status:0,
            nametitle:0,
            reason:0,
            
        }
    }



    handleChangeReason = (search) => {
        this.setState({ reason: search.target.value });
    }


    handleChangeStatus = (search) => {
        this.setState({ status: search.target.value });
    }

    handleChangeBranch = (search) => {
        this.setState({ branch: search.target.value });
    }
    
    handleChangeNametitle = (search) => {
        this.setState({ nametitle: search.target.value });
    }
 

    render() {

        return (


            <React.Fragment>

            <Container className="contrain_css" >
                <Form style={{ marginLeft: '-6%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 2 : ข้อมูลสถานภาพปัจุบัน/ภาวะการทำงาน</h5><br></br>
                    <h6 style = {{ textAlign :"left"}}>สำหรับผู้ที่ยังไม่ได้ทำงานและยังไม่ได้ศึกษาต่อ</h6><br></br>
                
                    <Row  className="style-addData" >
                        <Col sm='5' >
                            <label>เหตุผลที่ท่านยังไม่ได้เริ่มทำงานในช่วงที่ผ่านมา</label>
                        </Col>
                        <Col sm='7'style = {{marginLeft :''}}>
                            < Reason option={this.handleChangReason} />

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='2'>
                            <label>อื่นๆ</label>
                        </Col>
                        <Col sm='10' style = {{marginLeft :''}}>
                           <Form.Control type="name" placeholder="อื่นๆ" />                     
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

export default PartTwoNotThing