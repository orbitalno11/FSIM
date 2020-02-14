import React from 'react'
// import ReactDOM from 'react-dom';
import { Form, Radio } from 'semantic-ui-react'
import { Row,Col } from 'react-bootstrap';


class checktwo extends React.Component {
    
    
    
    render() {

        return (
            <React.Fragment>
                <Form>
                    <Row>
                        {/* <Col sm = '1'></Col> */}
                        <Col sm = '5'  style = {{ marginTop :'0.5%' ,marginLeft:'3%'}} >
                            <Radio
                            label='เรียนรู้ร่วมอุตสหกรรม'
                            name='radioGroup'
                            value='5'
                        
                             />  
                        </Col>
                        <Col sm = '5' style = {{ marginTop :'0.5%' ,marginLeft:'-5%'}} >
                            <Radio
                            label ='ฝึกงานภาคฤดูร้อน'
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

export default checktwo