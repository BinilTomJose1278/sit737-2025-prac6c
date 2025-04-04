
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p logs


EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
