import React, { Component } from "react";
import "./App.css";

// import Route Tool
import { Route } from "react-router-dom";

// import Main page
import Header from "./Components/Navbar";
import Footer from "./Components/footer";
import Index from "./Components/index/Index";
import Login from "./Components/Login";


// import Admin page
import add_student from "./Components/admin/NewStudent/NewStudent"; //รับเข้า
import add_activity from "./Components/admin/activity/Activity";
import add_project from "./Components/admin/project/Project";
import main_addmission from "./Components/admin/mainAddmission/Addmission";
import add_announcement from "./Components/admin/announcement/Announcement";

import see_student from "./Components/admin/student/see_student"; //หน้าแรกโชว์ข้อมูลนักศึกษารายคน
import add_alumni from "./Components/admin/alumni/add_alumni"; //หน้าหลักเพิ่มศิษย์เก่า
import SurveyAlumni from "./Components/admin/alumni/SurveyAlumni"; //แบบประเมินศิษย์เก่า


// import User page

import informationmth from "./Components/User/InfoMTH";
import Addmission from "./Components/User/Addmission";
import AddmisstionInfo from "./Components/User/Addmission_information";
import Activity from "./Components/User/Activity";

const Home = () => <h1>HOME</h1>;
const About = () => <h1>About</h1>;

// export class Index extends Component{
//   constructor(props){
//     super(props);
//     this.state ={Index:[]}
//   })
// }

function App() {
  return (
    <React.Fragment>
      <body>
        <div className="App">
          <Header />
          <switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            {/* Route for amin */}
            <Route exact path="/add_student" component={add_student} />
            <Route exact path="/add_activity" component={add_activity} />
            <Route exact path="/add_project" component={add_project} />
            <Route exact path="/main-addmission" component={main_addmission} />
            <Route exact path="/add_announcement" component={add_announcement} />
       
            <Route exact path="/see_student" component={see_student} />
            <Route exact path="/add_alumni" component={add_alumni} />

            <Route exact path="/SurveyAlumni" component={SurveyAlumni} />
            

            {/* Route for user */}
            <Route exact path="/informationmth" component={informationmth} />
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

export default App;
