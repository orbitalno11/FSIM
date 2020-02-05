import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap';


class setButton extends Component {


    render() {
        return (
            <React.Fragment >
                <Row style={{marginTop:'5%'}}>
                    <Button style={{marginLeft: "auto",marginRight: "auto"}}>
                        อะไร
                    </Button>
           
                </Row>
            </React.Fragment >
        );
    }
}

export default setButton;