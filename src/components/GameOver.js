import React from 'react';

const GameOver = ({res}) => (
  <div
    style={{
      height: '100vh',
      background: '#232323',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <div
      style={{
        width: '250px',
        border: '4px solid #211',
        padding: '20px',
        background: '#eff',
        textAlign: 'center',
      }}>
      <h3>Game Over</h3>
      <h1>{res}</h1>
      <button
        className="restart-button"
        onClick={() => window.location.reload()}>
        Restart
      </button>
    </div>
  </div>
);

export default GameOver;
