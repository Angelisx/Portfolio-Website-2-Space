# Use an official node image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build


# Expose the port the app runs on
EXPOSE 4173

# Run the application with --host to expose it
CMD ["npx", "vite", "preview", "--host"]