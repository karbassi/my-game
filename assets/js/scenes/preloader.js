export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/frame.png');
    this.load.tilemapTiledJSON('mygame', 'assets/tiles/level-design.json');

    this.load.atlas(
      'character',
      'assets/img/character/character.png',
      'assets/img/character/character.json'
    );
  }

  create() {
    this.scene.start('game');
  }
}
