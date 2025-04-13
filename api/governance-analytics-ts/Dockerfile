# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies including development dependencies
RUN npm install -g pnpm ts-node-dev && pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY swagger.yaml ./

# Expose the port the app runs on
ENV PORT=3000
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "dist/index.js"] 