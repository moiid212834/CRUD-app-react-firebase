import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddStudent from "./components/add-student.component";
import StudentsList from "./components/students-list.component";
import Profile from "./components/profile.component";
import Edit from "./components/edit.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/students" className="navbar-brand">
            Students Management System
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          
          <Switch>
            <Route exact path={["/", "/students"]} component={StudentsList} />
            <Route exact path="/add" component={AddStudent} />
            <Route exact path="/edit" component={Edit} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
