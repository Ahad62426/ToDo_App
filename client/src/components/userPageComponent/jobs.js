import React from 'react';

const Jobs = (props) => {
  return (
    <div className="col">
      <div id="jobBlog">
        <h4>{props.job.title}</h4>
        <h6>Details: <i>{props.job.details}</i></h6>
        {props.children}
      </div>
    </div>
  );
}

export default Jobs;