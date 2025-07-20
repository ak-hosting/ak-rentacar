# Bursa Oto Kiralama - Özelleştirme Kılavuzu

Bu kılavuz, Bursa Oto Kiralama web şablonunu kendi ihtiyaçlarınıza göre özelleştirmeniz için hazırlanmıştır.

## 🎨 Renk Teması Değiştirme

### Ana Renkler (assets/css/style.css)

```css
:root {
    /* Mevcut renkler */
    --primary-blue: #1E40AF;     /* Ana mavi renk */
    --accent-orange: #EA580C;    /* Turuncu aksan */
    
    /* Yeni renkler için örnekler */
    --primary-green: #059669;    /* Yeşil tema */
    --primary-red: #DC2626;      /* Kırmızı tema */
    --primary-purple: #7C3AED;   /* Mor tema */
}
```

### Renk Değiştirme Adımları

1. **Ana Renk**: `--primary-blue` değerini değiştirin
2. **Aksan Renk**: `--accent-orange` değerini değiştirin
3. **Tüm dosyalarda** renk referanslarını güncelleyin

### Örnek: Yeşil Tema

```css
:root {
    --primary-blue: #059669;     /* Yeşil ana renk */
    --accent-orange: #F59E0B;    /* Altın aksan */
    --dark-blue: #047857;        /* Koyu yeşil */
    --light-blue: #10B981;       /* Açık yeşil */
}
```

## 🚗 Araç Kataloğu Güncelleme

### Yeni Araç Ekleme

```html
<!-- index.html dosyasında vehicles-container içine ekleyin -->
<div class="col-lg-4 mb-4" data-type="economy" data-location="airport" data-price="850">
    <div class="vehicle-card">
        <div class="vehicle-image">
            <img src="assets/images/vehicles/toyota-corolla.webp" class="img-fluid" alt="Toyota Corolla" loading="lazy">
            <div class="vehicle-badge economy">Ekonomi</div>
        </div>
        <div class="vehicle-details">
            <h4>Toyota Corolla</h4>
            <div class="vehicle-specs">
                <span><i class="fas fa-gas-pump"></i> Benzin</span>
                <span><i class="fas fa-cogs"></i> Otomatik</span>
                <span><i class="fas fa-suitcase"></i> 2 Büyük Bavul</span>
                <span><i class="fas fa-users"></i> 5 Kişi</span>
            </div>
            <div class="vehicle-location">
                <i class="fas fa-map-marker-alt text-primary"></i> Havalimanı Şubesi
            </div>
            <div class="price-section">
                <div class="price">₺850 <small>/gün</small></div>
                <button class="btn btn-outline-primary btn-sm">Hemen Kirala</button>
            </div>
        </div>
    </div>
</div>
```

### Araç Kategorileri

```javascript
// assets/js/reservation.js dosyasında vehicles objesini güncelleyin
this.vehicles = {
    economy: {
        'fiat-eged': { name: 'Fiat Egea', price: 750, location: 'airport' },
        'renault-clio': { name: 'Renault Clio', price: 800, location: 'osmangazi' },
        'toyota-corolla': { name: 'Toyota Corolla', price: 850, location: 'airport' }
    },
    suv: {
        'hyundai-tucson': { name: 'Hyundai Tucson', price: 1200, location: 'nilufer' },
        'nissan-qashqai': { name: 'Nissan Qashqai', price: 1400, location: 'airport' },
        'toyota-rav4': { name: 'Toyota RAV4', price: 1600, location: 'osmangazi' }
    },
    luxury: {
        'bmw-3series': { name: 'BMW 3 Serisi', price: 2500, location: 'osmangazi' },
        'mercedes-cclass': { name: 'Mercedes C-Serisi', price: 3000, location: 'nilufer' },
        'audi-a4': { name: 'Audi A4', price: 2800, location: 'airport' }
    }
};
```

## 📍 Şube Bilgileri Güncelleme

### Yeni Şube Ekleme

```html
<!-- index.html dosyasında locations section içine ekleyin -->
<div class="col-lg-4 mb-4">
    <div class="location-card">
        <div class="location-image">
            <img src="assets/images/locations/yeni-sube.webp" class="img-fluid" alt="Yeni Şube" loading="lazy">
        </div>
        <div class="location-details">
            <h4><i class="fas fa-store me-2"></i>Yeni Şube</h4>
            <p><i class="fas fa-map-marker-alt me-2"></i>Yeni Mahalle, Yeni Sokak No:123</p>
            <p><i class="fas fa-phone me-2"></i>(0224) 444 0 126</p>
            <p><i class="fas fa-clock me-2"></i>08:00 - 20:00</p>
            <div class="location-features">
                <span class="badge bg-primary">Merkezi Konum</span>
                <span class="badge bg-success">Ücretsiz Otopark</span>
                <span class="badge bg-warning">Lüks Araçlar</span>
            </div>
        </div>
    </div>
</div>
```

### İletişim Bilgileri Güncelleme

```html
<!-- Footer bölümünde güncelleyin -->
<div class="col-md-4">
    <h5>BURSA OTO KİRALAMA</h5>
    <address>
        Osmangazi Şube: FSM Bulvarı No:123<br>
        Tel: (0224) 444 0 123<br>
        E-posta: info@firmaniz.com
    </address>
</div>
```

