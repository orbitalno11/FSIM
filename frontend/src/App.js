import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// import Api
// import ApiManage from "./Class/ApiManage";


//import Main Page
import Home from "./Components/Index/Home";
import Navbar from "./Components/Menu";
import Login from "./Components/Login";

//import Admin Page
import MainAdmin from "./Components/Admin/MainAdmin/MainAdmission";
import Admin_activity from "./Components/Admin/Activity/Activity";
import Admin_NewStudent from "./Components/Admin/NewStudent/NewStudent";
import Admin_Alumni from "./Components/Admin/Alumni/Alumni";
import Admin_Announcement from "./Components/Admin/Announcement/Announcement";

//import User Page
import Active from "./Components/User/ActiveRecruitment";
import Admission from "./Components/User/Admission";
import Alumni from "./Components/User/Alumni";
import Activity from "./Components/User/Activity";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  // componentDidMount() {
  //   ApiManage.get("admission/2560/1/1")
  //     .then(res => {
  //       let receive_data = res.data;
  //       if (receive_data.response === true) {
  //         this.setState({
  //           data: receive_data.data
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Error fetching and parsing data", error);
  //     });
  // }
  render() {
    // let { data } = this.state;
    return (
      <React.Fragment>
        <Navbar/>
        <div className="App" >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>

            {/* Route for admin */}
            <Route exact path="/admin" component={MainAdmin} />
            <Route exact path="/admin/activity" component={Admin_activity} />
            <Route exact path="/admin/newstudent" component={Admin_NewStudent} />
            <Route exact path="/admin/alumni" component={Admin_Alumni} />
            {/* <Route exact path="/admin/announce" component={Admin_Announcement} /> */}

            {/* Route for user */}
            <Route exact path="/active" component={Active}/>
            <Route exact path="/admission" component={Admission} />
            <Route exact path="/alumni" component={Alumni}/>
            <Route exact path="/activity" component={Activity} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
