import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadStudent, editStudent } from '../actions/students';
import { evaluateStudent, addEvaluation } from '../actions/evaluations';
import StudentForm from './StudentForm';
//import { Link } from 'react-router-dom';
export class EvaluationPage extends Component {
  state = {
    studentId: Number(window.location.href.split('/').pop()),
    color: '',
    date: '',
    remark: '',
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
      this.props.match.params.batchId,
      this.state.studentId,
      this.state.formValues
    );
    console.log('What is this.props.match', this.props.match);
  };

  //handle remarks
  handleSubmit = event => {
    event.preventDefault();

    const { studentId, color, date, remark } = this.state;
    this.props.addEvaluation(studentId, color, date, remark);
    this.setState({
      color: '',
      date: '',
      remark: ''
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { grades } = this.props;
    if (grades.find(grade => grade.date === value)) {
      alert('Date already exists!');
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  componentDidMount() {
    this.props.loadStudent(
      this.props.match.params.batchId,
      this.state.studentId
    );
    this.props.evaluateStudent(
      this.props.match.params.batchId,
      this.state.studentId
    );
  }
  render() {
    return (
      <div>
        {this.state.editMode && (
          <StudentForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state.formValues}
          />
        )}
        {!this.state.editMode && (
          <div>
            <h1>Name: {this.props.student.name}</h1>
            <br />
            <h2>Batch #{this.props.student.batchId}</h2>
            <img src={this.props.student.photo} alt='student' />
          </div>
        )}
        <br />
        <button onClick={this.onEdit} className='ui basic button'>
          Edit{' '}
        </button>
        <h2>Student progress:</h2>
        <ul>
          {this.props.grades.map(grade => (
            <li key={grade.id}>{grade.color}</li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          Daily evaluation:
          <br />
          <label>
            <input
              type='radio'
              name='color'
              value='red'
              checked={this.state.color === 'red'}
              onChange={this.handleChange}
              className='red circle large icon'
            />
            RED
          </label>
          <label>
            <input
              type='radio'
              name='color'
              value='green'
              checked={this.state.color === 'green'}
              onChange={this.handleChange}
              className='green circle large icon'
            />
            GREEN{' '}
          </label>
          <label>
            <input
              type='radio'
              name='color'
              value='yellow'
              checked={this.state.color === 'yellow'}
              onChange={this.handleChange}
              className='yellow circle large icon'
            />
            YELLOW{' '}
          </label>
          <br />
          <label>
            Date:
            <input
              type='text'
              name='date'
              value={this.state.date}
              onChange={this.handleChange}
            />
          </label>{' '}
          <label>
            <br />
            Your remark:{' '}
            <input
              type='text'
              name='remark'
              value={this.state.remark}
              onChange={this.handleChange}
            />
          </label>{' '}
          <input type='submit' value='Save' />
          <input type='submit' value='Save and next' />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('check state in mapStatetoprops', state);
  return {
    student: state.student,
    grades: state.evaluations
  };
};
export default connect(
  mapStateToProps,
  { loadStudent, evaluateStudent, addEvaluation, editStudent }
)(EvaluationPage);
