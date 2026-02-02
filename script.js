const catalogData = [
    { name: "Anahtar (Tekli/Komütatör)", category: "Malzeme", price: "45 TL", details: "Viko/Schneider marka, beyaz/krem seçenekleri." },
    { name: "Priz (Topraklı)", category: "Malzeme", price: "55 TL", details: "Çocuk korumalı, dayanıklı iç mekanizmalı." },
    { name: "Sigorta (16A/20A/25A)", category: "Malzeme", price: "120 TL", details: "Siemens/Legrand marka, yüksek korumalı." },
    { name: "Kaçak Akım Rölesi", category: "Malzeme", price: "850 TL", details: "30mA ev tipi, hayat koruma amaçlı." },
    { name: "NYM Kablo (3x2.5mm)", category: "Malzeme", price: "45 TL/mt", details: "Priz tesisatı için yüksek kaliteli bakır kablo." },
    { name: "LED Panel Aydınlatma", category: "Malzeme", price: "180 TL", details: "60x60 veya yuvarlak, 18W-36W seçenekleri." },
    { name: "Pano Montajı", category: "İşçilik", price: "1500 TL", details: "Sigorta kutusu değişimi ve düzenlenmesi." },
    { name: "Priz/Anahtar Montaj Hizmeti", category: "İşçilik", price: "50 TL/Adet", details: "Mevcut tesisata montaj ve kontrol." },
    { name: "Avize Montajı", category: "İşçilik", price: "250 TL", details: "Delme, asma ve bağlantı işlemleri dahil." },
    { name: "Klima Tesisatı Çekimi", category: "İşçilik", price: "1200 TL", details: "Panodan bağımsız hat çekimi ve sigorta bağlantısı." },
    { name: "İnternet/Data Hattı Arıza", category: "İşçilik", price: "400 TL", details: "Kablo testi ve soket değişimi." },
    { name: "Topraklama Ölçümü & Hattı", category: "İşçilik", price: "2000 TL", details: "Tesisat güvenliği için bina geneli topraklama." },
    { name: "Diafon Sistemi Kurulumu", category: "İşçilik", price: "Fiyat Sorunuz", details: "Görüntülü veya sesli sistemlerin projelendirilmesi." },
    { name: "Sensörlü Lamba", category: "Malzeme", price: "220 TL", details: "Bahçe veya merdiven otomatiği için uygun." },
    { name: "Sigorta Kutusu (12'li)", category: "Malzeme", price: "350 TL", details: "Sıva altı/Sıva üstü dekoratif kutular." },
    { name: "Trafo (LED Şerit için)", category: "Malzeme", price: "280 TL", details: "12V 10A-30A arası güçlü adaptörler." }
];

const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('catalogSearch');

function renderCatalog(items) {
    catalogGrid.innerHTML = '';

    if (items.length === 0) {
        catalogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-dim);">Sonuç bulunamadı...</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="category">${item.category}</div>
            <h3>${item.name}</h3>
            <div class="price">${item.price}</div>
            <div class="details">${item.details}</div>
        `;
        catalogGrid.appendChild(card);
    });
}

// Initial Render
renderCatalog(catalogData);

// Search Logic
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = catalogData.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.details.toLowerCase().includes(term)
    );
    renderCatalog(filtered);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});
