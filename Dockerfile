# Dockerfile
# Start with a base image which includes Node.js (select an appropriate version)
FROM node:16

# Set a working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

#Run the app
CMD ["npm", "run", "dev"]
