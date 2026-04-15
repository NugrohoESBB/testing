const projectData = [
	{
		title: "AkaNova · Unique Code",
		category: "Desktop App",
		year: "2026",
		img: "assets/img/portfolio/Portfolio1.png",
		desc: "AkaNova Unique Code is a desktop application built to generate and manage unique codes, automatically transmitting them to TransX CodeJet printers to support high-speed product coding in manufacturing environments.",
		client: "Indofood CBP",
		duration: "1 Months",
		role: "Full Stack",
		stack: [".NET", "C#", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Send Data",
		category: "Desktop App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio7.png",
		desc: "AkaNova Send Data is a desktop application that delivers structured print data to Citronix CI5500 industrial printers, enabling automated product coding and stable communication with production equipment.",
		client: "Corinthian Doors",
		duration: "1 Months",
		role: "Full Stack",
		stack: [".NET", "C#", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Landing Page",
		category: "Web App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio2.png",
		desc: "AkaNova Dashboard landing page built to present product information, highlight key features, and deliver a modern responsive experience across all devices.",
		client: "Gunadarma University Students",
		duration: "2 Weeks",
		role: "FrontEnd",
		stack: ["HTML", "CSS", "JS", "Bootstrap", "Leaflet.js"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Restaurant Management",
		category: "Web App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio3.jpg",
		desc: "AkaNova Dashboard is a web-based restaurant management interface that visualizes operational data such as orders, revenue, guest statistics, and menu performance through interactive analytics and real-time monitoring.",
		client: "Gunadarma University Students",
		duration: "1 Months",
		role: "Full Stack",
		stack: ["Laravel", "Bootstrap", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Company Profile",
		category: "Web App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio4.jpg",
		desc: "AkaNova Company Profile is a corporate profile website designed to communicate company expertise, services, and strategic capabilities through a modern UI, structured content layout, and engaging visual presentation.",
		client: "Gunadarma University Students",
		duration: "2 Weeks",
		role: "FrontEnd",
		stack: ["HTML", "CSS", "JS", "Bootstrap", "Leaflet.js"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · SmartKasir",
		category: "Desktop App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio5.png",
		desc: "AkaNova SmartKasir is a desktop Point of Sale system built to streamline retail transactions, manage product inventory, process multiple payment methods, and generate sales reports efficiently.",
		client: "Gunadarma University Students",
		duration: "1 Months",
		role: "Full Stack",
		stack: [".NET", "C#", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · StokKu",
		category: "Mobile App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio6.png",
		desc: "AkaNova StokKu is a mobile inventory management application built to help businesses monitor stock levels, manage product movements, and maintain accurate inventory records in real time.",
		client: "Business Owner",
		duration: "5 Weeks",
		role: "Full Stack",
		stack: ["Kotlin", "Spreatsheet"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · CoreStage",
		category: "Web App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio8.JPG",
		desc: "AkaNova CoreStage is a web-based academic management platform built to handle student information, course data, and grading records through a structured administrative dashboard.",
		client: "One of the high schools in Bengkulu",
		duration: "1 Months",
		role: "Full Stack",
		stack: ["Laravel", "Bootstrap", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Smart System",
		category: "IoT",
		year: "2025",
		img: "assets/img/portfolio/Portfolio9.jpg",
		desc: "Modular IoT platform developed for academic and research purposes, integrating sensors, controllers, and monitoring dashboards to support smart agriculture, hydroponics, smart parking, and other automated systems.",
		client: "Gunadarma University Students",
		duration: "5 Weeks",
		role: "Full Stack",
		stack: ["Arduino", "ESP8266/ESP32", "Raspberry PI", "Sensor", "Web App", "Desktop App", "MySQL"],
		live: "#",
		github: "#",
	},
	{
		title: "AkaNova · Smart System App",
		category: "Smart System App",
		year: "2025",
		img: "assets/img/portfolio/Portfolio10.jpg",
		desc: "Smart system web platform that integrates IoT devices, providing real-time monitoring, data visualization, and remote control capabilities for automated environments.",
		client: "Gunadarma University Students",
		duration: "5 Weeks",
		role: "Full Stack",
		stack: ["PHP", "Laravel", "Bootstrap", ".NET", "C#", "Kotlin", "MySQL", "Spreatsheet"],
		live: "#",
		github: "#",
	},
];

// ── MODAL LOGIC ───────────────────────────────────────────────
const overlay = document.getElementById("projOverlay");
const closeBtn = document.getElementById("projClose");
const projImg = document.getElementById("projImg");
const projTabCat = document.getElementById("projTabCat");
const projTabYr = document.getElementById("projTabYear");
const projCat = document.getElementById("projCat");
const projYrTxt = document.getElementById("projYearText");
const projTitle = document.getElementById("projTitle");
const projDesc = document.getElementById("projDesc");
const projClient = document.getElementById("projClient");
const projDur = document.getElementById("projDuration");
const projRole = document.getElementById("projRole");
const projStack = document.getElementById("projStack");
const projLive = document.getElementById("projLiveBtn");
const projGithub = document.getElementById("projGithubBtn");

function openModal(index) {
	const p = projectData[index];
	if (!p) return;

	// Isi konten
	projImg.src = p.img;
	projImg.alt = p.title;
	projTabCat.textContent = p.category;
	projTabYr.textContent = p.year;
	projCat.textContent = p.category;
	projYrTxt.textContent = p.year;
	projTitle.textContent = p.title;
	projDesc.textContent = p.desc;
	projClient.textContent = p.client;
	projDur.textContent = p.duration;
	projRole.textContent = p.role;

	// Tech stack pills
	projStack.innerHTML = p.stack.map((s) => `<span class="proj-stack-pill">${s}</span>`).join("");

	// Live link
	if (p.live) {
		projLive.href = p.live;
		projLive.style.display = "inline-flex";
	} else {
		projLive.style.display = "none";
	}

	// GitHub link
	if (p.github) {
		projGithub.href = p.github;
		projGithub.style.display = "inline-flex";
	} else {
		projGithub.style.display = "none";
	}

	// Reset scroll modal
	document.getElementById("projModal").scrollTop = 0;

	// Show
	overlay.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closeModal() {
	overlay.classList.remove("active");
	document.body.style.overflow = "";
}

// ── CONNECT TO .file-card EVENT ────────────────────────────────
document.querySelectorAll(".file-card").forEach((card, i) => {
	card.style.cursor = "pointer";
	card.addEventListener("click", () => openModal(i));
});

// Close modal
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
	if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") closeModal();
});
