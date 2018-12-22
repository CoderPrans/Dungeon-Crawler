import React, { Component } from "react";
import "./App.css";
import map from "./Maps";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
      posX: 0,
      posY: 0
    };
    this.handleTravel = this.handleTravel.bind(this);
  }

  componentDidMount() {
    let matrix = Array(30).fill(Array(60).fill(1));
    this.setState({ matrix });
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

  handleTravel(e) {
    e.preventDefault();
    if (e.target.id === "Yplus") {
      if (
        this.state.posY < 59 &&
        map[this.state.posY + 1].indexOf(this.state.posX) < 0
      ) {
        this.setState({ posY: this.state.posY + 1 });
      }
    } else if (e.target.id === "Xplus") {
      if (
        this.state.posX < 29 &&
        map[this.state.posY].indexOf(this.state.posX + 1) < 0
      ) {
        this.setState({ posX: this.state.posX + 1 });
      }
    } else if (e.target.id === "Yminus") {
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
      <div className="App">
        <h1 style={{ color: "white", textAlign: "center" }}>Dungeon Crawler</h1>

        <div className="container">{units}</div>
        <div>
          <button id="Yplus" onClick={this.handleTravel}>
            right
          </button>
          <button id="Xplus" onClick={this.handleTravel}>
            down
          </button>
          <button id="Yminus" onClick={this.handleTravel}>
            left
          </button>
          <button id="Xminus" onClick={this.handleTravel}>
            up
          </button>
        </div>
      </div>
    );
  }
}

const Units = props => {
  if (
    Math.abs(props.meX - props.posX) <= 6 &&
    Math.abs(props.meY - props.posY) <= 6
  ) {
    if (props.meX === props.posX && props.meY === props.posY) {
      return <div className="units pos" />;
    } else if (map[props.meY].indexOf(props.meX) >= 0) {
      return <div className="units brick" />;
    } else {
      return <div className="units visible" />;
    }
  } else {
    return <div className="units" />;
  }
};

export default App;
