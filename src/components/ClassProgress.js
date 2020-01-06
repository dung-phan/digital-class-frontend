import React, { Component } from "react";
import { connect } from "react-redux";
import { loadEvaluations } from "../actions/evaluations";
import _ from "lodash";
class ClassProgress extends Component {
  componentDidMount() {
    this.props.loadEvaluations(this.props.classId);
  }
  //handle pick random student based on algorithm
  getLastEvaluation = () => {
    const getthelatest = this.props.students.map(student => {
      const studentEvaluations = this.props.evaluations.filter(
        evaluation => evaluation.studentId === student.id
      );
      console.log("what is it", studentEvaluations);
      if (studentEvaluations.length > 0) {
        const sortEvaluations = _.sortBy(studentEvaluations, "date")[
          studentEvaluations.length - 1
        ].color;
        return sortEvaluations;
      }
    });
    console.log("check latest", getthelatest);
    return getthelatest;
  };

  filterByColor = color => {
    const classPerformance = this.getLastEvaluation();
    const colorPercentage = classPerformance.filter(grade => grade === color);
    return colorPercentage;
  };
  showPercentage = color => {
    const countStudents = this.getLastEvaluation().filter(grade => {
      return grade !== undefined;
    });
    console.log("what is count students", countStudents);
    const totalStudents = countStudents.length;
    console.log("how many students", totalStudents);
    const colorPercentage = this.filterByColor(color);

    return Math.round((colorPercentage.length / totalStudents) * 100);
  };
  //   //get random student based on algorithm
  //   getanotherlatest = () => {
  //     const getthelatest = this.props.students.map(student => {
  //       const studentEvaluations = this.props.evaluations.filter(
  //         evaluation => evaluation.studentId === student.id
  //       );
  //       if (studentEvaluations.length > 0) {
  //         return {
  //           ...student,
  //           lastEvaluation: _.sortBy(studentEvaluations, "date")[
  //             studentEvaluations.length - 1
  //           ].color
  //         };
  //       }
  //     });
  //     return getthelatest;
  //   };
  //   getRandomStudent = () => {
  //     const recentGrades = this.getanotherlatest();
  //     const filterByColor = color => {
  //       const colorFilter = recentGrades.filter(
  //         student => student.lastEvaluation === color
  //       );
  //       return colorFilter;
  //     };
  //     const randomNumber = Math.random();
  //     const redStudents = filterByColor("red");
  //     const greenStudents = filterByColor("green");
  //     const yellowStudents = filterByColor("yellow");
  //     if (randomNumber <= 0.5) {
  //       if (redStudents.length > 0) {
  //         return redStudents[Math.floor(Math.random() * redStudents.length)];
  //       } else {
  //         return this.getRandomStudent();
  //       }
  //     }
  //     if (randomNumber > 0.5 && randomNumber <= 0.83) {
  //       if (yellowStudents.length > 0) {
  //         return yellowStudents[
  //           Math.floor(Math.random() * yellowStudents.length)
  //         ];
  //       } else {
  //         return this.getRandomStudent();
  //       }
  //     }
  //     if (randomNumber > 0.8) {
  //       if (greenStudents.length > 0) {
  //         return greenStudents[Math.floor(Math.random() * greenStudents.length)];
  //       } else {
  //         return this.getRandomStudent();
  //       }
  //     }
  //   };
  //   chooseRandomStudent = () => {
  //     const student = this.getRandomStudent();
  //     this.setState({ studentname: student.name, studentphoto: student.photo });
  //   };

  render() {
    const greenPercentage = this.showPercentage("green");
    const yellowPercentage = this.showPercentage("yellow");
    const redPercentage = this.showPercentage("red");
    return (
      <div>
        <d3>Latest performance:</d3>
        {console.log("what color", greenPercentage)}
        {console.log("what color", yellowPercentage)}
        {console.log("what color", redPercentage)}
        <div className="progress progress-stacked">
          <span
            style={{ width: `${redPercentage}%` }}
            className="bg-red"
          ></span>
          <span
            style={{ width: `${greenPercentage}%` }}
            className="bg-green"
          ></span>
          <span
            style={{ width: `${yellowPercentage}%` }}
            className="bg-yellow"
          ></span>
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
})(ClassProgress);
