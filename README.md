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

## Running the Project in a Docker Container
[//]: # ( #TODO: Keep links and other references in this section updated. )

If you are already familiar with using Docker, use the [`Dockerfile`](./Dockerfile) provided to build the project and run it in a Docker container.

Otherwise, read our guide for running the project in a Docker container on your preferred operating system:

- [Linux](#docker-on-linux)
- [Windows](#docker-on-windows)
- [macOS](#docker-on-macos)


### Docker on Linux
<details><summary><h4>Installing Docker on Linux</h4></summary>

- instructions for installing Docker on Linux
- use DigitalOcean's guide for reference

</details>


- curl to download Dockerfile
- build the Docker container
- run the Docker container
- use the --no-cache flag to rebuild the container if it needs to be updated


### Docker on Windows
#### Using Docker Desktop

- install Docker Desktop
- download the Dockerfile to the user's preferred location
- build the Docker container
- run the Docker container from the Docker Desktop GUI
- when prompted, allow Docker Desktop access through the Windows Firewall
- use the --no-cache flag to rebuild the container if it needs to be updated

#### Advanced: Using Docker on WSL
<details><summary><h5>For Windows 11 Version 22H2 or later</h5></summary>

#TODO: Test and write guide

</details>

<details><summary><h5>For Windows 11 Versions prior to 22H2</h5></summary>

#TODO: Test and write guide

</details>

### Docker on macOS

- install Docker Desktop
- download the Dockerfile to the user's preferred location
- build the Docker container
- run the Docker container from the Docker Desktop GUI
- use the --no-cache flag to rebuild the container if it needs to be updated