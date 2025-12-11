FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto
COPY . .

# Recibir la variable desde Render
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Instalar dependencias del package.json principal
RUN npm install

# Instalar dependencias del proyecto tanto backend como frontend
RUN npm run install

# Construir el frontend usando el comando  del package.json principal
RUN npm run build

# Exponer el puerto del backend
EXPOSE 3000

# Establecer las variables de entorno en tiempo de ejecución
ENV NODE_ENV=production

# Comando para iniciar el proyecto completo
CMD ["npm", "start"]