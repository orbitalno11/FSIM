import React, { Component } from 'react';
import { Form, Row } from 'react-bootstrap';

class Add extends Component{
  render(){
    return(
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <Row className="style-addData">
            <a href="/">แบบสอบถามการทำงาน</a>
          </Row>
          <Row className="style-addData">
            <a href="/">แบบสอบถามหลักสูตร</a>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default Add;