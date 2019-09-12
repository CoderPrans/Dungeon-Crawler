import React from 'react';
import {weapon} from '../utils/data';
import Health from '../icons/hp.png';
import Hammer from '../icons/hammer.png';
import Fire from '../icons/fire.png';
import Sword from '../icons/sword.png';
import Punch from '../icons/punch-blast.png';
import Enemy from '../icons/enemy.png';
import Hero from '../icons/hero.png';

const weaponIcon = weaponL => {
  return weaponL === 0
    ? Punch
    : weaponL === 1
    ? Hammer
    : weaponL === 2
    ? Sword
    : Fire;
};

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
        <img alt="xp-icon" src={Hero} />
        {xp}
      </span>
      <span>
        <img alt="weapon-icon" src={weaponIcon(weaponLevel)} />
        {weapon[weaponLevel][1]}
      </span>
    </div>
    <div className="actionbar">
      <span style={{color: 'red', fontWeight: 'bold', margin: '0 10px'}}>
        {thugCount}
        <img alt="weapon-icon" src={Enemy} />
        {enemyHp}
      </span>
      {
        // {enemyLevel !== null ? (
        //   <div>
        //     <span>
        //       <span style={{fontSize: '13px'}}>L</span>
        //       {enemyLevel}
        //     </span>
        //     <span>
        //       <span style={{fontSize: '13px'}}>HP</span>
        //       {enemyHp}{' '}
        //     </span>
        //     <span>
        //       <span style={{fontSize: '13px'}}>Attack</span>
        //       {enemyAttack}{' '}
        //     </span>
        //   </div>
        // ) : null}
      }
      <div
        style={{
          width: '220px',
          overflow: 'hidden',
        }}>
        <p
          style={{
            width: `${hp}%`,
            background: 'lightgreen',
            height: '25px',
            margin: '5px',
          }}
        />
        <p
          style={{
            width: `${enemyHp || 0}%`,
            background: 'orangered',
            height: '25px',
            margin: '5px',
          }}
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
