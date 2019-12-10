import React from "react";
import { connect } from "react-redux";
import { loadStudents, deleteStudent } from "../actions/students";
import { loadEvaluations } from "../actions/evaluations";
import CreateNewStudent from "../components/CreateNewStudent";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
class BatchDetails extends React.Component {
  state = {
    editMode: false,
    studentId: Number(window.location.href.split("/").pop()),
    studentname: "",
    studentphoto: ""
  };

  async componentDidMount() {
    await this.props.loadEvaluations(this.props.match.params.id);
    this.props.loadStudents(this.props.match.params.id);
  }

  //handle delete button
  handleDelete = studentId => {
    console.log(
      "what is studentid and batchId",
      studentId,
      this.props.match.params.id
    );
    this.props.deleteStudent(this.props.match.params.id, studentId);
    this.props.history.push(`/batches/${this.props.match.params.id}/students`);
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
      <div>
        <NavBar />
        {this.props.loggedIn ? (
          <div>
            <div className="top-heading" style={{ marginBottom: "30px" }}>
              Class details
              <img
                src="http://embacy.io/images/E.svg"
                alt=""
                className="float-right"
                style={{ transform: "translate(0px, 50px)" }}
              />
              <img
                src="http://embacy.io/images/B.svg"
                alt=""
                className="float-right"
                style={{ transform: "translate(0px, 30px)" }}
              />
            </div>

            <div
              className="ui card"
              style={{
                width: "20%",
                margin: "0 auto",
                padding: "10px"
              }}
            >
              <h4 className="center aligned">Class performance:</h4>
              <Progress
                percent={greenPercentage}
                theme={{ active: { color: "green" } }}
                style={{ width: 200 }}
              />

              <Progress
                percent={redPercentage}
                theme={{ active: { color: "red" } }}
                style={{ width: 200 }}
              />
              <Progress
                percent={yellowPercentage}
                theme={{ active: { color: "#fbc630" } }}
                style={{ width: 200 }}
              />
              <div className="ui card" style={{}}>
                <div className="image">
                  {this.state.studentphoto !== "" ? (
                    <img src={this.state.studentphoto} alt="student" />
                  ) : (
                    <h4 className="center aligned">Ask a random student</h4>
                  )}
                </div>
                <div className="content">
                  <h3> {this.state.studentname}</h3>
                </div>
                <div className="extra content center aligned">
                  <button
                    onClick={this.chooseRandomStudent}
                    className="ui basic button "
                  >
                    Click here
                  </button>
                </div>
              </div>
            </div>

            {!this.props.students ? (
              "Loading..."
            ) : (
              <ul className="ui three column grid">
                {this.props.students &&
                  this.props.students.map(student => (
                    <li
                      key={student.id}
                      className="ui card column"
                      style={{
                        marginLeft: "5%",
                        marginRight: "5%",
                        width: "20%",
                        marginTop: "7%"
                      }}
                    >
                      <div className="segment">
                        <Link
                          className="header"
                          to={`/batches/${student.batchId}/students/${student.id}/evaluations`}
                        >
                          Student #{student.id}
                        </Link>
                      </div>
                      <div className="content">
                        <h4 className="ui sub header">Details</h4>
                        <img
                          src={student.photo}
                          alt="student"
                          className="ui image"
                        />
                        <br />
                        <br />
                        Name: {student.name}
                        <br />
                      </div>

                      <button
                        className="ui basic button"
                        onClick={() => this.handleDelete(student.id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
            <br />
            <br />
            <CreateNewStudent batchId={this.props.match.params.id} />
          </div>
        ) : (
          <Link to="/login">Please log in to see the class performance</Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("check state in mapStatetoprops", state);
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
