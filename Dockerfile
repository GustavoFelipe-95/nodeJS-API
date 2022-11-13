FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE ${SERVER_PORT}
CMD ["npm", "start"]