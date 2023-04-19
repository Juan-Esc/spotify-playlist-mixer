# spotify-together

Empowering Spotify's collaborative playlists feature

## Installing and configuring

Install dependencies with:

```bash
npm install
```

Define the following environment variables:

```
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI
```

You can create a `.env` file in the project root folder in order to define these variables. If you are deploying to a PaaS system you should learn how to define environment variables there.

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

