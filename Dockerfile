FROM node:20
WORKDIR /home/app

COPY Helter-API/. .

RUN mkdir music && npm install

EXPOSE 5000

ENTRYPOINT ["npm", "start"];