import React, { Component, Fragment } from 'react'
import './App.css'

// router
import { Route, Switch, withRouter } from 'react-router-dom'

import jwtDecode from 'jwt-decode'

// general component
import Navbar from './components/Menu'
// import Home from './pages/user/Home'

// import user layout
import UserLayout from './layouts/User'

// user component
import Admission from "./pages/user/Admission";
import ActiveRecruitment from "./pages/user/ActiveRecruitment";
import Alumni from "./pages/user/Alumni";
import ActivityInformation from "./pages/user/ActivityInformation";

import DepartmentDetail from './pages/user/DepartmentDetail'
import DepartmentStudent from './pages/user/DepartmentStudent'
import Statcourse from './pages/user/Statcourse'
import StatcourseGPA from './pages/user/StatcourseGPA'
import Statcoursebranch from './pages/user/Statcoursebranch'


// admin component
import AdminLayout from './layouts/Admin'

// authen
import Login from './pages/user/Login'
import AuthRoute from './components/AuthRoute'
import AdminRoute from './components/AdminRoute'

import Loading from './components/LoadingComponent'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import rootReducer from './redux/reducers';

import { userLogout, setUser } from './redux/action/authAction'
import { LOGIN_SUCCESS } from './redux/types'

import axios from 'axios'
import AdminMenu from './components/AdminMenu'

const store = createStore(rootReducer, applyMiddleware(thunk));
// logger

const token = localStorage.FSIMIdToken
if (token){
    const decodeToken = jwtDecode(token)
    if (decodeToken.exp * 1000 < Date.now()){
        store.dispatch(userLogout())
        window.location.href = '/login'
    }else{
        store.dispatch({ type: LOGIN_SUCCESS })
        store.dispatch(setUser(localStorage.userName, localStorage.userType))
        axios.defaults.headers.common['x-access-token'] = token
    }

}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    { store.getState().auth.authenticated ? <AdminMenu /> : <Navbar />}
                    <Switch>
                        {/* <Route exact path="/" component={Home} />
                        <Route exact path="/admission" component={Admission} />
                        <Route exact path="/active" component={ActiveRecruitment} />
                        <Route exact path="/alumni" component={Alumni} />
                        <Route exact path="/activity" component={ActivityInformation} />
                        <Route exact path="/student/:id" component={DepartmentStudent} /> */}
                        {/* <Route path="/department/:dept_id" component={DepartmentDetail} /> */}
                        {/* <Route exact path="/Statcourse" component={Statcourse} />
                        <Route exact path="/StatcourseGPA" component={StatcourseGPA} />
                        <Route exact path="/Statcoursebranch" component={Statcoursebranch} /> */}

                        {/*    admin    */}
                        <AdminRoute path="/admin" component={AdminLayout} />

                        <AuthRoute exact path="/login" component={Login} />

                        {/*     user    */}
                        <Route path="/" component={UserLayout} />
                    </Switch>
                </div>
            </Provider>
        )
    }
}


export default withRouter(App)