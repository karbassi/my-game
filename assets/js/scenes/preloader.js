export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('background', 'assets/img/background.png');
    this.load.image('pickup', 'assets/img/pickup.png');
    this.load.image('tiles', 'assets/tiles/frame.png');
    this.load.tilemapTiledJSON('mygame', 'assets/tiles/level-design.json');

    this.load.atlas(
      'character',
      'assets/img/character/character.png',
      'assets/img/character/character.json'
    );

    this.load.audio('bgm', [
      './assets/audio/bgm.ogg',
      './assets/audio/bgm.mp3',
    ]);
  }

  create() {
    this.scene.start('game');
  }
}
