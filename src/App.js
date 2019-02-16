import React from "react";
import "./App.css";
import map from "./Maps";

const enemy = [
  { hp: 50, attack: 15 }, // color: purple, attack: 10
  { hp: 75, attack: 45 }, // color: brown, attack: 35
  { hp: 100, attack: 60 }, // color: blue, attack: 50
  { hp: 150, attack: 80 } // color: black, attack: 80
];

const weapon = [
  ["hand",  15],
  ["hammer", 45],
  ["sword", 60],
  ["fire", 80]
]; 

// TODO health potions

// defines the position of enemy. choses a random position each time.
let positions = new Array(60)

for(let i = 0; i < positions.length; i++){
   positions[i] = new Array(30).fill(0);
  for(let j = 0; j < positions[i].length; j++){
    if(Math.random() < 0.01 && map[i].indexOf(j) === -1){
      positions[i][j] = 1;
    }
  }
}

console.log(positions);

console.log(map);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0,
      hp: 100,
      xp: 25,
      positions,
      enemyDir: null,
      enemyHp: null,
      enemyAttack: null,
      weaponLevel: 1,
      enemyLevel: null,
      fightOn: false
    };
    this.handleTravel = this.handleTravel.bind(this);
    this.detectEnemy = this.detectEnemy.bind(this);
    this.handleCombat = this.handleCombat.bind(this);
  }

  componentDidMount() {
 
    document.addEventListener("keyup", e => { e.preventDefault();
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
    this.setState({ positions })
  }
 
 detectEnemy(nextY, nextX){

   let { positions } = this.state
    
   if(nextY && nextX && nextY + 1 < 59 && nextX + 1 < 29){
    if(positions[nextY + 1][nextX] === 1){
      alert('Enemy detected!, right');
      this.setState({fightOn: true})
      return {enemyDir: "right", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } else if(positions[nextY][nextX + 1] === 1){
      alert('Enemy detected!, down');
      this.setState({fightOn: true})
      return {enemyDir: "down", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } else if(positions[nextY - 1][nextX] === 1){
      alert('Enemy detected!, left');
      this.setState({fightOn: true})
      return {enemyDir: "left", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } else if(positions[nextY][nextX - 1] === 1){
      alert('Enemy detected!, up');
      this.setState({fightOn: true})
      return {enemyDir: "up", enemyLevel: 1, enemyHp: enemy[1].hp, enemyAttack: enemy[1].attack}
    } console.log("from inside the detectEnemy", this.state.fightOn)
     return "clear" 
   } 
  }

handleTravel(e) {
    e.preventDefault();


   let { positions } = this.state 

 if(this.state.enemyDir === null){
    let {posX, posY} = this.state; 
    if (e.target.id === "Yplus") {
      if (
        posY < 59 &&
        map[posY + 1].indexOf(posX) < 0 &&
        positions[posY + 1][posX] !== 1 
      ) {
        if(typeof this.detectEnemy(posY + 1, posX) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY + 1, posX)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp})
        } else {
          this.setState({fightOn: false})
        }
        this.setState({ posY: posY + 1 });
      } 
    } else if (e.target.id === "Xplus") {
      if (
        posX < 29 &&
        map[posY].indexOf(posX + 1) < 0 &&
        positions[posY][posX + 1] !== 1
      ) {
        if(typeof this.detectEnemy(posY, posX + 1) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY, posX + 1)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }
 
        this.setState({ posX: posX + 1 });
      }
    } else if (e.target.id === "Yminus") {
      if (
        posY > 0 &&
        map[posY - 1].indexOf(posX) < 0 &&
        positions[posY - 1][posX] !== 1
      ) {
         if(typeof this.detectEnemy(posY - 1, posX) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY - 1, posX)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }

        this.setState({ posY: posY - 1 });
      }
    } else {
      if (
        posX > 0 &&
        map[posY].indexOf(posX - 1) < 0 &&
        positions[posY][posX - 1] !== 1
      ) {
         if(typeof this.detectEnemy(posY, posX - 1) === 'object'){
          let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(posY, posX - 1)
          this.setState({ enemyDir, enemyLevel, enemyAttack, enemyHp })
        } else {
          this.setState({fightOn: false})
        }
  
        this.setState({ posX: posX - 1 });
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
  let { posX, posY, positions } = this.state 
    let units = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 60; j++) {
        let thugPresence = positions[j][i]
        units.push(
          <Units
            meX={i}
            meY={j}
            posX={posX}
            posY={posY}
            thugP={thugPresence}
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
            <span>Weapon: {this.state.weaponLevel}</span>
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
        <div>
          <button id="Yplus" className="dirButton" onClick={this.handleTravel}>
            right
          </button>
          <button id="Xplus" className="dirButton" onClick={this.handleTravel}>
            down
          </button>
          <button id="Yminus" className="dirButton" onClick={this.handleTravel}>
            left
          </button>
          <button id="Xminus" className="dirButton" onClick={this.handleTravel}>
            up
          </button>
        </div>
      </div>
    );
  }
}

const Units = props => {
  const { meX, meY, posX, posY, thugP } = props;
  if (Math.abs(meX - posX) <= 6 && Math.abs(meY - posY) <= 6) {
    if (meX === posX && meY === posY) {
      return <div className="units pos" />;
    } else if (map[meY].indexOf(meX) >= 0) {
      return <div className="units brick" />;
    } else {
      //console.log(thugP)
      return thugP &&
        Math.abs(10 * meY - meX) !== 0 ? (
        <div className="units thug" />
      ) : (
        <div className="units visible" />
      );
    }
  } else {
    return <div className="units" />;
  }
};

export default App;
