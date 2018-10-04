FROM node:10.10.0-alpine
RUN apk add procps shadow
RUN groupadd -r nodejs && useradd -m -r -g nodejs -s /bin/sh nodejs && mkdir -p /usr/src/app && chown nodejs:nodejs /usr/src/app
USER nodejs
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
