import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Dialog from './components/Dialog';
import Units from './components/Units';
import {enemy, weapon, thugCount, presence} from './utils/data';
//import {useAlert} from 'react-alert';

// TODO make a custom alert system
//  -> create a mssg monitor state variable
//  -> create a component that shows the dialog mssg
//  -> every time the mssg is not null its shown
//  -> set a timeout to reset mssg to null

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: Math.round(Math.random() * 30),
      posY: Math.round(Math.random() * 50),
      hp: 100,
      xp: 25,
      presence,
      thugCount,
      enemyDir: null,
      enemyHp: null,
      enemyAttack: null,
      weaponLevel: 0,
      enemyLevel: null,
      fightOn: false,
      gameWon: false,
      mssg: null,
    };
    this.handleTravel = this.handleTravel.bind(this);
    this.detectEnemy = this.detectEnemy.bind(this);
    this.handleCombat = this.handleCombat.bind(this);
    this.emptyPresence = this.emptyPresence.bind(this);
    this.updatePositions = this.updatePositions.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      e.preventDefault();
      if (e.keyCode === 39) {
        document.getElementById('Yplus') &&
          document.getElementById('Yplus').click();
      } else if (e.keyCode === 40) {
        document.getElementById('Xplus') &&
          document.getElementById('Xplus').click();
      } else if (e.keyCode === 37) {
        document.getElementById('Yminus') &&
          document.getElementById('Yminus').click();
      } else if (e.keyCode === 38) {
        document.getElementById('Xminus') &&
          document.getElementById('Xminus').click();
      }
    });
    let posX;
    let posY;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 50; j++) {
        if (
          Math.random() < 0.2 &&
          !posX &&
          !posY &&
          presence[j][i] === 'empty'
        ) {
          posX = i; // setting player x position (initial)
          posY = j; // setting player y position (initial)
        }
      }
    }
    this.setState({posX, posY, thugCount});
  }

  // function to detect enemy
  detectEnemy(nextY, nextX) {
    // arguments next coordinates
    let {presence} = this.state;
    if (presence[nextY + 1][nextX] === 'thug') {
      //this.setState({mssg: 'BOSSS FIGHT !!!!'});
      this.setState({mssg: 'Enemy to the right'});
      this.setState({fightOn: true});
      return {
        enemyDir: 'right',
        enemyLevel: 1,
        enemyHp: enemy[1].hp,
        enemyAttack: enemy[1].attack,
      };
    } else if (presence[nextY][nextX + 1] === 'thug') {
      //this.setState({mssg: 'BOSSS FIGHT !!!!'});
      this.setState({mssg: 'Enemy to the down'});
      this.setState({fightOn: true});
      return {
        enemyDir: 'down',
        enemyLevel: 1,
        enemyHp: enemy[1].hp,
        enemyAttack: enemy[1].attack,
      };
    } else if (presence[nextY - 1][nextX] === 'thug') {
      this.setState({mssg: 'Enemy to the left'});
      this.setState({fightOn: true});
      return {
        enemyDir: 'left',
        enemyLevel: 1,
        enemyHp: enemy[1].hp,
        enemyAttack: enemy[1].attack,
      };
    } else if (presence[nextY][nextX - 1] === 'thug') {
      this.setState({mssg: 'Enemy to the up'});
      this.setState({fightOn: true});
      return {
        enemyDir: 'up',
        enemyLevel: 1,
        enemyHp: enemy[1].hp,
        enemyAttack: enemy[1].attack,
      };
    }
    return 'clear';
  }

  emptyPresence(x, y) {
    let presenceCopy = presence.slice(0);
    presenceCopy[x][y] = 'empty';
    this.setState({presence: presenceCopy});
  }

  updatePositions(x, y) {
    let posit = this.state.presence[x][y];
    if (typeof this.detectEnemy(x, y) === 'object') {
      let {enemyDir, enemyLevel, enemyAttack, enemyHp} = this.detectEnemy(x, y);
      this.setState({enemyDir, enemyLevel, enemyAttack, enemyHp});
    } else {
      this.setState({fightOn: false});
    }
    let currHp = this.state.hp;
    if (posit === 'pot') {
      this.setState({hp: currHp += 65});
      this.setState({mssg: 'potion collected'});
      this.emptyPresence(x, y);
    } else if (posit[0] === 'w' && posit !== 'wall') {
      this.setState({weaponLevel: parseInt(posit[1])});
      this.setState({
        mssg: `picked a ${weapon[parseInt(posit[1])][0]}`,
      });
      this.emptyPresence(x, y);
    }
  }

  // handle a travel command and detect enemy
  handleTravel(e) {
    e.preventDefault();
    // let {positions, hpotions, weapons} = this.state;
    if (
      this.state.enemyDir === null &&
      !this.state.gameWon &&
      this.state.hp !== 0
    ) {
      let {posX, posY} = this.state;
      if (e.target.id === 'Yplus') {
        if (
          posY < 49 &&
          presence[posY + 1][posX] !== 'thug' &&
          presence[posY + 1][posX] !== 'boss' &&
          presence[posY + 1][posX] !== 'wall'
        ) {
          this.updatePositions(posY + 1, posX);
          this.setState({
            posY: posY + 1,
          });
        }
      } else if (e.target.id === 'Xplus') {
        if (
          posX < 29 &&
          presence[posY][posX + 1] !== 'thug' &&
          presence[posY][posX + 1] !== 'boss' &&
          presence[posY][posX + 1] !== 'wall'
        ) {
          this.updatePositions(posY, posX + 1);
          this.setState({
            posX: posX + 1,
          });
        }
      } else if (e.target.id === 'Yminus') {
        if (
          posY > 0 &&
          presence[posY - 1][posX] !== 'thug' &&
          presence[posY - 1][posX] !== 'boss' &&
          presence[posY - 1][posX] !== 'wall'
        ) {
          this.updatePositions(posY - 1, posX);
          this.setState({
            posY: posY - 1,
          });
        }
      } else {
        if (
          posX > 0 &&
          presence[posY][posX - 1] !== 'thug' &&
          presence[posY][posX - 1] !== 'boss' &&
          presence[posY][posX - 1] !== 'wall'
        ) {
          this.updatePositions(posY, posX - 1);
          this.setState({
            posX: posX - 1,
          });
        }
      }
    } else {
      this.handleCombat(e);
    }
  }

  // enemy found handle combat
  handleCombat(e) {
    let {
        hp,
        xp,
        enemyLevel,
        weaponLevel,
        enemyDir,
        enemyHp,
        enemyAttack,
        thugCount,
        posY,
        posX,
      } = this.state,
      //weaponName = weapon[weaponLevel][0],
      weaponAttack = weapon[weaponLevel][1];

    if (enemyDir === 'right' && e.target.id === 'Yplus') {
      enemyHp = enemyHp - weaponAttack >= 0 ? enemyHp - weaponAttack : 0;
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0;
      xp += 5 * enemyLevel;
      if (enemyHp === 0) {
        // if (presence[posY + 1][posX] === 3) {
        //   this.setState({mssg: 'Boss EXTERMINATED !!!'});
        //   this.setState({gameWon: true});
        // }
        this.emptyPresence(posY + 1, posX);
        this.setState({thugCount: thugCount - 1});
        this.setState({
          enemyDir: null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null,
        });
      } else {
        this.setState({enemyHp, hp, xp});
      }
    } else if (enemyDir === 'left' && e.target.id === 'Yminus') {
      enemyHp = enemyHp - weaponAttack >= 0 ? enemyHp - weaponAttack : 0;
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0;
      xp += 5 * enemyLevel;
      if (enemyHp === 0) {
        // if (positions[posY - 1][posX] === 3) {
        //   this.setState({mssg: 'Boss EXTERMINATED !!!'});
        //   this.setState({gameWon: true});
        // }
        this.emptyPresence(posY - 1, posX);
        this.setState({thugCount: thugCount - 1});
        this.setState({
          enemyDir: null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null,
        });
      }
      this.setState({enemyHp, hp, xp});
    } else if (enemyDir === 'up' && e.target.id === 'Xminus') {
      enemyHp = enemyHp - weaponAttack >= 0 ? enemyHp - weaponAttack : 0;
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0;
      xp += 5 * enemyLevel;
      if (enemyHp === 0) {
        // if (positions[posY][posX - 1] === 3) {
        //   this.setState({mssg: 'Boss EXTERMINATED !!!'});
        //   this.setState({gameWon: true});
        // }
        this.emptyPresence(posY, posX - 1);
        this.setState({thugCount: thugCount - 1});
        this.setState({
          enemyDir: null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null,
        });
      }
      this.setState({enemyHp, hp, xp});
    } else if (enemyDir === 'down' && e.target.id === 'Xplus') {
      enemyHp = enemyHp - weaponAttack >= 0 ? enemyHp - weaponAttack : 0;
      hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0;
      xp += 5 * enemyLevel;
      if (enemyHp === 0) {
        // if (positions[posY][posX + 1] === 3) {
        //   this.setState({mssg: 'Boss EXTERMINATED !!!'});
        //   this.setState({gameWon: true});
        // }
        this.emptyPresence(posY, posX + 1);
        this.setState({thugCount: thugCount - 1});
        this.setState({
          enemyDir: null,
          enemyHp: null,
          enemyAttack: null,
          enemyLevel: null,
        });
      }
      this.setState({enemyHp, hp, xp});
    }
  }

  render() {
    if (this.state.hp === 0) {
      //alert('Game Over');
      return <GameOver res="You Lost !!" />;
    } else if (this.state.enemyCount === 0) {
      return <GameOver res="YOU WON !!!!!" />;
    } else {
      let {posX, posY} = this.state;
      let units = [];
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) {
          units.push(
            <Units
              meX={i}
              meY={j}
              posX={posX}
              posY={posY}
              presence={this.state.presence[j][i]}
            />,
          );
        }
      }

      if (this.state.mssg) {
        setTimeout(() => this.setState({mssg: null}), 3000);
      }
      return (
        <div>
          <h1
            style={{
              color: 'gainsboro',
              textAlign: 'center',
              margin: '0',
              padding: '3px',
            }}>
            Dungeon Kings
          </h1>
          <Dashboard {...this.state} />
          <div className="container-wrapper">
            <div
              className="container"
              style={{
                position: 'relative',
                right: `${30 * (this.state.posY - 5)}px`,
                bottom: `${30 * (this.state.posX - 5)}px`,
              }}>
              {units}
            </div>
          </div>
          <div className="navigation">
            <button
              id="Yminus"
              className="dirButton fa fa-arrow-circle-left"
              onClick={this.handleTravel}
            />
            <button
              id="Xminus"
              className="dirButton fa fa-arrow-circle-up"
              onClick={this.handleTravel}
            />
            <button
              id="Xplus"
              className="dirButton fa fa-arrow-circle-down"
              onClick={this.handleTravel}
            />
            <button
              id="Yplus"
              className="dirButton fa fa-arrow-circle-right"
              onClick={this.handleTravel}
            />
          </div>
          <Dialog mssg={this.state.mssg} />
        </div>
      );
    }
    //let {hp, xp, weaponLevel, enemyHp, enemyLevel, enemyAttack} = this.state;
  }
}

const GameOver = ({res}) => (
  <div
    style={{
      height: '100vh',
      background: '#232323',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <div
      style={{
        width: '250px',
        border: '4px solid #211',
        padding: '20px',
        background: '#eff',
        textAlign: 'center',
      }}>
      <h3>Game Over</h3>
      <h1>{res}</h1>
      <button
        style={{
          background: 'dodgerblue',
          color: 'white',
          padding: '7px 10px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '2px',
        }}
        onClick={() => window.location.reload()}>
        Restart
      </button>
    </div>
  </div>
);

export default Game;
