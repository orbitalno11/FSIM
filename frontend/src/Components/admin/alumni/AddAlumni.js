import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";



class AddAlumni extends React.Component {

  


    render() {

        return (


            <React.Fragment>
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <Row  className="style-addData" >
                        <a href="">แบบสอบถามการทำงาน </a>   
                    </Row>

                    <Row  className="style-addData" >
                        <a href="">แบบสอบถามหลักสูตร </a>    
                    </Row>



                </Form>
            </React.Fragment>


        )
    }
}

export default AddAlumni