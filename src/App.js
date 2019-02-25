import React from "react";
import "./App.css";
import DungeonGenerator from "./Maps";

const enemy = [
  { hp: 50, attack: 15 }, // color: purple, attack: 10
  { hp: 75, attack: 45 }, // color: brown, attack: 35
  { hp: 100, attack: 60 }, // color: blue, attack: 50
  { hp: 150, attack: 80 } // color: black, attack: 80
];

const weapon = [
  ["Fist",  15],
  ["Hammer", 45],
  ["Sword", 60],
  ["Fire", 80]
]; 

var floorMap = DungeonGenerator.generate({
    maxRoomSize: 7,
    minRoomSize: 7,
    padding: 2,
    rooms: 25,
    rows: 50,
    cols: 30
  });

// TODO multi level enemy, program map algorithm

let positions = new Array(50)
let hpotions = new Array(50)

for(let i = 0; i < positions.length; i++){
   positions[i] = new Array(30).fill(0);
   hpotions[i] = new Array(30).fill(0)
  for(let j = 0; j < positions[i].length; j++){
    if(Math.random() < 0.01 
      && floorMap[i][j].cellType === "empty"){
      positions[i][j] = 1;
    } else if(Math.random() < 0.005 
      && floorMap[i][j].cellType === "empty" 
      && positions[i][j] === 0){
      hpotions[i][j] = 1;
    } 
  }
}

let weapons = new Array(50)

for(let i = 0; i < weapons.length; i++){
  weapons[i] = new Array(30).fill(0)
  for(let j = 0; j < weapons[i].length; j++){
    if(Math.random() < 0.01
      && positions[i][j] === 0
      && hpotions[i][j] === 0){
      if(Math.random() < 0.4){
        weapons[i][j] = 1 
      } else if(Math.random() < 0.3){
        weapons[i][j] = 2 
      } else if(Math.random() < 0.2){
        weapons[i][j] = 3 
      }    
    }
  }
}

