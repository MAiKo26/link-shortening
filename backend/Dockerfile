FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Use regular install instead of ci
RUN npm install

# Then copy the rest of the application
COPY . .


EXPOSE 3000

# Use the production build
CMD ["npm", "run","dev"]
