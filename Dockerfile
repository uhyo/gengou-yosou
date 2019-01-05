FROM node:8
MAINTAINER uhyo
WORKDIR /service-gengou-yosou
COPY package.json package-lock.json ./
RUN npm install --production
COPY . ./
RUN chmod a+w .
USER node
EXPOSE 3000
RUN npm run build
ENV HOST 0.0.0.0
CMD ["npm", "start"]

