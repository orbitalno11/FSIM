import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row ,Container} from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import CheckTh from '../option/checkTh';
import CheckF from '../option/checkF';
import Check from '../option/check';
import Branch from '../option/branch';

// import { Container } from ' ';

// import MainFormContainer from '../work'


class SurveyAlumni2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.state = {
            branch:0,
            checkTh:'',
            checkF:'',
            check:'',
            
            
        }
    }

    handleChangeCheckF = (e, { value }) => {
        this.setState({ value });
    }

    handleChangeCheckTh = (e, { value }) => {
        this.setState({ value });
    }

    handleChangeBranch = (search) => {
        this.setState({ branch: search.target.value });
    }
    
   
 

    render() {

        return (


            <React.Fragment>

            <Container className="contrain_css" >
                <h3 style={{ marginBottom: '4%' }}>แบบสอบถามหลักสูตร</h3>
                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <h5 style = {{ textAlign :"left"}}>ตอนที่ 1  ข้อมูลทั่วไป</h5><br></br>
                 
                    <Row  className="style-addData "  >
                        <Col sm='3'>
                            <label>สาขาวิชา</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :'-10%'}}>
                             <Branch option={this.handleChangeBranch} />
                            
                        </Col>
                        <Col sm='3'>
                            <label style={{marginLeft:'15%'}}>GPAX</label>
                        </Col>
                        <Col sm='3'style = {{marginLeft :'-10%'}}>
                        <Form.Control type="gread" placeholder="GPAX" /> 
                          
                        </Col>
                    </Row><br></br>
                    <h5 style = {{ textAlign :"left"}}>ตอนที่ 2 ระดับความเข้าใจ และข้อความคิดเห็นของนักศึกษาต่อรูปแบบการเรียนรู้ และทักษะด้านภาษา </h5><br></br>
                    <div style = {{color : "#696969"}}>
                    <p style = {{ textAlign :"left"}} >ความหมายของวิธีการเรียนรู้ </p>
                    <p style = {{ textAlign :"left"}} >1. การเรียนรู้โดยใช้การบรรยายเป็นฐาน (Lecture-based learning หรือ LBL) เป็นวิธีสอนที่ผู้สอนให้ความรู้
                            ตามเนื้อหาสาระด้วยการเล่าอธิบายแสดงสาธิตโดยที่ผู้เรียนเป็นผู้ฟังเพียงอย่างเดียว อาจเปิดโอกาสให้ซักถามปัญหาได้บ้างในตอนท้ายของการบรรยาย   </p>
                    <p style = {{ textAlign :"left"}} >2. การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning หรือ PBL) เป็นรูปแบบการเรียนรู้ที่ให้ผู้เรียน
                            สร้างความรู้ใหม่ จากการใช้ปัญหาที่เกิดขึ้นจริงในโลก เป็นบริบท (context) ของการเรียนรู้ ทำให้ผู้เรียนเกิดทักษะในการคิดวิเคราะห์และแก้ปัญหา 
                            รวมทั้งได้ความรู้ตามศาสตร์ในสาขาวิชาที่ตนศึกษาไปพร้อมกันด้วย    </p>

                    <p style = {{ textAlign :"left"}} >3. การเรียนรู้โดยใช้กิจกรรมเป็นพื้นฐาน (Activity-based learning หรือ ABL) เป็นการเรียนรู้ผ่านการปฏิบัต
