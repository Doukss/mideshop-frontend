# ---- Étape 1 : build de l'application React ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# VITE_API_URL doit être connu AU BUILD (rappel de notre discussion précédente)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Étape 2 : image finale, juste Nginx + les fichiers buildés ----
FROM nginx:alpine

# Configuration Nginx personnalisée (fichier ci-dessous)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# On copie uniquement le résultat du build (dossier dist/) depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]