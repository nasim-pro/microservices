# Using Node 22 as the stable LTS base
FROM node:24-alpine

# Update Alpine packages to ensure latest security patches
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy the package files and install everything
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Copy the .env file specifically so the app can read its PORT and MONGO_URI
COPY .env .env

# Build the TypeScript code
RUN npm run build

# Start the application using the npm script defined in package.json
CMD ["npm", "run", "start"]