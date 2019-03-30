import React from 'react';
import JobLists from './jobsList';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';

//import { connect } from 'react-redux';
class Landing extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchJobs();
  }
  componentDidUpdate(){
    this.props.fetchJobs();
    this.props.fetchUser();
  }

  renderDashboard() {
    console.log('dashboard auth');
    console.log(this.props.auth);
    if (this.props.auth) {
      return <JobLists />;
    }else if(this.props.auth === false){
      return <Redirect to='/login'  />
    }
    else {
      return <div>Loading.....</div>
    }

  }
  render(){
    return (
      <div id="container">
          {this.renderDashboard()}
        </div>
    );
  }
};
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(Landing);
