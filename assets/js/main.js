import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    defaults: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 2,
  },
};

new Phaser.Game(config);
