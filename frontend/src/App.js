import React, {Component, Fragment} from 'react';
import './App.css';

// router
import {Route, Switch} from 'react-router-dom'

// general component
import Navbar from './components/general/Menu'
import Home from './components/layouts/Home'

// user component
import Admission from "./components/layouts/user/Admission";
import ActiveRecruitment from "./components/layouts/user/ActiveRecruitment";
import Alumni from "./components/layouts/user/Alumni";
import ActivityInformation from "./components/layouts/user/ActivityInformation";

// admin component
import AdminHome from "./components/layouts/admin/Home";
import AdminActivity from "./components/layouts/admin/Activity";
import AdminNewStudent from "./components/layouts/admin/NewStudent"

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

                        {/*    admin    */}
                        <Route exact path="/admin" component={AdminHome}/>
                        <Route exact path="/admin/activity" component={AdminActivity} />
                        <Route exact path="/admin/newstudent" component={AdminNewStudent} />
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default App;
