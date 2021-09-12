import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/commonStyles.css';

export default class Header extends React.Component {
  render() {
    return (
      <div className="top-nav">
        <Link className="nav-items" to="/">Home</Link>
        <Link className="nav-items" to="/about-us">About Us</Link>
        <Link className="nav-items" to="/contact-us">Contact Us</Link>
      </div>
    );
  }
}