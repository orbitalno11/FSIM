import React, { Component }  from 'react'
import { Container} from 'react-bootstrap';
import SetButton from './setButton'

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
                <Container className="contrain_css">
                    <h4>จัดการข้อมูลการรับเข้า</h4>
                    <SetButton />
                </Container>
            </React.Fragment>
        )
    }
}

export default main_addmission;