FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
#PENDIENTE: Eliminar el directorio data
COPY --from=build /app/data ./data
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

RUN npm install --production

EXPOSE 5000

CMD ["npm", "run", "start:prod"]