ิ                            หรือ การลงมือทำซึ่ง “ความรู้” <br></br>ที่เกิดขึ้นก็เป็นความรู้ที่ได้จากประสบการณ์ กระบวนการในการจัดกิจกรรมการเรียนรู้ที่ผู้เรียนต้องได้มีโอกาสลงมือกระทำมากกว่าการฟังเพียงอย่างเดียว
                            ต้องจัดกิจกรรมให้ผู้เรียนได้การเรียนรู้โดยการอ่าน การเขียน การโต้ตอบ และการวิเคราะห์ปัญหา อีกทั้งให้ผู้เรียนได้ใช้กระบวนการคิดขั้นสูง
                            ได้แก่ การวิเคราะห์ การสังเคราะห์ และการประเมินค่า   </p>
                     <p style = {{ textAlign :"left"}}>(ที่มา : https://th.Wikipedia.org)  </p>
                     </div>

                     <p style = {{ textAlign :"left"}}>1. นักศึกษาคิดว่าการเรียนการสอนแบบใดส่งผลให้เกิดการเรียนรู้ที่มีประสิทธิภาพต่อตัวท่านเอง </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        การเรียนรู้โดยใช้การบรรยายเป็นฐาน (Lecture-based learning ) 
                        < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                     การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning )                        
                     < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                     การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning )                       
                      < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left", marginLeft : '10%'}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                
                  
                    <p style = {{ textAlign :"left"}}>2. นักศึกษาคิดว่ากระบวนการเรียนการสอนแบบใดในรายวิชาต่อไปนี้เหมาะสมกับวิธีการเรียนรู้ของตัวท่านเอง(ตอบได้มากกว่า 1 รูปแบบ)   </p>
                    <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        กลุ่มวิชาพื้นฐานทางวิทยาศาสตร์                     
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        กลุ่มวิชาเฉพาะทางของสาขา                    
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        กลุ่มวิชาพื้นฐานทางวิศวกรรมศาสตร์                    
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        กลุ่มวิชาภาษาอังกฤษ                     
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        กลุ่มวิชาศึกษาทั่วไป (Gen. Ed.)                      
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left", marginLeft : '10%'}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>

                    <p style = {{ textAlign :"left"}}>3. นักศึกษาคิดว่าการจัดการเรียนการสอนทั้ง 3 รูปแบบ เหมาะสมที่จะเกิดขึ้นในชั้นปีใด(สามารถเลือกได้มากกว่า 1 ตัวเลือก) </p>
                    <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        การเรียนรู้โดยใช้การบรรยายเป็นฐาน (Lecture-based learning)                     
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning)                    
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        การเรียนรู้โดยใช้กิจกรรมเป็นฐาน (Activity-based learning)                      
                      < CheckF option={this.handleChangCheckF} />
                     </p>
                     
                     <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left", marginLeft : '10%'}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>


                    <p style = {{ textAlign :"left"}}>4. นักศึกษาคิดว่าปัจจัยต่อไปนี้ ส่งผลกระทบต่อกระบวนการเรียนรู้แบบปัญหาเป็นฐานและกิจกรรมเป็นฐานของท่านอย่างไร   </p>
                    <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        ความรู้พื้นฐานที่ดีและความพร้อมของนักศึกษา
                        < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        ความพร้อมและประสบการณ์ของอาจารย์ในการสอน                         
                     < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        อาจารย์ให้คำแนะนำที่ถูกต้องตามหลักวิชาการอย่างสม่ำเสมอ                       
                      < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        จำนวนนักศึกษาในชั้นเรียน 
                        < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        จำนวนอาจารย์ที่สอน  / อาจารย์ผู้ช่วยสอน                         
                     < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        เนื้อหาของรายวิชา                       
                      < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        อุปกรณ์และเครื่องมือในการเรียนการสอน                        
                     < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                        สภาพแวดล้อมในการเรียนและการสร้างบรรยากาศในการเรียนของอาจารย์ผู้สอน                       
                      < CheckTh option={this.handleChangCheckTh} />
                     </p>
                     <p style = {{textAlign :"left", marginLeft : '10%'}}>
                         ระยะเวลาในการจัดการเรียนการสอน / กิจกรรม                         
                     < CheckTh option={this.handleChangCheckTh} />
                     </p>                     
                     <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left", marginLeft : '10%'}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                    <h5 style = {{ textAlign :"left"}}>ตอนที่ 3  ระดับความพึงพอใจต่อระบบอาจารย์ผู้สอน ที่ปรึกษา และกิจกรรมนักศึกษา</h5><br></br>
                    <h6 style = {{ textAlign :"left" ,marginLeft:'9%',color:"#696969"}}>เกณ์การให้คะแนน : &nbsp;5 = มากที่สุด&nbsp;  4 = มาก &nbsp;3 = ปานกลาง&nbsp; 2 = น้อย &nbsp;1 = น้อยที่สุด</h6><br></br>
                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b>7.   อาจารย์ผู้สอน (ด้านการจัดการเรียนการสอน) นักศึกษามีความเห็นเกี่ยวกับอาจารย์ผู้สอนในหัวข้อต่อไปนี้ในระดับใด </b>
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
                            <a style = {{ fontSize :'90%'}}>มีจำนวนเพียงพอกับรายวิชาในหลักสูตร</a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรู้ ความเชี่ยวชาญและประสบการณ์ตรงในเนื้อหาวิชาที่สอนเป็นอย่างดี </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความสามารถในการถ่ายทอดความรู้ ประสบการณ์ ทำให้ผู้เรียนเกิดความ
                                                            กระตือรือร้นและสนใจการเรียนมากขึ้น ช่วยให้เกิดการเรียนรู้และเข้าใจเนื้อหาวิชาได้ดี  </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรู้ ความเชี่ยวชาญและประสบการณ์ตรงในเนื้อหาวิชาที่สอนเป็นอย่างดี  </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรอบรู้ทันต่อการเปลี่ยนแปลงทางวิทยาการ และสามารถบูรณาการความรู้ต่างๆ ให้แก่นักศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>เปิดโอกาสให้นักศึกษาได้แสดงความคิดเห็น </a>
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
                            <a style = {{ fontSize :'90%'}}>การติดต่ออาจารย์ผู้สอนเพื่อขอคำปรึกษาทำได้ง่าย</a>
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
                            <a style = {{ fontSize :'90%'}}>เป็นผู้มีคุณธรรมและจิตสำนึกในความเป็นครู </a>
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
                            <a style = {{ fontSize :'90%'}}>ใช้สื่อการสอน อุปกรณ์การสอนและเทคนิคการสอนได้อย่างเหมาะสม</a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                    </Row><br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>

                    
                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b>8.  อาจารย์ผู้สอน (ด้านการวัดผลและประเมินผลการศึกษา) นักศึกษามีความเห็นเกี่ยวกับอาจารย์ผู้สอนในหัวข้อต่อไปนี้ในระดับใด  </b>
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
                            <a style = {{ fontSize :'90%'}}>มีจำนวนเพียงพอกับรายวิชาในหลักสูตร</a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรู้ ความเชี่ยวชาญและประสบการณ์ตรงในเนื้อหาวิชาที่สอนเป็นอย่างดี </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความสามารถในการถ่ายทอดความรู้ ประสบการณ์ ทำให้ผู้เรียนเกิดความ
                                                            กระตือรือร้นและสนใจการเรียนมากขึ้น ช่วยให้เกิดการเรียนรู้และเข้าใจเนื้อหาวิชาได้ดี  </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรู้ ความเชี่ยวชาญและประสบการณ์ตรงในเนื้อหาวิชาที่สอนเป็นอย่างดี  </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความรอบรู้ทันต่อการเปลี่ยนแปลงทางวิทยาการ และสามารถบูรณาการความรู้ต่างๆ ให้แก่นักศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>เปิดโอกาสให้นักศึกษาได้แสดงความคิดเห็น </a>
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
                            <a style = {{ fontSize :'90%'}}>การติดต่ออาจารย์ผู้สอนเพื่อขอคำปรึกษาทำได้ง่าย</a>
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
                            <a style = {{ fontSize :'90%'}}>เป็นผู้มีคุณธรรมและจิตสำนึกในความเป็นครู </a>
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
                            <a style = {{ fontSize :'90%'}}>ใช้สื่อการสอน อุปกรณ์การสอนและเทคนิคการสอนได้อย่างเหมาะสม</a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                    </Row><br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>

                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b>9.  อาจารย์ที่ปรึกษาชั้นปี นักศึกษาเห็นด้วยกับคุณสมบัติอาจารย์ที่ปรึกษาในหัวข้อต่อไปนี้ในระดับใด   </b>
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
                            <a style = {{ fontSize :'90%'}}>มีระบบการเข้าพบนักศึกษาอย่างเหมาะสมและสม่ำเสมอ</a>
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
                            <a style = {{ fontSize :'90%'}}>มีการติดตามผลการเรียนของนักศึกษาอย่างใกล้ชิด </a>
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
                            <a style = {{ fontSize :'90%'}}>ให้ความช่วยเหลือหรือให้คำปรึกษานักศึกษาในการวางแผนการศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>แนะนำเกี่ยวกับโอกาสในการศึกษาต่อ หรือแนวทางการประกอบวิชาชีพ </a>
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
                            <a style = {{ fontSize :'90%'}}>ให้คำปรึกษาการใช้ชีวิตในมหาวิทยาลัย </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>
                    
                    </Row><br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                    

                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b> 10.  ด้านโครงงานระดับปริญญาตรี / โครงการเรียนรู้ร่วมอุตสาหกรรม นักศึกษาเห็นด้วยกับการทำโครงงานวิจัยระดับปริญญาตรี / โครงการเรียนรู้ร่วมอุตสาหกรรม ในหัวข้อต่อไปนี้ในระดับใด   </b>
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
                            <a style = {{ fontSize :'90%'}}>อาจารย์ที่ปรึกษาโครงงานมีความพร้อมและมีเวลาในการให้คำปรึกษาโครงงานวิจัยฯ</a>
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
                            <a style = {{ fontSize :'90%'}}>หลักสูตรมีห้องปฏิบัติการเพียงพอในการรองรับการทำโครงงานวิจัยของนักศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>หลักสูตรมีระบบการจัดการเรื่องการใช้งานเครื่องมือวิทยาศาสตร์ในการทำโครงงานวิจัย </a>
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
                            <a style = {{ fontSize :'90%'}}>หลักสูตรมีบริการช่วยเหลือนักศึกษาในการขอใช้เครื่องมือนอกหน่วยงานในการทำโครงงานวิจัย</a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row><br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b> 11.  อาจารย์ที่ปรึกษากิจกรรมนักศึกษา นักศึกษาเห็นด้วยกับคุณสมบัติอาจารย์ที่ปรึกษากิจกรรมนักศึกษาในหัวข้อต่อไปนี้ในระดับใด </b>
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
                            <a style = {{ fontSize :'90%'}}>มีการให้คำปรึกษาเรื่องกิจกรรมนักศึกษาอย่างสม่ำเสมอและมีประสิทธิภาพ</a>
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
                            <a style = {{ fontSize :'90%'}}>ให้ความช่วยเหลือนักศึกษาในการวางแผนกิจกรรมและงบประมาณในการทำกิจกรรมนักศึกษาอย่างเป็นระบบ </a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row><br></br>
                    <Row  className="style-addData" >
                        <Col sm='12'>
                            <b> 12.  นักศึกษาเห็นด้วยกับกิจกรรมนักศึกษาและการพัฒนานักศึกษาในหัวข้อต่อไปนี้ ในระดับใด  </b>
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
                            <a style = {{ fontSize :'90%'}}>ส่งเสริมให้นักศึกษามีส่วนร่วมในการจัดกิจกรรม เพื่อเสริมสร้างประสบการณ์</a>
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
                            <a style = {{ fontSize :'90%'}}>มีความหลากหลายของรูปแบบ และประเภทของกิจกรรมที่ช่วยส่งเสริมศักยภาพนักศึกษา </a>
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
                            <a style = {{ fontSize :'90%'}}>มีปัจจัยสนับสนุนและสิ่งอำนวยความสะดวกในการจัดกิจกรรมนักศึกษา</a>
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
                            <a style = {{ fontSize :'90%'}}>มีการจัดสวัสดิการแก่นักศึกษา</a>
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
                            <a style = {{ fontSize :'90%'}}>นักศึกษามีส่วนร่วมในการประเมินผลสัมฤทธิ์ของการจัดโครงการ / กิจกรรมอย่างเป็น<br></br>รูปธรรม</a>
                        </Col>
                        <Col >
                             < Check option={this.handleChangCheck} />
                        </Col>

                    </Row><br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-7%'}}>
                         <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                    <h5 style = {{ textAlign :"left"}}>ตอนที่ 4 ระดับความพึงพอใจต่อระบบสนับสนุนการศึกษา และการให้บริการของฝ่ายสนับสนุนการศึกษา </h5>
                    <p style = {{color:'#696969',textAlign :"left"}}>แบ่งเป็น 3 ส่วนคือ <br></br>1) การให้บริการของส่วนกลางคณะวิทยาศาสตร์ <br></br>2) การให้บริการของภาควิชา  และ <br></br>3) การให้บริการสำนักหอสมุด และห้องพยาบาล (ของมหาวิทยาลัย) </p>
                   
              {/* ส่วนที่1      */}
                   
                    <b style = {{marginLeft:'-59%'}}> ส่วนที่ 1 การให้บริการของส่วนกลางคณะวิทยาศาสตร์  </b>
                    <p style = {{marginLeft:'-8%'}}>13. นักศึกษาคิดว่าระบบสนับสนุนการศึกษา และการให้บริการของฝ่ายสนับสนุนการศึกษาต่อไปนี้มีความเหมาะสมอย่างไร  </p>
                    
                    <div style = {{marginLeft:'9%'}}>
                        <Row  className="style-addData " >
                                <Col sm='12'>13.1) ด้านสิ่งอำนวยความสะดวกที่เอื้อต่อการพัฒนาการเรียนรู้ของนักศึกษา</Col>
                                  
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
                                <a style = {{ fontSize :'90%'}}>พื้นที่การเรียนรู้ Science Learning Space มีความทันสมัยและพอเพียงในการให้บริการ </a>
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
                                <a style = {{ fontSize :'90%'}}>พื้นที่การเรียนรู้ Science Learning Space มีการจัดบรรยากาศที่เอื้อต่อการพัฒนาการเรียนรู้ของนักศึกษา</a>
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
                                <a style = {{ fontSize :'90%'}}>มีการให้บริการระบบสัญญาณ wifi บริเวณพื้นที่การเรียนรู้ Science Learning Space อย่างทั่วถึง</a>
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
                                <a style = {{ fontSize :'90%'}}>ห้องบริการคอมพิวเตอร์ ชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์มีความทันสมัยและพอเพียงในการให้บริการ</a>
                            </Col>
                            <Col >
                                < Check option={this.handleChangCheck} />
                            </Col>

                        </Row><br></br>
                        <Row  className="style-addData "  >
                            <Col sm='2'style = {{textAlign :"left"}}>
                                <label>ข้อเสนอแนะ</label>
                            </Col>
                            <Col sm='9'style = {{marginLeft :'-6%'}}>
                            <Form.Control type="offer" placeholder="" />
                                
                            </Col>
                        </Row><br></br>
                    
                   
                        <Row  className="style-addData " >
                            <Col sm='7'>13.2)  การจัดบริการด้านกายภาพที่ส่งเสริมคุณภาพชีวิตของนักศึกษา</Col>
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
                                <a style = {{ fontSize :'90%'}}>พื้นที่สำหรับการให้นักศึกษาจัดกิจกรรม อาคารปฏิบัติการทางวิทยาศาสตร์มีความทันสมัยและพอเพียงในการให้บริการ </a>
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
                                <a style = {{ fontSize :'90%'}}>พื้นที่บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์ ได้จัดโต๊ะและเก้าอี้สำหรับให้นักศึกษาพักผ่อนอย่างเพียงพอ</a>
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
                                <a style = {{ fontSize :'90%'}}>มีการให้บริการระบบสัญญาณ wifi ในพื้นที่บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์อย่างทั่วถึง</a>
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
                                <a style = {{ fontSize :'90%'}}>มีการปรับปรุงพัฒนาอาคารและสถานที่ให้ทันสมัยเพื่อช่วยส่งเสริมคุณภาพชีวิตในระหว่างการศึกษา</a>
                            </Col>
                            <Col >
                                < Check option={this.handleChangCheck} />
                            </Col>

                        </Row><br></br>
                        <Row  className="style-addData "  >
                            <Col sm='2'style = {{textAlign :"left"}}>
                                <label>ข้อเสนอแนะ</label>
                            </Col>
                            <Col sm='9'style = {{marginLeft :'-6%'}}>
                            <Form.Control type="offer" placeholder="" />
                                
                            </Col>
                        </Row><br></br>
                        <Row  className="style-addData " >
                            <Col sm='7'>13.3)  การให้บริการเจ้าหน้าที่</Col>
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
                            <a style = {{ fontSize :'90%'}}>คณะได้จัดห้อง Science Service Center เพื่อให้นักศึกษาได้สะดวกในการติดต่อ สอบถามและรับให้คำปรึกษา(ชั้น 1อาคารปฏิบัติการทางวิทยาศาสตร์)  </a>
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
                            <a style = {{ fontSize :'90%'}}>การให้บริการในการติดต่อ สอบถามของเจ้าหน้าที่ในสำนักงานคณบดี คณะวิทยาศาสตร์ </a>
                        </Col>
                        <Col >
                            < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-6%'}}>
                        <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
{/* 13.4 */}
                    <Row  className="style-addData " >
                            <Col sm='12'>13.4)  การบริการข้อมูลข่าวสารที่เป็นประโยชน์ต่อนักศึกษา (การให้บริการของส่วนกลางคณะวิทยาศาสตร์) </Col>
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
                            <a style = {{ fontSize :'90%'}}>การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางเว็บไซต์ของคณะฯ (www.science.kmutt.ac.th)  </a>
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
                            <a style = {{ fontSize :'90%'}}>การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆผ่านช่องทาง e-mail ของคณะฯ </a>
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
                            <a style = {{ fontSize :'90%'}}>การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Facebook ของคณะฯ </a>
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
                            <a style = {{ fontSize :'90%'}}>การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Application Line ของคณะฯ </a>
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
                            <a style = {{ fontSize :'90%'}}>การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางบอร์ดประชาสัมพันธ์ของคณะฯ บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์</a>
                        </Col>
                        <Col >
                            < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                 
                    <br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-6%'}}>
                        <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>

    {/* 13.5                 */}
                    <Row  className="style-addData " >
                            <Col sm='12'>13.5)  ด้านสิ่งแวดล้อมเชิงสุขอนามัยและมาตรฐานความปลอดภัยที่เป็นไปตามข้อกำหนด</Col>
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
                            <a style = {{ fontSize :'90%'}}>การจัดการความปลอดภัยในทรัพย์สินของกล้องวงจรปิด (อาคารปฏิบัติการทางวิทยาศาสตร์)   </a>
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
                            <a style = {{ fontSize :'90%'}}>มีความปลอดภัยโดยรอบอาคารปฏิบัติการทางวิทยาศาสตร์ ยามรักษาความปลอดภัย 24 ชั่วโมง </a>
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
                            <a style = {{ fontSize :'90%'}}>ตู้บริการน้ำดื่มแก่นักศึกษา (อาคารปฏิบัติการทางวิทยาศาสตร์)   </a>
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
                            <a style = {{ fontSize :'90%'}}>ห้องน้ำสะอาดถูกสุขลักษณะ (อาคารปฏิบัติการทางวิทยาศาสตร์)</a>
                        </Col>
                        <Col >
                            < Check option={this.handleChangCheck} />
                        </Col>

                    </Row>
                    <br></br>
                    <Row  className="style-addData "  >
                        <Col sm='2'style = {{textAlign :"left"}}>
                            <label>ข้อเสนอแนะ</label>
                        </Col>
                        <Col sm='9'style = {{marginLeft :'-6%'}}>
                        <Form.Control type="offer" placeholder="" />
                            
                        </Col>
                    </Row><br></br>
                    </div>
                    <b style = {{marginLeft:'-59%'}}> ส่วนที่ 2 การให้บริการของส่วนกลางคณะวิทยาศาสตร์  </b>
                    <p style = {{marginLeft:'-8%'}}>13. นักศึกษาคิดว่าระบบสนับสนุนการศึกษา และการให้บริการของฝ่ายสนับสนุนการศึกษาต่อไปนี้มีความเหมาะสมอย่างไร  </p>
               

               
               
               
                </Form>
               
            </Container>
            </React.Fragment>


        )
    }
}

export default SurveyAlumni2