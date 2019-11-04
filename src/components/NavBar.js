import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
export default function NavBar() {
  return (
    <div className='ui inverted secondary pointing menu'>
      <Link className='item' to='/'>
        <h3>Home</h3>
      </Link>
      <Link className='item' to='/login'>
        <h3>Log in</h3>
      </Link>
      <Link className='ui teal basic button' to='/batches'>
        <h3>Classes</h3>
      </Link>

      <div className='right menu'>
        <Link className='ui teal button' to='/signup'>
          <h3>Logout</h3>
        </Link>
      </div>
    </div>
  );
}
