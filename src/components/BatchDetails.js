import React from "react";
import { connect } from "react-redux";
import { loadStudents, deleteStudent } from "../actions/students";
import { loadEvaluations } from "../actions/evaluations";
import CreateNewStudent from "../components/CreateNewStudent";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import _ from "lodash";
class BatchDetails extends React.Component {
  state = {
    editMode: false,
    studentId: Number(window.location.href.split("/").pop()),
    studentname: "",
    studentphoto: ""
  };

  async componentDidMount() {
    await this.props.loadEvaluations(
      this.props.match.params.id,
      this.state.studentId
    );
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
      console.log("check student evaluation", studentEvaluations);

      return _.sortBy(studentEvaluations, "date")[studentEvaluations.length - 1]
        .color;
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

      return {
        ...student,
        lastEvaluation: _.sortBy(studentEvaluations, "date")[
          studentEvaluations.length - 1
        ].color
      };
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
    // console.log('check red students', redStudents);
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
    console.log("who is selected student", student);
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
            <h1>Class performance:</h1>
            <br />
            <h2>
              Green: {greenPercentage} %
              <br />
              Yellow: {yellowPercentage} %
              <br />
              Red: {redPercentage} %
              <br />
            </h2>
            <button
              onClick={this.chooseRandomStudent}
              className="ui basic button"
            >
              Ask a question
            </button>
            Student: {this.state.studentname}
            {this.state.studentphoto !== "" ? (
              <img src={this.state.studentphoto} alt="student" />
            ) : null}
            <br />
            <br />
            <br />
            {this.props.students === null ? (
              "Loading..."
            ) : (
              <ul className="ui three column grid">
                {this.props.students.map(student => (
                  <li key={student.id} className="ui card column">
                    <div className="segment">
                      <Link
                        className="header"
                        to={`/evaluations/batches/${student.batchId}/students/${student.id}`}
                      >
                        Student
                      </Link>
                    </div>
                    <div className="content">
                      <h4 className="ui sub header">Details</h4>
                      <img src={student.photo} alt="student" />
                      <br />
                      Name: {student.name}
                      <br />
                      {/* Last grade:
                  {student.lastEvaluation === 'undefined'
                    ? 'Loading...'
                    : student.lastEvaluation.color} */}
                    </div>
                    <button className="ui basic button"> Edit </button>
                    <br />
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
