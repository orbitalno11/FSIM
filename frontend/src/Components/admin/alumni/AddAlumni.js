import React from 'react'
// import ReactDOM from 'react-dom';
import { Form, Row } from 'react-bootstrap';
// import { FaCloudUploadAlt } from "react-icons/fa";



class AddAlumni extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Form  onSubmit={this.onSubmit}>
                    <Row  className="style-addData" >
                        <a href="/surveyAlumni">แบบสอบถามการทำงาน </a>   
                    </Row>

                    <Row  className="style-addData" >
                        <a href="/surveyAlumni2">แบบสอบถามหลักสูตร </a>    
                    </Row>



                </Form>
            </React.Fragment>


        )
    }
}

export default AddAlumni