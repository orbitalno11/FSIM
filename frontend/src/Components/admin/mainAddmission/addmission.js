import React, { Component }  from 'react'
import SetButton from './SetButton'
import {
    Container
    
} from "semantic-ui-react";
// import { useHistory } from 'react-router-dom'
class main_addmission extends Component {

    state=[
        {
            id: 1,
            name : 'ข้อมูลนักศึกษารับเข้า',
            detail : 'ระบบตรวจสอบการรับเข้าของนักศึกษา ในรอบต่างๆ',
            url : '/admin_Newstudent',
            icon : 'add user',
        },
        {
            id: 2,
            name : 'กิจกรรม',
            detail : 'ระบบตรวจสอบกิจกรรมการรับเข้าต่างๆ รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา',
            url : '/admin_activity',
            icon : '',
        },
        {
            id: 3,
            name : 'โครงการการรับเข้า',
            detail : 'ระบบตรวจสอบโครงการรับนักศึกษาเข้า',
            url : '/admin_project',
            icon : '',
        },
    ]

    Redirect(event){
        // alert(event.name)
        
        this.props.history.push(event.url);
    
    }

    render(){
        return(
            <React.Fragment >
                <Container  className="contrain_css" >
                    
                    <h2 style={{color:'#3BB3A9'}}>จัดการข้อมูลการรับเข้า</h2>
                    {
                        this.state.map((item)=>
                        <SetButton item={item} Redirect={this.Redirect.bind(this)}/>
                        )
                    }
                 
                </Container>
            </React.Fragment>
        )
    }
}

export default main_addmission;