# --- Stage 1: Build Stage ---
# Use a Node.js base image to build the TypeScript application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# --- Stage 2: Production Stage ---
# Use a smaller, more secure Node.js image for the final production environment
FROM node:18-alpine

# Add repository metadata label
LABEL org.opencontainers.image.source="https://github.com/symon9/future_fs_02"

WORKDIR /app

# Copy dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy the compiled JavaScript code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the server will run on
EXPOSE 5000

# The command to run the application
CMD ["node", "dist/server.js"]
