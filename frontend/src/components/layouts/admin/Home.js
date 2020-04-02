import React, {Component, Fragment} from "react";
import { FaUserTie } from 'react-icons/fa'

import {
    Container,
    Divider,
    Header,
    Image,
    Grid,
    Button, Icon
} from "semantic-ui-react";

import bgyel from "../../../img/head-left.png";
import bannerbot from "../../../img/bottom-right.png";

const SetOfButton = ({item}) => (
    <Fragment>
        <Grid columns={2} relaxed='very' style={{marginTop: '2%'}} divided>
            <Grid.Column width={6} verticalAlign={"middle"} textAlign={"right"}>
                <Button size="huge" className="Tab2-text btn-EditData red"
                        id={item.name}
                        style={{fontSize: '15px', width: '200px'}}>
                    <Icon name={item.icon}/>{item.name}
                </Button>
            </Grid.Column>      

            <Grid.Column verticalAlign='middle' width={10} textAlign='left'>
                {item.detail}
            </Grid.Column>
        </Grid>
    </Fragment>
)

const url = [
    {
        id: 1,
        name: "ข้อมูลนักศึกษารับเข้า",
        detail: "ระบบตรวจสอบการรับเข้าในรอบต่างๆ",
        url: "/",
        icon: "<FaUserTie/>"
    },
    {
        id: 2,
        name: "ข้อมูลกิจกรรม",
        detail:
            "ระบบตรวจสอบกิจกรรมการรับเข้า รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา",
        url: "/",
        icon: ""
    },
    {
        id: 3,
        name: "ข้อมูลโครงการรับเข้า",
        detail: "ระบบตรวจสอบข้อมูลโครงการรับเข้า",
        url: "/",
        icon: ""
    }
]

class AdminHome extends Component {
    // Redirect(event) {
    //     this.props.history.push(event.url);
    // }

    render() {
        return (
            <Fragment>
                <Image size="massive" className="background-white" src={bgyel}/>
                <Image size="massive" className="bottom-left2" src={bannerbot}/>

                <Container>
                    <div className="admission">
                        <Header as="h2" style={{color: "#3BB3A9"}}>
                            จัดการข้อมูลการรับเข้า
                        </Header>
                        <Divider/>
                        {
                            url.map(item => (
                                <SetOfButton
                                item={item}
                                key={item.id} />
                            ))
                        }
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default AdminHome