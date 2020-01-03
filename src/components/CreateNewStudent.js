import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent } from "../actions/students";

class CreateNewStudent extends Component {
  state = {
    name: "",
    photo: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
  handleToggle = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div>
        <div className="modal-form">
          <div className="modal-form__content">
            <span className="close" onClick={this.handleToggle}>
              &times;
            </span>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <p>Name:</p>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  <p>Profile picture:</p>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Please provide a URL"
                    value={this.state.photo}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" className="btn btn-main" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, { addStudent })(CreateNewStudent);
