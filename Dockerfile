FROM node:14 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18.0

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d

# Copy the Nginx configuration file from your host to the container
COPY ./react_nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the 'build' stage to the Nginx 'html' directory
COPY --from=build /app/build /usr/share/nginx/public

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]