import React, { Component, Fragment } from "react";
import { Route, Switch } from 'react-router-dom'

// page component
import AdminMenu from "../components/AdminMenu";
import AdminHome from "../pages/admin/Home";
import AlumniManage from "../pages/admin/AlumiManage";
import Activity from "../pages/admin/Activity";
import Admission from "../pages/admin/AdmissionManage";
import Information from "../pages/admin/Information";


class AdminLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <AdminMenu />
                <Switch>
                    <Route exact path={"/admin"} component={AdminHome} />
                    <Route exact path={"/admin/information"} component={Information} />
                    <Route exact path={"/admin/admission"} component={Admission} />
                    <Route exact path={"/admin/activity"} component={Activity} />
                    <Route exact path={"/admin/alumni"} component={AlumniManage} />
                </Switch>
            </Fragment>
        )
    }
}

export default AdminLayout