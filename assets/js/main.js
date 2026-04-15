window._vanta = VANTA.NET({
	el: "#vanta-bg",
	mouseControls: true,
	touchControls: true,
	gyroControls: false,
	minHeight: 200,
	minWidth: 200,
	color: 0xffffff,
	backgroundColor: 0x050508,
	points: 12,
	maxDistance: 20,
	spacing: 18,
});

// Initialize Year's
document.getElementById("year").textContent = new Date().getFullYear();

AOS.init({
	once: false,
	mirror: true,
	offset: 80,
	easing: "ease-out-quart",
});

// CURSOR
/*
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mx = 0,
	my = 0,
	rx = 0,
	ry = 0;

document.addEventListener("mousemove", (e) => {
	mx = e.clientX;
	my = e.clientY;
	cursor.style.left = mx + "px";
	cursor.style.top = my + "px";
});

function animRing() {
	rx += (mx - rx) * 0.12;
	ry += (my - ry) * 0.12;
	cursorRing.style.left = rx + "px";
	cursorRing.style.top = ry + "px";
	requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll("a, button, .service-row, .file-card, .product-card, .team-card, .partner-item").forEach((el) => {
	el.addEventListener("mouseenter", () => {
		cursor.classList.add("hover");
		cursorRing.classList.add("hover");
	});
	el.addEventListener("mouseleave", () => {
		cursor.classList.remove("hover");
		cursorRing.classList.remove("hover");
	});
});
*/
// CURSOR

const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("progress");
const heroTitle = document.getElementById("heroTitle");
const heroSub = document.getElementById("heroSub");
const scrollHint = document.getElementById("scrollHint");

let cur = 0,
	tgt = 0;

window.addEventListener("scroll", () => {
	tgt = window.scrollY;
	navbar.classList.toggle("scrolled", tgt > 60);
	scrollHint.classList.toggle("hidden", tgt > 80);
});

function frame() {
	cur += (tgt - cur) * 0.08;
	const max = document.documentElement.scrollHeight - window.innerHeight;
	const pct = cur / max;
	progressBar.style.width = pct * 100 + "%";
	heroTitle.style.transform = `translateY(${cur * -0.45}px)`;
	heroTitle.style.opacity = Math.max(0, 1 - pct * 4);
	heroSub.style.transform = `translateY(${cur * -0.2}px)`;
	heroSub.style.opacity = Math.max(0, 1 - pct * 5);
	requestAnimationFrame(frame);
}
frame();

new Swiper(".testi-swiper", {
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	grabCursor: true,
	autoplay: {
		delay: 4500,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		768: { slidesPerView: 2 },
		1024: { slidesPerView: 3 },
	},
});

