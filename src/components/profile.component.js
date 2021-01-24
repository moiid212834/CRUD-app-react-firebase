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
     
        return(
            <div class="d-flex justify-content-center">
                <div class="p-5 text-center mt-4 border shadow rounded" style={{minWidth:"300px"}}>
                    {/* <div class="mb-4" >
                        <img className="img-thumbnail rounded-circle" style={{width:"200px",height:"200px",borderRadius:"50%"}} src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm" class="img-circle"/>
                    </div> */}
                    
                    <div class="span8">
                        <h3 className="text-primary font-weight-bold">{student.title}</h3>
                        <div className="small">Bio</div>
                        <p className="lead">{student.description}</p>
                        <div className="d-flex flex-wrap justify-content-center">
                        <h6 className="m-3 btn btn-dark">Cms ID: {student.cmsid}</h6>
                        <h6 className="m-3 btn btn-dark">Group: {student.groupname}</h6>
                        </div>
                        <h6><a href="{student.githublink}">Github</a></h6>
                    </div>
                    
                    <div class="span2">
                        <div class="btn btn-lg btn-block my-4">
                            <a  
                            className="btn btn-primary"
                            onClick={()=>{
                                this.props.history.push({
                                    pathname:'/edit',
                                    state:{student:student}})
                                }
                            }
                            ><span class="icon-wrench"></span> Modify</a>
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
