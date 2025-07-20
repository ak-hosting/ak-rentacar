// Bursa Oto Kiralama - Araç Filtreleme Sistemi

class VehicleFilter {
    constructor() {
        this.vehicles = [];
        this.filteredVehicles = [];
        this.currentFilters = {
            type: 'all',
            location: 'all',
            maxPrice: null
        };
        
        this.init();
    }
    
    init() {
        this.collectVehicles();
        this.bindEvents();
        this.setupFilterUI();
    }
    
    collectVehicles() {
        // Sayfadaki tüm araç kartlarını topla
        const vehicleCards = document.querySelectorAll('#vehicles-container .col-lg-4');
        
        vehicleCards.forEach(card => {
            const vehicle = {
                element: card,
                type: card.dataset.type,
                location: card.dataset.location,
                price: parseInt(card.dataset.price),
                name: card.querySelector('h4').textContent,
                specs: Array.from(card.querySelectorAll('.vehicle-specs span')).map(span => span.textContent),
                image: card.querySelector('img').src
            };
            
            this.vehicles.push(vehicle);
        });
        
        this.filteredVehicles = [...this.vehicles];
    }
    
    bindEvents() {
        // Filtre butonları
        const filterBtn = document.getElementById('filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => this.applyFilters());
        }
        
        // Enter tuşu ile filtreleme
        const filterInputs = document.querySelectorAll('#filter input, #filter select');
        filterInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        });
        
        // Anlık filtreleme (opsiyonel)
        const carTypeSelect = document.getElementById('car-type');
        const locationSelect = document.getElementById('location');
        const maxPriceInput = document.getElementById('max-price');
        
        if (carTypeSelect) {
            carTypeSelect.addEventListener('change', () => this.applyFilters());
        }
        
        if (locationSelect) {
            locationSelect.addEventListener('change', () => this.applyFilters());
        }
        
        if (maxPriceInput) {
            maxPriceInput.addEventListener('input', () => this.applyFilters());
        }
    }
    
    setupFilterUI() {
        // Filtre istatistikleri
        const statsContainer = document.createElement('div');
        statsContainer.id = 'filter-stats';
        statsContainer.className = 'text-center mb-3';
        
        const filterSection = document.getElementById('filter');
        if (filterSection) {
            filterSection.appendChild(statsContainer);
        }
        
        // Filtre temizleme butonu
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn btn-outline-secondary btn-sm ms-2';
        clearBtn.innerHTML = '<i class="fas fa-times me-1"></i>Temizle';
        clearBtn.addEventListener('click', () => this.clearFilters());
        
        const filterBtn = document.getElementById('filter-btn');
        if (filterBtn) {
            filterBtn.parentNode.appendChild(clearBtn);
        }
    }
    
    applyFilters() {
        // Mevcut filtreleri al
        const carType = document.getElementById('car-type')?.value || 'all';
        const location = document.getElementById('location')?.value || 'all';
        const maxPrice = document.getElementById('max-price')?.value || '';
        
        this.currentFilters = {
            type: carType,
            location: location,
            maxPrice: maxPrice ? parseInt(maxPrice) : null
        };
        
        // Araçları filtrele
        this.filteredVehicles = this.vehicles.filter(vehicle => {
            // Tip filtresi
            if (this.currentFilters.type !== 'all' && vehicle.type !== this.currentFilters.type) {
                return false;
            }
            
            // Lokasyon filtresi
            if (this.currentFilters.location !== 'all' && vehicle.location !== this.currentFilters.location) {
                return false;
            }
            
            // Fiyat filtresi
            if (this.currentFilters.maxPrice && vehicle.price > this.currentFilters.maxPrice) {
                return false;
            }
            
            return true;
        });
        
        // Sonuçları göster
        this.displayResults();
        this.updateStats();
        this.showFilterAnimation();
    }
    
    displayResults() {
        const container = document.getElementById('vehicles-container');
        if (!container) return;
        
        // Tüm araçları gizle
        this.vehicles.forEach(vehicle => {
            vehicle.element.style.display = 'none';
            vehicle.element.classList.remove('fade-in-up');
        });
        
        // Filtrelenmiş araçları göster
        this.filteredVehicles.forEach((vehicle, index) => {
            vehicle.element.style.display = 'block';
            
            // Animasyonlu gösterim
            setTimeout(() => {
                vehicle.element.classList.add('fade-in-up');
            }, index * 100);
        });
        
        // Sonuç yoksa mesaj göster
        if (this.filteredVehicles.length === 0) {
            this.showNoResults();
        } else {
            this.hideNoResults();
        }
    }
    
    showNoResults() {
        let noResultsDiv = document.getElementById('no-results');
        
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'no-results';
            noResultsDiv.className = 'col-12 text-center py-5';
            noResultsDiv.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-search me-2"></i>
                    <strong>Sonuç Bulunamadı</strong><br>
                    Seçtiğiniz kriterlere uygun araç bulunamadı. Lütfen filtrelerinizi değiştirin.
                </div>
            `;
            
            const container = document.getElementById('vehicles-container');
            if (container) {
                container.appendChild(noResultsDiv);
            }
        }
        
        noResultsDiv.style.display = 'block';
    }
    
    hideNoResults() {
        const noResultsDiv = document.getElementById('no-results');
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }
    
    updateStats() {
        const statsContainer = document.getElementById('filter-stats');
        if (!statsContainer) return;
        
        const totalVehicles = this.vehicles.length;
        const filteredCount = this.filteredVehicles.length;
        
        let statsText = `${filteredCount} araç bulundu`;
        
        if (filteredCount !== totalVehicles) {
            statsText += ` (${totalVehicles} araçtan)`;
        }
        
        // Aktif filtreleri göster
        const activeFilters = [];
        if (this.currentFilters.type !== 'all') {
            activeFilters.push(`Tip: ${this.getTypeName(this.currentFilters.type)}`);
        }
        if (this.currentFilters.location !== 'all') {
            activeFilters.push(`Lokasyon: ${this.getLocationName(this.currentFilters.location)}`);
        }
        if (this.currentFilters.maxPrice) {
            activeFilters.push(`Max Fiyat: ₺${this.currentFilters.maxPrice}`);
        }
        
        if (activeFilters.length > 0) {
            statsText += ` | Filtreler: ${activeFilters.join(', ')}`;
        }
        
        statsContainer.innerHTML = `
            <small class="text-muted">
                <i class="fas fa-filter me-1"></i>${statsText}
            </small>
        `;
    }
    
    getTypeName(type) {
        const typeNames = {
            'economy': 'Ekonomi',
            'suv': 'SUV',
            'luxury': 'Lüks',
            'van': 'Van/Minibüs'
        };
        return typeNames[type] || type;
    }
    
    getLocationName(location) {
        const locationNames = {
            'airport': 'Havalimanı',
            'osmangazi': 'Osmangazi',
            'nilufer': 'Nilüfer'
        };
        return locationNames[location] || location;
    }
    
    clearFilters() {
        // Form alanlarını temizle
        const carTypeSelect = document.getElementById('car-type');
        const locationSelect = document.getElementById('location');
        const maxPriceInput = document.getElementById('max-price');
        
        if (carTypeSelect) carTypeSelect.value = 'all';
        if (locationSelect) locationSelect.value = 'all';
        if (maxPriceInput) maxPriceInput.value = '';
        
        // Filtreleri sıfırla
        this.currentFilters = {
            type: 'all',
            location: 'all',
            maxPrice: null
        };
        
        // Tüm araçları göster
        this.filteredVehicles = [...this.vehicles];
        this.displayResults();
        this.updateStats();
        
        // Başarı mesajı göster
        this.showNotification('Filtreler temizlendi', 'info');
    }
    
    showFilterAnimation() {
        const container = document.getElementById('vehicles-container');
        if (!container) return;
        
        // Filtreleme animasyonu
        container.style.opacity = '0.5';
        container.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 300);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Gelişmiş filtreleme özellikleri
    addAdvancedFilters() {
        const advancedFiltersHtml = `
            <div class="row mt-3" id="advanced-filters" style="display: none;">
                <div class="col-md-3">
                    <label class="form-label">Yakıt Tipi</label>
                    <select class="form-select" id="fuel-type">
                        <option value="all">Tümü</option>
                        <option value="benzin">Benzin</option>
                        <option value="dizel">Dizel</option>
                        <option value="elektrik">Elektrik</option>
                        <option value="hibrit">Hibrit</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Vites Tipi</label>
                    <select class="form-select" id="transmission">
                        <option value="all">Tümü</option>
                        <option value="manuel">Manuel</option>
                        <option value="otomatik">Otomatik</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Min. Fiyat (₺)</label>
                    <input type="number" class="form-control" id="min-price" placeholder="Min fiyat">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Kapasite</label>
                    <select class="form-select" id="capacity">
                        <option value="all">Tümü</option>
                        <option value="2">2 Kişi</option>
                        <option value="5">5 Kişi</option>
                        <option value="7">7 Kişi</option>
                        <option value="8">8+ Kişi</option>
                    </select>
                </div>
            </div>
        `;
        
        const filterSection = document.getElementById('filter');
        if (filterSection) {
            const container = filterSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', advancedFiltersHtml);
            }
        }
        
        // Gelişmiş filtre toggle butonu
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-link btn-sm mt-2';
        toggleBtn.innerHTML = '<i class="fas fa-cog me-1"></i>Gelişmiş Filtreler';
        toggleBtn.addEventListener('click', () => this.toggleAdvancedFilters());
        
        const filterBtn = document.getElementById('filter-btn');
        if (filterBtn) {
            filterBtn.parentNode.appendChild(toggleBtn);
        }
    }
    
    toggleAdvancedFilters() {
        const advancedFilters = document.getElementById('advanced-filters');
        if (advancedFilters) {
            const isVisible = advancedFilters.style.display !== 'none';
            advancedFilters.style.display = isVisible ? 'none' : 'block';
        }
    }
    
    // Filtre geçmişi
    saveFilterHistory() {
        const history = JSON.parse(localStorage.getItem('filterHistory') || '[]');
        const currentFilter = {
            ...this.currentFilters,
            timestamp: new Date().toISOString()
        };
        
        history.unshift(currentFilter);
        history.splice(5); // Son 5 filtreyi tut
        
        localStorage.setItem('filterHistory', JSON.stringify(history));
    }
    
    loadFilterHistory() {
        const history = JSON.parse(localStorage.getItem('filterHistory') || '[]');
        if (history.length > 0) {
            const lastFilter = history[0];
            
            // Son filtreyi uygula
            const carTypeSelect = document.getElementById('car-type');
            const locationSelect = document.getElementById('location');
            const maxPriceInput = document.getElementById('max-price');
            
            if (carTypeSelect && lastFilter.type) carTypeSelect.value = lastFilter.type;
            if (locationSelect && lastFilter.location) locationSelect.value = lastFilter.location;
            if (maxPriceInput && lastFilter.maxPrice) maxPriceInput.value = lastFilter.maxPrice;
            
            this.applyFilters();
        }
    }
    
    // Filtre önerileri
    getFilterSuggestions() {
        const suggestions = [];
        
        // Popüler kombinasyonlar
        suggestions.push({
            name: 'Ekonomik Havalimanı',
            filters: { type: 'economy', location: 'airport' }
        });
        
        suggestions.push({
            name: 'SUV Nilüfer',
            filters: { type: 'suv', location: 'nilufer' }
        });
        
        suggestions.push({
            name: 'Lüks Osmangazi',
            filters: { type: 'luxury', location: 'osmangazi' }
        });
        
        return suggestions;
    }
}

// Filtre sistemini başlat
document.addEventListener('DOMContentLoaded', function() {
    const vehicleFilter = new VehicleFilter();
    
    // Gelişmiş filtreleri ekle
    setTimeout(() => {
        vehicleFilter.addAdvancedFilters();
    }, 1000);
    
    // Filtre geçmişini yükle
    vehicleFilter.loadFilterHistory();
}); 