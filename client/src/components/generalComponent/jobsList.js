import React, { Component } from 'react';
import Jobs from '../userPageComponent/jobs';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import ApplyButton from '../userPageComponent/applyButton';

class JobLists extends Component {
  componentDidUpdate() {
    console.log(this.props.done);
  }

  constructor() {
    super();
    this.state = {
      addmoreFlag: false
    }
  }

  apply(jobId) {
    this.props.apply(jobId);

  }
  renderJobsList() {
    switch (this.props.jobs) {
      case null:
        return <div><h6>Loading Tasks....</h6></div>;
      case false:
        return (
          <div><h6>No Task Added....</h6></div>
        );
      default:
        const jobs = this.props.jobs;
        return jobs.jobs.map(job => {
          if (job.userID === this.props.auth._id) {
            return <Jobs key={Math.random()}
              job={job}>
              <ApplyButton done={job.done}>
                <button onClickCapture={() => this.apply(job._id)}>Click when done</button>
              </ApplyButton>
            </Jobs>
          }
        });
    }
  }

  addmore() {
    if (this.state.addmoreFlag) {
      return (
        <div className="input-field col-md-12">
          <form className="login_form" onSubmit={(e) => this.add(e)}>
          <div className="row">
            <div className="input-field col-md-12">
              <input id="icon_email" type="text" className="validate" name="title" />
              <label htmlFor="icon_prefix">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col-md-12">
              <input id="icon_email" type="text" className="validate" name="details" />
              <label htmlFor="icon_prefix">Details</label>
            </div>
          </div>
          <div className="row">
            <input type="submit" className="btn btn-block btn-primary" value="Add" />
          </div>
          </form>
        </div>
      );
    } else {
      return <button onClickCapture={() => this.setState({ addmoreFlag: true })}>Click to add</button>;
    }
  }

  add(event) {
    const { title, details } = event.target;
    const formData = {
      userID: this.props.auth._id,
      title: title.value,
      details: details.value,
      done: false
    }
    //console.log(formData);
    this.props.addTask(formData);
    this.setState({ addmoreFlag: false });
   }

  render() {
    return (
      <div>
        <div id="container">
          <div id="welcome_text" className="brand-logo">
            <h5 >Your List of Tasks . . .</h5>
          </div>
          {this.addmore()}
          <div className="row">
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ jobs, auth }) => ({ jobs, auth });
export default connect(mapStateToProps, actions)(JobLists)