//console.log(positions);
//console.log(weapons);
console.log(floorMap);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: Math.round(Math.random()*30),
      posY: Math.round(Math.random()*50),
      hp: 100,
      xp: 25,
      positions,
      hpotions,
      weapons,
      enemyDir: null,
      enemyHp: null,
      enemyAttack: null,
      weaponLevel: 0,
      enemyLevel: null,
      fightOn: false
    };
    this.handleTravel = this.handleTravel.bind(this);
    this.detectEnemy = this.detectEnemy.bind(this);
    this.handleCombat = this.handleCombat.bind(this);
  }

  componentDidMount() {
 
    document.addEventListener("keydown", e => { e.preventDefault();
      if (e.keyCode === 39) {
        document.getElementById("Yplus").click(); 
      } else if (e.keyCode === 40) {
        document.getElementById("Xplus").click(); 
      } else if (e.keyCode === 37) {
        document.getElementById("Yminus").click(); 
      } else if (e.keyCode === 38) {
        document.getElementById("Xminus").click(); 
      }
    });
    this.setState({ positions, hpotions })
      let posX;
      let posY;
      for(let i = 0; i < 30; i++){
          for(let j = 0; j < 50; j++){
              if(Math.random() < 0.2 &&
                 !posX &&
                 !posY &&
                 floorMap[j][i].cellType === "empty" &&
                 positions[i][j] === 0 &&
                 this.state.weapons[i][j] === 0 &&
                 hpotions[i][j] === 0
              ){
                  posX = i;
                  posY = j;
              }  
          } 
      }
      this.setState({ posX, posY })
  }
 
 detectEnemy(nextY, nextX){

   let { positions } = this.state
    
   if(nextY + 1 <= 49 && positions[nextY + 1][nextX] === 1){
      alert('Enemy detected!, right');
      this.setState({fightOn: true})
      return {enemyDir: "right", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
   } else if(nextX + 1 <= 29 && positions[nextY][nextX + 1] === 1){
      alert('Enemy detected!, down');
      this.setState({fightOn: true})
      return {enemyDir: "down", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } else if(nextY - 1 >= 0 && positions[nextY - 1][nextX] === 1){
      alert('Enemy detected!, left');
      this.setState({fightOn: true})
      return {enemyDir: "left", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } else if(nextX - 1 >= 0 && positions[nextY][nextX - 1] === 1){
      alert('Enemy detected!, up');
      this.setState({fightOn: true})
      return {enemyDir: "up", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } console.log("from inside the detectEnemy", this.state.fightOn)
     return "clear" 
   } 

handleTravel(e) {
    e.preventDefault();


   let { positions, hpotions, weapons } = this.state 

 if(this.state.enemyDir === null){
    let {posX, posY} = this.state; 
    if (e.target.id === "Yplus") {
      if (
        posY < 49 &&
        floorMap[posY + 1][posX].cellType === "empty" &&
        positions[posY + 1][posX] !== 1 
      ) {
        if(typeof this.detectEnemy(posY + 1, posX) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY + 1, posX)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp})
        } else {
          this.setState({fightOn: false})
        }
        let currHp = this.state.hp
        if(hpotions[posY + 1][posX] === 1 ){ this.setState({ hp : currHp+=65 }); alert('potion collected')}
        if(weapons[posY + 1][posX] !== 0){ this.setState({ weaponLevel : weapons[posY + 1][posX] }); alert(`picked a ${weapon[weapons[posY + 1][posX]][0]}`)}
        let clonedPotions = hpotions.slice(0)
        clonedPotions[posY + 1][posX] = 0 
        let clonedWeapons = weapons.slice(0)
        clonedWeapons[posY + 1][posX] = 0
        this.setState({ posY: posY + 1, hpotions: clonedPotions, weapons: clonedWeapons });
      } 
    } else if (e.target.id === "Xplus") {
      if (
        posX < 29 &&
        floorMap[posY][posX + 1].cellType === "empty" &&
        positions[posY][posX + 1] !== 1
      ) {
        if(typeof this.detectEnemy(posY, posX + 1) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY, posX + 1)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }
 
        let currHp = this.state.hp
        if(hpotions[posY][posX + 1] === 1 ){ this.setState({ hp : currHp+=65 }); alert('potion collected')}
        if(weapons[posY][posX + 1] !== 0 ){ this.setState({ weaponLevel : weapons[posY][posX + 1]}); alert(`picked a ${weapon[weapons[posY][posX + 1]][0]}`)}
        let clonedPotions = hpotions.slice(0)
        clonedPotions[posY][posX + 1] = 0
        let clonedWeapons = weapons.slice(0)
        clonedWeapons[posY][posX + 1] = 0
        this.setState({ posX: posX + 1, hpotions: clonedPotions, weapons: clonedWeapons });
      }
    } else if (e.target.id === "Yminus") {
      if (
        posY > 0 && 
        floorMap[posY - 1][posX].cellType === "empty" &&
        positions[posY - 1][posX] !== 1
      ) {
         if(typeof this.detectEnemy(posY - 1, posX) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY - 1, posX)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }

        let currHp = this.state.hp
        if(hpotions[posY - 1][posX] === 1 ){ this.setState({ hp : currHp+=65 }); alert('potion collected')}
        if(weapons[posY - 1][posX] !== 0 ){ this.setState({weaponLevel: weapons[posY - 1][posX]}); alert(`picked a ${weapon[weapons[posY - 1][posX]][0]}`)}
        let clonedPotions = hpotions.slice(0)
        clonedPotions[posY - 1][posX] = 0
        let clonedWeapons = weapons.slice(0)
        clonedWeapons[posY - 1][posX] = 0
        this.setState({ posY: posY - 1, hpotions: clonedPotions, weapons: clonedWeapons});
      }
    } else {
      if (
        posX > 0 &&
        floorMap[posY][posX - 1].cellType === "empty" &&
        positions[posY][posX - 1] !== 1
      ) {
         if(typeof this.detectEnemy(posY, posX - 1) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY, posX - 1)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }
  
        let currHp = this.state.hp
        if(hpotions[posY][posX - 1] === 1 ){ this.setState({ hp : currHp+=65 }); alert('potion collected')}
        if(weapons[posY][posX - 1] !== 0){ this.setState({weaponLevel: weapons[posY][posX - 1]}); alert(`picked a ${weapon[weapons[posY][posX - 1]][0]}`)}
        let clonedPotions = hpotions.slice(0)
        clonedPotions[posY][posX - 1] = 0
        let clonedWeapons = weapons.slice(0)
        clonedWeapons[posY][posX - 1] = 0
        this.setState({ posX: posX - 1, hpotions: clonedPotions, weapons: clonedWeapons});
      }
    }
 } else {
  this.handleCombat(e) 
 }   
}
       
