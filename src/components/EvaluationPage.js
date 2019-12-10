import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStudent, editStudent } from "../actions/students";
import { evaluateStudent, addEvaluation } from "../actions/evaluations";
import StudentForm from "./StudentForm";
import NavBar from "./NavBar";
export class EvaluationPage extends Component {
  state = {
    studentId: this.props.match.params.studentId,
    batchId: this.props.match.params.batchId,
    color: "",
    date: "",
    remark: "",
    editMode: false
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

  //handle remarks
  handleSubmit = event => {
    event.preventDefault();

    const { batchId, studentId, color, date, remark } = this.state;
    this.props.addEvaluation(batchId, studentId, color, date, remark);
    this.setState({
      color: "",
      date: "",
      remark: ""
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { grades } = this.props;
    if (grades.find(grade => grade.date === value)) {
      alert("Date already exists!");
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  componentDidMount() {
    this.props.loadStudent(this.state.batchId, this.state.studentId);
    this.props.evaluateStudent(this.state.batchId, this.state.studentId);
  }
  render() {
    return (
      <div>
        <NavBar />
        {this.state.editMode && (
          <StudentForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state.formValues}
          />
        )}
        {!this.state.editMode && (
          <div
            className="ui card"
            style={{
              maxWidth: "250px",
              marginTop: "8%",
              transform: "translate(200px, 10px)"
            }}
          >
            <div className="ui image">
              <img
                src={this.props.student.photo}
                alt="student"
                id="image-eva"
              />
            </div>
            <div className="content">
              <a className="header">
                {" "}
                <p>Name: {this.props.student.name}</p>{" "}
              </a>
              <div className="meta">
                <span> Class #{this.props.student.batchId}</span>
                <p>Latest grade:</p>
                <ul>
                  {this.props.grades.map(grade => (
                    <i
                      key={grade.id}
                      className={grade.color + " large square full icon"}
                    ></i>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ui bottom attached button">
              <button onClick={this.onEdit} className="ui basic button">
                Edit{" "}
              </button>
            </div>
          </div>
        )}
        <div style={{ transform: "translate(200px, -500px)" }}>
          <h2>Submit your evaluation</h2>
          <div className="ui middle aligned center aligned grid">
            <div
              className="column form"
              style={{ maxWidth: 500, marginBottom: "15px" }}
            >
              <form
                onSubmit={this.handleSubmit}
                className="ui large form three fields"
              >
                <div className="ui stacked segment">
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="red"
                      checked={this.state.color === "red"}
                      onChange={this.handleChange}
                    />{" "}
                    {""}
                    <i className="red large square full icon"></i>
                  </label>{" "}
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="green"
                      checked={this.state.color === "green"}
                      onChange={this.handleChange}
                    />{" "}
                    <i className="green large square full icon"></i>{" "}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="yellow"
                      checked={this.state.color === "yellow"}
                      onChange={this.handleChange}
                    />{" "}
                    <i className="yellow large square full icon"></i>{" "}
                  </label>
                  <br />
                  <div className="ui field">
                    <label>
                      Date:
                      <input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>
                  <div className="ui field">
                    <label>
                      Your remark:
                      <input
                        type="text"
                        name="remark"
                        value={this.state.remark}
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>
                  <input type="submit" value="Save" className="ui button" />
                </div>
              </form>
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
    grades: state.evaluations
  };
};
export default connect(mapStateToProps, {
  loadStudent,
  evaluateStudent,
  addEvaluation,
  editStudent
})(EvaluationPage);
