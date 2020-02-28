import React from 'react'
// import ReactDOM from 'react-dom';
import { Button, Form, Col, Row ,Container} from 'react-bootstrap';
// import { FaCloudUploadAlt } from "react-icons/fa";
import Nametitle from '../../option/nametitle';
import Branch from '../../option/branch';
import Status from '../../option/status';
// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            branch:0,
            status:0,
            nametitle:0,
            
        }
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
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 1 : ข้อมูลทั่วไป</h5><br></br>
                    <Row  className="style-addData" >
                        <Col sm='3' >
                            <label>คำนำหน้า</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :-30}}>
                            < Nametitle option={this.handleChangNametitle} />

                        </Col>
                    </Row>

                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ชื่อ</label>
                        </Col>
                        <Col sm='3' style = {{marginLeft :-30}}>
                           <Form.Control type="name" placeholder="ชื่อ" />                     
                        </Col>
                        <Col sm='3'>
                            <label style={{marginLeft:30}}>นามสกุล</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :-30}}>
                             <Form.Control type="   surname" placeholder="นามสกุล" /> 
                        </Col>


                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>รหัสนักศึกษา</label>
                        </Col>
                        <Col sm='3' style = {{marginLeft :-30}}>
                         <Form.Control type="ID" placeholder="รหัสนักศึกษา" />         
                         
                        </Col>
                        <Col sm='3'>
                            <label style={{marginLeft:30}}> ระดับการศึกษา </label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :-30}}>
                        <Branch option={this.handleChangeBranch} />
                            
                        </Col>
                    </Row>

                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>สาขาวิชา</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :-30}}>
                           
                            <Branch option={this.handleChangeBranch} />
                        </Col>
                        <Col sm='3'>
                            <label style={{marginLeft:30}}>GPAX</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :-30}}>
                        <Form.Control type="gread" placeholder="GPAX" /> 
                          
                        </Col>
                    </Row>

                    <Row  className="style-addData interval-top " >
                        <Col sm='3' >
                            <label>ภาวะการทำงาน</label>
                        </Col>
                        <Col sm='4'style = {{marginLeft :-30}}>
                            < Status option={this.handleChangStatus} />

                        </Col>
                    </Row>


                    <div  className="style-addData "  style={{marginTop:'5%'}} >
                        <Button
                            className='btn-EditData interval-1'
                            onClick={this.handleSearch}
                        >RESET</Button>

                        <Button
                            className='btn-info interval-1'
                            onClick={this.handleSearch}
                        >SUBMIT</Button>

                    </div>


                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default PartOne