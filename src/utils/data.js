import DungeonGenerator from './Maps';

const enemy = [
  {hp: 100, attack: 45},
  {hp: 100, attack: 75},
  {hp: 100, attack: 90},
  {hp: 100, attack: 100},
];

const weapon = [['Punch', 45], ['Hammer', 65], ['Sword', 80], ['Fire', 100]];

let floorMap = DungeonGenerator.generate({
  maxRoomSize: 7,
  minRoomSize: 5,
  padding: 2,
  rooms: 27,
  rows: 50,
  cols: 30,
});

/*
 * weapons = w1, w2, w3, w4
 * enemies = thug, boss
 * wall
 * pot
 * */

let presence = new Array(50).fill().map(i => new Array(30).fill(0));
let thugCount = 0;
//let bossIs = false;

presence.forEach((rows, i_r) => {
  rows.forEach((cols, i_c) => {
    let rando = Math.random();
    presence[i_r][i_c] =
      floorMap[i_r][i_c].cellType === 'empty' &&
      i_r % 1.2 !== 0 &&
      i_c % 2 === 0
        ? rando > 0.01 && rando < 0.03
          ? ((thugCount += 1), 'thug1')
          : rando > 0.03 && rando < 0.04
          ? ((thugCount += 1), 'thug2')
          : rando > 0.006 && rando < 0.01
          ? 'pot'
          : rando > 0.001 && rando < 0.003
          ? 'w1'
          : rando > 0.003 && rando < 0.005
          ? 'w2'
          : rando > 0.005 && rando < 0.0059
          ? 'w3'
          : 'empty'
        : floorMap[i_r][i_c].cellType;
  });
});

console.log(presence, thugCount);

export {enemy, weapon, floorMap, presence, thugCount};