const map = L.map("map", { zoomControl: false, scrollWheelZoom: false }).setView([-6.1667033435294485, 106.87250731702541], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

const markerIcon = L.divIcon({
	className: "",
	html: `<div style="
    width:30px;height:30px;
    background:#e74c3c;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.4);
  "></div>`,
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});

L.marker([-6.1667033435294485, 106.87250731702541], { icon: markerIcon }).addTo(map).bindPopup(`<b style="font-family:monospace;font-size:11px">NUBARA LABS</b><br><span style="font-family:monospace;font-size:10px;color:#666">Jakarta, Indonesia</span>`).openPopup();

window.onbeforeunload = () => window.scrollTo(0, 0);

// ── LANGUAGE SWITCHER ──────────────────────────────────
const translations = {
    en: {
        // NAV
        "nav-about":    "About",
        "nav-services": "Services",
        "nav-portfolio":"Works",
        "nav-shop":     "Shop",
        "nav-team":     "Team",
        "nav-contact":  "Contact",
        "nav-cta":      "View Solutions →",

        // HERO
        "hero-tag":     "Full-Service Digital Studio",
        "hero-sub":     "We design and build digital systems — from software platforms to smart technology solutions.",

        // MARQUEE — biarkan, sudah double jadi tidak perlu ganti

        // ABOUT
        "about-eyebrow":    "About Us",
        "about-title":      "We craft digital<br><em>experiences</em><br>that matter.",
        "about-body":       "Nubara is a full-service digital studio that combines technical expertise with design acumen. We build digital products that not only function—but also impress.",
        "stat-projects":    "Projects",
        "stat-clients":     "Clients",
        "stat-exp":         "Experience",
        "card1-title":      "Pixel Perfect",
        "card1-body":       "Every detail is designed with high precision, from typography to spacing.",
        "card2-title":      "Tech Driven",
        "card2-body":       "Modern technology, optimal performance, and scalable for the future.",
        "card3-title":      "Result Focused",
        "card3-body":       "Every design and technical decision is based on real business impact.",
        "card4-title":      "Full Service",
        "card4-body":       "From concept to launch — we handle every aspect of your digital product.",

        // SERVICES
        "services-title":   "What We<br><em>Do Best</em>",
        "services-desc":    "We build industrial systems, web platforms, mobile apps, and IoT solutions using modern and reliable technologies.",
        "svc1": "Desktop Application Development",
        "svc2": "Web Application Development",
        "svc3": "Frontend & Landing Page Development",
        "svc4": "Mobile Application Development",
        "svc5": "IoT & Smart System Development",
        "svc6": "System Integration & Data Monitoring",

        // PORTFOLIO
        "portfolio-title":  "Selected<br><em>Works</em>",
        "portfolio-link":   "View all projects",

        // SHOP
        "shop-title":       "Digital & Smart<br><em>Products</em>",
        "shop-browse":      "Browse all →",
        "prod1-cat":    "Documentation",
        "prod1-name":   "Writing & Presentation Service",
        "prod1-price":  "Start from IDR 100.000 (Negotiable)",
        "prod2-cat":    "Digital Services",
        "prod2-name":   "Web<br>Development",
        "prod2-price":  "Start from IDR 1.500.000 (Negotiable)",
        "prod3-cat":    "Software Solutions",
        "prod3-name":   "Mobile & Desktop Application",
        "prod3-price":  "Start from IDR 3.000.000 (Negotiable)",
        "prod4-cat":    "Creative Solutions",
        "prod4-name":   "Design & Visual<br>Concept",
        "prod4-price":  "Start from IDR 700.000 (Negotiable)",
        "prod5-cat":    "Smart Technology",
        "prod5-name":   "Smart System Development",
        "prod5-price":  "IDR (Negotiable)",

        // TEAM
        "team-eyebrow": "The People",
        "team-title":   "Meet the<br><em>Team</em>",

        // TESTIMONIALS
        "testi-eyebrow": "Client Say",
        "testi-title":   "What They<br><em>Say</em>",

        // PARTNERS
        "partners-eyebrow": "Trusted By",
        "partners-title":   "Our Partners & Clients",

        // CONTACT
        "contact-eyebrow":  "Contact",
        "contact-title":    "Let's Build<br>Something<br><em>Together</em>",
        "contact-body":     "Have a project you'd like to see realized? We're always open to new collaborations. Tell us your vision, and let's make it happen together.<br><br>Prefer a quick chat? Reach us directly on WhatsApp — we typically respond within a few hours.",
        "form-name-label":      "Your Name",
        "form-name-ph":         "Your Name",
        "form-email-label":     "Email Address",
        "form-email-ph":        "Your Email",
        "form-project-label":   "Project Type",
        "form-project-ph":      "e.g. Web Development, UI/UX...",
        "form-msg-label":       "Message",
        "form-msg-ph":          "Tell us about your project...",
        "form-submit":          "Send Message →",
    },

    id: {
        // NAV
        "nav-about":    "Tentang",
        "nav-services": "Layanan",
        "nav-portfolio":"Karya",
        "nav-shop":     "Toko",
        "nav-team":     "Tim",
        "nav-contact":  "Kontak",
        "nav-cta":      "Lihat Solusi →",

        // HERO
        "hero-tag":     "Studio Digital Terlengkap",
        "hero-sub":     "Kami merancang & membangun sistem digital — dari platform software hingga solusi teknologi cerdas.",

        // ABOUT
        "about-eyebrow":    "Tentang Kami",
        "about-title":      "Kami menciptakan<br><em>pengalaman</em><br>digital bermakna.",
        "about-body":       "Nubara adalah studio digital terlengkap yang memadukan keahlian teknis dengan kepekaan desain. Kami membangun produk digital yang tidak hanya berfungsi — tapi juga berkesan.",
        "stat-projects":    "Proyek",
        "stat-clients":     "Klien",
        "stat-exp":         "Pengalaman",
        "card1-title":      "Presisi Tinggi",
        "card1-body":       "Setiap detail dirancang dengan presisi tinggi, mulai dari tipografi hingga jarak antar elemen.",
        "card2-title":      "Berbasis Teknologi",
        "card2-body":       "Teknologi modern, performa optimal, dan siap berkembang untuk masa depan.",
        "card3-title":      "Fokus pada Hasil",
        "card3-body":       "Setiap keputusan desain dan teknis didasarkan pada dampak bisnis yang nyata.",
        "card4-title":      "Layanan Penuh",
        "card4-body":       "Dari konsep hingga peluncuran — kami menangani setiap aspek produk digital Anda.",

        // SERVICES
        "services-title":   "Yang Kami<br><em>Kuasai</em>",
        "services-desc":    "Kami membangun sistem industri, platform web, aplikasi mobile, dan solusi IoT menggunakan teknologi modern dan andal.",
        "svc1": "Pengembangan Aplikasi Desktop",
        "svc2": "Pengembangan Aplikasi Web",
        "svc3": "Pengembangan Frontend & Landing Page",
        "svc4": "Pengembangan Aplikasi Mobile",
        "svc5": "Pengembangan IoT & Sistem Cerdas",
        "svc6": "Integrasi Sistem & Pemantauan Data",

        // PORTFOLIO
        "portfolio-title":  "Karya<br><em>Pilihan</em>",
        "portfolio-link":   "Lihat semua proyek",

        // SHOP
        "shop-title":       "Produk Digital &<br><em>Cerdas</em>",
        "shop-browse":      "Lihat semua →",
        "prod1-cat":    "Dokumentasi",
        "prod1-name":   "Layanan Penulisan & Presentasi",
        "prod1-price":  "Mulai dari IDR 100.000 (Negotiable)",
        "prod2-cat":    "Layanan Digital",
        "prod2-name":   "Pembuatan<br>Website",
        "prod2-price":  "Mulai dari IDR 1.500.000 (Negotiable)",
        "prod3-cat":    "Solusi Perangkat Lunak",
        "prod3-name":   "Aplikasi Mobile & Desktop",
        "prod3-price":  "Mulai dari IDR 3.000.000 (Negotiable)",
        "prod4-cat":    "Solusi Kreatif",
        "prod4-name":   "Desain & Konsep<br>Visual",
        "prod4-price":  "Mulai dari IDR 700.000 (Negotiable)",
        "prod5-cat":    "Teknologi Cerdas",
        "prod5-name":   "Pengembangan Sistem Cerdas",
        "prod5-price":  "IDR (Negotiable)",

        // TEAM
        "team-eyebrow": "Tim Kami",
        "team-title":   "Kenalan dengan<br><em>Tim</em>",

        // TESTIMONIALS
        "testi-eyebrow": "Kata Klien",
        "testi-title":   "Apa Kata<br><em>Mereka</em>",

        // PARTNERS
        "partners-eyebrow": "Dipercaya Oleh",
        "partners-title":   "Mitra & Klien Kami",

        // CONTACT
        "contact-eyebrow":  "Kontak",
        "contact-title":    "Mari Bangun<br>Sesuatu<br><em>Bersama</em>",
        "contact-body":     "Punya proyek yang ingin diwujudkan? Kami selalu terbuka untuk kolaborasi baru. Ceritakan visi Anda, dan mari kita wujudkan bersama.<br><br>Lebih suka ngobrol langsung? Hubungi kami via WhatsApp — kami biasanya membalas dalam beberapa jam.",
        "form-name-label":      "Nama Anda",
        "form-name-ph":         "Nama Anda",
        "form-email-label":     "Alamat Email",
        "form-email-ph":        "Email Anda",
        "form-project-label":   "Jenis Proyek",
        "form-project-ph":      "mis. Web Development, UI/UX...",
        "form-msg-label":       "Pesan",
        "form-msg-ph":          "Ceritakan tentang proyek Anda...",
        "form-submit":          "Kirim Pesan →",
    }
};

// Tambahkan data-i18n ke elemen HTML via JS (sekali jalan saat halaman load)
function bindI18nKeys() {
    const map = [
        // NAV
        ['.nav-links li:nth-child(1) a',    'nav-about',     'text'],
        ['.nav-links li:nth-child(2) a',    'nav-services',  'text'],
        ['.nav-links li:nth-child(3) a',    'nav-portfolio', 'text'],
        ['.nav-links li:nth-child(4) a',    'nav-shop',      'text'],
        ['.nav-links li:nth-child(5) a',    'nav-team',      'text'],
        ['.nav-links li:nth-child(6) a',    'nav-contact',   'text'],
        ['.nav-cta',                         'nav-cta',       'text'],

        // HERO
        ['.hero-tag',   'hero-tag', 'text'],
        ['.hero-sub',   'hero-sub', 'text'],

        // ABOUT
        ['.about-left .eyebrow',                    'about-eyebrow', 'text'],
        ['.about-title',                             'about-title',   'html'],
        ['.about-body',                              'about-body',    'text'],
        ['.about-stats .stat-item:nth-child(1) .lbl','stat-projects','text'],
        ['.about-stats .stat-item:nth-child(2) .lbl','stat-clients', 'text'],
        ['.about-stats .stat-item:nth-child(3) .lbl','stat-exp',     'text'],
        ['.about-card:nth-child(1) h4', 'card1-title','text'],
        ['.about-card:nth-child(1) p',  'card1-body', 'text'],
        ['.about-card:nth-child(2) h4', 'card2-title','text'],
        ['.about-card:nth-child(2) p',  'card2-body', 'text'],
        ['.about-card:nth-child(3) h4', 'card3-title','text'],
        ['.about-card:nth-child(3) p',  'card3-body', 'text'],
        ['.about-card:nth-child(4) h4', 'card4-title','text'],
        ['.about-card:nth-child(4) p',  'card4-body', 'text'],

        // SERVICES
        ['.services-title',                         'services-title','html'],
        ['.services-desc',                          'services-desc', 'text'],
        ['.service-row:nth-child(1) .service-name', 'svc1','text'],
        ['.service-row:nth-child(2) .service-name', 'svc2','text'],
        ['.service-row:nth-child(3) .service-name', 'svc3','text'],
        ['.service-row:nth-child(4) .service-name', 'svc4','text'],
        ['.service-row:nth-child(5) .service-name', 'svc5','text'],
        ['.service-row:nth-child(6) .service-name', 'svc6','text'],

        // PORTFOLIO
        ['.portfolio-title', 'portfolio-title','html'],
        ['.portfolio-link',  'portfolio-link', 'text'],

        // SHOP
        ['.shop-title',                                     'shop-title',  'html'],
        ['.shop-header .portfolio-link',                    'shop-browse', 'text'],
        ['.product-card:nth-child(1) .product-cat',  'prod1-cat',  'text'],
        ['.product-card:nth-child(1) .product-name', 'prod1-name', 'html'],
        ['.product-card:nth-child(2) .product-cat',  'prod2-cat',  'text'],
        ['.product-card:nth-child(2) .product-name', 'prod2-name', 'html'],
        ['.product-card:nth-child(3) .product-cat',  'prod3-cat',  'text'],
        ['.product-card:nth-child(3) .product-name', 'prod3-name', 'html'],
        ['.product-card:nth-child(4) .product-cat',  'prod4-cat',  'text'],
        ['.product-card:nth-child(4) .product-name', 'prod4-name', 'html'],
        ['.product-card:nth-child(5) .product-cat',  'prod5-cat',  'text'],
        ['.product-card:nth-child(5) .product-name', 'prod5-name', 'html'],

        // TEAM
        ['.team-header .eyebrow', 'team-eyebrow','text'],
        ['.team-title',           'team-title',  'html'],

        // TESTIMONIALS
        ['.testi-header .eyebrow', 'testi-eyebrow','text'],
        ['.testi-title',           'testi-title',  'html'],

        // PARTNERS
        ['#partners .eyebrow',  'partners-eyebrow','text'],
        ['.partners-title',     'partners-title',  'text'],

        // CONTACT
        ['.contact-left .eyebrow',  'contact-eyebrow','text'],
        ['.contact-title',          'contact-title',  'html'],
        ['.contact-body',           'contact-body',   'html'],
        ['.form-submit',            'form-submit',    'text'],
    ];

    map.forEach(([sel, key, type]) => {
        const el = document.querySelector(sel);
        if (el) {
            el.dataset.i18n     = key;
            el.dataset.i18nType = type;
        }
    });

    // Form labels & placeholders — tangani terpisah
    const formFields = [
        { labelSel: '.form-group:nth-child(1) .form-label', inputSel: '.form-group:nth-child(1) .form-input', labelKey: 'form-name-label',    phKey: 'form-name-ph'    },
        { labelSel: '.form-group:nth-child(2) .form-label', inputSel: '.form-group:nth-child(2) .form-input', labelKey: 'form-email-label',   phKey: 'form-email-ph'   },
        { labelSel: '.form-group:nth-child(3) .form-label', inputSel: '.form-group:nth-child(3) .form-input', labelKey: 'form-project-label', phKey: 'form-project-ph' },
        { labelSel: '.form-group:nth-child(4) .form-label', inputSel: '.form-group:nth-child(4) .form-input', labelKey: 'form-msg-label',     phKey: 'form-msg-ph'     },
    ];
    formFields.forEach(({ labelSel, inputSel, labelKey, phKey }) => {
        const label = document.querySelector(labelSel);
        const input = document.querySelector(inputSel);
        if (label) { label.dataset.i18n = labelKey; label.dataset.i18nType = 'text'; }
        if (input) { input.dataset.i18nPh = phKey; }
    });
}

function applyLang(lang) {
    const t = translations[lang];

    // teks & html biasa
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!t[key]) return;
        if (el.dataset.i18nType === 'html') el.innerHTML = t[key];
        else el.textContent = t[key];
    });

    // placeholder form
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.dataset.i18nPh;
        if (t[key]) el.placeholder = t[key];
    });

    // product price (teks sebelum <span>)
    const priceKeys = ['prod1-price','prod2-price','prod3-price','prod4-price','prod5-price'];
    document.querySelectorAll('.product-price').forEach((el, i) => {
        const span = el.querySelector('span');
        const spanHTML = span ? span.outerHTML : '';
        el.innerHTML = (t[priceKeys[i]] || '') + ' ' + spanHTML;
    });

    // update tombol & flag
    const btn = document.getElementById('langToggleBtn');
    if (lang === 'en') {
        btn.innerHTML = `<span class="lang-flag">🇺🇸</span><span class="lang-label">EN</span>`;
    } else {
        btn.innerHTML = `<span class="lang-flag">🇮🇩</span><span class="lang-label">ID</span>`;
    }

    // update html lang attr
    document.documentElement.lang = lang === 'id' ? 'id' : 'en';

    // simpan preferensi
    localStorage.setItem('nubara-lang', lang);
}

