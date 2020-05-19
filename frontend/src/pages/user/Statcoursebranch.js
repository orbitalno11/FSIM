import React, {Component, Fragment} from "react";

import {
    Header,
    Divider,
    Container,
    List,
    Image
} from "semantic-ui-react";

import { Link } from "react-router-dom";


class Statcoursebranch extends Component {

   
    render() {
        
        return (
            <Fragment>
                <Container  className="container my-5">
                    <Header as="h3"  align='center'>
                        สรุปคะแนนรายวิชา Mean / GPA 
                    </Header>
                    <Divider/>
                 

                            <List bulleted>
                                <List.Item>ภาควิชาคณิตศาสตร์</List.Item>      
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} >สาขาคณิตศาสตร์</Link>          
                                </List>   
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} > สาขาสถิต</Link>          
                                </List> 
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} > สาขาวิทยาการคอมพิวเตอร์ประยุกต</Link>          
                                </List>   
                            </List>
                            <List bulleted>
                                <List.Item>ภาควิชาจุลชีววิทยา</List.Item>   
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} >สาขาจุลชีววิทยา</Link>          
                                </List>   
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} > สาขาวิทยาศาสตร์และเทคโนโลยีการอาหาร</Link>          
                                </List> 
                                  
                            </List>
                            <List bulleted >
                                <List.Item> ภาควิชาเคมี</List.Item>    
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} >สาขาเคมี</Link>          
                                </List>   
                               
                                  
                            </List>
                            <List bulleted>
                                <List.Item>ภาควิชาฟิสิกส์ </List.Item>   
                                <List bulleted>
                                     <Link to="/StatcourseGPA" style={{color: 'black'}} >สาขาฟิสิกส์ประยุกต์(หลักสูตรสองภาษา)</Link>          
                                </List>   
                            </List>

                </Container>
            </Fragment>
        )
    }
}


export default Statcoursebranch