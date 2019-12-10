import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  render() {
    return (
      <div className="ui inverted top fixed menu">
        <Link className="item" to="/">
          <h3>Home</h3>
        </Link>
        <Link className="item" to="/signup">
          <h3>Sign up</h3>
        </Link>
        <Link className="item" to="/login">
          <h3>Log in</h3>
        </Link>
        <Link className="ui inverted button" to="/batches">
          <h3>Classes</h3>
        </Link>

        <div className="right menu">
          <Link className="ui inverted button" to="/signup">
            <h3>Logout</h3>
          </Link>
        </div>
      </div>
    );
  }
}
export default NavBar;
