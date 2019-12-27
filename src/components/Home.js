import React, { Component } from "react";
import NarBar from "./NavBar";
export default class Home extends Component {
  render() {
    return (
      <div className="section-home">
        <div className="row">
          <div className="frame">
            <div className="frame__left">
              <h1 className="">Digital class</h1>
              <h4>A time-saving evaluation tool designed for teachers</h4>
            </div>
            <div className="frame__right">
              <NarBar />

              <div className="frame__right--box"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
