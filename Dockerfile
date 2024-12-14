# Stage 1: Build the application
FROM node:20-slim AS build
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Stage 2: Create the final image
FROM node:20-alpine AS production
# Set working directory
WORKDIR /app
# Copy the build from the previous stage
COPY --from=build /app /app
# Expose the port the app will run on
EXPOSE 8080
# Command to run the application
CMD ["node", "index.js"]