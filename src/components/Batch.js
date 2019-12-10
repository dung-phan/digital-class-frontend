import React, { Component } from "react";
import { loadBatches } from "../actions/batches";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateNewBatch from "./CreateNewBatch";
import NavBar from "./NavBar";
export class Batch extends Component {
  componentDidMount() {
    this.props.loadBatches();
  }
  render() {
    return (
      <div className="containerx">
        <NavBar />
        <div className="top-heading">Class list</div>
        {this.props.batches === null ? (
          "Loading..."
        ) : (
          <div>
            <img
              src="http://embacy.io/images/v2.svg"
              alt=""
              className="float-left"
            />
            <ul className="ui three column grid">
              {this.props.batches.map(batch => (
                <li
                  key={batch.id}
                  className="ui card column"
                  style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    width: "20%",
                    marginTop: "7%"
                  }}
                >
                  <div className="segment">
                    <Link
                      className="header"
                      to={`/batches/${batch.id}/students`}
                    >
                      <h3>Class #{batch.batchNumber}</h3>
                    </Link>
                  </div>
                  <div className="content">
                    <h4>Details</h4>
                    Start date: {batch.startDate}
                    <br />
                    End date: {batch.endDate}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <br />

        {/* {this.props.loggedIn ? ( */}
        <CreateNewBatch />
        {/* ) : (
          <Link to="/login">
            {" "}
            <div className="content">Please log in to create classes</div>
          </Link>
        )} */}
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
