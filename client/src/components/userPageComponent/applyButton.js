import React from 'react';

const ApplyButton = (props) => {
  if (props.done === true) {
    return <button>Done!</button>;
  } else {
    return (
      <div style={{ display: 'inline' }}>
        {props.children}
      </div>
    );
  }
}

export default ApplyButton;