import React, {Component, Fragment} from 'react'

import TabDialog from '../../../components/TabDialog'

import AlumniManage from './AlumniManage'
import AlumniSummary from "./AlumniSummary";
import AlumniSurvey from "./AlumniSurvey";
import AlumniAddSurvey from './AlumniAddSurvey'


class Alumni extends Component {

    render() {
        let tabName = ["สรุปข้อมูลศิษย์เก่า", "สรุปข้อมูลแบบสอบถาม", "จัดการรายการแบบสอบถาม", "เพิ่มข้อมูลแบบสอบถาม"]
        let paneTab = [<AlumniSummary/>, <AlumniSurvey/>, <AlumniManage/>, <AlumniAddSurvey/>]
        return (
            <Fragment>
                <TabDialog
                    dialogName="ข้อมูลศิษย์เก่า"
                    tabList={tabName}
                    paneList={paneTab}
                />
            </Fragment>
        )
    }
}

export default Alumni