FROM  node:18.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN node ./scripts/makeDictinary.mjs
RUN node ./scripts/description_url.mjs
RUN npm run build 
EXPOSE 3000
CMD ["sh", "-c", "npm run start"]
