import React from 'react'
// import ReactDOM from 'react-dom';
import { Form, Radio } from 'semantic-ui-react'
import { Row,Col } from 'react-bootstrap';


class checkF extends React.Component {
    
    
    
    render() {

        return (
            <React.Fragment>
                <Form>
                    <Row>
                        {/* <Col sm = '1'></Col> */}
                        <Col sm = '3'  style = {{ marginTop :'0.5%' ,marginLeft:'3%'}} >
                            <Radio 
                            label ='การบรรยายเป็นฐาน'
                            name='radioGroup'
                            value='1'
                        
                             />  
                        </Col>
                        <Col sm = '3' style = {{ marginTop :'0.5%' ,marginLeft:'-5%'}} >
                            <Radio
                            label ='ปัญหาเป็นฐาน'
                            name='radioGroup'
                            value='2' 
                            
                             />
                        </Col>
                        <Col sm = '3' style = {{ marginTop :'0.5%' ,marginLeft:'-5%'}} >
                            <Radio
                            label ='กิจกรรมเป็นฐาน'
                            name='radioGroup'
                            value='3' 
                            
                             />
                        </Col>
                        <Col sm = '3' style = {{ marginTop :'0.5%' ,marginLeft:'-5%'}} >
                            <Radio
                            label ='อื่นๆ'
                            name='radioGroup'
                            value='4' 
                            
                             />
                        </Col>

                        
                    </Row>
                   
                    
                </Form>
            </React.Fragment>
        )
    }
}

export default checkF