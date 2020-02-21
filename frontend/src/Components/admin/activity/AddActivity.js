import React, { Component }  from 'react'
// import ReactDOM from 'react-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Project from '../../option/project';


class AddActivity extends Component {


    state = {
        activity: '',
        project: 0
    }

    handleChangeNewActivity = (search) => {
        this.setState({ activity: search.target.value });
    }

    handleChangeProject = (search) => {
        this.setState({ project:  search.target.value });

    }

    handleSubmit = (event) => {
        // event.preventDefault();
        console.log(this.state)
    }

    handleReset=(event)=>{
        this.setState({activity:'',project:0});
        
    }

   
    




    render() {

        return (
            <React.Fragment>
                <Form style={{ padding: '5%' }}>
                    <Row  className="style-addData interval-top" >
                        <Col sm='3' >
                            <label>กิจกรรมรับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Form.Control type="text" placeholder="กิจกรรมรับเข้าใหม่" onChange={this.handleChangeNewActivity} value={this.state.activity} />

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ประเภทโครงการ</label>
                        </Col>
                        <Col sm='6'>
                            <Project option={this.handleChangeProject} value={this.state.project}/>
                        </Col>
                    </Row>
                    
                    <div   style={{marginTop:'5%'}}>
                    <Button
                        className='btn-EditData interval-1'
                        href="/admin/project"
                    >เพิ่มโครงการ</Button>
                        <Button
                            className='btn-EditData interval-1'
                            onClick={this.handleReset}
                        >RESET</Button>

                        <Button
                            className='btn-info interval-1'
                            onClick={this.handleSubmit}
                        >SUBMIT</Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

export default AddActivity