FROM node:24-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# build typescript
RUN npm run build

EXPOSE 2025

CMD ["node", "dist/server.js"]