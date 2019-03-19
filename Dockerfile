FROM node:10.15.1-alpine

# Update latest security patches
RUN apk update && apk upgrade

# RUN adduser webuser -
RUN adduser -D -g '' webuser

# SET default APP_DIR path
ARG APP_DIR=/src/app

# Create APP_DIR path and set permissions

RUN mkdir -p $APP_DIR
RUN chown -R webuser:webuser $APP_DIR

# Switch user to non-privileged user
USER webuser

# Change working directory to application directory
WORKDIR $APP_DIR

# Copy package.json to /app directory
COPY package.json .

# Install node modules/dependencies
RUN npm install

# Copy application code
COPY . .

# Expose this port on DOCKER NETWORK (NOT HOST MAPPING)
EXPOSE 8080

# Start the Express server
CMD ["node", "./deploy-prod.js"]
