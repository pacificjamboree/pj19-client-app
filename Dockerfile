FROM node:8.11.2-alpine
RUN apk --no-cache add --virtual procps
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY . .
ENV PATH=$PATH:/node_modules/.bin
ENV VIRTUAL_HOST=pjapp.docker
ENV CHOKIDAR_USEPOLLING=true
RUN yarn
COPY . .
EXPOSE 3000
EXPOSE 35729
CMD ["yarn", "start"]
