const catalogData = [
    { id: 1, name: "NYM Kablo 3x2.5mm (100 Metre)", category: "Kablo", price: "4.500 TL", details: "Öznur/HES Marka, TSE belgeli.", icon: "fa-ring" },
    { id: 2, name: "Viko Karre Topraklı Priz (Beyaz)", category: "Anahtar-Priz", price: "85 TL", details: "Çocuk korumalı, kolay montaj.", icon: "fa-plug" },
    { id: 3, name: "Siemens 16A Sigorta B Tipi", category: "Şalt Malzeme", price: "240 TL", details: "Aydınlatma ve priz hatları için.", icon: "fa-toggle-on" },
    { id: 4, name: "Schneider 40A Kaçak Akım Rölesi", category: "Şalt Malzeme", price: "1.250 TL", details: "30mA Hayat Koruma.", icon: "fa-shield-halved" },
    { id: 5, name: "Philips 9W LED Ampul Seti (10lu)", category: "Aydınlatma", price: "950 TL", details: "Gün ışığı / Beyaz seçenekli.", icon: "fa-lightbulb" },
    { id: 6, name: "Cata 18W Slim LED Panel", category: "Aydınlatma", price: "280 TL", details: "Gömme tip, trafo dahil.", icon: "fa-sun" },
    { id: 7, name: "İzole Bant 10lu Paket", category: "Aydınlatma", price: "180 TL", details: "Isıya dayanıklı, farklı renkli.", icon: "fa-tape" },
    { id: 8, name: "CAT6 Data Kablosu (Top)", category: "Kablo", price: "3.200 TL", details: "Full bakır, LSZH kılıf.", icon: "fa-network-wired" },
    { id: 9, name: "Pano Montaj & Düzenleme Hizmeti", category: "İşçilik", price: "1.500 TL", details: "İşçilik bedelidir, malzeme hariç.", icon: "fa-tools" },
    { id: 10, name: "Daire İçi Arıza Tespit & Onarım", category: "İşçilik", price: "600 TL", details: "Servis ücretidir.", icon: "fa-hammer" },
    { id: 11, name: "Makita Şarjlı Matkap Seti", category: "Hırdavat", price: "12.500 TL", details: "Profesyonel seri, çift akülü.", icon: "fa-screwdriver-wrench" },
    { id: 12, name: "Kablo Soyma Pensesi", category: "Hırdavat", price: "450 TL", details: "Ergonomik sap, ayarlı.", icon: "fa-scissors" }
];

const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('catalogSearch');
const currentCatHeader = document.getElementById('currentCategory');

function renderCatalog(items) {
    catalogGrid.innerHTML = '';

    if (items.length === 0) {
        catalogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 5rem; color: #999;">Aradığınız ürün bulunamadı. Lütfen farklı bir kelime deneyin.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"><i class="fas ${item.icon}"></i></div>
            <div class="product-cat">${item.category}</div>
            <div class="product-name">${item.name}</div>
            <div class="product-price">${item.price}</div>
            <button class="add-to-cart">SEPETE EKLE</button>
        `;
        catalogGrid.appendChild(card);
    });
}

function filterCategory(cat) {
    currentCatHeader.innerText = cat;
    if (cat === 'Hepsi') {
        renderCatalog(catalogData);
    } else {
        const filtered = catalogData.filter(item => item.category === cat);
        renderCatalog(filtered);
    }
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
