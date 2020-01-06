import React from "react";
import { connect } from "react-redux";
import { loadStudents, deleteStudent } from "../actions/students";
import CreateNewStudent from "../components/CreateNewStudent";
import LogInNotice from "./LogInNotice";
import SideBar from "./SideBar";
import ClassProgress from "./ClassProgress";
import ChosenStudent from "./ChosenStudent";
import { Link } from "react-router-dom";
class BatchDetails extends React.Component {
  state = {
    seen: false,
    login: false,
    chosen: false
  };
  componentDidMount() {
    this.props.loadStudents(this.props.match.params.id);
  }
  handleAddStudent = () => {
    if (this.props.loggedIn) {
      this.setState({
        seen: !this.state.seen
      });
    }
    this.setState({
      login: !this.state.login
    });
  };
  handleAskStudent = () => {
    this.setState({
      chosen: !this.state.chosen
    });
  };
  render() {
    return (
      <div className="section-single">
        <div className="row">
          <div className="frame-single">
            <SideBar />
            <div className="frame-single__main">
              <div className="section-top">
                <div className="col-1-of-3">
                  <h1>Class overview </h1>
                  <ClassProgress
                    classId={this.props.match.params.id}
                    students={this.props.students}
                  />
                </div>
                <div className="col-2-of-3">
                  <div className="col-1-of-3">
                    <button
                      className="btn btn-sub"
                      onClick={this.handleAddStudent}
                    >
                      <h4>
                        <b>&#43;</b> Add student
                      </h4>
                    </button>
                    {this.state.seen ? (
                      <CreateNewStudent
                        batchId={this.props.match.params.id}
                        toggle={this.handleAddStudent}
                      />
                    ) : null}
                    {this.state.login && !this.props.loggedIn ? (
                      <LogInNotice toggle={this.handleAddStudent} />
                    ) : null}
                  </div>
                  <div className="col-1-of-3">
                    <button
                      className="btn btn-sub"
                      onClick={this.handleAskStudent}
                    >
                      <h4>
                        <b>&#63;</b> Ask a student
                      </h4>
                    </button>
                    {this.state.chosen ? (
                      <ChosenStudent
                        classId={this.props.match.params.id}
                        students={this.props.students}
                        toggle={this.handleAskStudent}
                      />
                    ) : null}
                  </div>
                  <div className="col-1-of-3">
                    <div className="search-box">
                      <input
                        type="text"
                        name=""
                        className="search-txt"
                        placeholder="Type student ID"
                      />
                      <span className="search-btn">
                        <i className="icon ion-ios-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-mainbody">
                {!this.props.students || this.props.students.length === 0 ? (
                  <h4>Loading...</h4>
                ) : (
                  <ul style={{ listStyle: "none" }}>
                    {this.props.students &&
                      this.props.students.map(student => (
                        <li key={student.id} className="col-1-of-3">
                          <div className="student-card">
                            <div className="col-1-of-2">
                              <Link
                                to={`/batches/${student.batchId}/students/${student.id}/evaluations`}
                              >
                                <img
                                  src={student.photo}
                                  alt="student"
                                  className="image"
                                />
                              </Link>
                            </div>
                            <div className="col-1-of-2">
                              <div>
                                <h4>
                                  <b>{student.name}</b>
                                </h4>
                              </div>
                              <div>
                                <h5>ID: {student.id}</h5>
                              </div>
                              <div>
                                <span
                                  onClick={() =>
                                    this.props.deleteStudent(
                                      this.props.match.params.id,
                                      student.id
                                    )
                                  }
                                >
                                  <h5>
                                    <i className="icon ion-ios-trash"></i>
                                    Delete
                                  </h5>
                                </span>
                              </div>
                              <div>
                                <h5>
                                  <i className="icon ion-ios-settings"></i>
                                  Edit
                                </h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.students,
    loggedIn: !!state.auth
  };
};
export default connect(mapStateToProps, {
  loadStudents,
  deleteStudent
})(BatchDetails);
