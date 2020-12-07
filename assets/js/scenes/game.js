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

    this.add.image(800, 1615, 'background');

    const map = this.make.tilemap({ key: 'mygame' });
    const tileset = map.addTilesetImage('entire-set', 'tiles');

    this.mainLayer = map.createStaticLayer('main', tileset);
    this.mainLayer.setCollisionByProperty({ collides: true });
    this.interactionLayer = map.createStaticLayer('interaction-layer', tileset);
    this.interactionLayer.setCollisionByProperty({ pickup: true });

    // debugDraw(this.main, this);

    this.character = this.createCharacter();
    this.physics.add.collider(this.character, this.mainLayer);
    this.physics.add.collider(
      this.character,
      this.interactionLayer,
      this.pickupInteraction
    );

    this.cameras.main.startFollow(this.character, true);

    //this.character.setVelocity(0, 0);

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
    // character.setCollideWorldBounds(true);
    character.onWorldBounds = true;
    character.play('character-idle');

    return character;
  }

  update(time, deltatime) {
    if (!this.cursors || !this.character) {
      return;
    }

    // console.log(this.character.body.blocked.down);

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
    // if (this.cursors.up.isDown) {
    //   this.character.setVelocityY(-330);
    // }

    //   if (cursors.up.isDown && player.body.touching.down) { player.setVelocityY(-330);}
  }

  pickupInteraction(character, interaction) {
    // console.log(interaction);
    // interaction.destroy();
    // interaction.visible = false;
  }
}
