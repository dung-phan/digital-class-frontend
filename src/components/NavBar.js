import React from "react";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  render() {
    return (
      <div className="nar-bar">
        <Link className="item" to="/">
          <h4>Home</h4>
        </Link>
        <Link className="item" to="/batches">
          <h4>Classes</h4>
        </Link>
        <Link className="item" to="/account">
          <h4>Account</h4>
        </Link>
      </div>
    );
  }
}
export default NavBar;
