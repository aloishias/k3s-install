FROM node:10
WORKDIR /home/projets/docker-api
RUN cd /home/projets/docker-api
COPY package.json .
ADD . .
RUN npm install
CMD ["npm", "start"]