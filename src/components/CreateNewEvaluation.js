import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvaluation } from "../actions/evaluations";

class CreateNewEvaluation extends Component {
  state = {
    color: "",
    date: "",
    remark: ""
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //handle remarks
  handleSubmit = event => {
    event.preventDefault();

    const { color, date, remark } = this.state;
    const { batchId, studentId } = this.props;
    this.props.addEvaluation(batchId, studentId, color, date, remark);
    this.setState({
      color: "",
      date: "",
      remark: ""
    });
  };
  handleToggle = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-form__content">
            <span className="close" onClick={this.handleToggle}>
              &times;
            </span>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  checked={this.state.color === "red"}
                  onChange={this.handleChange}
                  className="checkbox"
                />
                <i className="red large square full icon"></i>
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  checked={this.state.color === "green"}
                  onChange={this.handleChange}
                  className="checkbox"
                />
                <i className="green large square full icon"></i>
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="yellow"
                  checked={this.state.color === "yellow"}
                  onChange={this.handleChange}
                  className="checkbox"
                />
                <i className="yellow large square full icon"></i>
              </label>
              <br />
              <label>
                <p>Date:</p>
                <input
                  type="date"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>Your remark:</p>
                <input
                  type="text"
                  name="remark"
                  value={this.state.remark}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Save" className="btn btn-sub" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, {
  addEvaluation
})(CreateNewEvaluation);
