export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/frame.png');
    this.load.tilemapTiledJSON('mygame', 'assets/tiles/level-design.json');
  }

  create() {
    this.scene.start('game');
  }
}
