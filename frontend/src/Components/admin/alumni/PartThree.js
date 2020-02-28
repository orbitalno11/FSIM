import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Form, Col, Row ,Container} from 'react-bootstrap';
// import { Radio } from 'semantic-ui-react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Nametitle from '../../option/nametitle';
// import Branch from '../../option/branch';
// import Status from '../../option/status';
import Check from '../../option/check';
// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartThree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            branch:0,
            status:0,
            nametitle:0,
            check:'',
            
        }
    }

    handleChangeCheck = (e, { value }) => {
        this.setState({ value });
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
                <Form onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 3 : ความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน</h5><br></br>
                    <h6 style = {{ textAlign :"left" ,marginLeft:'9%'}}>เกณ์การให้คะแนน : &nbsp;5 = มากที่สุด&nbsp;  4 = มาก &nbsp;3 = ปานกลาง&nbsp; 2 = น้อย &nbsp;1 = น้อยที่สุด</h6><br></br>
                    <Row  className="style-addData" >
                        <Col sm='7'>
                            <a>1  ) ความสัมพันธ์ของหลักสูตรต่อความสามารถในการทำงาน</a>
                        </Col>
                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะความรู้ที่ได้จากการเรียนในหลักสูตร</a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                       

                    </Row>

                    <Row  className="style-addData " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะด้านการประยุกต์ใช้ความรู้ที่ได้จากการเรียนมาใช้ในการทำงาน </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData  " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะด้านการคิดวิเคราะห์ที่ได้จากการเรียนมาใช้ในการทำงาน  </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData  " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะด้านการประเมินลักษณะปัญหาที่ได้จากการเรียนหลักสูตรมาใช้ในการทำงาน  </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData  " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะด้านการประยุกต์ใช้ความรู้ที่ได้จากการเรียนมาใช้ในการทำงาน </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData  " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพึงพอใจต่อทักษะด้านการสร้างสรรค์ที่ได้จากการเรียนในหลักสูตรมาใช้ในการทำงาน </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <hr />


                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a>2  ) โครงสร้างหลักสูตร </a>
                        </Col>
                        
                
                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความเห็นว่าจำนวนรายวิชาภาคทฤษฎีในหลักสูตรมีความเหมาะสมเพียงใด  </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความเห็นว่าจำนวนรายวิชาภาคปฏิบัติในหลักสูตรมีความเหมาะสมเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความว่าความร่วมสมัยของเนื้อหาในหลักสูตรมีความเหมาะสมเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>รายวิชาพื้นฐานทางวิศวกรรมในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>รายวิชาภาษาอังกฤษในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>รายวิชาศึกษาทั่วไป (Gen. Ed.) ในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>

                    <hr />
                    

                    <Row  className="style-addData interval-top"  >
                        <Col>
                            <a>3 ) ความสัมพันธ์ของการจัดการเรียนการสอนของหลักสูตรต่อคุณลักษณะของบัณฑิต </a>
                        </Col>
                        

                    </Row>
                    <Row  className="style-addData " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/เนื้อหาด้านคุณธรรม จริยธรรม ที่มีอยู่ในหลักสูตร </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/เนื้อหาด้านทักษะความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบที่มีอยู่ในหลักสูตร </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <Row  className="style-addData " >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData"  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>ท่านมความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/เนื้อหาด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสารและการใช้เทคโนโลยีสารสนเทศ ที่มีอยู่ในหลักสูตร </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <Row  className="style-addData" >
                        <Col sm='7'></Col>
                        <a className="Number "> 5 </a> 
                        <a className="Number "> 4 </a>  
                        <a className=" Number"> 3 </a>  
                        <a className="Number "> 2 </a>  
                        <a className="Number "> 1 </a>     
                    </Row>

                    <Row  className="style-addData "  >
                        <Col sm='7'>
                            <a style = {{ fontSize :'90%'}}>กิจกรรมเสริมหลักสูตรและกิจกรรมนักศึกษาช่วยส่งเสริมการทำงานของท่านเพียงใด </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                    </Row>
                    

                   


                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default PartThree