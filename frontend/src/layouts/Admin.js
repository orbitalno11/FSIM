import React, { Component, Fragment } from "react";
import { Route, Switch } from 'react-router-dom'

// page component
import AdminHome from "../pages/admin/Home";
import Alumni from "../pages/admin/Alumni";
import Activity from "../pages/admin/Activity";
import Admission from "../pages/admin/Admission/AdmissionManage";
import Student from "../pages/admin/Student/Student";
import Statcourse from '../pages/Statcourse'

// information
import Information from "../pages/admin/Information/Information";
import Department from '../pages/admin/Information/Department'
import Course from '../pages/admin/Information/Course'


// redux
import { connect } from 'react-redux'



class AdminLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path={"/admin"} component={AdminHome} />
                    <Route exact path={"/admin/information"} component={Information} />
                    <Route exact path={"/admin/information/department"} component={Department} />
                    <Route exact path={"/admin/information/course"} component={Course} />
                    <Route exact path={"/admin/information/Subject"} component={Statcourse} />
                    <Route exact path={"/admin/admission"} component={Admission} />
                    <Route exact path={"/admin/activity"} component={Activity} />
                    <Route exact path={"/admin/alumni"} component={Alumni} />
                    <Route exact path={"/admin/student"} component={Student} />
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user : state.auth
})

export default connect(mapStateToProps)(AdminLayout)