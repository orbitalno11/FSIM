import React, { Component, Fragment } from "react";
import { Route } from 'react-router-dom'
import { Row, Col, Switch, Button, Image } from 'react-bootstrap'

// page component
import AdminMenu from "../components/AdminMenu";
import AdminHome from "../pages/admin/Home";
import AlumniManage from "../pages/admin/AlumiManage";
import Activity from "../pages/admin/Activity";
import Admission from "../pages/admin/AdmissionManage";
import Information from "../pages/admin/Information";

// img resource
import FSciLogo from '../img/60year-fsci.png'
import Banner from '../img/slide3.JPG'


class AdminLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { match } = this.props
        return (
            <Fragment>
                <AdminMenu cur_url={match.url} />
                <Row noGutters>
                    {/* <Col lg={2}>
                        <div id="adminNav">
                            <Image src={FSciLogo} width={"80%"} height={"auto"} className="my-3" />
                            <p>สวัสดี, ชื่อผู้ใช้</p>
                            <AdminMenu cur_url={match.url} />
                            <Button>ออกจากระบบ</Button>
                        </div>
                    </Col> */}
                    <Col lg={12} sm={12}>
                        <Row noGutters>
                            <Col lg={12} sm={12}>
                            </Col>
                        </Row>
                        <Row className="my-5" noGutters>
                            <Col lg={12} sm={12}>
                                <Switch>
                                    {/* <Route exact path={`${match.url}`} component={AdminHome} /> */}
                                    <Route exact path={`${match.url}/information`} component={Information} />
                                    <Route exact path={`${match.url}/admission`} component={Admission} />
                                    <Route exact path={`${match.url}/activity`} component={Activity} />
                                    <Route exact path={`${match.url}/alumni`} component={AlumniManage} />
                                </Switch>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default AdminLayout