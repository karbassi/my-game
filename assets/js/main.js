import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';

const config = {
  type: Phaser.AUTO,
  width: 1068,
  height: 660,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 1,
  },
};

new Phaser.Game(config);
