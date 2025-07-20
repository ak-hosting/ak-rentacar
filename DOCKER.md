# Bursa Oto Kiralama - Docker Kullanım Kılavuzu

Bu kılavuz, Bursa Oto Kiralama web şablonunu Docker ile çalıştırmanız için hazırlanmıştır.

## 🐳 Hızlı Başlangıç

### Basit Çalıştırma

```bash
# Projeyi klonlayın
git clone https://github.com/ak-hosting/ak-rentacar.git
cd ak-rentacar

# Docker image oluşturun
docker build -t bursa-rentacar .

# Container başlatın
docker run -p 8080:80 bursa-rentacar

# Tarayıcıda açın
# http://localhost:8080
```

### Docker Compose ile Çalıştırma

```bash
# Tüm servisleri başlatın
docker-compose up -d

# Sadece web servisini başlatın
docker-compose up web

# Arka planda çalıştırın
docker-compose up -d web
```

## 🔧 Farklı Ortamlar

### Development Ortamı

```bash
# Development profile ile başlatın
docker-compose --profile dev up -d

# Hot reload ile geliştirme
docker-compose --profile dev up web-dev
```

### Production Ortamı

```bash
# Production profile ile başlatın
docker-compose --profile production up -d

# SSL sertifikaları ile
docker-compose --profile production up -d nginx-proxy
```

### Veritabanı ile

```bash
# Veritabanı servisleri ile başlatın
docker-compose --profile database up -d

# phpMyAdmin erişimi
# http://localhost:8081
```

### Cache ile

```bash
# Redis cache ile başlatın
docker-compose --profile cache up -d
```

### Monitoring ile

```bash
# Monitoring servisleri ile başlatın
docker-compose --profile monitoring up -d

# Prometheus erişimi
# http://localhost:9090
```

## 📊 Servis Portları

| Servis | Port | Açıklama |
|--------|------|----------|
| web | 8080 | Ana web uygulaması |
| web-dev | 3000 | Development server |
| nginx-proxy | 80, 443 | Reverse proxy |
| redis | 6379 | Cache servisi |
| postgres | 5432 | Veritabanı |
| phpmyadmin | 8081 | Veritabanı yönetimi |
| monitoring | 9090 | Prometheus monitoring |

## 🛠️ Docker Komutları

### Container Yönetimi

```bash
# Container durumunu kontrol edin
docker-compose ps

# Logları görüntüleyin
docker-compose logs web

# Container'a bağlanın
docker-compose exec web sh

# Container'ı yeniden başlatın
docker-compose restart web

# Container'ı durdurun
docker-compose stop web
```

### Image Yönetimi

```bash
# Image'ı yeniden oluşturun
docker-compose build --no-cache

# Image'ı silin
docker rmi bursa-rentacar

# Tüm container'ları silin
docker-compose down

# Volume'ları da silin
docker-compose down -v
```

### Volume Yönetimi

```bash
# Volume'ları listele
docker volume ls

# Volume'u sil
docker volume rm ak_rentacar_redis-data

# Volume'u yedekle
docker run --rm -v ak_rentacar_postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .
```

## 🔒 SSL Sertifikası

### Self-signed Certificate

```bash
# SSL dizini oluşturun
mkdir ssl

# Self-signed certificate oluşturun
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -subj "/C=TR/ST=Bursa/L=Bursa/O=Bursa Rentacar/CN=localhost"

# Production'da başlatın
docker-compose --profile production up -d
```

### Let's Encrypt (Production)

```bash
# Certbot ile SSL sertifikası alın
docker run --rm -it \
  -v $(pwd)/ssl:/etc/letsencrypt \
  -v $(pwd)/ssl:/var/lib/letsencrypt \
  certbot/certbot certonly \
  --standalone \
  -d yourdomain.com

# Sertifikaları kopyalayın
cp ssl/live/yourdomain.com/fullchain.pem ssl/cert.pem
cp ssl/live/yourdomain.com/privkey.pem ssl/key.pem
```

## 📈 Monitoring

### Prometheus Konfigürasyonu

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'bursa-rentacar'
    static_configs:
      - targets: ['web:80']
    metrics_path: /health
```

### Grafana Dashboard

```bash
# Grafana container'ı ekleyin
docker run -d \
  --name grafana \
  -p 3001:3000 \
  grafana/grafana

# Grafana erişimi
# http://localhost:3001
# Default: admin/admin
```

## 🔧 Environment Variables

```bash
# .env dosyası oluşturun
cp env.example .env

# Değişkenleri düzenleyin
DB_PASSWORD=your_secure_password
NODE_ENV=production
```

## 🚀 Production Deployment

### Docker Swarm

```bash
# Swarm'ı başlatın
docker swarm init

# Stack deploy edin
docker stack deploy -c docker-compose.yml bursa-rentacar

# Stack'i kontrol edin
docker stack services bursa-rentacar
```

### Kubernetes

```bash
# Kubernetes manifest'leri oluşturun
kubectl apply -f k8s/

# Pod'ları kontrol edin
kubectl get pods

# Service'leri kontrol edin
kubectl get services
```

## 🐛 Troubleshooting

### Container Başlamıyor

```bash
# Logları kontrol edin
docker-compose logs web

# Container durumunu kontrol edin
docker-compose ps

# Image'ı yeniden oluşturun
docker-compose build --no-cache web
```

### Port Çakışması

```bash
# Kullanılan portları kontrol edin
netstat -tulpn | grep :8080

# Farklı port kullanın
docker-compose up -d -p 8081:80
```

### Volume Sorunları

```bash
# Volume'ları kontrol edin
docker volume ls

# Volume'u temizleyin
docker-compose down -v
docker-compose up -d
```

## 📝 Örnek Kullanım Senaryoları

### Geliştirme Ortamı

```bash
# Development ortamını başlatın
docker-compose --profile dev up -d

# Kod değişikliklerini izleyin
docker-compose logs -f web-dev

# Hot reload aktif
# http://localhost:3000
```

### Production Ortamı

```bash
# Production ortamını başlatın
docker-compose --profile production up -d

# SSL sertifikaları ile
# https://localhost

# Monitoring ile
docker-compose --profile monitoring up -d
```

### Tam Stack

```bash
# Tüm servisleri başlatın
docker-compose --profile database --profile cache --profile monitoring up -d

# Servisleri kontrol edin
docker-compose ps

# Logları izleyin
docker-compose logs -f
```

## 🔗 Faydalı Bağlantılar

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)

---

**Not**: Bu kılavuz sürekli güncellenmektedir. En güncel versiyon için GitHub repository'sini kontrol edin. 