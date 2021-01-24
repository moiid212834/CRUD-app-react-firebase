import React, { Component } from "react";
import StudentDataService from "../services/student.service";

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCmsid = this.onChangeCmsid.bind(this);
    this.onChangeGithublink = this.onChangeGithublink.bind(this);
    this.onChangeGroupname = this.onChangeGroupname.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,
      groupname:"",
      githublink:"",
      cmsid:"",
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeGithublink(e) {
    this.setState({
      githublink: e.target.value,
    });
  }
  
  onChangeCmsid(e) {
    this.setState({
      cmsid: e.target.value,
    });
  }
  
  onChangeGroupname(e) {
    this.setState({
      groupname: e.target.value,
    });
  }

  saveStudent() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false,
      cmsid:this.state.cmsid,
      groupname: this.state.groupname,
      githublink: this.state.githublink
    };

    StudentDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newStudent() {
    this.setState({
      title: "",
      description: "",
      published: false,
      groupname:"",
      githublink:"",
      cmsid:"",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form mx-auto">
        <h2 className="mb-4 text-left">Add a student</h2>
        {this.state.submitted ? (
          <div className="mx-auto">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStudent}>
              Add New
            </button>
            <button onClick={this.props.history.push({pathname:"/"})} className="btn btn-outline-warning ml-3">
              Back to the student list
            </button>
          </div>
        ) : (
          <div className="mx-auto">
            <div className="form-group">
              <label htmlFor="title">CMS ID</label>
              <input
                type="number"
                className="form-control"
                id="cmsid"
                required
                value={this.state.cmsid}
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
                value={this.state.title}
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
                value={this.state.groupname}
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
                value={this.state.description}
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
                value={this.state.githublink}
                onChange={this.onChangeGithublink}
                name="title"
                placeholder="e.g. https://github.com/moiidd212834"
              />
            </div>

            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
            
          </div>
        )}
      </div>
    );
  }
}
