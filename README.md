# TibiaHunts Social Network #
## Developer ##
In order to set up the repo and be able to develop, do the following:
1. Install `nvm` (Node Version Manager). If you're using Windows, go [here](github.com/coreybutler/nvm-windows)
2. `cd` inside both `./back-end` and `./front-end` and perform an `npm install`
3. Change `./back-end/.env` file according to your settings.

_**Important:** NEVER push .env or automatically generated files (e.g. React's builds) to the repo._

4. From inside `/back-end`, run `npm run dev`.
5. From inside `/front-end`, run `npm run start`.
6. Your application should be running.
    - You can see the UI in http://localhost:3000
    - You can call the API through http://localhost:5000