const player = (id, side, x, y) => ({
  id,
  label: id.length <= 5 ? id : id.slice(0, 5),
  side,
  points: [[x, y], [x, Math.max(15, y - 20)]],
});

export function formation(kind) {
  const offense = [
    ...['LT', 'LG', 'C', 'RG', 'RT'].map((id, i) => player(id, 'offense', 190 + i * 30, 350)),
    player('QB', 'offense', 250, kind === 'under' ? 373 : 408),
    player('RB', 'offense', 305, 410),
    player('X', 'offense', 65, 350),
    player('Z', 'offense', 435, 350),
    player('H', 'offense', 125, 370),
    player('TE', 'offense', 340, 370),
  ];
  const defense = [
    ...[185, 225, 275, 315].map((x, i) => player(`D${i}`, 'defense', x, 325)),
    player('MLB', 'defense', 250, 280),
    player('LB1', 'defense', 165, 280),
    player('LB2', 'defense', 345, 280),
    player('CB1', 'defense', 65, 315),
    player('CB2', 'defense', 435, 315),
    player('S1', 'defense', 170, 170),
    player('S2', 'defense', 330, 170),
  ];
  return [...offense, ...defense];
}

export function createExampleContent() {
  const plays = Array.from({ length: 5 }, (_, i) => ({
    id: `example-play-${i + 1}`,
    title: `Practice read ${i + 1}`,
    situation: 'Example practice situation',
    description: 'A hypothetical practice variation based on the user question.',
    question: 'What is the best available response?',
    formation: 'shotgun',
    correct: 0,
    target: 'RB',
    highlights: ['QB', 'RB'],
    answers: [
      ['Pass to the available running back.', 'RB', 'Use the available outlet.'],
      ['Hold the ball.', 'hold', 'Waiting may give the defense time to close.'],
      ['Run toward the left.', 'runLeft', 'Take the open lane when appropriate.'],
      ['Run toward the right.', 'runRight', 'Use the available space when appropriate.'],
    ],
    players: formation('shotgun'),
  }));
  return {
    title: 'Football practice',
    plays,
    playHints: plays.map(() => 'Consider the situation and the available options.'),
  };
}
