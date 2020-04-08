import React, { Component, Fragment } from "react";
import { Route, Switch } from 'react-router-dom'

// page component
import AdminMenu from "../components/AdminMenu";
import AdminHome from "../pages/admin/Home";
import AlumniManage from "../pages/admin/AlumiManage";
import Activity from "../pages/admin/Activity";
import Admission from "../pages/admin/AdmissionManage";

// information
import Information from "../pages/admin/Information";
import Department from '../pages/admin/Department'

// redux
import { connect } from 'react-redux'


class AdminLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <AdminMenu username={this.props.user.userName} />
                <Switch>
                    <Route exact path={"/admin"} component={AdminHome} />
                    <Route exact path={"/admin/information"} component={Information} />
                    <Route exact path={"/admin/information/department"} component={Department} />
                    <Route exact path={"/admin/admission"} component={Admission} />
                    <Route exact path={"/admin/activity"} component={Activity} />
                    <Route exact path={"/admin/alumni"} component={AlumniManage} />
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user : state.auth
})

export default connect(mapStateToProps)(AdminLayout)