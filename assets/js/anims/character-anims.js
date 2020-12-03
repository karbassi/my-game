export default function createCharacterAnims(anims) {
  anims.create({
    key: 'character-idle',
    frames: [{ key: 'character', frame: 'turn' }],
  });

  anims.create({
    key: 'character-run-left',
    frames: anims.generateFrameNames('character', {
      prefix: 'run-left-',
      suffix: '',
      start: 1,
      end: 4,
    }),
    frameRate: 3,
    repeat: -1,
  });

  anims.create({
    key: 'character-run-right',
    frames: anims.generateFrameNames('character', {
      prefix: 'run-right-',
      suffix: '',
      start: 1,
      end: 4,
    }),
    frameRate: 3,
    repeat: -1,
  });
}
