# Menggunakan Node.js versi 16 sebagai base image
FROM node:16

# Menetapkan direktori kerja di dalam kontainer
WORKDIR /app

# Menyalin file package.json dan package-lock.json untuk instalasi dependencies
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam kontainer
COPY . .

# Menetapkan variabel lingkungan di Docker
ENV APP_ENV=production
ENV MODEL_URL="https://storage.googleapis.com/asclepius-adinda/model.json"
ENV PROJECT_ID="submissionmlgc-adindalutfiatul"

# Mengekspos port yang digunakan aplikasi
EXPOSE 8080

# Menjalankan aplikasi
CMD [ "npm", "start" ]
