import React from "react";
import "./App.css";
import map from "./Maps";

/*const enemy = [
  { hp: 50, attack: 15 }, // color: purple, attack: 10
  { hp: 75, attack: 45 }, // color: brown, attack: 35
  { hp: 100, attack: 60 }, // color: blue, attack: 50
  { hp: 150, attack: 80 } // color: black, attack: 80
];
*/

/* const weapon = {
  hand: 15,
  hammer: 45,
  sword: 60,
  fire: 80
}; */

let positions = new Array(60);

for(let i = 0; i < positions.length; i++){
   positions[i] = new Array(30);
  for(let j = 0; j < positions[i].length; j++){
    if(Math.random() < 0.01){
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
      enemyDir: null,
      weaponLevel: 1,
      enemyLevel: null,
      enemyHp: null,
      enemyAttack: null,
      fightOn: false
    };
    this.handleTravel = this.handleTravel.bind(this);
    this.detectEnemy = this.detectEnemy.bind(this);
  }

  componentDidMount() {
 
    document.addEventListener("keyup", e => {
      e.preventDefault();
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
  }
 
 detectEnemy(){
    
    let {posY, posX} = this.state
   if(posY && posX && Math.abs(posX - 1) && Math.abs(posY - 1)){
      // let enemyDir;
      // let enemyLevel;
    if(positions[posY + 1][posX] === 1){
      console.log("this was executed", positions[posY + 1][posX])
       //enemyDir = "right"
      //enemyLevel = positions[this.state.posY + 1][this.state.posX]
      this.setState({fightOn: true})
    } else if(positions[posY][posX + 1] === 1){
      console.log("this was executed", "down")

      //enemyDir = "down"
      //enemyLevel = positions[this.state.posY][this.state.posX + 1]
      this.setState({fightOn: true})
    } else if(positions[posY - 1][posX] === 1){
console.log("this was executed", "left")

      //enemyDir = "left"
      //enemyLevel = positions[this.state.posY -1][this.state.posX] this.setState({fightOn: true})
    } else if(positions[posY][posX - 1] === 1){
 console.log("this was executed", "up")
     //enemyDir = "up"
      //enemyLevel = positions[this.state.posY][this.state.posX - 1]
      this.setState({fightOn: true})
    }
    
    
   console.log("from inside the didUpdate", this.state)
      
    }
  
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevState.posX !== this.state.posX && prevState.posY !== this.state.posY){
      this.detectEnemy()
      console.log("inside state check");
    }
    console.log(this.state.fightOn ? "fight!!!!!!!!!!!!" : "dont fight")
  }


  handleTravel(e) {
    e.preventDefault();
   
   
    if (e.target.id === "Yplus") {
      if (
        this.state.posY < 59 &&
        map[this.state.posY + 1].indexOf(this.state.posX) < 0 &&
        positions[this.state.posY + 1][this.state.posX] !== 1
      ) {
        this.setState({ posY: this.state.posY + 1 });
      }
    } else if (e.target.id === "Xplus") {
      if (
        this.state.posX < 29 &&
        map[this.state.posY].indexOf(this.state.posX + 1) < 0 &&
        positions[this.state.posY][this.state.posX + 1] !== 1
      ) {
        this.setState({ posX: this.state.posX + 1 });
      }
    } else if (e.target.id === "Yminus") {
      if (
        this.state.posY > 0 &&
        map[this.state.posY - 1].indexOf(this.state.posX) < 0 &&
        positions[this.state.posY - 1][this.state.posX] !== 1
      ) {
        this.setState({ posY: this.state.posY - 1 });
      }
    } else {
      if (
        this.state.posX > 0 &&
        map[this.state.posY].indexOf(this.state.posX - 1) < 0 &&
        positions[this.state.posY][this.state.posX - 1] !== 1
      ) {
        this.setState({ posX: this.state.posX - 1 });
      }
    }
  }

  handleCombat(){
    if(this.state.fight){
       // simulate fight scenario
      // detect thug level
      // detect weapon level
      // block passage unless the thug is defeated 
      // decrease the hp of user (according to thug level)  and the hp of thug (according to weapon level)
      // increase the xp of user (according to thug level)
    } 
  }

  render() {
 
    let units = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 60; j++) {
        units.push(
          <Units
            meX={i}
            meY={j}
            posX={this.state.posX}
            posY={this.state.posY}
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
            <span> Thug level: {this.state.enemyLevel}</span>
            <span> Thug hp: {this.state.enemyHp} </span>
            <span> Thug attack: {this.state.enemyAttack} </span>
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
  const { meX, meY, posX, posY } = props;
  if (Math.abs(meX - posX) <= 6 && Math.abs(meY - posY) <= 6) {
    if (meX === posX && meY === posY) {
      return <div className="units pos" />;
    } else if (map[meY].indexOf(meX) >= 0) {
      return <div className="units brick" />;
    } else {
      return positions[meY][meX] >= 0 &&
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
