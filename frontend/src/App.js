import React, { Component } from "react";
import "./App.css";

// import Route Tool
import { Route } from "react-router-dom";

// import Main page
import Header from "./Components/Navbar";
import Footer from "./Components/footer";
import Index from "./Components/Index";
import Login from "./Components/Login";

// import Admin page
import add_student from "./Components/admin/NewStudent/Add_student";
import add_activity from "./Components/admin/activity/add_activity";
import add_project from "./Components/admin/project/AddProject";
import main_addmission from "./Components/admin/mainAddmission/main_addmission";
import add_announcement from "./Components/admin/announcement/add_announcement";
import see_student from "./Components/admin/student/see_student";
import add_alumni from "./Components/admin/alumni/add_alumni";
import SurveyAlumni from "./Components/admin/alumni/SurveyAlumni";
import PartTwo from "./Components/admin/alumni/PartTwo";
import PartTwoWork from "./Components/admin/alumni/PartTwoWork";
import PartTwoStudy from "./Components/admin/alumni/PartTwoStudy";
import PartTwoWS from "./Components/admin/alumni/PartTwoWS";
import PartThree from "./Components/admin/alumni/PartThree";
import PartFour from "./Components/admin/alumni/PartFour";
import PartFive from "./Components/admin/alumni/PartFive";
import SurveyAlumni2 from "./Components/admin/alumni/SurveyAlumni2";


// import User page
import UserDetails from "./Components/admin/work/UserDetails";



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
            <Route exact path="/add_student" component={add_student} />
            <Route exact path="/add_activity" component={add_activity} />
            <Route exact path="/add_project" component={add_project} />
            <Route exact path="/main-addmission" component={main_addmission} />
            <Route exact path="/add_announcement" component={add_announcement} />
            <Route exact path="/see_student" component={see_student} />
            <Route exact path="/add_alumni" component={add_alumni} />
            <Route exact path="/SurveyAlumni" component={SurveyAlumni} />
            <Route exact path="/PartTwo" component={PartTwo} />
            <Route exact path="/PartThree" component={PartThree} />
            <Route exact path="/PartFour" component={PartFour} />
            <Route exact path="/PartFive" component={PartFive} />
            <Route exact path="/PartTwoWork" component={PartTwoWork} />
            <Route exact path="/PartTwoStudy" component={PartTwoStudy} />
            <Route exact path="/PartTwoWS" component={PartTwoWS} />
            <Route exact path="/SurveyAlumni2" component={SurveyAlumni2} />
            
            <Route exact path="/userdetails" component={UserDetails} />
         

            
           
          </switch>
          <Footer />
        </div>
      </body>
    </React.Fragment>
  );
}

export default App;
