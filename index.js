import 'dotenv/config';
import { createApp } from './app.js';
import { getOpenAIKeyError } from './providers.js';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '0.0.0.0';
const openAIKeyError = getOpenAIKeyError(process.env.OPENAI_API_KEY);
if (openAIKeyError) console.error(`ERROR: ${openAIKeyError}`);

createApp().listen(port, host, () => console.log(`GameIQ API listening on http://${host}:${port}`));
