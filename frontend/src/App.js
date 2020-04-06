import React, { Component, Fragment } from 'react';
import './App.css';

// router
import {Route, Switch} from 'react-router-dom'

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
import AdminHome from "./pages/admin/Home";
import AdminHomeGeneral from "./pages/admin/HomeGeneral";
import AdminActivity from "./pages/admin/Activity";
import AdminNewStudent from "./pages/admin/NewStudent"
import AlumniManage from './pages/admin/AlumiManage';

import AdminLayout from './layouts/Admin'

class App extends Component {
  render() {
    return (
        <Fragment>
          <Navbar/>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/admission" component={Admission}/>
              <Route exact path="/active" component={ActiveRecruitment}/>
              <Route exact path="/alumni" component={Alumni}/>
              <Route exact path="/activity" component={ActivityInformation}/>

              <Route path="/department/:dept_id" component={DepartmentDetail} />

              {/*    admin    */}
              <Route exact path="/admin" component={AdminHome}/>
              <Route exact path="/adminGeneral" component={AdminHomeGeneral}/>
              <Route exact path="/admin/activity" component={AdminActivity} />
              <Route exact path="/admin/alumni" component={AlumniManage} />
              <Route exact path="/admin/newstudent" component={AdminNewStudent} />
              <Route exact path="/layout" component={AdminLayout} />
            </Switch>
          </div>
        </Fragment>
    )
  }
}

export default App;
