import React from 'react';
//import {floorMap} from '../utils/data';

const Units = props => {
  const {meX, meY, posX, posY, presence} = props;
  return meX === posX && meY === posY ? (
    <div className="units pos" />
  ) : presence === 'wall' ? (
    <div className="units brick" />
  ) : presence === 'boss' ? (
    <div className="units boss" />
  ) : presence === 'thug' ? (
    <div className="units thug" />
  ) : presence === 'pot' ? (
    <div className="units potion" />
  ) : presence === 'w1' ? ( // weaponL === 'w1'
    <div className="units weapon2" />
  ) : presence === 'w2' ? (
    <div className="units weapon3" />
  ) : presence === 'w3' ? (
    <div className="units weapon4" />
  ) : (
    <div className="units visible" />
  );
};

export default Units;
