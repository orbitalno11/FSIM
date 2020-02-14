import React, { Component } from "react";
import "./App.css";
import axios from "axios";


// import Route Tool
import { Route } from "react-router-dom";

// import Main page
import Header from "./Components/Navbar";
import Footer from "./Components/footer";
import Index from "./Components/index/Index";
import Login from "./Components/Login";

// import Admin page
import Admin_Newstudent from "./Components/admin/NewStudent/NewStudent"; //รับเข้า
import Admin_activity from "./Components/admin/activity/Activity";
import Admin_project from "./Components/admin/project/Project";
import Admin_addmission from "./Components/admin/mainAddmission/Addmission";
import Announcement from "./Components/admin/announcement/Announcement";
import Admin_showStudent from "./Components/admin/student/Showstudent"; //หน้าแรกโชว์ข้อมูลนักศึกษารายคน
import Admin_alumni from "./Components/admin/alumni/Alumni"; //หน้าหลักเพิ่มศิษย์เก่า

// import User page

import Addmission from "./Components/User/Addmission";
import AddmisstionInfo from "./Components/User/Addmission_information";
import Activity from "./Components/User/Activity";
import { render } from "react-dom";

const Home = () => <h1>HOME</h1>;
const About = () => <h1>About</h1>;

class App extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     loggedInStatus: "NOT_LOGGED_IN",
  //     user: {}
  //   };

  //   this.handleLogin = this.handleLogin.bind(this);
  //   this.handleLogout = this.handleLogout.bind(this);
  // }

  // checkLoginStatus() {
  //   axios
  //     .get("http://localhost:3000/login", { withCredentials: true })
  //     .then(response => {
  //       if (
  //         response.data.logged_in &&
  //         this.state.loggedInStatus === "NOT_LOGGED_IN"
  //       ) {
  //         this.setState({
  //           loggedInStatus: "LOGGED_IN",
  //           user: response.data.user
  //         });
  //       } else if (
  //         !response.data.logged_in &
  //         (this.state.loggedInStatus === "LOGGED_IN")
  //       ) {
  //         this.setState({
  //           loggedInStatus: "NOT_LOGGED_IN",
  //           user: {}
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log("check login error", error);
  //     });
  // }

  // componentDidMount() {
  //   this.checkLoginStatus();
  // }

  // handleLogout() {
  //   this.setState({
  //     loggedInStatus: "NOT_LOGGED_IN",
  //     user: {}
  //   });
  // }

  // handleLogin(data) {
  //   this.setState({
  //     loggedInStatus: "LOGGED_IN",
  //     user: data.user
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <body>
          <div className="App">
            <Header />
            <switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/login" component={Login} />
              {/* Route for admin */}
              <Route
                exact
                path="/admin_Newstudent"
                component={Admin_Newstudent}
              />
              <Route exact path="/admin_activity" component={Admin_activity} />
              <Route exact path="/admin_project" component={Admin_project} />
              <Route
                exact
                path="/admin_addmission"
                component={Admin_addmission}
              />
              <Route exact path="/admin_announcement" component={Announcement} />
  
              <Route exact path="/admin_student" component={Admin_showStudent} />
              <Route exact path="/admin_alumni" component={Admin_alumni} />
  
              {/* <Route exact path="/SurveyAlumni" component={SurveyAlumni} /> */}
  
              {/* Route for user */}
              <Route exact path="/addmission" component={Addmission} />
              <Route exact path="/addmissionInfo" component={AddmisstionInfo} />
              <Route exact path="/activity" component={Activity} />
            </switch>
            <Footer />
          </div>
        </body>
      </React.Fragment>
    );
  }
}
export default App;
