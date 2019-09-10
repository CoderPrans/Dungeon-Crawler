import React from 'react';
import {weapon} from '../utils/data';

const Dashboard = ({
  hp,
  xp,
  weaponLevel,
  enemyLevel,
  enemyHp,
  enemyAttack,
  thugCount,
}) => (
  <div className="display-section">
    <div className="statsbar">
      <span>
        <span style={{fontSize: '13px'}}>HP</span>
        {hp}
      </span>
      <span>
        <span style={{fontSize: '13px'}}>XP</span>
        {xp}
      </span>
      <span>
        <span style={{fontSize: '13px'}}>Attack</span>
        {weapon[weaponLevel][1]}
      </span>
      <span style={{color: 'coral', fontWeight: 'bold', paddingTop: '30px'}}>
        {thugCount}
      </span>
    </div>
    <div className="actionbar">
      {enemyLevel !== null ? (
        <div>
          <span>
            <span style={{fontSize: '13px'}}>L</span>
            {enemyLevel}
          </span>
          <span>
            <span style={{fontSize: '13px'}}>HP</span>
            {enemyHp}{' '}
          </span>
          <span>
            <span style={{fontSize: '13px'}}>Attack</span>
            {enemyAttack}{' '}
          </span>
        </div>
      ) : null}
    </div>
  </div>
);

export default Dashboard;
