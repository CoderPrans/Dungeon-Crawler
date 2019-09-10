import React from 'react';

const Dialog = props => {
  if (props.mssg) {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 170,
          margin: 'auto',
          width: '200px',
          height: '88px',
          background: 'rgb(255, 255, 255, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props.mssg ? props.mssg : 'I have nothing'}
      </div>
    );
  } else {
    return null;
  }
};

export default Dialog;
