import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { generateLevels } from './providers.js';
import { validateRequest } from './app.js';
import { generatedContentSchema } from './level-schema.js';

const file = process.argv[2];
if (!file) throw Error('Usage: npm run test:smoke -- path/to/frame.jpg [question]');
const input = validateRequest({ image: (await readFile(file)).toString('base64'), mimeType: /\.png$/i.test(file) ? 'image/png' : 'image/jpeg', question: process.argv[3] || 'The quarterback is facing pressure. Help me recognize the quick passing option.' });
const { levels, predictions } = await generateLevels(input);
assert.ok(predictions.length > 0);
for (const level of levels) generatedContentSchema.parse({ title: level.title, plays: level.plays, playHints: level.playHints });
console.log(`PASS: ${predictions.length} detections; ${levels.length} levels with ${levels.map(l => l.plays.length).join('/')} validated animated scenarios.`);
