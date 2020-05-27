import React, {Component, Fragment} from "react";

import {
    Header,
    Divider,
    Container,
    List,
} from "semantic-ui-react";

import { Link } from "react-router-dom";


class Statcourse extends Component {

   
    render() {
        
        return (
            <Fragment>
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

                </Container>
            </Fragment>
        )
    }
}


export default Statcourse