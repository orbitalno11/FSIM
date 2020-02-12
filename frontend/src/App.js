import React, { Component } from "react";
import "./App.css";

// import Route Tool
import { Route } from "react-router-dom";

// import Main page
import Header from "./Components/Navbar";
import Footer from "./Components/footer";
import Index from "./Components/Index";
import Login from "./Components/Login";
<<<<<<< HEAD
import StudentForm from "./Components/StudentForm";
import add_student from "./Components/admin/NewStudent/NewStudent";
import add_activity from "./Components/admin/activity/activity";
import add_project from "./Components/admin/project/AddProject";
import main_addmission from "./Components/admin/mainAddmission/addmission";
import add_announcement from "./Components/admin/announcement/announcement";
// import Mthpopup from "./Components/Mthpopup";
=======

// import Admin page
import add_student from "./Components/admin/NewStudent/Add_student"; //รับเข้า
import add_activity from "./Components/admin/activity/add_activity";
import add_project from "./Components/admin/project/AddProject";
import main_addmission from "./Components/admin/mainAddmission/main_addmission";
import add_announcement from "./Components/admin/announcement/add_announcement";
>>>>>>> 8a2ac79b9ab049ca7b8f420da0602b7ac3b3e50d

import see_student from "./Components/admin/student/see_student"; //หน้าแรกโชว์ข้อมูลนักศึกษารายคน
import add_alumni from "./Components/admin/alumni/add_alumni"; //หน้าหลักเพิ่มศิษย์เก่า
import SurveyAlumni from "./Components/admin/alumni/SurveyAlumni"; //แบบประเมินศิษย์เก่า
// import PartTwo from "./Components/admin/alumni/PartTwo";
// import PartTwoWork from "./Components/admin/alumni/PartTwoWork";
// import PartTwoStudy from "./Components/admin/alumni/PartTwoStudy";
// import PartTwoWS from "./Components/admin/alumni/PartTwoWS";
// import PartThree from "./Components/admin/alumni/PartThree";
// import PartFour from "./Components/admin/alumni/PartFour";
// import PartFive from "./Components/admin/alumni/PartFive";
// import SurveyAlumni2 from "./Components/admin/alumni/SurveyAlumni2"; 

// import User page
// import UserDetails from "./Components/admin/work/UserDetails"; //อ้อมเพิ่มต่อจากตรงนี้ได้เลย

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
            {/* <Route exact path="/PartTwo" component={PartTwo} />
            <Route exact path="/PartThree" component={PartThree} />
            <Route exact path="/PartFour" component={PartFour} />
            <Route exact path="/PartFive" component={PartFive} />
            <Route exact path="/PartTwoWork" component={PartTwoWork} />
            <Route exact path="/PartTwoStudy" component={PartTwoStudy} />
            <Route exact path="/PartTwoWS" component={PartTwoWS} />
            <Route exact path="/SurveyAlumni2" component={SurveyAlumni2} /> */}

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
