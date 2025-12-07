# Get node to build
FROM node:24-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Build vue
RUN [ "npm", "run", "build" ]

# Get nginx to serve
FROM nginxinc/nginx-unprivileged:stable-alpine-slim

# Set up nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy dist to default location for nginxinc/nginx-unprivileged
COPY --from=builder /app/build /usr/share/nginx/html

# Open port
EXPOSE 8080

#Start
CMD ["nginx", "-g", "daemon off;"]