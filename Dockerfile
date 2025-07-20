# Bursa Oto Kiralama - Dockerfile
# Multi-stage build ile optimize edilmiş production image

# Build stage
FROM node:18-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Package.json dosyasını kopyala (eğer varsa)
COPY package*.json ./

# Bağımlılıkları yükle (eğer varsa)
RUN npm ci --only=production || echo "No package.json found"

# Kaynak kodları kopyala
COPY . .

# Production stage
FROM nginx:alpine

# Nginx konfigürasyonu
COPY nginx.conf /etc/nginx/nginx.conf

# Uygulama dosyalarını kopyala
COPY --from=builder /app /usr/share/nginx/html

# Gerekli dizinleri oluştur
RUN mkdir -p /usr/share/nginx/html/assets/images/vehicles \
    && mkdir -p /usr/share/nginx/html/assets/images/locations \
    && mkdir -p /usr/share/nginx/html/assets/css \
    && mkdir -p /usr/share/nginx/html/assets/js

# Dosya izinlerini ayarla
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Port aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 