# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

ENV HOST=0.0.0.0

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Build the React application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]