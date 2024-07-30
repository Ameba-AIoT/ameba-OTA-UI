# ameba-OTA-UI

This README provides instructions on how to set up and run the ameba-OTA-UI. Currently it works for Ubuntu 22.04, Arduino SDK.

## Environment Setup

1. Clone this repository

   ```sh
   git clone https://github.com/Ameba-AIoT/ameba-OTA-UI.git
   ```

2. Install curl (if you haven't) and nvm

   ```sh
   sudo apt install curl
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

3. Export nvm path

   ```sh
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

4. Install a specific Node.js version (e.g., v18.20.3) and a specific npm version (during time of development, node: 18.20.3, npm:10.8.1. This may work for other versions of node and npm) :

   ```sh
   nvm install v18.20.3 
   npm install npm@10.8.1 -g
   ```

5. Check the installed Node.js and npm versions:
   ```sh
   node -v
   npm -v
   ```

## Install Dependencies
  ```sh
   cd ameba-OTA-UI/
   npm i
   ```

## Running the Project
1. To create a production build and run the server:
   ```sh
   npm run build
   npm start
   ```

