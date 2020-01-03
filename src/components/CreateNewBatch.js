import React, { Component } from "react";
import { connect } from "react-redux";
import { createBatch } from "../actions/batches";

class CreateNewBatch extends Component {
  state = {
    batchNumber: "",
    startDate: "",
    endDate: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("Check state", this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createBatch(this.state);
    console.log("Check state", this.state);

    this.setState({
      batchNumber: "",
      startDate: "",
      endDate: ""
    });
  };
  handleToggle = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal-form">
        <div className="modal-form__content">
          <span className="close" onClick={this.handleToggle}>
            &times;
          </span>
          <div className="">
            <form onSubmit={this.handleSubmit}>
              <label>
                <p>Batch Number</p>
                <input
                  type="text"
                  name="batchNumber"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <div className="field">
                <label>
                  <p>Start Date:</p>
                  <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  <p>End Date:</p>
                  <input
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" className="btn btn-sub" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createBatch })(CreateNewBatch);
