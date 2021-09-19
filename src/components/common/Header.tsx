import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/commonStyles.css";

interface Props {}

export default class Header extends React.Component<Props> {
  render() {
    return (
      <div className="top-nav">
        <NavLink className="nav-items" to="/" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink className="nav-items" to="/about-us" activeClassName="active">
          About Us
        </NavLink>
        <NavLink
          className="nav-items"
          to="/contact-us"
          activeClassName="active"
        >
          Contact Us
        </NavLink>
      </div>
    );
  }
}
