import React from 'react';
import {weapon} from '../utils/data';
import Health from '../icons/hp.png';
import Hammer from '../icons/hammer.png';
import Fire from '../icons/fire.png';
import Sword from '../icons/sword.png';

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
        <img alt="health-icon" src={Health} />
        {hp}
      </span>
      <span>
        <img alt="health-icon" src={Health} />
        {xp}
      </span>
      <span>
        <img alt="health-icon" src={Health} />
        {weapon[weaponLevel][1]}
      </span>
      <span style={{color: 'red', fontWeight: 'bold'}}>{thugCount}</span>
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
