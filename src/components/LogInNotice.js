import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class LogInNotice extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <p>
            Please <Link to="/account"> log in </Link>or{" "}
            <Link to="/account">sign up</Link>
          </p>
        </div>
      </div>
    );
  }
}
