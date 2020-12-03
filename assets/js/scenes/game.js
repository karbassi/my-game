import createCharacterAnims from '../anims/character-anims.js';
import { debugDraw } from '../utils/debug.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');

    this.CHARACTER_SPEED = 100;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    createCharacterAnims(this.anims);

    const map = this.make.tilemap({ key: 'mygame' });
    const tileset = map.addTilesetImage('entire-set', 'tiles');

    this.main = map.createStaticLayer('main', tileset);

    this.main.setCollisionByProperty({ collides: true });

    debugDraw(this.main, this);

    this.character = this.physics.add.sprite(600, 1100, 'character');
    this.character.play('character-idle');

    this.physics.add.collider(this.character, this.main);

    this.cameras.main.startFollow(this.character, true);

    this.character.setVelocity(0, 0);
  }

  update(time, deltatime) {
    if (!this.cursors || !this.character) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.character.play('character-run-left', true);
      this.character.setVelocityX(-this.CHARACTER_SPEED);
    } else if (this.cursors.right.isDown) {
      this.character.play('character-run-right', true);
      this.character.setVelocityX(this.CHARACTER_SPEED);
    } else {
      this.character.play('character-idle', true);
      this.character.setVelocityX(0);
    }
  }
}
