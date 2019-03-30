import React, { Component } from 'react';


class JobDetail extends Component {
  renderDetail() {
    console.log(this.props.job);
    return (
      <div>
        <p>{this.props.job.details}</p>

      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderDetail()}
        {this.props.children}
      </div>
    );
  }
}
export default JobDetail;