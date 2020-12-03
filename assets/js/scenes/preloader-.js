import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
this.preload().image('tiles', 'assets/tiles/frame.png')
this.preload().tilemapTiledJSON('mygame', 'assets/tiles/level-design.json')
  }

  create()
  {
this.scene.start('game')
  }
}
