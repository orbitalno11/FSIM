import React from "react";
import logo from "./logo.svg";
import "./App.css";
import fsci from "./img/60year-fsci.png";

// import Route Tool
import { Route } from "react-router-dom";

import Header from "./Components/header";
import Footer from "./Components/footer";
import Index from "./Components/Index";
import Login from "./Components/Login";
import StudentForm from "./Components/StudentForm";


const Home = () => <h1>HOME</h1>;
const About = () => <h1>About</h1>;

function App() {
  return (
    <React.Fragment>
      <body>
        <div className="App">
          <Header />
          <switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/std" component={StudentForm} />
          </switch>
          <Footer />
        </div>
      </body>
    </React.Fragment>
  );
}

export default App;
