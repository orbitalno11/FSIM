import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row ,Container} from 'react-bootstrap';
import { Radio } from 'semantic-ui-react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Nametitle from '../../option/nametitle';
import Branch from '../../option/branch';
import Status from '../../option/status';
import Check from '../../option/check';
// import { Container } from ' ';

// import MainFormContainer from '../work'


class PartFour extends React.Component {

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
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ส่วนที่ 4 : ความผูกพันของนักศึกษาต่อคณะวิทยาศาสตร์</h5><br></br>
                    <h6 style = {{ textAlign :"left" ,marginLeft:'9%'}}>เกณ์การให้คะแนน : &nbsp;5 = มากที่สุด&nbsp;  4 = มาก &nbsp;3 = ปานกลาง&nbsp; 2 = น้อย &nbsp;1 = น้อยที่สุด</h6><br></br>
                    <Row  className="style-addData" >
                        <Col sm='7'>
                            <a>1  ) ความผูกพันต่อคณะวิทยาศาสตร์</a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความภูมิใจที่ได้เป็นนักศึกษาคณะวิทยาศาสตร์</a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านรู้สึกไม่พอใจเมื่อมีการกล่าวถึงคณะวิทยาศาสตร์ในทางที่เสื่อมเสีย </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านจะรักษาชื่อเสียงและสร้างชื่อเสียงให้กับคณะวิทยาศาสตร์  </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความต้องการที่จะประชาสัมพันธ์ให้ผู้อื่นได้รับรู้ถึงศักยภาพของคณะวิทยาศาสตร์   </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความรู้สึกพึงพอใจที่ได้อยู่ในคณะวิทยาศาสตร์ </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความเต็มใจที่จะเสียสละเวลาส่วนตนเมื่อมีโอกาสร่วมกิจกรรมที่คณะวิทยาศาสตร์จัดขึ้น </a>
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
                            <a style = {{ fontSize :'90%'}}>เมื่อท่านจบการศึกษาจากคณะวิทยาศาสตร์ไปแล้ว ท่านมีความต้องการที่จะกลับมาเยี่ยมเยือนคณะ </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านคิดว่าท่านตัดสินใจถูกในการเข้าศึกษาในคณะวิทยาศาสตร์  </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านเห็นด้วยกับนโยบายของคณะวิทยาศาสตร์ในส่วนที่เกี่ยวข้องกับนักศึกษาและอื่นๆ </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                
               

                    <hr />
                    

                    <Row  className="style-addData interval-top"  >
                        <Col>
                            <a>2  ) ความผูกพันต่ออาจารย์และบุคลากร </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความรักและเคารพอาจารย์และบุคลากร </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านรู้สึกดีใจและภูมิใจที่ได้เป็นลูกศิษย์ของอาจารย์ในคณะวิทยาศาสตร์ </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความรู้สึกว่าอาจารย์คือบุคคลหนึ่งที่ท่านไว้ใจและต้องการคำปรึกษา</a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านคิดว่าอาจารย์และบุคลากรในคณะวิทยาศาสตร์มีความทุ่มเทและเสียสละในการทำงานของคณะวิทยาศาสตร์ </a>
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
                            <a style = {{ fontSize :'90%'}}>อาจารย์ส่วนใหญ่รับฟังความเห็นของนักศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>อาจารย์มีส่วนช่วยส่งเสริมการพัฒนาตนเองเกี่ยวกับทัศนคติและค่านิยมในทางที่ดีให้แก่ท่าน </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านคิดว่าอาจารย์หรือบุคลากรเป็นบุคคลที่ควรนำไปเป็นแบบอย่างที่ดีในการดำเนินชึวิต</a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านเต็มใจที่จะเสียสละเวลาส่วนตัว เมื่ออาจารย์ไหว้วานให้ช่วยงาน </a>
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
                            <a style = {{ fontSize :'90%'}}>ท่านมีความผูกพันกับอาจารย์และบุคลากรในคณะวิทยาศาสตร์ในทางที่ดี </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ข้อคิดเห็นอื่นๆ</label>
                        </Col>
                        <Col sm='8' style = {{marginLeft :'-8%'}}>
                           <Form.Control type="name" placeholder="" />                     
                        </Col>
                    </Row>
                    

                   


                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default PartFour