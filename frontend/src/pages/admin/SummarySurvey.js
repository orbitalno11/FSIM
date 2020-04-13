import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";

// import bgyel from "../img/bg-head3.png";
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummarySurvey extends Component {
    
  
    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                 <Container>
                     <Grid>
                            <b  className = "topicsurvey">
                               สรุปแบบสอบถามการทำงาน
                            </b>   
                         <Grid.Row>
                            
                            <Header  as = "h3">
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.ความสัมพันธ์ของหลักสูตรต่อความสามารถในการทำงาน
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความพึงพอใจต่อทักษะความรู้ที่ได้จากการเรียนในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการประยุกต์ใช้ความรู้ที่ได้จากการเรียนมาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการคิดวิเคราะห์ที่ได้จากการเรียนมาใช้ใน
                                            การทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการประเมินลักษณะปัญหาที่ได้จาก
                                            การเรียนหลักสูตรมาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการสร้างสรรค์ที่ได้จากการเรียนในหลักสูตร
                                            มาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">2.โครงสร้างหลักสูตร</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความเห็นว่าจำนวนรายวิชาภาคทฤษฎีในหลักสูตรมีความเหมาะสม
                                            เพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านมีความเห็นว่าจำนวนรายวิชาภาคปฏิบัติในหลักสูตรมีความเหมาะสม
                                            เพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความว่าความร่วมสมัยของเนื้อหาในหลักสูตรมีความเหมาะสมเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            รายวิชาพื้นฐานทางวิศวกรรมในหลักสูตรช่วยส่งเสริมการทำงานของท่าน
                                            มากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            รายวิชาภาษาอังกฤษในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.) รายวิชาศึกษาทั่วไป (Gen. Ed.)
                                            ในหลักสูตรช่วยส่งเสริมการทำงานของท่าน มากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3.ความสัมพันธ์ของการจัดการเรียนการสอนของหลักสูตรต่อคุณลักษณะของบัณฑิต
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านคุณธรรม จริยธรรม ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านทักษะความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                                            ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.) ท่านมความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านทักษะการวิเคราะห์เชิงตัวเลข
                                            การสื่อสารและการใช้ เทคโนโลยีสารสนเทศ
                                            ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            กิจกรรมเสริมหลักสูตรและกิจกรรมนักศึกษาช่วยส่งเสริมการทำงาน
                                            ของท่านเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            กิจกรรมด้านความเป็นนานาชาติช่วยส่งเสริมการทำงานของท่านเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h3">
                                 ความผูกพันของนักศึกษาต่อคณะวิทยาศาสตร์
                            </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.ความผูกพันต่อคณะวิทยาศาสตร์
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความภูมิใจที่ได้เป็นนักศึกษาคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านรู้สึกไม่พอใจเมื่อมีการกล่าวถึงคณะวิทยาศาสตร์ในทางที่เสื่อมเสีย
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านจะรักษาชื่อเสียงและสร้างชื่อเสียงให้กับคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านมีความต้องการที่จะประชาสัมพันธ์ให้ผู้อื่นได้รับรู้ถึงศักยภาพของคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ท่านมีความรู้สึกพึงพอใจที่ได้อยู่ในคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            ท่านมีความเต็มใจที่จะเสียสละเวลาส่วนตนเมื่อมีโอกาสร่วมกิจกรรมที่คณะวิทยาศาสตร์จัดขึ้น
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            เมื่อท่านจบการศึกษาจากคณะวิทยาศาสตร์ไปแล้ว ท่านมีความต้องการที่จะกลับมาเยี่ยมเยือนคณะ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)
                                            ท่านคิดว่าท่านตัดสินใจถูกในการเข้าศึกษาในคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            9.)
                                            ท่านเห็นด้วยกับนโยบายของคณะวิทยาศาสตร์ในส่วนที่เกี่ยวข้องกับนักศึกษาและอื่นๆ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                   
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                2. ความผูกพันต่ออาจารย์และบุคลากร
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความรักและเคารพอาจารย์และบุคลากร 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านรู้สึกดีใจและภูมิใจที่ได้เป็นลูกศิษย์ของอาจารย์ในคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความรู้สึกว่าอาจารย์คือบุคคลหนึ่งที่ท่านไว้ใจและต้องการคำปรึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านคิดว่าอาจารย์และบุคลากรในคณะวิทยาศาสตร์มีความทุ่มเทและเสียสละในการทำงานของคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            อาจารย์ส่วนใหญ่รับฟังความเห็นของนักศึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            อาจารย์มีส่วนช่วยส่งเสริมการพัฒนาตนเองเกี่ยวกับทัศนคติและค่านิยมในทางที่ดีให้แก่ท่าน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            ท่านคิดว่าอาจารย์หรือบุคลากรเป็นบุคคลที่ควรนำไปเป็นแบบอย่างที่ดีในการดำเนินชึวิต 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)
                                            ท่านเต็มใจที่จะเสียสละเวลาส่วนตัว เมื่ออาจารย์ไหว้วานให้ช่วยงาน 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            9.)
                                            ท่านมีความผูกพันกับอาจารย์และบุคลากรในคณะวิทยาศาสตร์ในทางที่ดี
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                   
                                </Table.Body> 
                                
                              
                            </Table>
                        </Grid.Row>

                        <Grid.Row>
                            <b  className = "topicsurvey">
                               สรุปแบบสอบถามหลักสูตร
                            </b>
                            <Header as="h3">
                                ตารางสรุประดับความเข้าใจ และข้อความคิดเห็นของนักศึกษาต่อรูปแบบการเรียนรู้ และทักษะด้านภาษา 
                            </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.นักศึกษาคิดว่าการเรียนการสอนแบบใดส่งผลให้เกิดการเรียนรู้ที่มีประสิทธิภาพต่อตัวท่านเอง
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การเรียนรู้โดยใช้การบรรยายเป็นฐาน (Lecture-based learning )
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning )
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            การเรียนรู้โดยใช้กิจกรรมเป็นฐาน (Activity-based learning) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    
                                        
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">2.นักศึกษาคิดว่ากระบวนการเรียนการสอนแบบใดในรายวิชาต่อไปนี้เหมาะสมกับวิธีการเรียนรู้ของตัวท่านเอง(ตอบได้มากกว่า 1 รูปแบบ)</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            กลุ่มวิชาพื้นฐานทางวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            กลุ่มวิชาเฉพาะทางของสาขา  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            กลุ่มวิชาพื้นฐานทางวิศวกรรมศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            กลุ่มวิชาภาษาอังกฤษ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            กลุ่มวิชาศึกษาทั่วไป (Gen. Ed.) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3.นักศึกษาคิดว่าการจัดการเรียนการสอนทั้ง 3 รูปแบบ เหมาะสมที่จะเกิดขึ้นในชั้นปีใด(สามารถเลือกได้มากกว่า 1 ตัวเลือก) 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)  การเรียนรู้โดยใช้การบรรยายเป็นฐาน (Lecture-based learning)
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.) การเรียนรู้โดยใช้ปัญหาเป็นฐาน (Problem-based learning)
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)  การเรียนรู้โดยใช้กิจกรรมเป็นฐาน (Activity-based learning)   
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                4.นักศึกษาคิดว่าปัจจัยต่อไปนี้ ส่งผลกระทบต่อกระบวนการเรียนรู้แบบปัญหาเป็นฐานและกิจกรรมเป็นฐานของท่านอย่างไร  
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)  ความรู้พื้นฐานที่ดีและความพร้อมของนักศึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)   ความพร้อมและประสบการณ์ของอาจารย์ในการสอน  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)  อาจารย์ให้คำแนะนำที่ถูกต้องตามหลักวิชาการอย่างสม่ำเสมอ    
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)  จำนวนนักศึกษาในชั้นเรียน     
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)  จำนวนอาจารย์ที่สอน  / อาจารย์ผู้ช่วยสอน     
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)  เนื้อหาของรายวิชา    
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)  อุปกรณ์และเครื่องมือในการเรียนการสอน   
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)  สภาพแวดล้อมในการเรียนและการสร้างบรรยากาศในการเรียนของอาจารย์ผู้สอน   
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            9.)   ระยะเวลาในการจัดการเรียนการสอน / กิจกรรม    
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    
                                </Table.Body>
                            </Table>                                   
                        </Grid.Row>
                
                        <Grid.Row>
                            
                            <Header as="h3">
                                ระดับความพึงพอใจต่อระบบอาจารย์ผู้สอน ที่ปรึกษา และกิจกรรมนักศึกษา
                            </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.อาจารย์ผู้สอน (ด้านการจัดการเรียนการสอน) นักศึกษามีความเห็นเกี่ยวกับอาจารย์ผู้สอนในหัวข้อต่อไปนี้ในระดับใด
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            มีจำนวนเพียงพอกับรายวิชาในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            มีความรู้ ความเชี่ยวชาญและประสบการณ์ตรงในเนื้อหาวิชาที่สอนเป็นอย่างดี 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            มีความสามารถในการถ่ายทอดความรู้ ประสบการณ์ ทำให้ผู้เรียนเกิดความกระตือรือร้นและสนใจการเรียนมากขึ้น ช่วยให้เกิดการเรียนรู้และเข้าใจเนื้อหาวิชาได้ดี 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีความรอบรู้ทันต่อการเปลี่ยนแปลงทางวิทยาการ และสามารถบูรณาการความรู้ต่างๆ ให้แก่นักศึกษา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            เปิดโอกาสให้นักศึกษาได้แสดงความคิดเห็น
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            การติดต่ออาจารย์ผู้สอนเพื่อขอคำปรึกษาทำได้ง่าย 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            เป็นผู้มีคุณธรรมและจิตสำนึกในความเป็นครู
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)
                                            ใช้สื่อการสอน อุปกรณ์การสอนและเทคนิคการสอนได้อย่างเหมาะสม
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>                     
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                2.อาจารย์ที่ปรึกษาชั้นปี นักศึกษาเห็นด้วยกับคุณสมบัติอาจารย์ที่ปรึกษาในหัวข้อต่อไปนี้ในระดับใด 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            มีระบบการเข้าพบนักศึกษาอย่างเหมาะสมและสม่ำเสมอ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            มีการติดตามผลการเรียนของนักศึกษาอย่างใกล้ชิด 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ให้ความช่วยเหลือหรือให้คำปรึกษานักศึกษาในการวางแผนการศึกษา  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            แนะนำเกี่ยวกับโอกาสในการศึกษาต่อ หรือแนวทางการประกอบวิชาชีพ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ให้คำปรึกษาการใช้ชีวิตในมหาวิทยาลัย
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3. นักศึกษาเห็นด้วยกับกิจกรรมนักศึกษาและการพัฒนานักศึกษาในหัวข้อต่อไปนี้ในระดับใด
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ส่งเสริมให้นักศึกษามีส่วนร่วมในการจัดกิจกรรม เพื่อเสริมสร้างประสบการณ์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            มีความหลากหลายของรูปแบบ และประเภทของกิจกรรมที่ช่วยส่งเสริมศักยภาพนักศึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            มีปัจจัยสนับสนุนและสิ่งอำนวยความสะดวกในการจัดกิจกรรมนักศึกษา  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีการจัดสวัสดิการแก่นักศึกษา (เช่น การประกันอุบัติเหตุ การรักษาพยาบาลเบื้องต้นจากห้องพยาบาล) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            นักศึกษามีส่วนร่วมในการประเมินผลสัมฤทธิ์ของการจัดโครงการ/กิจกรรมอย่างเป็นรูปธรรม
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>           
                        </Grid.Row>
                        
                        <Grid.Row>
                            
                            <Header as="h3">
                             ระดับความพึงพอใจต่อระบบสนับสนุนการศึกษา และการให้บริการของฝ่ายสนับสนุนการศึกษา<br></br><br></br>ส่วนที่ 1 การให้บริการของส่วนกลางคณะวิทยาศาสตร์
                            </Header>
                           
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.นักศึกษาคิดว่าระบบสนับสนุนการศึกษา และการให้บริการของฝ่ายสนับสนุนการศึกษาต่อไปนี้มีความเหมาะสมอย่างไร<br></br>
                                              (ด้านสิ่งอำนวยความสะดวกที่เอื้อต่อการพัฒนาการเรียนรู้ของนักศึกษา)
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                             พื้นที่การเรียนรู้ Science Learning Space มีความทันสมัยและพอเพียงในการให้บริการ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            พื้นที่การเรียนรู้ Science Learning Space มีการจัดบรรยากาศที่เอื้อต่อการพัฒนาการเรียนรู้ของนักศึกษา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            มีการให้บริการระบบสัญญาณ wifi บริเวณพื้นที่การเรียนรู้ Science Learning Space อย่างทั่วถึง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ห้องบริการคอมพิวเตอร์ ชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์ มีความทันสมัยและพอเพียงในการให้บริการ  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                              
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                            (การจัดบริการด้านกายภาพที่ส่งเสริมคุณภาพชีวิตของนักศึกษา)
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ห้องสำหรับการให้นักศึกษาจัดกิจกรรม (ห้องสโมสรนักศึกษา) อาคารปฏิบัติการทางวิทยาศาสตร์ มีความทันสมัยและพอเพียงในการให้บริการ
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            พื้นที่บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์ ได้จัดโต๊ะและเก้าอี้สำหรับให้นักศึกษาพักผ่อนอย่างเพียงพอ
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            มีการให้บริการระบบสัญญาณ wifi ในพื้นที่บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์อย่างทั่วถึง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีการปรับปรุงพัฒนาอาคารและสถานที่ให้ทันสมัยเพื่อช่วยส่งเสริมคุณภาพชีวิตในระหว่างการศึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>     
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                            (การให้บริการของเจ้าหน้าที่)
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            คณะได้จัดห้อง Science Service Center เพื่อให้นักศึกษาได้สะดวกในการติดต่อ สอบถามและรับให้คำปรึกษา (ชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์)
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            การให้บริการในการติดต่อ สอบถามของเจ้าหน้าที่ในสำนักงานคณบดี คณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>     
                                </Table.Body>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                            (การบริการข้อมูลข่าวสารที่เป็นประโยชน์ต่อนักศึกษา (การให้บริการของส่วนกลางคณะวิทยาศาสตร์))
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางเว็บไซต์ของคณะฯ (www.science.kmutt.ac.th) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง e-mail ของคณะฯ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>     
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Facebook ของคณะฯ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Application Line ของคณะฯ
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางบอร์ดประชาสัมพันธ์ของคณะฯ บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                              
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                            ( ด้านสิ่งแวดล้อมเชิงสุขอนามัยและมาตรฐานความปลอดภัยที่เป็นไปตามข้อกำหนด )
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การจัดการความปลอดภัยในทรัพย์สินของกล้องวงจรปิด (อาคารปฏิบัติการทางวิทยาศาสตร์) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            มีความปลอดภัยโดยรอบอาคารปฏิบัติการทางวิทยาศาสตร์ ยามรักษาความปลอดภัย 24 ชั่วโมง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>     
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ตู้บริการน้ำดื่มแก่นักศึกษา (อาคารปฏิบัติการทางวิทยาศาสตร์) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ห้องน้ำสะอาดถูกสุขลักษณะ (อาคารปฏิบัติการทางวิทยาศาสตร์) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางบอร์ดประชาสัมพันธ์ของคณะฯ บริเวณชั้น 1 อาคารปฏิบัติการทางวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>           
                        </Grid.Row>

                        <Grid.Row>
                            <Header  as ="h3">ส่วนที่ 2 การให้บริการของภาควิชา </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.สภาพแวดล้อมและสิ่งอำนวยความสะดวกที่สนับสนุนการเรียนการสอน 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ห้องเรียนบรรยายมีขนาดเหมาะสม 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            เครื่องคอมพิวเตอร์ และอุปกรณ์มัลติมีเดียในห้องเรียนเพียงพอและทันสมัย 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            จอ LCD Projector และ Visualizer ที่พร้อมใช้งาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีการให้บริการสัญญาณ wifi ในห้องเรียนบรรยายอย่างทั่วถึง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ห้องเรียนบรรยายสะอาดและมีแสงสว่างเพียงพอ
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            มีการปรับปรุงพัฒนาห้องเรียนบรรยายให้มีความพร้อมต่อการใช้งาน 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>                
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                2. ด้านเครื่องมือและอุปกรณ์ทางวิทยาศาสตร์/คอมพิวเตอร์ ที่สนับสนุนการเรียนการสอนปฏิบัติการและการวิจัย 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            เครื่องมือและอุปกรณ์/คอมพิวเตอร์ ในห้องปฏิบัติการมีความพร้อมในการใช้งาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            เครื่องมือและอุปกรณ์/คอมพิวเตอร์ ในห้องปฏิบัติการมีเพียงพอ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            เครื่องมือและอุปกรณ์/คอมพิวเตอร์ ในห้องปฏิบัติการมีความทันสมัย
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีการแนะนำการใช้เครื่องมือและอุปกรณ์/คอมพิวเตอร์ หรือมีเอกสารแนะนำการใช้เครื่องมือและอุปกรณ์/คอมพิวเตอร์  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>
                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3. ด้านห้องปฏิบัติการ/ห้องวิจัย/ห้องปฏิบัติการคอมพิวเตอร์ ที่สนับสนุนการเรียนการสอนและการวิจัย
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                             ห้องปฏิบัติการมีขนาดเหมาะสม ไม่แออัด 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ห้องปฏิบัติการมีแสงสว่างเพียงพอ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ห้องปฏิบัติการมีความสะอาด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ห้องปฏิบัติการมีระเบียบในการจัดเก็บเครื่องมือและอุปกรณ์/คอมพิวเตอร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ห้องปฏิบัติการมีความปลอดภัย 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            มีการปรับปรุงพัฒนาห้องปฏิบัติการให้มีความพร้อมในการใช้งาน   
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            มีการให้บริการสัญญาณ wifi ในห้องปฏิบัติการอย่างทั่วถึง  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>

                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3.  การจัดบริการด้านกายภาพที่ส่งเสริมคุณภาพชีวิตของนักศึกษา (การให้บริการของภาควิชา) 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ห้องสำหรับการให้นักศึกษาจัดกิจกรรม (ห้องกิจกรรมนักศึกษาของภาควิชา) พอเพียงในการให้บริการ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            พื้นที่บริเวณชั้น 1 ของภาควิชา ได้จัดโต๊ะและเก้าอี้สำหรับให้นักศึกษาพักผ่อนอย่างเพียงพอ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            มีการให้บริการระบบสัญญาณ wifi ในพื้นที่บริเวณชั้น 1 ของภาควิชาอย่างทั่วถึง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            มีการปรับปรุงพัฒนาอาคารและสถานที่ให้ทันสมัยเพื่อช่วยส่งเสริมคุณภาพชีวิตในระหว่างการศึกษา  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>
                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                4. การให้คำปรึกษาทางวิชาการและบริการแก่นักศึกษา 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การให้บริการติดต่อ สอบถามของเจ้าหน้าที่ในสำนักงานภาควิชา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            เจ้าหน้าที่ภาควิชาเพื่อให้บริการ นศ. มีจำนวนเพียงพอ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ความรู้ ความสามารถ และการให้บริการของเจ้าหน้าห้องปฏิบัติการ
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    
                                 </Table.Body>

                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                5. การบริการข้อมูลข่าวสารที่เป็นประโยชน์ต่อนักศึกษา (การให้บริการของภาควิชา)
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางเว็บไซต์ของภาควิชา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง e-mail ของภาควิชา  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Facebook ของภาควิชา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทาง Application Line ของภาควิชา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            การได้รับข่าวสารประชาสัมพันธ์กิจกรรมนักศึกษา และความรู้ต่างๆ ผ่านช่องทางบอร์ดประชาสัมพันธ์ของภาควิชา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>                          
                                 </Table.Body>
                                
                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                6.  ด้านสิ่งแวดล้อมเชิงสุขอนามัยและมาตรฐานความปลอดภัยที่เป็นไปตามข้อกำหนด 
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            การจัดการความปลอดภัยในทรัพย์สินของกล้องวงจรปิดบริเวณภาควิชา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            มีความปลอดภัยโดยรอบอาคารภาควิชา ยามรักษาความปลอดภัย 24 ชั่วโมง 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ตู้บริการน้ำดื่มแก่นักศึกษาตามอาคารภาควิชาและห้องปฏิบัติการภาควิชา 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ห้องน้ำสะอาดถูกสุขลักษณะ (อาคารภาควิชา) 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>
                                 </Table>           
                        </Grid.Row>  

                        <Grid.Row>
                            <Header  as ="h3">ส่วนที่ 3 การให้บริการสำนักหอสมุด และห้องพยาบาล (ของมหาวิทยาลัย) </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1. การให้บริการสำนักหอสมุด (ของมหาวิทยาลัย)  
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            จำนวนหนังสือ ตำรา วารสารที่ครอบคลุมกับความต้องการ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ระบบฐานข้อมูลวารสาร (E-Journal) ที่ครอบคลุมกับความต้องการ  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                             ความสะดวกของระบบการยืม-คืนหนังสือ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            การให้บริการในการติดต่อ สอบถามของเจ้าหน้าที่ในสำนักหอสมุด   
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>

                                 <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                2.  การให้บริการห้องพยาบาล (ของมหาวิทยาลัย)  
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                             ความสะอาดของสถานที่ให้บริการโดยรวม 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                             ขั้นตอนการให้บริการมีความสะดวกรวดเร็ว 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ช่วงเวลาการพบแพทย์มีความเหมาะสม
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            การให้บริการในการติดต่อ สอบถามของเจ้าหน้าที่ในห้องพยาบาล  
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                 </Table.Body>

                             </Table>           
                        </Grid.Row>
                    </Grid>

                </Container>

            </Fragment>
        )
    }
}
export default SummarySurvey