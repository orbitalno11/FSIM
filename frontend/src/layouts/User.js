import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Image } from 'semantic-ui-react'

import bgyel from '../img/bg-head.png'
import bannerbot from "../img/bottom-left.png";

// page component
import UserHome from '../pages/user'
// user component
import Admission from "../pages/user/Admission";
import ActiveRecruitment from "../pages/user/ActiveRecruitment";
import Alumni from "../pages/user/Alumni";
import ActivityInformation from "../pages/user/ActivityInformation";
import DepartmentStudent from '../pages/user/DepartmentStudent'




class UserLayout extends Component {
    render() {
        return (
            <Fragment>
                <Image size="massive" className="fs-bg-tp-yellow" src={bgyel} />
                <Image size="massive" className="fs-bg-bt-yellow" src={bannerbot} />
                <Switch>
                    <Route exact path="/" component={UserHome} />
                    <Route exact path="/admission" component={Admission} />
                    <Route exact path="/activity/ar" component={ActiveRecruitment} />
                    <Route exact path="/alumni" component={Alumni} />
                    <Route exact path="/activity" component={ActivityInformation} />
                    <Route exact path="/student/:id" component={DepartmentStudent} />
                </Switch>
            </Fragment>
        )
    }
}

export default UserLayout