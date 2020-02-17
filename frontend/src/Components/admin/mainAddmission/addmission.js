import React, { Component }  from 'react'
import SetButton from './SetButton'
import {
    Container
    
} from "semantic-ui-react";
// import { useHistory } from 'react-router-dom'
class main_addmission extends Component {

  

    Redirect(event){
        // alert(event.name)
        
        this.props.history.push(event.url);
    
    }

    render(){
        const url =[
            {
                id: 1,
                name : 'ข้อมูลนักศึกษารับเข้า',
                detail : 'ระบบตรวจสอบการรับเข้าของนักศึกษา ในรอบต่างๆ',
                url : '/admin/Newstudent',
                icon : 'add user',
            },
            {
                id: 2,
                name : 'กิจกรรม',
                detail : 'ระบบตรวจสอบกิจกรรมการรับเข้าต่างๆ รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา',
                url : '/admin/activity',
                icon : '',
            },
            {
                id: 3,
                name : 'โครงการการรับเข้า',
                detail : 'ระบบตรวจสอบโครงการรับนักศึกษาเข้า',
                url : '/admin/project',
                icon : '',
            },
        ]
        return(
            <React.Fragment >
                <Container  className="contrain_css" >
                    
                    <h2 style={{color:'#3BB3A9'}}>จัดการข้อมูลการรับเข้า</h2>
                    {
                        url.map((item)=>
                        <SetButton item={item} Redirect={this.Redirect.bind(this)} key={item.id}/>
                        )
                    }
                 
                </Container>
            </React.Fragment>
        )
    }
}

export default main_addmission;