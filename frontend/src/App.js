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
import Admin_Newstudent from "./Components/admin/NewStudent/NewStudent"; //รับเข้า
import Admin_activity from "./Components/admin/activity/Activity";
import Admin_project from "./Components/admin/project/Project";
import Admin_addmission from "./Components/admin/mainAddmission/Addmission";
import Announcement from "./Components/admin/announcement/Announcement";
import Admin_showStudent from "./Components/admin/student/Showstudent"; //หน้าแรกโชว์ข้อมูลนักศึกษารายคน
import Admin_alumni from "./Components/admin/alumni/Alumni"; //หน้าหลักเพิ่มศิษย์เก่า

// import User page
// import informationmth from "./Components/User/InfoMTH";
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
            <Route exact path="/add_student" component={Admin_Newstudent} />
            <Route exact path="/add_activity" component={Admin_activity} />
            <Route exact path="/add_project" component={Admin_project} />
            <Route exact path="/main-addmission" component={Admin_addmission} />
            <Route exact path="/add_announcement" component={Announcement} />
       
            <Route exact path="/see_student" component={Admin_showStudent} />
            <Route exact path="/add_alumni" component={Admin_alumni} />

            {/* <Route exact path="/SurveyAlumni" component={SurveyAlumni} /> */}
            
            {/* Route for user */}
            {/* <Route exact path="/informationmth" component={informationmth} /> */}
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
