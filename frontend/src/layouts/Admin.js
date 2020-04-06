import React, {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import {Row, Col, Switch, Button, Image} from 'react-bootstrap'

// page component
import AdminMenu from "../components/AdminMenu";
import AdminHome from "../pages/admin/Home";
import AlumniManage from "../pages/admin/AlumiManage";
import Activity from "../pages/admin/Activity";

// img resource
import FSciLogo from '../img/60year-fsci.png'
import Banner from '../img/slide3.JPG'


class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "home"
        }
    }

    handleSelectMenu = selectedItem => this.setState({
        activeItem: selectedItem
    })

    render() {
        let { match } = this.props
        return (
            <div>
                <Row noGutters>
                    <Col lg={2}>
                        <div id="adminNav">
                            <Image src={FSciLogo} width={"80%"} height={"auto"} className="my-3" />
                            <p>สวัสดี, ชื่อผู้ใช้</p>
                            <AdminMenu cur_url={match.url} />
                            <Button>ออกจากระบบ</Button>
                        </div>
                    </Col>
                    <Col lg={10} sm={12}>
                        <Row noGutters>
                            <Col lg={12} sm={12}>
                                <Image src={Banner} fluid />
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col lg={12} sm={12}>
                                <Switch>
                                    <Route exact path={`${match.url}`} component={AdminHome}/>
                                    <Route exact path={`${match.url}/information`} component={AlumniManage}/>
                                    <Route exact path={`${match.url}/admission`} component={Activity}/>
                                    <Route exact path={`${match.url}/activity`} component={Activity}/>
                                    <Route exact path={`${match.url}/alumni`} component={AlumniManage}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminLayout