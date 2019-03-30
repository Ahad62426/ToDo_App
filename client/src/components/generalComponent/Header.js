import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/index';

class Header extends Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case undefined:
        return;
      case false:
        return (
          <ul>
            <li><a className="nav_component icons" id="gmail_icon" href="/auth/google"><div className="nav_icon_text">Google</div></a></li>
          </ul>
        );
      default:
        return (
          <ul>
            <li><a className="nav_component icons" id="account_icon" href="/user"><div className="nav_icon_text">Profile</div></a></li>
            <li><div className="nav_component icons" id="logout_icon" onClickCapture={() => this.props.logout()} ><div className="nav_icon_text">LogOut</div></div></li>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={'/'}
            className="left brand-logo">
            <div id="" className="right">ToDo App</div>
          </Link>
          <ul id="" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(Header);