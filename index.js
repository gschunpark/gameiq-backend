import 'dotenv/config';
import { createApp } from './app.js';
import { getAIProvider } from './providers.js';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '0.0.0.0';
const ai = getAIProvider();
if (ai.error) console.error(`ERROR: ${ai.error}`);
else console.log(`AI level generator: ${ai.name} (${ai.model})`);

createApp().listen(port, host, () => console.log(`GameIQ API listening on http://${host}:${port}`));
