import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentDataService from "../services/student.service";

import Student from "./student.component";

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.openProfile = this.openProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      Students: [],
      currentStudent: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    StudentDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    StudentDataService.getAll().off("value", this.onDataChange);
  }

  refreshList(){
    this.props.history.push({
      pathname:"/"
    })
  }

  onDataChange(items) {
    let Students = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      console.log(data)
      Students.push({
        key: key,
        title: data.title,
        cmsid: data.cmsid,
        groupname: data.groupname,
        githublink:data.githublink,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      Students: Students,
    });
  }



  editProfile(Student, index) {
    this.props.history.push({
      pathname:"/edit",
      state: {student:Student}
    })
  }

  openProfile(Student, index) {
    this.props.history.push({
      pathname:"/profile",
      state: {student:Student}
    })
  }
  
  deleteProfile(Student, index) {
    StudentDataService.delete(Student.key)
    .then(()=>{
      this.refreshList();
    })
  }

  removeAllStudents() {
    StudentDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { Students, currentStudent, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-12">
          <h4 className="my-4">Students List</h4>
          {Students.length>0 ? (
            <div className="mx-auto">
              <ul className="list-group">
                {Students &&
                  Students.map((Student, index) => (
                    <li
                      className={
                        "list-group-item d-flex justify-content-between" +
                        (index === currentIndex ? "active" : "")
                      }
                      key={index}
                    ><div>
                      {Student.title}
                      <div>
                        <small>
                        <span className="mr-5">Cms: <b className="text-success">{Student.cmsid}</b></span>  
                        <span className="mr-5">Group: <b className="text-success">{Student.groupname}</b></span>  
                        <span className="mr-5"><a href="{Student.githublink}">Github</a></span>  
                        </small>
                      </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-primary mr-2" onClick={() => this.openProfile(Student, index)}>View</button>
                        <button className="btn btn-outline-primary mr-2" onClick={() => this.editProfile(Student, index)}>Edit</button>
                        <button className="btn btn-outline-danger" onClick={() => this.deleteProfile(Student, index)}>Delete</button>
                      </div>
                    </li>
                  ))}
              </ul>

              <button
                className="my-3 btn btn-sm btn-danger"
                onClick={this.removeAllStudents}
              >
                Remove All
              </button>
            </div>
          ) : (
            <div>
              <p>Sorry No students were found! </p>
              <Link to={'/add'} className="nav-link ml-0 pl-0">Add a student Now!</Link>
            </div>
          )}
        </div>
        
      </div>
    );
  }
}