handleCombat(e){
  let {hp, xp, enemyLevel, weaponLevel, enemyDir, enemyHp, enemyAttack, posY, posX} = this.state, 
    //weaponName = weapon[weaponLevel][0],
      weaponAttack = weapon[weaponLevel][1]
       
    if(enemyDir === "right" && e.target.id === "Yplus"){
      enemyHp = enemyHp - weaponAttack >=0 ? enemyHp - weaponAttack : 0 
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0 
      xp += 5*enemyLevel 
      if(enemyHp === 0){
        // positions - the thug obliterated
        let clonedArr = this.state.positions.slice(0) 
        clonedArr[posY+1][posX] = 0
        this.setState({ positions: clonedArr })
        this.setState({
          enemyDir : null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null})}
      else{ this.setState({enemyHp, hp, xp}) }
    } else if(enemyDir === "left" && e.target.id === "Yminus"){
      enemyHp = enemyHp - weaponAttack >= 0 ? enemyHp - weaponAttack : 0 
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0
      xp += 5*enemyLevel 
      if(enemyHp === 0){
        // positions - the thug obliterated
        let clonedArr = this.state.positions.slice(0) 
        clonedArr[posY-1][posX] = 0
        this.setState({ positions: clonedArr })
        this.setState({
          enemyDir : null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null})}
      this.setState({enemyHp, hp, xp})
    } else if(enemyDir === "up" && e.target.id === "Xminus"){
      enemyHp = enemyHp - weaponAttack >=0 ? enemyHp - weaponAttack : 0 
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0
      xp += 5*enemyLevel 
      if(enemyHp === 0){
        // positions - the thug obliterated
        let clonedArr = this.state.positions.slice(0) 
        clonedArr[posY][posX-1] = 0
        this.setState({ positions: clonedArr })
        this.setState({
          enemyDir : null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null})}
      this.setState({enemyHp, hp, xp})
    } else if(enemyDir === "down" && e.target.id === "Xplus"){
      enemyHp = enemyHp - weaponAttack >=0 ? enemyHp - weaponAttack : 0 
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0
      xp += 5*enemyLevel 
      if(enemyHp === 0){
        // positions - the thug obliterated
        let clonedArr = this.state.positions.slice(0) 
        clonedArr[posY][posX+1] = 0
        this.setState({ positions: clonedArr })
        this.setState({
          enemyDir : null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null})}
      this.setState({enemyHp, hp, xp}) 
    }
}

// when fight is won..
// erase enemy from positions arr
// reset enemy states to null

render() {
  //  console.log(this.state.enemyDir, this.state.enemyDir ? this.state.enemyHp : "");
  if(this.state.hp === 0) { alert('Game Over') }
  let { posX, posY, positions, hpotions, weapons } = this.state 
    let units = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 50; j++) {
        let thugPresence = positions[j][i]
        let potionPresence = hpotions[j][i]
        let weaponL = weapons[j][i]
        units.push(
          <Units
            meX={i}
            meY={j}
            posX={posX}
            posY={posY}
            thugP={thugPresence}
            potionP={potionPresence}
            weaponL={weaponL}
          />
        );
      }
   }
    return (
      <div>
        <h1 style={{ color: "gainsboro", textAlign: "center" }}>
          Dungeon Crawler
        </h1>
        <div className="display-section">
          <div className="statsbar">
            <span>Hp: {this.state.hp}</span>
            <span>Xp: {this.state.xp}</span>
            <span>Weapon: {weapon[this.state.weaponLevel][0]}</span>
          </div>
          <div className="actionbar">
            { this.state.enemyLevel 
                ? (<div><span> E level: {this.state.enemyLevel}</span>
                  <span> E hp: {this.state.enemyHp} </span>
                  <span> E attack: {this.state.enemyAttack} </span></div>)
                : null  
            }
          </div>
        </div>
        <div className="container">{units}</div>
        <div className="navigation">
          <button id="Yminus" className="dirButton" onClick={this.handleTravel}>
           &#8678;
          </button>
          <button id="Xminus" className="dirButton" onClick={this.handleTravel}>
           &#8679;
          </button>
          <button id="Xplus" className="dirButton" onClick={this.handleTravel}>
           &#8681;
          </button>
          <button id="Yplus" className="dirButton" onClick={this.handleTravel}>
           &#8680;
          </button>
        </div>
      </div>
    );
  }
}

const Units = props => {
  const { meX, meY, posX, posY, thugP, potionP, weaponL } = props;
    return Math.abs(meX - posX) <= 6 && Math.abs(meY - posY) <= 6
      ? meX === posX && meY === posY ? <div className="units pos" />
        : floorMap[meY][meX].cellType === "wall" ? <div className="units brick" />
        : thugP ? (<div className="units thug" />)
          : potionP ? (<div className="units potion" />) 
          : weaponL === 1 ? (<div className="units weapon2" />)
          : weaponL === 2 ? (<div className="units weapon3" />)
          : weaponL === 3 ? (<div className="units weapon4" />)
          : (<div className="units visible" />)
     : <div className="units" />
  };

export default App;
