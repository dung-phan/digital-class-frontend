import React, { Component } from "react";
import "./Home.css";
import NavBar from "./NavBar";
export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="float-left heading">Digital class</div>
        <img
          style={{ transform: "translate(0px, 50px)" }}
          src="http://embacy.io/images/03-il.svg"
          className="float-right"
          alt=""
        />
        <h2 className="float-left">
          An effective way for teachers to evaluate students
        </h2>
      </div>
    );
  }
}
