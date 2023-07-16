# set the base image to node version 18
FROM node:18

# set directory in destination we will be working from
WORKDIR /usr/src/app

# copy our package.json and package-lock.json files to destination
COPY package*.json ./

# install npm packages to destination
RUN npm install

# copy all files from source to destination
COPY . .

# set PORT environment variable to 8080
ENV PORT=8080

# tell this container to listen on port 8080
EXPOSE 8080

# execute command "node server.js"
CMD ["node", "server.js"]