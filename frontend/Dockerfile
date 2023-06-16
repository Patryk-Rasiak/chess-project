# Use a base image with Node.js
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the app's source code to the working directory
COPY . .

# Build the app for production
RUN yarn build

# Expose the desired port
EXPOSE 5173