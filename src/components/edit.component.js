import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentDataService from "../services/student.service";

import Student from "./student.component";

export default class StudentsList extends Component {
    constructor(props) {
        super(props);
        this.refreshList=this.refreshList.bind(this);
        
        this.state = {
        Students: [],
        currentStudent: null,
        currentIndex: -1,
        };
    }
    refreshList(){
        this.props.history.push({
          pathname:"/"
        })
      }
    render(){
        const{ student } = this.props.location.state
        console.log(this.props.location.state)
        return(
            <div className="col-12">
               
                {student ? (
                    <Student
                    Student={student}
                    refreshList={this.refreshList}
                    />
                ) : (
                    <div>
                    <br />
                    <p>Student Not Found</p>
                    <Link to={'/'}>Home</Link>     
                    </div>
                )}
            </div>
        )
    }
}
