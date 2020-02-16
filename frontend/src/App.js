import React, {Component} from "react";
import "./App.css";
import axios from "axios";


// import Route Tool
import {Route} from "react-router-dom";

// import Main page
import Header from "./Components/Navbar";
import Footer from "./Components/footer";
import Index from "./Components/index/Index";
import Login from "./Components/Login";

// import Admin page
import Admin_Newstudent from "./Components/admin/NewStudent/NewStudent"; //รับเข้า
import Admin_activity from "./Components/admin/activity/activity";
import Admin_project from "./Components/admin/project/Project";
import Admin_addmission from "./Components/admin/mainAddmission/addmission";
import Announcement from "./Components/admin/announcement/announcement";
import Admin_showStudent from "./Components/admin/student/Showstudent"; //หน้าแรกโชว์ข้อมูลนักศึกษารายคน
import Admin_alumni from "./Components/admin/alumni/Alumni"; //หน้าหลักเพิ่มศิษย์เก่า
import SurveyAlumni from "./Components/admin/alumni/SurveyAlumni";
import SurveyAlumni2 from "./Components/admin/alumni/SurveyAlumni2";

// import User page

import Active from "./Components/User/Active_recruitment";
import Addmisstion from "./Components/User/Addmission";
import Activity from "./Components/User/Activity";
import Alumni from "./Components/User/Alumni";
import Mathematic from "./Components/infomation/Mathematics";
import Chemical from "./Components/infomation/Chemical";
import Physic from "./Components/infomation/Physics";
import Microbiology from "./Components/infomation/Microbiology";

import ApiManage from "./Class/ApiManage";

import UploadForm from "./Components/UploadForm";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        ApiManage.get('admission/2560/1/1')
            .then(res => {
                let receive_data = res.data
                if (receive_data.response === true) {
                    this.setState({
                        data: receive_data.data
                    })
                }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            })
    }

    render() {
        let {data} = this.state
        return (
            <React.Fragment>
                <Header/>
                <div className="App">
                    <switch>
                        <Route exact path={"/testupload"} component={UploadForm} />
                        <Route exact path="/" component={Index}/>
                        <Route exact path="/login" component={Login}/>
                        {/* Route for admin */}
                        <Route
                            exact
                            path="/admin_Newstudent"
                            component={Admin_Newstudent}
                        />
                        <Route exact path="/admin_activity" component={Admin_activity}/>
                        <Route exact path="/admin_project" component={Admin_project}/>
                        <Route
                            exact
                            path="/admin/admission"
                            component={Admin_addmission}
                        />
                        <Route exact path="/admin_announcement" component={Announcement}/>

                        <Route exact path="/admin_student" component={Admin_showStudent}/>
                        <Route exact path="/admin_alumni" component={Admin_alumni}/>

                        <Route exact path="/surveyAlumni" component={SurveyAlumni}/>
                        <Route exact path="/surveyAlumni2" component={SurveyAlumni2}/>

                        {/* Route for user */}
                        <Route exact path="/active" component={Active}/>
                        <Route exact path="/addmission" component={Addmisstion}/>
                        <Route exact path="/activity" component={Activity}/>
                        <Route exact path="/alumni" component={Alumni}/>
                        <Route exact path="/mathematics" component={Mathematic}/>
                        <Route exact path="/chemical" component={Chemical}/>
                        <Route exact path="/physics" component={Physic}/>
                        <Route exact path="/microbiology" component={Microbiology}/>
                    </switch>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default App;
