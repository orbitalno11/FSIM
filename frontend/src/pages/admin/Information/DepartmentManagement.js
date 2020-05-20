import React, { Component, Fragment } from 'react'

import SideTabDialog from '../../../components/SideTabDialog'

const TestComponent = ({ name }) => (
    <Fragment>
        <h1>{name}</h1>
    </Fragment>
)

class DepartmentManagement extends Component {
    render() {

        let dropdownTitle = "รายการ"

        let tabName = [
            {
                tabId: "1",
                tabTitle: "Tab 1"
            },
            {
                tabId: "2",
                tabTitle: "Tab 2"
            },
            {
                tabId: "3",
                tabTitle: "Tab 3"
            },
            {
                tabId: "4",
                tabTitle: "Tab 4"
            }
        ]

        let tabDetail = [
            {
                tabId: "1",
                tabDetail: <TestComponent name="TAB1" />
            },
            {
                tabId: "2",
                tabDetail: <TestComponent name="TAB2" />
            },
            {
                tabId: "3",
                tabDetail: <TestComponent name="TAB3" />
            },
            {
                tabId: "4",
                tabDetail: <TestComponent name="TAB4" />
            }
        ]

        return (
            <Fragment>
                <SideTabDialog startKey={"1"} tabName={tabName} tabDetail={tabDetail} dropdownTitle={dropdownTitle} />
            </Fragment>
        )
    }
}

export default DepartmentManagement