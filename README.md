# GameIQ backend

This folder is the standalone Node.js API used by the GameIQ frontend. It currently provides `POST /api/generate-level`; account, profile, and team features remain frontend preview state and are not backend APIs.

## Run independently

1. Move or copy this entire folder to its own location.
2. Use Node.js 22 or newer and run `npm install` in this folder.
3. Create a `.env` file with `OPENAI_API_KEY`. Set `ROBOFLOW_API_KEY` too when generating from an image. `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`.
4. Run `npm start` (or `npm run dev`). The API listens on `0.0.0.0:3001` by default; set `PORT` and `HOST` to change the bind address.

The frontend must proxy `/api` requests to this service or host both on the same origin. The included per-process IP rate limit is a basic guard, not a production quota. Provider keys must stay on the server and must not use `VITE_` prefixes.

`npm run test:smoke -- path/to/frame.jpg "Describe the scenario"` makes live provider calls and prints only detection and scenario counts.

## API

`POST /api/generate-level` accepts a JSON body with a required `question` (1–2000 characters) and an optional `image` containing raw base64 JPEG/PNG data plus its matching `mimeType`. Decoded images are limited to 5 MiB. It returns `{ level, predictions }` or `{ error: { code, message } }`. Images and provider secrets are not logged or persisted.
