# Development Dockerfile
# As base guide https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Use node version 17 image
FROM node:17

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Copy this folder contents to container
COPY . .

# Expose port 3000
EXPOSE 3000
CMD [ "node", "app.js" ]