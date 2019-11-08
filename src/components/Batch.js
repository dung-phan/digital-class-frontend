import React, { Component } from 'react';
import { loadBatches } from '../actions/batches';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateNewBatch from './CreateNewBatch';
import NavBar from './NavBar';
export class Batch extends Component {
  componentDidMount() {
    console.log('did component did mount works');
    this.props.loadBatches();
  }
  render() {
    return (
      <div>
        <NavBar />
        {this.props.batches === null ? (
          'Loading...'
        ) : (
          <ul className='ui three column grid'>
            {console.log('check the props', this.props)}
            {this.props.batches.map(batch => (
              <li key={batch.id} className='ui card column'>
                <div className='segment'>
                  <Link className='header' to={`/batches/${batch.id}/students`}>
                    Batch #{batch.batchNumber}
                  </Link>
                </div>
                <div className='content'>
                  <h4 className='ui sub header'>Details</h4>
                  Start date: {batch.startDate}
                  <br />
                  End date: {batch.endDate}
                </div>
              </li>
            ))}
          </ul>
        )}
        <br />

        {this.props.loggedIn ? (
          <CreateNewBatch />
        ) : (
          <Link to='/login'>Please log in to create classes</Link>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('check state auth', state.auth);
  return {
    batches: state.batches,
    loggedIn: !!state.auth
  };
};
export default connect(
  mapStateToProps,
  { loadBatches }
)(Batch);
