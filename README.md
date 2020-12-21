# TibiaHunts Social Network #
## Developer ##
In order to set up the repo and be able to develop, do the following:
1. Install `nvm` (Node Version Manager). If you're using Windows, go [here](github.com/coreybutler/nvm-windows)
2. Run `nvm install 14.15.1`
3. Run `nvm use 14.15.1` (You are now using node v14.15.1)
4. `cd` inside both `./back-end` and `./front-end` and perform an `npm install`
5. Change `./back-end/.env` file according to your settings.

_**Important:** NEVER push .env or automatically generated files (e.g. React's builds) to the repo._

6. From inside `/back-end`, run `npm run dev`.
7. From inside `/front-end`, run `npm run start`.
8. Your application should be running.
    - You can see the UI in http://localhost:3000
    - You can call the API through http://localhost:5000