import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Dialog from './components/Dialog';
import Units from './components/Units';
import Navigation from './components/Navigation';
import GameOver from './components/GameOver';
import {enemy, weapon, thugCount, presence} from './utils/data';
import Fight1 from './sounds/punch-attack.mp3';
import Fight2 from './sounds/fight-begin.mp3';
import Fight3 from './sounds/fire-attack.mp3';
import Dying from './sounds/dying.mp3';
import Footsteps from './sounds/footsteps.mp3';
import Picked from './sounds/picked.mp3';
//import {useAlert} from 'react-alert';

/* TODO
 * make this a functional component
 * use Hooks for state, effect, memo, reducer.
  const Game = () => {
      // meMonitor = posX, posY, hP, xP, weaponL
      // enemyMonitor = enemyDir, enemyHp, enemyAttack, enemyL 
      // presence
      // gameStatus = gameWon, fightOn, mssg
    const [mapPresence, setMapPresence] = useState(presence)
    const [posState, setPosState] = useState(posInitState)
    const [enemyState, setEnemyState] = useState(enemyInitState)
    const [gameState, setGameState] = useState(gameInitState)
  * */

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
      soundPlaying: false,
    };
    this.handleTravel = this.handleTravel.bind(this);
    this.checkFor = this.checkFor.bind(this);
    this.handleCombat = this.handleCombat.bind(this);
    this.emptyPresence = this.emptyPresence.bind(this);
    this.attact = this.attack.bind(this);
    this.updatePositions = this.updatePositions.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    function bindClick(id) {
      document.querySelector(`#${id}`) &&
        document.querySelector(`#${id}`).click();
    }
    document.addEventListener('keydown', e =>
      e.keyCode === 39
        ? bindClick('Yplus')
        : e.keyCode === 40
        ? bindClick('Xplus')
        : e.keyCode === 37
        ? bindClick('Yminus')
        : e.keyCode === 38
        ? bindClick('Xminus')
        : null,
    );
    let posX, posY;
    presence.forEach((_row, i) =>
      _row.forEach((_col, j) =>
        Math.random() < 0.02 && !(posX && posY) && presence[i][j] === 'empty'
          ? ((posX = j), (posY = i))
          : null,
      ),
    );
    this.setState({posX, posY, thugCount});
    console.log(this.state.presence);
  }

  playSound(file) {
    let audio = new Audio(file);
    audio.play();
  }

  checkFor(nxtY, nxtX, entity) {
    let {presence} = this.state;
    function giveL(x, y) {
      return parseInt(presence[x][y][presence[x][y].length - 1]);
    }
    return presence[nxtY + 1][nxtX].indexOf(entity) >= 0
      ? {dir: 'right', level: giveL(nxtY + 1, nxtX)}
      : presence[nxtY][nxtX + 1].indexOf(entity) >= 0
      ? {dir: 'down', level: giveL(nxtY, nxtX + 1)}
      : presence[nxtY - 1][nxtX].indexOf(entity) >= 0
      ? {dir: 'left', level: giveL(nxtY - 1, nxtX)}
      : presence[nxtY][nxtX - 1].indexOf(entity) >= 0
      ? {dir: 'up', level: giveL(nxtY, nxtX - 1)}
      : 'clear';
  }

  emptyPresence(x, y) {
    let presenceCopy = presence.slice(0);
    presenceCopy[x][y] = 'empty';
    this.setState({presence: presenceCopy});
  }

  updatePositions(x, y) {
    let posit = this.state.presence[x][y];
    if (typeof this.checkFor(x, y, 'thug') === 'object') {
      let {dir, level} = this.checkFor(x, y, 'thug');
      let conditions = {
        enemyDir: dir,
        enemyLevel: level,
        enemyHp: enemy[level].hp,
        enemyAttack: enemy[level].attack,
      };
      this.setState({mssg: `LOOK OUT! Enemy ${dir}`});
      console.log(level);
      this.setState({fightOn: true});
      this.setState({...conditions});
    } else {
      this.setState({fightOn: false});
    }
    let currHp = this.state.hp;
    if (posit === 'pot') {
      this.setState({hp: currHp += 65});
      this.setState({mssg: 'potion collected'});
      this.playSound(Picked);
      this.emptyPresence(x, y);
    } else if (posit[0] === 'w' && posit !== 'wall') {
      this.setState({weaponLevel: parseInt(posit[1])});
      this.playSound(Picked);
      this.setState({
        mssg: `picked a ${weapon[parseInt(posit[1])][0]}`,
      });
      this.emptyPresence(x, y);
    }
  }

  // handle a travel command and detect enemy
  handleTravel(e) {
    e.preventDefault();
    function look(y, x) {
      return presence[y][x] !== 'thug' &&
        presence[y][x] !== 'boss' &&
        presence[y][x] !== 'wall'
        ? true
        : false;
    }
    // let {positions, hpotions, weapons} = this.state;
    if (
      this.state.enemyDir === null &&
      !this.state.gameWon &&
      this.state.hp !== 0
    ) {
      let {posX, posY} = this.state;
      if (e.target.id === 'Yplus' && posY < 49 && look(posY + 1, posX)) {
        this.playSound(Footsteps);
        this.updatePositions(posY + 1, posX);
        this.setState({
          posY: posY + 1,
        });
      } else if (e.target.id === 'Xplus' && posX < 29 && look(posY, posX + 1)) {
        this.playSound(Footsteps);
        this.updatePositions(posY + 1, posX);
        this.updatePositions(posY, posX + 1);
        this.setState({
          posX: posX + 1,
        });
      } else if (e.target.id === 'Yminus' && posY > 0 && look(posY - 1, posX)) {
        this.playSound(Footsteps);
        this.updatePositions(posY + 1, posX);
        this.updatePositions(posY - 1, posX);
        this.setState({
          posY: posY - 1,
        });
      } else if (e.target.id === 'Xminus' && posX > 0 && look(posY, posX - 1)) {
        this.playSound(Footsteps);
        this.updatePositions(posY + 1, posX);
        this.updatePositions(posY, posX - 1);
        this.setState({
          posX: posX - 1,
        });
      }
    } else {
      this.handleCombat(e);
    }
  }

  attack(x, y) {
    let wL = this.state.weaponLevel;
    this.playSound(wL === 3 ? Fight3 : wL === 2 || 1 ? Fight2 : Fight1);
    let {
        hp,
        xp,
        enemyLevel,
        weaponLevel,
        enemyHp,
        enemyAttack,
        thugCount,
      } = this.state,
      weaponAttack = weapon[weaponLevel][1];
    hp = hp - enemyAttack >= 0 ? hp - enemyAttack : 0;
    enemyHp =
      enemyHp - weaponAttack - xp >= 0 ? enemyHp - weaponAttack - xp : 0;
    xp = xp + 5 * enemyLevel;
    if (enemyHp === 0) {
      this.emptyPresence(x, y);
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
  }
  // enemy found handle combat
  handleCombat(e) {
    let {enemyDir, posY, posX} = this.state;
    if (enemyDir === 'right' && e.target.id === 'Yplus') {
      this.attack(posY + 1, posX);
    } else if (enemyDir === 'left' && e.target.id === 'Yminus') {
      this.attack(posY - 1, posX);
    } else if (enemyDir === 'up' && e.target.id === 'Xminus') {
      this.attack(posY, posX - 1);
    } else if (enemyDir === 'down' && e.target.id === 'Xplus') {
      this.attack(posY, posX + 1);
    }
  }

  render() {
    if (this.state.hp === 0) {
      //alert('Game Over');
      this.playSound(Dying);
      return <GameOver res="You Lost !!" />;
    } else if (this.state.thugCount === 0) {
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
        setTimeout(() => this.setState({mssg: null}), 1500);
      }
      return (
        <div>
          <h1
            style={{
              color: 'gainsboro',
              textAlign: 'center',
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
          <Navigation handleTravel={this.handleTravel} />
          <Dialog mssg={this.state.mssg} />
        </div>
      );
    }
  }
}

export default Game;
