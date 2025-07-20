# AK Rentacar - Bursa Oto Kiralama Şablonu

![Bursa Oto Kiralama](https://img.shields.io/badge/Bursa-Oto%20Kiralama-blue)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3)
![Responsive](https://img.shields.io/badge/Responsive-100%25-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

Bursa'daki oto kiralama firmaları için ücretsiz, modern ve mobil uyumlu web şablonu. Bootstrap 5 ile geliştirildi.

**[Demo Site](https://ak-hosting.github.io/ak-rentacar/)** | **[Özelleştirme Talebi](mailto:ak@ak-pro.com)**

## 🚗 Temel Özellikler

- **Filtrelemeli Araç Kataloğu**: Ekonomi, SUV, Lüks kategorileri
- **Online Rezervasyon Sistemi**: Tarih seçici entegreli
- **Bursa Lokasyonları**: Havalimanı, Osmangazi, Nilüfer şubeleri
- **SEO Optimize**: "Bursa oto kiralama" anahtar kelimeleri
- **Hızlı Yükleme**: WebP görseller ve optimize kod
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern UI/UX**: Bootstrap 5 ile profesyonel tasarım

## 🔧 Kurulum

### GitHub Pages (Önerilen)

Proje otomatik olarak GitHub Pages'te yayınlanmaktadır:
**🌐 https://ak-hosting.github.io/ak-rentacar/**

### Gereksinimler
- Modern web tarayıcısı
- HTTP sunucusu (opsiyonel)

### Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone https://github.com/ak-hosting/ak-rentacar.git
cd ak-rentacar

# HTTP sunucusu başlatın (Python 3)
python3 -m http.server 8000

# Veya Node.js ile
npx serve .

# Tarayıcıda açın
# http://localhost:8000
```

### Docker ile Kurulum

```bash
# Docker image oluşturun
docker build -t bursa-rentacar .

# Container başlatın
docker run -p 8080:80 bursa-rentacar

# Tarayıcıda açın
# http://localhost:8080
```

### Docker Compose ile Kurulum

```bash
# Tüm servisleri başlatın
docker-compose up -d

# Sadece web servisini başlatın
docker-compose up web

# Development ortamı
docker-compose --profile dev up -d

# Production ortamı
docker-compose --profile production up -d
```

Detaylı Docker kullanım kılavuzu için [DOCKER.md](DOCKER.md) dosyasına bakın.

## 🛠️ Özelleştirme

### Renk Teması (assets/css/style.css)

```css
:root {
  --primary-blue: #1E40AF;     /* Ana mavi renk */
  --accent-orange: #EA580C;    /* Turuncu aksan */
  --dark-blue: #1E3A8A;        /* Koyu mavi */
  --light-blue: #3B82F6;       /* Açık mavi */
}
```

### Araç Ekleme (index.html)

```html
<div class="col-lg-4 mb-4" data-type="suv" data-location="osmangazi" data-price="1200">
  <div class="vehicle-card">
    <div class="vehicle-image">
      <img src="assets/images/vehicles/hyundai-tucson.webp" alt="Hyundai Tucson">
      <div class="vehicle-badge suv">SUV</div>
    </div>
    <div class="vehicle-details">
      <h4>Hyundai Tucson</h4>
      <div class="vehicle-specs">
        <span><i class="fas fa-gas-pump"></i> Benzin</span>
        <span><i class="fas fa-cogs"></i> Otomatik</span>
      </div>
      <div class="price">₺1.200 <small>/gün</small></div>
      <button class="btn btn-outline-primary btn-sm">Hemen Kirala</button>
    </div>
  </div>
</div>
```

### Şube Ekleme

```html
<div class="col-lg-4 mb-4">
  <div class="location-card">
    <div class="location-image">
      <img src="assets/images/locations/yeni-sube.webp" alt="Yeni Şube">
    </div>
    <div class="location-details">
      <h4><i class="fas fa-store me-2"></i>Yeni Şube</h4>
      <p><i class="fas fa-map-marker-alt me-2"></i>Adres bilgisi</p>
      <p><i class="fas fa-phone me-2"></i>Telefon numarası</p>
    </div>
  </div>
</div>
```

## 📊 Sektör Analizi: Bursa Oto Kiralama

### Pazar Potansiyeli
- **Bursa'da yıllık 1.2M+ turist**
- **Havalimanı'nda aylık 150K+ yolcu**
- **OSB'lerde 500K+ çalışan**

### Tasarım İhtiyaçları
- **Mobil öncelikli tasarım** (rezervasyonların %65'i mobil)
- **Anında fiyat teklifi sistemi**
- **Şube bazlı araç stok takibi**

### Rekabet Avantajları
- **"Havalimanı'nda 7/24 teslimat"**
- **"Bursa içi ücretsiz araç teslimi"**
- **"Uludağ kış paketleri"**

### SEO Stratejisi
- **"bursa havalimanı araç kiralama"**
- **"nilüfer oto kiralama"**
- **"osmangazi günlük araba kiralama"**

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Mavi**: #1E40AF (Güven ve profesyonellik)
- **Turuncu Aksan**: #EA580C (Enerji ve dikkat çekici)
- **Gri Tonları**: Modern ve temiz görünüm

### Tipografi
- **Font**: Inter (Modern ve okunabilir)
- **Başlıklar**: Bold (700)
- **Gövde**: Regular (400)

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 📱 Mobil Optimizasyon

### Performans
- **Lazy Loading**: Görseller için
- **Minified CSS/JS**: Hızlı yükleme
- **WebP Format**: Optimize görseller

### UX/UI
- **Touch-friendly**: Büyük butonlar
- **Swipe gestures**: Araç galerisi
- **Fast tap**: Hızlı rezervasyon

## 🔍 SEO Optimizasyonu

### Meta Tags
```html
<meta name="description" content="Bursa'da en uygun fiyatlarla oto kiralama. Osmangazi, Nilüfer ve Havalimanı şubelerimizle hizmetinizdeyiz!">
<meta name="keywords" content="bursa oto kiralama, bursa araba kiralama, osmangazi oto kiralama">
```

### Schema.org Markup
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CarRental",
  "name": "Bursa Oto Kiralama",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bursa",
    "addressCountry": "TR"
  }
}
</script>
```

## 📞 Ücretli Özelleştirmeler

### Gelişmiş Özellikler
- **Online Ödeme Entegrasyonu** (iyzico, PayTR)
- **Araç Takip Sistemi** entegrasyonu
- **360° Sanal Araç Turu**
- **WhatsApp Rezervasyon Sistemi**
- **SMS Bildirim Sistemi**
- **Müşteri Yönetim Paneli**

### Teknik Entegrasyonlar
- **API Geliştirme**
- **Veritabanı Tasarımı**
- **Güvenlik Sertifikaları**
- **SSL Sertifikası**

## 🚀 Performans Optimizasyonu

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimizasyon Teknikleri
- **Image Compression**: WebP format
- **CSS/JS Minification**
- **CDN Kullanımı**
- **Browser Caching**

## 📋 Proje Yapısı

```
ak-rentacar/
├── index.html                 # Ana sayfa
├── assets/
│   ├── css/
│   │   ├── style.css         # Ana stil dosyası
│   │   └── responsive.css    # Responsive tasarım
│   ├── js/
│   │   ├── main.js           # Genel fonksiyonlar
│   │   ├── reservation.js    # Rezervasyon sistemi
│   │   └── filter.js         # Araç filtreleme
│   └── images/
│       ├── vehicles/         # Araç görselleri (WebP)
│       └── locations/        # Bursa lokasyon fotoğrafları
├── .env.example              # SMTP ayarları
├── README.md                 # Bu dosya
├── CUSTOMIZATION.md          # Özelleştirme kılavuzu
└── LICENSE                   # MIT Lisansı
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- **Geliştirici**: a.koc
- **GitHub**: [ak-hosting](https://github.com/ak-hosting)
- **E-posta**: ak@ak-pro.com
- **Website**: [ak-pro.com](https://ak-pro.com)

## 🙏 Teşekkürler

- **Bootstrap 5** - Modern CSS framework
- **Font Awesome** - İkon kütüphanesi
- **Google Fonts** - Inter font ailesi
- **Bursa Oto Kiralama Sektörü** - İlham kaynağı

---

**Not**: Bu şablon demo amaçlıdır. Gerçek kullanım için özelleştirme gerekebilir. Özelleştirme talepleri için lütfen iletişime geçin.

## 🎯 Demo Site Özellikleri

- **Demo Amaçlı**: Bu site sadece demo amaçlıdır
- **Gerçek Bağlantılar**: GitHub ve e-posta bağlantıları gerçektir
- **Ticari Kullanım**: Görseller Unsplash'ten alınmıştır, ticari kullanıma uygundur
- **Özelleştirme**: Gerçek kullanım için özelleştirme gerekir 