// Toggle saat klik
let currentLang = localStorage.getItem('nubara-lang') || 'en';

document.getElementById('langToggleBtn').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'id' : 'en';
    applyLang(currentLang);
});

// Jalankan saat halaman pertama load
bindI18nKeys();
applyLang(currentLang);

// ── THEME SWITCHER ──────────────────────────────────
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeDropdown = document.getElementById("themeDropdown");

const themeVanta = {
	dark: { color: 0xffffff, backgroundColor: 0x050508, maxDistance: 20, points: 12, spacing: 18 },
	light: { color: 0x222222, backgroundColor: 0xf5f5f0, maxDistance: 20, points: 12, spacing: 18 },
};

function applyTheme(name) {
	document.documentElement.setAttribute("data-theme", name);
	document.querySelectorAll(".theme-btn").forEach((b) => b.classList.toggle("active", b.dataset.t === name));
	const v = themeVanta[name];
	if (v && window._vanta) {
		// Destroy & recreate
		window._vanta.destroy();
		window._vanta = VANTA.NET({
			el: "#vanta-bg",
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200,
			minWidth: 200,
			color: v.color,
			backgroundColor: v.backgroundColor,
			points: v.points,
			maxDistance: v.maxDistance,
			spacing: v.spacing,
		});
	}
	localStorage.setItem("nubara-theme", name);

	// ganti icon sesuai theme
	const icon = themeToggleBtn.querySelector("i");
	if (icon) icon.className = name === "dark" ? "bx bx-moon" : "bx bx-sun";
}

