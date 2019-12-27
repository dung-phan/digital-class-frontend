import React, { Component } from "react";
import { loadBatches } from "../actions/batches";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateNewBatch from "./CreateNewBatch";
export class Batch extends Component {
  componentDidMount() {
    this.props.loadBatches();
  }
  render() {
    return (
      <div>
        <div className="section-batch">
          <div className="row">
            <div className="frame">
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
              <div className="frame__main">
                <div className="section-head">
                  <div className="col-1-of-2">
                    <h1>Class List</h1>
                  </div>
                  <div className="col-1-of-2">
                    <div className="col-1-of-2">
                      <button className="btn btn-sub">
                        <h4>
                          <b> &#43;</b> Add class
                        </h4>
                      </button>
                    </div>
                    <div className="col-1-of-2">
                      <div className="search-box">
                        <input
                          type="text"
                          name=""
                          className="search-txt"
                          placeholder="Search class number..."
                        />
                        <a className="search-btn">
                          <i className="icon ion-ios-search"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-body">
                  {this.props.batches === null ? (
                    <h1>Loading...</h1>
                  ) : (
                    <div>
                      {this.props.batches.map(batch => (
                        <li
                          style={{ listStyle: "none" }}
                          key={batch.id}
                          className="col-1-of-2"
                        >
                          <div className="card">
                            <div className="col-1-of-5">
                              <h3 style={{ textAlign: "center" }}>
                                <Link
                                  className="batch-link"
                                  to={`/batches/${batch.id}/students`}
                                >
                                  Class {batch.batchNumber}
                                </Link>
                              </h3>
                            </div>
                            <div className="col-2-of-5">
                              <h5>Start: {batch.startDate}</h5>
                              <h5>End: {batch.endDate}</h5>
                            </div>
                            <div className="col-1-of-5">
                              <h5 style={{ textAlign: "center" }}>Total: 22</h5>
                            </div>
                            <i className="icon ion-md-more"></i>
                          </div>
                        </li>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    batches: state.batches
    // loggedIn: !!state.auth
  };
};
export default connect(mapStateToProps, { loadBatches })(Batch);
