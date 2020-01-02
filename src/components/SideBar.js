import React from "react";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="frame__sub">
      <Link className="nav-item" to="/">
        <i className="icon ion-ios-home nav-item-icon"></i>
      </Link>
      <Link className="nav-item" to="/batches">
        <i className="icon ion-ios-list nav-item-icon"></i>
      </Link>
      <Link className="nav-item" to="/account">
        <i className="icon ion-ios-person nav-item-icon"></i>
      </Link>
    </div>
  );
}
