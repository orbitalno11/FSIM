import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row ,Container} from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Nametitle from '../option/nametitle';
import Branch from '../option/branch';
import Status from '../option/status';
import Checktwo from '../option/checktwo';
// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartFive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
          
            checktwo:'',
            
        }
    }

    handleChangeChecktwo = (e, { value }) => {
        this.setState({ value });
    }



    render() {

        return (


            <React.Fragment>

            <Container className="contrain_css" >
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 5 : ข้อมูลด้านการฝึกงาน (สำหรับบัณฑิตปริญญาตรี)  </h5><br></br>
                    <h6 style = {{ textAlign :"left" ,marginLeft:'9%'}}>ท่านผ่านกิจกรรมฝึกงานในรูปแบบใด</h6><br></br>

                    < Checktwo option={this.handleChangChecktwo} />
                   
                    


                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default PartFive