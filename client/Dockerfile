FROM node:latest as node
WORKDIR /app

# install dependencies
COPY ./package*.json ./
RUN npm --prefix ./ install
RUN npm install -g @angular/cli@14.1.1

# copy everything else to be used (do not need to run npm build)
COPY ./ ./

EXPOSE 4200

CMD ng serve --host 0.0.0.0