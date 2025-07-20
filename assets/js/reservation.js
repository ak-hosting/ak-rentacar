// Bursa Oto Kiralama - Rezervasyon Sistemi

class ReservationSystem {
    constructor() {
        this.vehicles = {
            economy: {
                'fiat-eged': { name: 'Fiat Egea', price: 750, location: 'airport' },
                'renault-clio': { name: 'Renault Clio', price: 800, location: 'osmangazi' }
            },
            suv: {
                'hyundai-tucson': { name: 'Hyundai Tucson', price: 1200, location: 'nilufer' },
                'nissan-qashqai': { name: 'Nissan Qashqai', price: 1400, location: 'airport' }
            },
            luxury: {
                'bmw-3series': { name: 'BMW 3 Serisi', price: 2500, location: 'osmangazi' },
                'mercedes-cclass': { name: 'Mercedes C-Serisi', price: 3000, location: 'nilufer' }
            },
            van: {
                'mercedes-vito': { name: 'Mercedes Vito', price: 1800, location: 'airport' }
            }
        };
        
        this.discounts = {
            '3+': 0.15, // 3+ gün için %15 indirim
            '7+': 0.20, // 7+ gün için %20 indirim
            '14+': 0.25 // 14+ gün için %25 indirim
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupDateValidation();
        this.setupPriceCalculation();
    }
    
    bindEvents() {
        const reservationForm = document.getElementById('reservation-form');
        if (reservationForm) {
            reservationForm.addEventListener('submit', (e) => this.handleReservation(e));
        }
        
        // Araç kategorisi değiştiğinde fiyat güncelle
        const categorySelect = document.querySelector('#reservation-form select[name="category"]');
        if (categorySelect) {
            categorySelect.addEventListener('change', () => this.updateAvailableVehicles());
        }
        
        // Tarih değişikliklerinde fiyat hesapla
        const dateInputs = document.querySelectorAll('#reservation-form input[type="date"]');
        dateInputs.forEach(input => {
            input.addEventListener('change', () => this.calculatePrice());
        });
    }
    
    setupDateValidation() {
        const pickupDate = document.querySelector('#reservation-form input[name="pickup-date"]');
        const returnDate = document.querySelector('#reservation-form input[name="return-date"]');
        
        if (pickupDate && returnDate) {
            // Minimum tarih bugün
            const today = new Date().toISOString().split('T')[0];
            pickupDate.min = today;
            returnDate.min = today;
            
            // Alış tarihi değiştiğinde iade tarihini güncelle
            pickupDate.addEventListener('change', function() {
                returnDate.min = this.value;
                if (returnDate.value && returnDate.value < this.value) {
                    returnDate.value = this.value;
                }
            });
            
            // İade tarihi alış tarihinden önce olamaz
            returnDate.addEventListener('change', function() {
                if (this.value < pickupDate.value) {
                    this.value = pickupDate.value;
                }
            });
        }
    }
    
    setupPriceCalculation() {
        const priceDisplay = document.createElement('div');
        priceDisplay.id = 'price-display';
        priceDisplay.className = 'alert alert-info mt-3';
        priceDisplay.style.display = 'none';
        
        const form = document.getElementById('reservation-form');
        if (form) {
            form.appendChild(priceDisplay);
        }
    }
    
    calculatePrice() {
        const pickupDate = document.querySelector('#reservation-form input[name="pickup-date"]');
        const returnDate = document.querySelector('#reservation-form input[name="return-date"]');
        const categorySelect = document.querySelector('#reservation-form select[name="category"]');
        
        if (!pickupDate.value || !returnDate.value || !categorySelect.value) {
            return;
        }
        
        const startDate = new Date(pickupDate.value);
        const endDate = new Date(returnDate.value);
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        if (days <= 0) {
            this.showPriceDisplay('Lütfen geçerli tarih aralığı seçin.', 'warning');
            return;
        }
        
        // Seçilen kategorideki araçların ortalama fiyatını al
        const category = categorySelect.value;
        const vehicles = this.vehicles[category];
        
        if (!vehicles) {
            this.showPriceDisplay('Seçilen kategori için araç bulunamadı.', 'warning');
            return;
        }
        
        // Ortalama fiyat hesapla
        const prices = Object.values(vehicles).map(v => v.price);
        const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        
        // İndirim hesapla
        let discount = 0;
        if (days >= 14) {
            discount = this.discounts['14+'];
        } else if (days >= 7) {
            discount = this.discounts['7+'];
        } else if (days >= 3) {
            discount = this.discounts['3+'];
        }
        
        const basePrice = averagePrice * days;
        const discountAmount = basePrice * discount;
        const finalPrice = basePrice - discountAmount;
        
        // Fiyat detaylarını göster
        const priceDetails = `
            <strong>Fiyat Detayları:</strong><br>
            Günlük Ücret: ₺${averagePrice}<br>
            Kiralama Süresi: ${days} gün<br>
            ${discount > 0 ? `İndirim (%${discount * 100}): -₺${discountAmount.toFixed(2)}<br>` : ''}
            <strong>Toplam: ₺${finalPrice.toFixed(2)}</strong>
        `;
        
        this.showPriceDisplay(priceDetails, 'info');
    }
    
    showPriceDisplay(content, type = 'info') {
        const priceDisplay = document.getElementById('price-display');
        if (priceDisplay) {
            priceDisplay.className = `alert alert-${type} mt-3`;
            priceDisplay.innerHTML = content;
            priceDisplay.style.display = 'block';
        }
    }
    
    updateAvailableVehicles() {
        const categorySelect = document.querySelector('#reservation-form select[name="category"]');
        const vehicleSelect = document.querySelector('#reservation-form select[name="vehicle"]');
        
        if (!categorySelect || !vehicleSelect) return;
        
        const category = categorySelect.value;
        const vehicles = this.vehicles[category];
        
        // Vehicle select'i temizle
        vehicleSelect.innerHTML = '<option value="">Araç Seçin</option>';
        
        if (vehicles) {
            Object.entries(vehicles).forEach(([id, vehicle]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${vehicle.name} - ₺${vehicle.price}/gün`;
                vehicleSelect.appendChild(option);
            });
        }
        
        // Fiyat hesapla
        this.calculatePrice();
    }
    
    handleReservation(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const reservationData = {
            pickupLocation: formData.get('pickup-location'),
            returnLocation: formData.get('return-location'),
            pickupDate: formData.get('pickup-date'),
            returnDate: formData.get('return-date'),
            pickupTime: formData.get('pickup-time'),
            returnTime: formData.get('return-time'),
            category: formData.get('category'),
            vehicle: formData.get('vehicle'),
            customerName: formData.get('customer-name'),
            customerEmail: formData.get('customer-email'),
            customerPhone: formData.get('customer-phone')
        };
        
        // Validation
        if (!this.validateReservation(reservationData)) {
            return;
        }
        
        // Rezervasyon işlemi
        this.processReservation(reservationData);
    }
    
    validateReservation(data) {
        const errors = [];
        
        if (!data.pickupLocation) errors.push('Alış lokasyonu seçilmelidir.');
        if (!data.returnLocation) errors.push('İade lokasyonu seçilmelidir.');
        if (!data.pickupDate) errors.push('Alış tarihi seçilmelidir.');
        if (!data.returnDate) errors.push('İade tarihi seçilmelidir.');
        if (!data.pickupTime) errors.push('Alış saati seçilmelidir.');
        if (!data.returnTime) errors.push('İade saati seçilmelidir.');
        if (!data.category) errors.push('Araç kategorisi seçilmelidir.');
        if (!data.customerName) errors.push('Müşteri adı girilmelidir.');
        if (!data.customerEmail) errors.push('E-posta adresi girilmelidir.');
        if (!data.customerPhone) errors.push('Telefon numarası girilmelidir.');
        
        // Tarih kontrolü
        if (data.pickupDate && data.returnDate) {
            const pickup = new Date(data.pickupDate);
            const returnDate = new Date(data.returnDate);
            
            if (returnDate <= pickup) {
                errors.push('İade tarihi alış tarihinden sonra olmalıdır.');
            }
        }
        
        // E-posta formatı kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.customerEmail && !emailRegex.test(data.customerEmail)) {
            errors.push('Geçerli bir e-posta adresi girilmelidir.');
        }
        
        // Telefon formatı kontrolü
        const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
        if (data.customerPhone && !phoneRegex.test(data.customerPhone)) {
            errors.push('Geçerli bir telefon numarası girilmelidir.');
        }
        
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }
        
        return true;
    }
    
    showErrors(errors) {
        const errorHtml = errors.map(error => `<li>${error}</li>`).join('');
        const errorAlert = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Hata:</strong>
                <ul class="mb-0 mt-2">${errorHtml}</ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        const form = document.getElementById('reservation-form');
        form.insertAdjacentHTML('beforebegin', errorAlert);
    }
    
    processReservation(data) {
        // Loading state
        const submitBtn = document.querySelector('#reservation-form button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Rezervasyon işleniyor...';
        submitBtn.disabled = true;
        
        // Simüle edilmiş API çağrısı
        setTimeout(() => {
            // Başarılı rezervasyon
            this.showReservationSuccess(data);
            
            // Form'u temizle
            document.getElementById('reservation-form').reset();
            document.getElementById('price-display').style.display = 'none';
            
            // Button'u eski haline getir
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, 2000);
    }
    
    showReservationSuccess(data) {
        const days = Math.ceil((new Date(data.returnDate) - new Date(data.pickupDate)) / (1000 * 60 * 60 * 24));
        
        const successHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <h5><i class="fas fa-check-circle me-2"></i>Rezervasyon Başarılı!</h5>
                <p><strong>Rezervasyon Detayları:</strong></p>
                <ul class="mb-0">
                    <li>Alış: ${data.pickupLocation} - ${data.pickupDate} ${data.pickupTime}</li>
                    <li>İade: ${data.returnLocation} - ${data.returnDate} ${data.returnTime}</li>
                    <li>Süre: ${days} gün</li>
                    <li>Müşteri: ${data.customerName}</li>
                </ul>
                <p class="mt-2 mb-0"><small>Rezervasyon onayı e-posta adresinize gönderilecektir.</small></p>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        const form = document.getElementById('reservation-form');
        form.insertAdjacentHTML('beforebegin', successHtml);
        
        // Scroll to success message
        setTimeout(() => {
            const successAlert = document.querySelector('.alert-success');
            if (successAlert) {
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    // Bursa özel kampanyalar
    getBursaCampaigns() {
        return [
            {
                title: 'Havalimanı Özel',
                description: 'Havalimanı\'ndan alanlara ücretsiz OGS',
                icon: 'fas fa-plane',
                color: 'primary'
            },
            {
                title: 'Uludağ Kış Paketi',
                description: 'Kış lastiği ve zincir dahil',
                icon: 'fas fa-mountain',
                color: 'warning'
            },
            {
                title: '3+ Gün İndirimi',
                description: '3 gün ve üzeri kiralarda %15 indirim',
                icon: 'fas fa-percent',
                color: 'success'
            },
            {
                title: 'Bursa İçi Teslimat',
                description: 'Bursa içi ücretsiz araç teslimi',
                icon: 'fas fa-truck',
                color: 'info'
            }
        ];
    }
}

// Rezervasyon sistemini başlat
document.addEventListener('DOMContentLoaded', function() {
    new ReservationSystem();
}); 