// Bursa Oto Kiralama - Ana JavaScript Dosyası

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling für Navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Navbar yüksekliği
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll efekti
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-dark');
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.classList.remove('bg-dark');
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax efekti
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax');
        if (parallax) {
            const rate = scrolled * -0.5;
            parallax.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animasyonlar için Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Animasyon için elementleri gözlemle
    const animateElements = document.querySelectorAll('.vehicle-card, .location-card, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Form başarılı gönderildi
                showNotification('Form başarıyla gönderildi!', 'success');
                form.reset();
            } else {
                showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
            }
        });
    });

    // Notification sistemi
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // 5 saniye sonra otomatik kaldır
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Lazy loading için Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Lazy loading için img elementlerini gözlemle
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Tarih seçici için minimum tarih ayarı
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach((input, index) => {
        if (index === 0) { // Alış tarihi
            input.min = today;
        } else { // İade tarihi
            input.min = today;
        }
    });

    // İade tarihi için minimum tarih kontrolü
    const pickupDateInput = dateInputs[0];
    const returnDateInput = dateInputs[1];
    
    if (pickupDateInput && returnDateInput) {
        pickupDateInput.addEventListener('change', function() {
            returnDateInput.min = this.value;
            if (returnDateInput.value && returnDateInput.value < this.value) {
                returnDateInput.value = this.value;
            }
        });
    }

    // Loading state için button handler
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading"></span> Yükleniyor...';
                this.disabled = true;
                
                // Simüle edilmiş loading süresi
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Accessibility improvements
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Ana içeriğe geç';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Modal'ları kapat
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // Performance monitoring
    window.addEventListener('load', function() {
        // Page load time
        const loadTime = performance.now();
        console.log(`Sayfa yükleme süresi: ${loadTime.toFixed(2)}ms`);
        
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}: ${entry.value}`);
                }
            });
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    });

    // Service Worker registration (PWA için)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    // Offline detection
    window.addEventListener('online', function() {
        showNotification('İnternet bağlantısı yeniden kuruldu!', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('İnternet bağlantısı kesildi. Lütfen bağlantınızı kontrol edin.', 'error');
    });

    // Geolocation (Bursa için)
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Bursa koordinatları (yaklaşık)
            const bursaLat = 40.1885;
            const bursaLng = 29.0610;
            
            // Mesafe hesaplama (basit)
            const distance = Math.sqrt(
                Math.pow(userLat - bursaLat, 2) + 
                Math.pow(userLng - bursaLng, 2)
            ) * 111; // km cinsinden
            
            if (distance < 50) { // 50km içindeyse
                console.log('Kullanıcı Bursa bölgesinde');
            }
        }, function(error) {
            console.log('Konum alınamadı:', error.message);
        });
    }

    // Console welcome message
    console.log(`
    🚗 Bursa Oto Kiralama Web Sitesi
    
    Geliştirici: a.koc
    GitHub: https://github.com/ak-hosting
    İletişim: ak@ak-pro.com
    
    Özelleştirme talepleri için lütfen iletişime geçin!
    `);
}); 