import React, { Component } from "react";
import "./App.css";
import map from "./Maps";

const enemy = {
  level1: { hp: 50, attack: 15 }, // color: purple, attack: 10
  level2: { hp: 75, attack: 45 }, // color: brown, attack: 35
  level3: { hp: 100, attack: 60 }, // color: blue, attack: 50
  boss: { hp: 150, attack: 80 } // color: black, attack: 80
};

const weapon = {
  hand: 15,
  hammer: 45,
  sword: 60,
  fire: 80
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
      posX: 0,
      posY: 0,
      hp: 100,
      xp: 25,
      weaponLevel: 1,
      thugLevel: null,
      thugHp: null,
      thugAttack: null
    };
    this.handleTravel = this.handleTravel.bind(this);
  }

  componentDidMount() {
    let matrix = Array(30).fill(Array(60).fill(1));
    this.setState({ matrix });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode == 39) {
        document.getElementById("Yplus").click();
      } else if (e.keyCode == 40) {
        document.getElementById("Xplus").click();
      } else if (e.keyCode == 37) {
        document.getElementById("Yminus").click();
      } else if (e.keyCode == 38) {
        document.getElementById("Xminus").click();
      }
    });
  }

  handleTravel(e) {
    e.preventDefault();
    if (e.target.id == "Yplus") {
      if (
        this.state.posY < 59 &&
        map[this.state.posY + 1].indexOf(this.state.posX) < 0
      ) {
        this.setState({ posY: this.state.posY + 1 });
      }
    } else if (e.target.id == "Xplus") {
      if (
        this.state.posX < 29 &&
        map[this.state.posY].indexOf(this.state.posX + 1) < 0
      ) {
        this.setState({ posX: this.state.posX + 1 });
      }
    } else if (e.target.id == "Yminus") {
      if (
        this.state.posY > 0 &&
        map[this.state.posY - 1].indexOf(this.state.posX) < 0
      ) {
        this.setState({ posY: this.state.posY - 1 });
      }
    } else {
      if (
        this.state.posX > 0 &&
        map[this.state.posY].indexOf(this.state.posX - 1) < 0
      ) {
        this.setState({ posX: this.state.posX - 1 });
      }
    }
  }

  render() {
    console.log(this.state.matrix);
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
            <span> Thug level: {this.state.thugLevel}</span>
            <span> Thug hp: {this.state.thugHp} </span>
            <span> Thug attack: {this.state.thugAttack} </span>
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
    if (meX == posX && meY == posY) {
      return <div className="units pos" />;
    } else if (map[meY].indexOf(meX) >= 0) {
      return <div className="units brick" />;
    } else {
      return Math.abs(23 * meY - meX) % 73 == 0 &&
        Math.abs(10 * meY - meX) != 0 ? (
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
