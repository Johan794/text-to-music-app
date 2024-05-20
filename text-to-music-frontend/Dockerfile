FROM node:hydrogen
LABEL authors="github.com/alexandersanchezjr"
LABEL description="This is a frontend container"
LABEL version="1.0"

WORKDIR /usr/src/app

# Copy project
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Serve ssr
CMD ["npm", "run", "serve:ssr:text-to-music-frontend"]
