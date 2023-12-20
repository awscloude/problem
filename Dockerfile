FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5173

#CMD [ "node", "server.js" ]
CMD ["npm", "run", "dev", "--", "--host=0.0.0.0"]

#CMD [ sh -c "npm run dev -- --host"]
