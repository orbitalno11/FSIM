import React, { Component, Fragment } from 'react';
import './App.css';

// router
import { Route, Switch } from 'react-router-dom'

// redux
import { connect } from 'react-redux'

// general component
import Navbar from './components/Menu'
import Home from './pages/Home'


// user component
import Admission from "./pages/Admission";
import ActiveRecruitment from "./pages/ActiveRecruitment";
import Alumni from "./pages/Alumni";
import ActivityInformation from "./pages/ActivityInformation";

import DepartmentDetail from './pages/DepartmentDetail'

// admin component
import AdminLayout from './layouts/Admin'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { user } = this.props
        return (
            <Fragment>
                {user.userType === 'user' && <Navbar />}
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admission" component={Admission} />
                        <Route exact path="/active" component={ActiveRecruitment} />
                        <Route exact path="/alumni" component={Alumni} />
                        <Route exact path="/activity" component={ActivityInformation} />

                        <Route path="/department/:dept_id" component={DepartmentDetail} />

                        {/*    admin    */}
                        <Route path="/admin" component={AdminLayout} />
                    </Switch>
                </div>
                {user.userType !== 'user' &&
                    <div className="footer mt-0">
                        ภาควิชาคณิตศาสตร์, คณะวิทยาศาสตร์, มจธ.<br />
                126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร 10140<br />
                โทรศัพท์ (+66) 2 470 8820, (+66) 2 470 8822, (+66) 2 470 8839,
                โทรสาร (+66) 2 428 4025
             </div>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth
})

export default connect(mapStateToProps)(App);
