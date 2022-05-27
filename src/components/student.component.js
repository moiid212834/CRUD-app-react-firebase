import React, { Component } from "react";
import StudentDataService from "../services/student.service";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCmsid = this.onChangeCmsid.bind(this);
    this.onChangeGithublink = this.onChangeGithublink.bind(this);
    this.onChangeGroupname = this.onChangeGroupname.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
 

    this.state = {
      currentStudent: this.props.Student.student,
      message: "",
    };
    console.log(this.props)
  }

  componentDidMount() {
    this.setState({
      currentStudent: this.props.Student,
    });
  }



  onChangeCmsid(e) {
    const cmsid = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          cmsid: cmsid!=='undefined'?cmsid:null,
        },
      };
    });
  }

  onChangeGroupname(e) {
    const groupname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          groupname: groupname!=='undefined'?groupname:null,
        },
      };
    });
  }

  onChangeGithublink(e) {
    const githublink = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          githublink: githublink!=='undefined'?githublink:null,
        },
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          title: title!=='undefined'?title:null,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        description: description!=='undefined'?description:null,
      },
    }));
  }

  updatePublished(status) {
    StudentDataService.update(this.state.currentStudent.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentStudent: {
            ...prevState.currentStudent,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStudent() {
    const data = {
      title: this.state.currentStudent.title,
      description: this.state.currentStudent.description,
      cmsid: this.state.currentStudent.cmsid,
      groupname:this.state.currentStudent.groupname,
      githublink:this.state.currentStudent.githublink
    };
    console.log(data)
    StudentDataService.update(this.state.currentStudent.key, data)
      .then(() => {
        this.setState({
          message: "The Student was updated successfully!",
          
        });
        this.props.history.push({
          pathname:"/profile",
          state:{
            student:{
              key:this.state.currentStudent.key,
              ...data
            }
          }
        })
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteStudent() {
    StudentDataService.delete(this.state.currentStudent.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentStudent } = this.state;
    console.log(currentStudent);

    return (
      <div>
       
        {currentStudent ? (
          <div className="edit-form">
             <h4>Student</h4>
            <form>
            <div className="form-group">
              <label htmlFor="title">CMS ID</label>
              <input
                type="number"
                className="form-control"
                id="cmsid"
                required
                value={currentStudent.cmsid}
                onChange={this.onChangeCmsid}
                name="title"
                placeholder="Enter your cms id"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Student Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={currentStudent.title}
                onChange={this.onChangeTitle}
                name="title"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Group Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={currentStudent.groupname}
                onChange={this.onChangeGroupname}
                name="title"
                placeholder="e.g. BSCS"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                required
                value={currentStudent.description}
                onChange={this.onChangeDescription}
                name="description"
                placeholder="Briefly describe yourself"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Github Link</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={currentStudent.githublink}
                onChange={this.onChangeGithublink}
                name="title"
                placeholder="e.g. https://github.com/moiidd212834"
              />
            </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentStudent.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentStudent.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStudent}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p className="text-sucess my-2">{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}
