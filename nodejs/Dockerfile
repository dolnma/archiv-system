FROM node:8-jessie
RUN mkdir /app
WORKDIR /app
COPY package.json /app
#RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
#RUN npm install nodemon
#RUN npm install node-gyp -g
RUN npm install
#RUN npm rebuild bcrypt --build-from-source
COPY . /app
CMD ["npm", "start"]