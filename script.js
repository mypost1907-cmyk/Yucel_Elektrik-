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
const logoBtn = document.getElementById('logoBtn');
const loginBtn = document.getElementById('loginBtn');
const listBtn = document.getElementById('listBtn');
const cartBtn = document.getElementById('cartBtn');

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
    // Switch to home view but don't render everything yet
    catalogGrid.innerHTML = '';
    currentCatHeader.parentElement.style.display = 'block';
    window.scrollTo(0, 0);

    currentCatHeader.innerText = cat;
    if (cat === 'Hepsi') {
        renderCatalog(catalogData);
    } else {
        const filtered = catalogData.filter(item => item.category === cat);
        renderCatalog(filtered);
    }
}

function showHome() {
    catalogGrid.innerHTML = '';
    currentCatHeader.parentElement.style.display = 'block';
    renderCatalog(catalogData);
    window.scrollTo(0, 0);
}

function showPage(pageId) {
    currentCatHeader.parentElement.style.display = 'none';
    catalogGrid.innerHTML = `<div class="info-page"></div>`;
    const infoPage = catalogGrid.querySelector('.info-page');
    infoPage.style.gridColumn = "1/-1";
    infoPage.style.padding = "2rem";
    infoPage.style.background = "white";
    infoPage.style.borderRadius = "8px";

    const pages = {
        'hakkimizda': '<h2>Hakkımızda</h2><p>Yücel Elektrik, 20 yılı aşkın tecrübesiyle elektrik malzemeleri ve profesyonel işçilik hizmetleri sunan, sektörün öncü firmalarından biridir. Kaliteli malzeme ve güvenilir işçilik prensibiyle çalışıyoruz.</p>',
        'banka': '<h2>Banka Hesap Bilgileri</h2><p>Ödemelerinizi aşağıdaki IBAN numaralarına yapabilirsiniz. Açıklama kısmına sipariş numaranızı eklemeyi unutmayın.</p><ul><li>TRXX XXXX XXXX XXXX XXXX XX - Yücel Elektrik Tic. Ltd. Şti.</li></ul>',
        'iletisim': '<h2>İletişim</h2><p>Adres: Merkez Mah. Elektrik Sk. No:42 İstanbul</p><p>Telefon: 05XX XXX XX XX</p><p>E-posta: info@yucelelektrik.com</p>',
        'kvkk': '<h2>KVKK Politikası</h2><p>Kişisel verilerinizin korunması bizim için önemlidir. Verileriniz 6698 sayılı KVKK kapsamında güvence altındadır.</p>',
        'iade': '<h2>Garanti ve İade</h2><p>Tüm ürünlerimiz 2 yıl üretici garantisindedir. 14 gün içerisinde koşulsuz iade hakkınız bulunmaktadır.</p>',
        'sss': '<h2>Sıkça Sorulan Sorular</h2><p><strong>S: Kargo ne zaman ulaşır?</strong><br>C: Saat 15:00\'e kadar verilen siparişler aynı gün kargolanır.</p>',
        'kargo': '<h2>Kargo Takibi</h2><p>Kargo takip numaranız SMS ile tarafınıza iletilecektir. Buradan sorgulama yapabilirsiniz.</p><input type="text" placeholder="Takip No" style="padding:10px; margin-top:10px;">',
        'odeme': '<h2>Ödeme Seçenekleri</h2><p>Kredi Kartı, EFT/Havale ve Kapıda Ödeme seçeneklerimiz mevcuttur.</p>',
        'login': '<h2>Müşteri Girişi</h2><form style="display:flex; flex-direction:column; gap:1rem; max-width:300px;"><input type="email" placeholder="E-posta"><input type="password" placeholder="Şifre"><button class="add-to-cart">Giriş Yap</button></form>',
        'list': '<h2>Favori Listem</h2><p>Henüz favori listenizde ürün bulunmamaktadır.</p>',
        'cart': '<h2>Alışveriş Sepetim</h2><p>Sepetiniz şu an boş. Alışverişe devam etmek için ana sayfaya dönebilirsiniz.</p>'
    };

    infoPage.innerHTML = pages[pageId] || '<h2>Sayfa Bulunamadı</h2>';
    window.scrollTo(0, 0);
}

// Initial Render
renderCatalog(catalogData);

// Search Logic
searchInput.addEventListener('input', (e) => {
    showHome();
    const term = e.target.value.toLowerCase();
    const filtered = catalogData.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.details.toLowerCase().includes(term)
    );
    renderCatalog(filtered);
});

logoBtn.addEventListener('click', showHome);
loginBtn.addEventListener('click', () => showPage('login'));
listBtn.addEventListener('click', () => showPage('list'));
cartBtn.addEventListener('click', () => showPage('cart'));