document.querySelectorAll(".theme-btn").forEach((btn) => btn.addEventListener("click", () => applyTheme(btn.dataset.t)));

// DEFAULT THEME IF localStorage = null / ""
applyTheme(localStorage.getItem("nubara-theme") || "dark");

themeToggleBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	const isOpen = themeDropdown.dataset.open === "true";
	if (!isOpen) {
		themeDropdown.style.display = "flex";
		requestAnimationFrame(() => {
			themeDropdown.style.opacity = "1";
			themeDropdown.style.transform = "translateX(-50%) scaleY(1)";
		});
		themeDropdown.dataset.open = "true";
	} else {
		closeDropdown();
	}
});

function closeDropdown() {
	themeDropdown.style.opacity = "0";
	themeDropdown.style.transform = "translateX(-50%) scaleY(0.85)";
	setTimeout(() => {
		themeDropdown.style.display = "none";
	}, 220);
	themeDropdown.dataset.open = "false";
}

document.addEventListener("click", closeDropdown);
themeDropdown.addEventListener("click", (e) => e.stopPropagation());

// ── WHATSAPP ORDER ────────────────────────────────────────────────
const WA_NUMBER = "6281379544107";

document.querySelectorAll(".product-wa-btn").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const product = btn.dataset.product;
		const price = btn.dataset.price;
		const message = `Hi Nubara! I'm interested in ordering:\nProduct:*${product}*\nPrice: ${price}\n\nPlease provide more information...`;
		window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
	});
});

// ── CONTACT MESSAGE ────────────────────────────────────────────────
document.getElementById("contactSubmit").addEventListener("click", () => {
	const name = document.querySelector('input[placeholder="Your Name"]').value.trim();
	const email = document.querySelector('input[placeholder="Your Email"]').value.trim();
	const projectType = document.querySelector('input[placeholder="e.g. Web Development, UI/UX..."]').value.trim();
	const message = document.querySelector("textarea").value.trim();

	const text = `Hi Nubara! I have a project inquiry:\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nMessage:\n${message}`;
	window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
	document.querySelector(".contact-form").reset();
});
