import React, {Component, Fragment} from "react";

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    List,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

import bgyel from "../img/bg-head3.png";




class Statcourse extends Component {

   
    render() {
        
        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel}/>
                <Container  className="container my-5">
                    <Header as="h3"  align='center'>
                        สรุปคะแนนรายวิชา Mean / GPA 
                    </Header>
                    <Divider/>

                            <List bulleted>
                                <List.Item> <Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 2 ปีการศึกษา 2561</Link></List.Item>
                                <List.Item><Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 1 ปีการศึกษา 2561</Link> </List.Item>
                                <List.Item><Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 2 ปีการศึกษา 2560</Link> </List.Item>
                                <List.Item> <Link to="/Statcoursebrancht" style={{color: 'black'}} > ภาคเรียนที่ 1 ปีการศึกษา 2560</Link></List.Item>
                            </List>

                            {/* <List bulleted>
                                <Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 2 ปีการศึกษา 2561</Link>          
                            </List>
                            <List bulleted>
                                <Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 1 ปีการศึกษา 2561</Link>          
                            </List>
                            <List bulleted>
                                <Link to="/Statcoursebranch" style={{color: 'black'}} > ภาคเรียนที่ 2 ปีการศึกษา 2560</Link>          
                            </List>
                            <List bulleted>
                                <Link to="/Statcoursebrancht" style={{color: 'black'}} > ภาคเรียนที่ 1 ปีการศึกษา 2560</Link>          
                            </List>
                        */}

                </Container>
            </Fragment>
        )
    }
}


export default Statcourse