## 💰 Fiyatlandırma Güncelleme

### Günlük Fiyatlar

```javascript
// assets/js/reservation.js dosyasında fiyatları güncelleyin
this.vehicles = {
    economy: {
        'fiat-eged': { name: 'Fiat Egea', price: 800, location: 'airport' }, // 750 -> 800
        'renault-clio': { name: 'Renault Clio', price: 850, location: 'osmangazi' } // 800 -> 850
    }
};
```

### İndirim Oranları

```javascript
// İndirim oranlarını güncelleyin
this.discounts = {
    '3+': 0.10, // %15 -> %10
    '7+': 0.15, // %20 -> %15
    '14+': 0.20 // %25 -> %20
};
```

## 🎯 SEO Optimizasyonu

### Meta Tags Güncelleme

```html
<!-- index.html head bölümünde -->
<title>Firmanız Adı - Bursa Oto Kiralama | Premium Araç Filomuz</title>
<meta name="description" content="Firmanız açıklaması. Bursa'da en uygun fiyatlarla oto kiralama.">
<meta name="keywords" content="firmanız anahtar kelimeleri, bursa oto kiralama">
```

### Schema.org Markup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CarRental",
  "name": "Firmanız Adı",
  "description": "Firmanız açıklaması",
  "url": "https://firmaniz.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "FSM Bulvarı No:123",
    "addressLocality": "Bursa",
    "addressRegion": "Osmangazi",
    "postalCode": "16000",
    "addressCountry": "TR"
  },
  "telephone": "+902244440123",
  "email": "info@firmaniz.com"
}
</script>
```

## 📱 Mobil Optimizasyon

### Touch-Friendly Buttons

```css
/* assets/css/responsive.css dosyasında */
@media (max-width: 767px) {
    .btn {
        min-height: 44px; /* iOS için minimum dokunma alanı */
        padding: 12px 20px;
    }
    
    .vehicle-card {
        margin-bottom: 1.5rem;
    }
}
```

### Swipe Gestures

```javascript
// assets/js/main.js dosyasına ekleyin
// Araç galerisi için swipe desteği
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Sola swipe - Sonraki araç
            console.log('Sola swipe');
        } else {
            // Sağa swipe - Önceki araç
            console.log('Sağa swipe');
        }
    }
}
```

## 🔧 Gelişmiş Özelleştirmeler

### WhatsApp Entegrasyonu

```html
<!-- WhatsApp butonu ekleyin -->
<a href="https://wa.me/905554440123?text=Merhaba, araç kiralama hakkında bilgi almak istiyorum." 
   class="btn btn-success position-fixed" 
   style="bottom: 20px; left: 20px; z-index: 1000; border-radius: 50%; width: 60px; height: 60px;">
    <i class="fab fa-whatsapp fa-2x"></i>
</a>
```

### Google Maps Entegrasyonu

```html
<!-- Şube haritası ekleyin -->
<div class="col-12 mt-4">
    <div class="card">
        <div class="card-body">
            <h5><i class="fas fa-map me-2"></i>Şube Haritası</h5>
            <iframe 
                src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                width="100%" 
                height="400" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        </div>
    </div>
</div>
```

### Çoklu Dil Desteği

```javascript
// assets/js/main.js dosyasına ekleyin
const translations = {
    tr: {
        'reservation': 'Rezervasyon',
        'vehicles': 'Araçlar',
        'contact': 'İletişim'
    },
    en: {
        'reservation': 'Reservation',
        'vehicles': 'Vehicles',
        'contact': 'Contact'
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
```

## 📊 Analytics Entegrasyonu

### Google Analytics

```html
<!-- index.html head bölümüne ekleyin -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

```html
<!-- Facebook Pixel kodu -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔒 Güvenlik Optimizasyonu

### Content Security Policy

```html
<!-- index.html head bölümüne ekleyin -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;">
```

### SSL Sertifikası

```bash
# Let's Encrypt ile ücretsiz SSL
sudo apt-get install certbot
sudo certbot --nginx -d firmaniz.com -d www.firmaniz.com
```

## 🚀 Performans Optimizasyonu

### Image Optimization

```bash
# WebP dönüştürme
cwebp -q 80 input.jpg -o output.webp

# Batch dönüştürme
for file in *.jpg; do
    cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

### CSS/JS Minification

```bash
# CSS minification
npx clean-css-cli assets/css/style.css -o assets/css/style.min.css

# JS minification
npx uglify-js assets/js/main.js -o assets/js/main.min.js
```

## 📞 Destek ve İletişim

Özelleştirme konusunda yardıma ihtiyacınız varsa:

- **E-posta**: ak@ak-pro.com
- **GitHub**: https://github.com/ak-hosting
- **Website**: https://ak-pro.com

### Ücretli Hizmetler

- **Özel Tasarım**: Tamamen özel tasarım
- **Backend Geliştirme**: PHP, Node.js, Python
- **Veritabanı Tasarımı**: MySQL, PostgreSQL
- **API Geliştirme**: RESTful API
- **Mobil Uygulama**: React Native, Flutter
- **E-ticaret Entegrasyonu**: Ödeme sistemleri
- **SEO Optimizasyonu**: Arama motoru optimizasyonu

---

**Not**: Bu kılavuz sürekli güncellenmektedir. En güncel versiyon için GitHub repository'sini kontrol edin. 