import React, { Component } from "react";
import { loadBatches, deleteBatch } from "../actions/batches";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateNewBatch from "./CreateNewBatch";
import LogInNotice from "./LogInNotice";
import SideBar from "./SideBar";
export class Batch extends Component {
  state = {
    seen: false,
    login: false
  };
  componentDidMount() {
    this.props.loadBatches();
  }

  handleAddClassPopUp = () => {
    if (this.props.loggedIn) {
      this.setState({
        seen: !this.state.seen
      });
    }
    this.setState({
      login: !this.state.login
    });
  };

  render() {
    return (
      <div>
        <div className="section-batch">
          <div className="row">
            <div className="frame">
              <SideBar />
              <div className="frame__main">
                <div className="section-head">
                  <div className="col-1-of-2">
                    <h1>Class List</h1>
                  </div>
                  <div className="col-1-of-2">
                    <div className="col-1-of-2">
                      <button
                        className="btn btn-main"
                        onClick={this.handleAddClassPopUp}
                      >
                        <h4>
                          <b>&#43;</b> Add Class
                        </h4>
                      </button>
                      {this.state.seen ? (
                        <CreateNewBatch toggle={this.handleAddClassPopUp} />
                      ) : null}
                      {this.state.login && !this.props.loggedIn ? (
                        <LogInNotice toggle={this.handleAddClassPopUp} />
                      ) : null}
                    </div>
                    <div className="col-1-of-2">
                      <div className="search-box">
                        <input
                          type="text"
                          name=""
                          className="search-txt"
                          placeholder="Type class number..."
                        />
                        <span className="search-btn">
                          <i className="icon ion-ios-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-body">
                  {!this.props.batches || this.props.batches.length === 0 ? (
                    <h3>Please wait...</h3>
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
                              <h5 style={{ textAlign: "center" }}>Total: 20</h5>
                            </div>
                            <span>
                              <i className="icon ion-md-more"></i>
                            </span>
                            <span
                              onClick={() => this.props.deleteBatch(batch.id)}
                            >
                              <i className="icon ion-md-close"></i>
                            </span>
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
    batches: state.batches,
    loggedIn: !!state.auth
  };
};
export default connect(mapStateToProps, { loadBatches, deleteBatch })(Batch);
