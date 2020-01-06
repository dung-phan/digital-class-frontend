import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStudent, editStudent } from "../actions/students";
import { evaluateStudent } from "../actions/evaluations";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import CreateNewEvaluation from "./CreateNewEvaluation";
import LogInNotice from "./LogInNotice";
import SideBar from "./SideBar";
export class EvaluationPage extends Component {
  state = {
    studentId: this.props.match.params.studentId,
    batchId: this.props.match.params.batchId,
    editMode: false,
    seen: false,
    login: false
  };
  //handle edit button
  onEdit = () => {
    this.setState({
      editMode: true,
      formValues: {
        name: this.props.student.name,
        photo: this.props.student.photo
      }
    });
  };
  onChange = event => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.setState({
      editMode: false
    });
    this.props.editStudent(
      this.state.batchId,
      this.state.studentId,
      this.state.formValues
    );
  };
  handleAddEvaluation = () => {
    if (this.props.loggedIn) {
      this.setState({
        seen: !this.state.seen
      });
    }
    this.setState({
      login: !this.state.login
    });
  };
  componentDidMount() {
    this.props.loadStudent(this.state.batchId, this.state.studentId);
    this.props.evaluateStudent(this.state.batchId, this.state.studentId);
  }

  render() {
    return (
      <div>
        <div className="section-batch">
          <div className="row">
            <div className="frame-single">
              <SideBar />
              <div className="frame-single__main">
                <div className="section-top">
                  <div className="col-1-of-2">
                    <h1>Student overview </h1>
                  </div>
                  <div className="col-1-of-2">
                    <button
                      className="btn btn-sub"
                      onClick={this.handleAddEvaluation}
                    >
                      <h4>
                        <b>&#43;</b> Add Evaluation
                      </h4>
                    </button>
                    {this.state.seen ? (
                      <CreateNewEvaluation
                        toggle={this.handleAddEvaluation}
                        studentId={this.state.studentId}
                        batchId={this.state.batchId}
                      />
                    ) : null}
                    {this.state.login && !this.props.loggedIn ? (
                      <LogInNotice toggle={this.handleAddEvaluation} />
                    ) : null}
                  </div>
                </div>
                {this.state.editMode && (
                  <StudentForm
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    values={this.state.formValues}
                  />
                )}
                {!this.state.editMode && (
                  <div className="section-body">
                    <div className="frame__left">
                      <img
                        src={this.props.student.photo}
                        alt="student"
                        className="image-student"
                      />
                      <button
                        onClick={this.onEdit}
                        className="btn btn-main btn-input"
                      >
                        <h5>Edit</h5>
                      </button>
                    </div>
                    <div className="frame__right">
                      <h2>Name: {this.props.student.name}</h2>
                      <Link
                        to={`/batches/${this.props.student.batchId}/students`}
                      >
                        <h4> Class: {this.props.student.batchId}</h4>
                      </Link>
                      <h4>Latest grade:</h4>
                      <div>
                        {this.props.grades.map(grade => (
                          <i
                            key={grade.id}
                            className={grade.color + " large square full icon"}
                            style={{ float: "none" }}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
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
    student: state.student,
    grades: state.evaluations,
    loggedIn: !!state.auth
  };
};
export default connect(mapStateToProps, {
  loadStudent,
  evaluateStudent,
  editStudent
})(EvaluationPage);
