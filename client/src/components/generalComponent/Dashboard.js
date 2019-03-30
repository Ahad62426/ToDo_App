import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

//import Landing from './generalComponent/Landing';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.fetchUser();
    console.log('dashboard update');
  }

  renderDashboard() {
    console.log('dashboard auth');
    console.log(this.props.auth);
    if (this.props.auth) {
      if (this.props.auth.type === 'admin') {
        return <Redirect to='/admin'  />
      }
      else if(this.props.auth.type === 'user'){
        return <div>Welcome {this.props.auth.email}</div>
      }
    }else if(this.props.auth === false){
      return <Redirect to='/login'  />
    }
    else {
      return <div>Loading.....</div>
    }
  }
  
  render() {
    return (
      <div>
        <div id="container" className="container">
          {this.renderDashboard()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(Dashboard);