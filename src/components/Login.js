import React, { Component } from "react";
import Form from "./Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/login";
import NavBar from "./NavBar";
class Login extends Component {
  state = { email: "", password: "" };

  handleSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password);
    this.props.history.push("/batches");
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ marginTop: "8%" }}>
          <img
            style={{ width: "50%", paddingLeft: "5px" }}
            className="float-left"
            src="https://uploads-ssl.webflow.com/5c487403c604e50eae14614c/5c516d8558939b2866fd27aa_09-il.svg"
            alt=""
          />
        </div>
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ maxWidth: "450x" }}>
            <h2 className="content-two">Sign in to your account</h2>
          </div>
        </div>
        <Form
          values={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ maxWidth: 450 }}>
            <div className="ui message">
              <p>
                New to us? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
