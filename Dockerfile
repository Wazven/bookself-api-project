# 1. Install node.js
FROM node:16-alpine3.16

# 2. Prepare the project folder
WORKDIR /Bookselfi-Api-Project

# 3. Initialize project using npm init. this will create package.json
COPY package*.json ./

# 4. Install Library based on package.json
RUN npm install

# 5. Copy file in Src
COPY ./src .


ENV PORT=9000
EXPOSE 9000

# 6. Run Application
CMD ["node", "server.js"]

