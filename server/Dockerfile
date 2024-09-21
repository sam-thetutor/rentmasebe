FROM ghcr.io/railwayapp/nixpacks:ubuntu

WORKDIR /app/

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Command to start your application
CMD ["npm", "start"]
