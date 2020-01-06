import React, { Component } from "react";
import { connect } from "react-redux";
import { loadEvaluations } from "../actions/evaluations";
import _ from "lodash";
class ChosenStudent extends Component {
  state = {
    studentname: "Click Choose to pick one",
    studentphoto:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
  };
  handleClick = () => {
    this.props.toggle();
  };
  //get random student based on algorithm
  getLastEvaluation = () => {
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
    const recentGrades = this.getLastEvaluation();
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
  render() {
    return (
      <div className="modal-form">
        <div className="modal-form__content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <div className="">
            <button className="btn btn-sub" onClick={this.chooseRandomStudent}>
              Choose
            </button>
            <p>{this.state.studentname}</p>
            <img
              src={this.state.studentphoto}
              alt="student"
              className="avatar"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    evaluations: state.evaluations
  };
};
export default connect(mapStateToProps, {
  loadEvaluations
})(ChosenStudent);
