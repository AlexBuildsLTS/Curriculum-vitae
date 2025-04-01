# --- Build Stage ---
# Use an official Node.js runtime as a parent image (for the build stage).
# Choose a Node.js version that matches your project's requirements.  node:18-alpine is a good general choice.
#  You can use node:20-alpine if you specifically need Node.js 20, but 18 is LTS.
FROM node:18-alpine AS builder

# Set the working directory inside the container (for the build stage).
WORKDIR /app

# Copy the package.json and package-lock.json files into the container.
# Copying these *first* allows Docker to leverage caching more effectively.
# If these files haven't changed, the 'npm install' step can be reused from the cache.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of the application code into the container.
COPY . .

# Build the React app. This creates the optimized, production-ready build.
# Make sure 'build' is the correct script name in your package.json.
RUN npm run build

# --- Production Stage ---
# Use Nginx to serve the app (start a new stage for the final image).
FROM nginx:alpine

# Copy the built files from the *builder* stage into the Nginx html folder.
#  - --from=builder:  This specifies that we're copying from the 'builder' stage.
#  - /app/build: This is the path to the build output *inside* the builder stage.
#  - /usr/share/nginx/html:  This is the default web root for Nginx.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 (the default HTTP port).
EXPOSE 80

# Start Nginx.  The 'daemon off;' directive keeps Nginx running in the foreground,
# which is necessary for Docker containers.
CMD ["nginx", "-g", "daemon off;"]

# docker build -t [DOCKER HUB USERNAME]/meeting-calendar-front:latest .
# docker run -d --name meeting-calendar-front -p 3000:80 [DOCKER HUB USERNAME]/meeting-calendar-front:latest
