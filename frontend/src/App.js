import React, { Component, Fragment } from 'react';
import './App.css';

// router
import {Route, Switch} from 'react-router-dom'

// general component
import Navbar from './components/Menu'
import Home from './layouts/Home'


// user component
import Admission from "./layouts/Admission";
import ActiveRecruitment from "./layouts/ActiveRecruitment";
import Alumni from "./layouts/Alumni";
import ActivityInformation from "./layouts/ActivityInformation";

import DepartmentDetail from './layouts/DepartmentDetail'

// admin component
import AdminHome from "./layouts/admin/Home";
import AdminHomeGeneral from "./layouts/admin/HomeGeneral";
import AdminActivity from "./layouts/admin/Activity";
import AdminNewStudent from "./layouts/admin/NewStudent"
import AlumniManage from './layouts/admin/AlumiManage';

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
            </Switch>
          </div>
        </Fragment>
    )
  }
}

export default App;
