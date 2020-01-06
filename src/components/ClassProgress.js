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
      if (studentEvaluations.length > 0) {
        const sortEvaluations = _.sortBy(studentEvaluations, "date")[
          studentEvaluations.length - 1
        ].color;
        return sortEvaluations;
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
    //only count students that have been graded
    const countStudents = this.getLastEvaluation().filter(grade => {
      return grade !== undefined;
    });
    const totalStudents = countStudents.length;
    const colorPercentage = this.filterByColor(color);
    return Math.round((colorPercentage.length / totalStudents) * 100);
  };
  render() {
    const greenPercentage = this.showPercentage("green");
    const yellowPercentage = this.showPercentage("yellow");
    const redPercentage = this.showPercentage("red");
    return (
      <div>
        <h3>Latest performance:</h3>
        <div className="progress progress-stacked">
          <span style={{ width: `${redPercentage}%` }} className="bg-red">
            {redPercentage}%
          </span>
          <span style={{ width: `${greenPercentage}%` }} className="bg-green">
            {greenPercentage}%
          </span>
          <span style={{ width: `${yellowPercentage}%` }} className="bg-yellow">
            {yellowPercentage}%
          </span>
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
