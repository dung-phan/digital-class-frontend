import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent } from "../actions/students";

class CreateNewStudent extends Component {
  state = {
    name: "",
    photo: ""
  };
  handleChange = event => {
    //hey it's gotta be arrow function here
    this.setState({ [event.target.name]: event.target.value }); //use event.target.name as an attribute so you can reuse it multiple times
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      name: "",
      photo: ""
    });
    const { batchId } = this.props;
    this.props.addStudent(batchId, this.state);
  };
  render() {
    return (
      <div>
        <h2>Want to add a new student?</h2>
        <div className="ui middle aligned center aligned grid">
          <div
            className="column form"
            style={{ maxWidth: 350, marginBottom: "15px" }}
          >
            <form
              onSubmit={this.handleSubmit}
              className="ui large form two fields"
            >
              <div className="ui stacked segment">
                <div className="ui field">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="ui field">
                  <label>
                    Profile picture:
                    <input
                      type="text"
                      name="photo"
                      placeholder="Please provide a URL"
                      value={this.state.photo}
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
export default connect(null, { addStudent })(CreateNewStudent);
