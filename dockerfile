# 1. Use a Node.js image as the base for the build stage
FROM node:18 AS build

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# 4. Update npm to the latest version
RUN npm install -g npm@latest

# 5. Install dependencies with legacy peer dependencies
RUN npm install --legacy-peer-deps

# 6. Copy the rest of the application files
COPY . .

# 7. Build the app using Vite
RUN npm run build

# 8. Use an NGINX image for serving the production build
FROM nginx:alpine

# 9. Copy the build output from the previous stage to the NGINX html folder
COPY --from=build /app/dist /usr/share/nginx/html

# 10. Expose the port NGINX will serve on
EXPOSE 80

# 11. Start NGINX
CMD ["nginx", "-g", "daemon off;"]
