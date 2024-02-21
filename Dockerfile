# Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y build-essential python3

# Install Yarn v3
# Note: Yarn recommends using corepack to enable Yarn
RUN corepack enable && corepack prepare yarn@3.3.0 --activate

# Verify the installation
RUN yarn --version

# Install MySQL client from the default Debian repositories
RUN apt-get update && \
  apt-get install -y default-mysql-client && \
  rm -rf /var/lib/apt/lists/*

# Display the version of the installed MySQL client
RUN mysql --version

# Install app dependencies
COPY . .

# COPY yarn.lock /app
# Rebuild sqlite3 from source to ensure compatibility
RUN npm_config_build_from_source=true yarn add sqlite3
RUN yarn install

EXPOSE 8080
CMD [ "yarn", "start" ]