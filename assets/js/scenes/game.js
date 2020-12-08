import createCharacterAnims from '../anims/character-anims.js';
import { debugDraw } from '../utils/debug.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');

    this.CHARACTER_SPEED = 150;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    createCharacterAnims(this.anims);

    this.background = this.add.image(0, -70, 'background').setOrigin(0, 0);
    this.background.setScrollFactor(0);

    const map = this.make.tilemap({ key: 'mygame' });
    const tileset = map.addTilesetImage('entire-set', 'tiles');

    this.mainLayer = map.createStaticLayer('main', tileset);
    this.mainLayer.setCollisionByProperty({ collides: true });

    // debugDraw(this.main, this);

    this.character = this.createCharacter();
    this.physics.add.collider(this.character, this.mainLayer);

    this.cameras.main.startFollow(this.character, true);

    this.pickup = this.physics.add.image(855, 1100, 'pickup');

    this.physics.add.collider(this.pickup, this.mainLayer);

    this.time.addEvent({
      delay: 10,
      callback: () => {
        this.pickup.angle -= 1;
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.character,
      this.pickup,
      this.pickupInteraction,
      null,
      this
    );

    this.pickup2 = this.physics.add.image(2015, 800, 'pickup2');

    this.physics.add.collider(this.pickup2, this.mainLayer);

    this.time.addEvent({
      delay: 10,
      callback: () => {
        this.pickup2.angle -= 1;
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.character,
      this.pickup2,
      this.pickupInteraction,
      null,
      this
    );

    this.music = this.sound.add('bgm');
    this.music.play({
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
  }

  createCharacter() {
    const character = this.physics.add.sprite(600, 1100, 'character');
    character.setActive(true);
    character.onWorldBounds = true;
    character.play('character-idle');

    return character;
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

    if (this.cursors.up.isDown && this.character.body.blocked.down) {
      this.character.play('character-run-right', true);
      this.character.setVelocityY(-this.CHARACTER_SPEED * 2);
    }
  }

  pickupInteraction(character, interaction) {
    console.log(interaction);
    interaction.destroy();
  }
}
