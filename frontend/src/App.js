import React, { Component, Fragment } from 'react'
import './App.css'

// router
import { Route, Switch } from 'react-router-dom'

import jwtDecode from 'jwt-decode'

// general component
import Navbar from './components/Menu'
import Home from './pages/Home'

// user component
import Admission from "./pages/Admission";
import ActiveRecruitment from "./pages/ActiveRecruitment";
import Alumni from "./pages/Alumni";
import ActivityInformation from "./pages/ActivityInformation";

import DepartmentDetail from './pages/DepartmentDetail'
import DepartmentStudent from './pages/DepartmentStudent'

// admin component
import AdminLayout from './layouts/Admin'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import rootReducer from './redux/reducers';

import { userLogout } from './redux/action/authAction'
import { LOGIN_SUCCESS } from './redux/types'

import axios from 'axios'

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const token = localStorage.FSIMIdToken
if (token){
    const decodeToken = jwtDecode(token)
    if (decodeToken.exp * 1000 < Date.now()){
        store.dispatch(userLogout())
        window.location.href = '/login'
    }else{
        store.dispatch({ type: LOGIN_SUCCESS })
        // axios.defaults.headers.common['Authorization'] = token
    }

}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admission" component={Admission} />
                        <Route exact path="/active" component={ActiveRecruitment} />
                        <Route exact path="/alumni" component={Alumni} />
                        <Route exact path="/activity" component={ActivityInformation} />
                        <Route exact path="/student/:id" component={DepartmentStudent} />
                        <Route path="/department/:dept_id" component={DepartmentDetail} />

                        {/*    admin    */}
                        <Route path="/admin" component={AdminLayout} />
                    </Switch>
                </div>
            </Provider>
        )
    }
}


export default App