import React, { Component, Fragment } from 'react'

import SideTabDialog from '../../../components/SideTabDialog'

class DepartmentManagement extends Component {
    render() {


        return (
            <Fragment>
                <SideTabDialog startKey={"1"} tabName={tabName} tabDetail={tabDetail} dropdownTitle={dropdownTitle} />
            </Fragment>
        )
    }
}

export default DepartmentManagement