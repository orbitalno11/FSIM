import React, { Component }  from 'react'
import SetButton from './setButton'
import {
    Button,
    Icon,
    Grid,
    Divider,
    Segment,
    Container
    
} from "semantic-ui-react";

class main_addmission extends Component {

    state=[
        {
            name : 'ข้อมูลนักศึกษารับเข้า',
            detail : 'ระบบตรวจสอบการรับเข้าของนักศึกษา ในรอบต่างๆ',
            url : '',
            icon : '',
        },
        {
            name : 'กิจกรรม',
            detail : 'ระบบตรวจสอบกิจกรรมการรับเข้าต่างๆ รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา',
            url : '',
            icon : '',
        },
        {
            name : 'โครงการการรับเข้า',
            detail : 'ระบบตรวจสอบโครงการรับนักศึกษาเข้า',
            url : '',
            icon : '',
        },

    ]

    render(){
        return(
            <React.Fragment>
                <Container className="contrain_css bg-page" >
                    
                    <h2 style={{color:'#3BB3A9'}}>จัดการข้อมูลการรับเข้า</h2>
                    {
                        this.state.map((item)=>
                        <SetButton item={item}/>
                        )
                    }
                 
                </Container>
            </React.Fragment>
        )
    }
}

export default main_addmission;