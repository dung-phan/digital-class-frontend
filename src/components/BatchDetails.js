import React from "react";
import { connect } from "react-redux";
import { loadStudents, deleteStudent } from "../actions/students";
import { loadEvaluations } from "../actions/evaluations";
import CreateNewStudent from "../components/CreateNewStudent";
import LogInNotice from "./LogInNotice";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
class BatchDetails extends React.Component {
  state = {
    seen: false,
    login: false,
    studentname: "",
    studentphoto: ""
  };

  async componentDidMount() {
    await this.props.loadEvaluations(this.props.match.params.id);
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
  //handle pick random student based on algorithm
  getLastEvaluation = () => {
    const getthelatest = this.props.students.map(student => {
      const studentEvaluations = this.props.evaluations.filter(
        evaluation => evaluation.studentId === student.id
      );
      if (studentEvaluations.length > 0) {
        return _.sortBy(studentEvaluations, "date")[
          studentEvaluations.length - 1
        ].color;
      }
    });
    return getthelatest;
  };
  filterByColor = color => {
    const classPerformance = this.getLastEvaluation();
    const colorPercentage = classPerformance.filter(grade => grade === color);

    return colorPercentage;
  };
  showPercentage = color => {
    const totalStudents = this.props.students.length;
    const colorPercentage = this.filterByColor(color);

    return Math.round((colorPercentage.length / totalStudents) * 100);
  };
  //get random student based on algorithm
  getanotherlatest = () => {
    const getthelatest = this.props.students.map(student => {
      const studentEvaluations = this.props.evaluations.filter(
        evaluation => evaluation.studentId === student.id
      );
      if (studentEvaluations.length > 0) {
        return {
          ...student,
          lastEvaluation: _.sortBy(studentEvaluations, "date")[
            studentEvaluations.length - 1
          ].color
        };
      }
    });
    return getthelatest;
  };
  getRandomStudent = () => {
    const recentGrades = this.getanotherlatest();
    const filterByColor = color => {
      const colorFilter = recentGrades.filter(
        student => student.lastEvaluation === color
      );
      return colorFilter;
    };
    const randomNumber = Math.random();
    const redStudents = filterByColor("red");
    const greenStudents = filterByColor("green");
    const yellowStudents = filterByColor("yellow");
    if (randomNumber <= 0.5) {
      if (redStudents.length > 0) {
        return redStudents[Math.floor(Math.random() * redStudents.length)];
      } else {
        return this.getRandomStudent();
      }
    }
    if (randomNumber > 0.5 && randomNumber <= 0.83) {
      if (yellowStudents.length > 0) {
        return yellowStudents[
          Math.floor(Math.random() * yellowStudents.length)
        ];
      } else {
        return this.getRandomStudent();
      }
    }
    if (randomNumber > 0.8) {
      if (greenStudents.length > 0) {
        return greenStudents[Math.floor(Math.random() * greenStudents.length)];
      } else {
        return this.getRandomStudent();
      }
    }
  };
  chooseRandomStudent = () => {
    const student = this.getRandomStudent();
    this.setState({ studentname: student.name, studentphoto: student.photo });
  };

  //render on the page
  render() {
    const greenPercentage = this.showPercentage("green");
    const yellowPercentage = this.showPercentage("yellow");
    const redPercentage = this.showPercentage("red");
    return (
      <div className="section-single">
        <div className="row">
          <div className="frame-single">
            <SideBar />
            <div className="frame-single__main">
              <div className="section-top">
                <div className="col-1-of-3">
                  <h1>Class overview </h1>
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
                  </div>

                  <div className="col-1-of-3">
                    <button className="btn btn-sub">
                      <h4>
                        <b>&#63;</b> Ask a student
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
                    <div className="search-box">
                      <input
                        type="text"
                        name=""
                        className="search-txt"
                        placeholder="Type student ID"
                      />
                      <a className="search-btn">
                        <i className="icon ion-ios-search"></i>
                      </a>
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
    evaluations: state.evaluations,
    loggedIn: !!state.auth
  };
};
export default connect(mapStateToProps, {
  loadStudents,
  deleteStudent,
  loadEvaluations
})(BatchDetails);
