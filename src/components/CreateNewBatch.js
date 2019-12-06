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
    //hey it's gotta be arrow function here
    this.setState({ [event.target.name]: event.target.value }); //use event.target.name as an attribute so you can reuse it multiple times
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.createBatch(this.state);
    console.log("check what is state before setState", this.state);
    //set the form field to be empty again
    this.setState({
      batchNumber: "",
      startDate: "",
      endDate: ""
    });
    console.log("check what is state after setState", this.state);
  };
  render() {
    //const isEnabled = this.state.name.length > 0;
    return (
      <div>
        <h2>Want to create a new batch?</h2>
        <div className="ui middle aligned center aligned grid">
          <div
            className="column form"
            style={{ maxWidth: 300, marginBottom: "15px" }}
          >
            <form
              onSubmit={this.handleSubmit}
              className="ui large form three fields"
            >
              <div className="ui stacked segment">
                <div className="ui field">
                  <label>
                    Batch Number
                    <input
                      type="text"
                      name="batchNumber"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="field">
                  <label>
                    Start Date:
                    <input
                      type="date"
                      name="startDate"
                      value={this.state.startDate}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="field">
                  <label>
                    End Date:
                    <input
                      type="date"
                      name="endDate"
                      value={this.state.endDate}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <input type="submit" value="Submit" className="ui button" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createBatch })(CreateNewBatch);
