import React from 'react'
import ReactDOM from 'react-dom';
import { Form, Radio } from 'semantic-ui-react'
import { Row,Col } from 'react-bootstrap';


class checkT extends React.Component {
    
    
    
    render() {

        return (
            <React.Fragment>
                <Form>
                    <Row>
                        {/* <Col sm = '1'></Col> */}
                        <Col sm = '4'  style = {{ marginTop :'0.5%' ,marginLeft:'3%'}} >
                            <Radio 
                            label ='ก่อนจบการศึกษา'
                            name='radioGroup'
                            value='5'
                        
                             />  
                        </Col>
                        <Col sm = '5' style = {{ marginTop :'0.5%' ,marginLeft:'-5%'}} >
                            <Radio
                            label ='หลังจบการศึกษา'
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

export default checkT