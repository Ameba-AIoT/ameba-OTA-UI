FROM node:18.20.3-slim

RUN apt update && apt install git -y
RUN npm install npm@10.8.1 -g
RUN git clone https://github.com/Ameba-AIoT/ameba-OTA-UI.git /ameba-OTA-UI/

WORKDIR /ameba-OTA-UI/

RUN npm i
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]