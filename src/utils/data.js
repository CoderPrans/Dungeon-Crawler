import DungeonGenerator from './Maps';

const enemy = [
  {hp: 50, attack: 15},
  {hp: 75, attack: 45},
  {hp: 100, attack: 60},
  {hp: 150, attack: 80},
];

const weapon = [['Fist', 25], ['Hammer', 50], ['Sword', 80], ['Fire', 100]];

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
let bossIs = false;

presence.forEach((rows, i_r) => {
  rows.forEach((cols, i_c) => {
    let rando = Math.random();
    presence[i_r][i_c] =
      floorMap[i_r][i_c].cellType === 'empty'
        ? rando > 0.01 && rando < 0.03
          ? ((thugCount += 1), (bossIs = true), bossIs ? 'thug' : 'boss')
          : rando < 0.005 && rando > 0.001
          ? 'pot'
          : rando > 0.04 && rando < 0.07
          ? rando < 0.05 && rando > 0.04
            ? 'w1'
            : rando < 0.06 && rando > 0.05
            ? 'w2'
            : rando < 0.07 && rando > 0.06
            ? 'w3'
            : null
          : 'empty'
        : floorMap[i_r][i_c].cellType;
  });
});

console.log(presence, thugCount);

export {enemy, weapon, floorMap, presence, thugCount};
