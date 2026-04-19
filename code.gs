const SPREADSHEET_ID = "1NFhS-MaJ_iAX3N-3TbpzRNvCXhOx_0Wqbu4Pu4nGSAg";

// ================================================================
// HANDLER UTAMA
// ================================================================
function doGet(e) {
	const action = e.parameter.action;
	let result;
	try {
		if (action === "getMenu") result = getMenu();
		else if (action === "getOrders") result = getOrders();
		else if (action === "submitOrder") result = submitOrder(e.parameter);
		else if (action === "updateStatus")
			result = updateOrderStatus(e.parameter);
		else if (action === "saveMenu") {
			// ← tambah
			const item = JSON.parse(e.parameter.item);
			result = saveMenuItem({ item });
		} else result = { error: "Unknown action" };
	} catch (err) {
		result = { error: err.toString() };
	}
	return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
	let result;
	try {
		const payload = JSON.parse(e.postData.contents);
		const action = payload.action;
		if (action === "submitOrder") result = submitOrder(payload);
		else if (action === "updateStatus") result = updateOrderStatus(payload);
		else if (action === "saveMenu") result = saveMenuItem(payload);
		else result = { error: "Unknown action" };
	} catch (err) {
		result = { error: err.toString() };
	}
	const output = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
	return output;
}

// ================================================================
// MENU FUNCTIONS
// ================================================================
function getMenu() {
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	const sheet = ss.getSheetByName("Menu");
	if (!sheet) return { menu: [] };

	const rows = sheet.getDataRange().getValues();
	const headers = rows[0]; // [id, nama, kategori, harga, deskripsi, foto, tersedia]
	const menu = rows
		.slice(1)
		.map((row) => ({
			id: String(row[0]),
			nama: row[1],
			kategori: row[2],
			harga: Number(row[3]),
			deskripsi: row[4] || "",
			foto: row[5] || "",
			tersedia: row[6] === true || row[6] === "TRUE" || row[6] === 1,
		}))
		.filter((m) => m.nama);

	return { menu };
}

function saveMenuItem(payload) {
	const item = payload.item;
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	let sheet = ss.getSheetByName("Menu");
	if (!sheet) {
		sheet = ss.insertSheet("Menu");
		sheet.appendRow(["id", "nama", "kategori", "harga", "deskripsi", "foto", "tersedia"]);
	}

	const rows = sheet.getDataRange().getValues();
	const existingRow = rows.findIndex((r, i) => i > 0 && String(r[0]) === String(item.id));

	const rowData = [item.id, item.nama, item.kategori, item.harga, item.deskripsi || "", item.foto || "", item.tersedia];

	if (existingRow >= 0) {
		sheet.getRange(existingRow + 1, 1, 1, 7).setValues([rowData]);
		return { success: true, action: "updated" };
	} else {
		sheet.appendRow(rowData);
		return { success: true, action: "inserted" };
	}
}

// ================================================================
// ORDER FUNCTIONS
// ================================================================
// payload bisa dari GET params atau POST body
// Kalau dari GET, items perlu di-parse dari JSON string
function submitOrder(payload) {
	if (typeof payload.items === "string") {
		payload.items = JSON.parse(payload.items);
	}
	payload.total = Number(payload.total);

	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	let sheet = ss.getSheetByName("Orders");

	// Auto-buat sheet jika belum ada
	if (!sheet) {
		sheet = ss.insertSheet("Orders");
		sheet.appendRow(["Order ID", "Nomor Meja", "Nama Pelanggan", "Item Pesanan", "Total", "Catatan", "Waktu", "Status"]);
		// Format header
		sheet.getRange(1, 1, 1, 8).setBackground("#1A1714").setFontColor("#FFFFFF").setFontWeight("bold");
	}

	// Generate order ID
	const lastRow = sheet.getLastRow();
	const orderId = "#" + String(lastRow).padStart(4, "0");

	// Format items jadi string
	const itemsStr = payload.items.map((i) => `${i.nama} ×${i.qty} (Rp${i.subtotal.toLocaleString("id-ID")})`).join(", ");

	const waktu = new Date().toLocaleString("id-ID", {
		timeZone: "Asia/Jakarta",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	sheet.appendRow([orderId, payload.nomorMeja, payload.namaPelanggan || "", itemsStr, payload.total, payload.catatan || "", waktu, "Baru"]);

	// Format baris baru
	const newRow = sheet.getLastRow();
	sheet.getRange(newRow, 5).setNumberFormat('"Rp"#,##0');

	// Kirim notifikasi email (opsional — hapus jika tidak perlu)
	// sendOrderNotification(orderId, payload);

	return { success: true, orderId };
}

function getOrders() {
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	const sheet = ss.getSheetByName("Orders");
	if (!sheet) return { orders: [] };

	const rows = sheet.getDataRange().getValues();
	if (rows.length < 2) return { orders: [] };

	const orders = rows
		.slice(1)
		.reverse()
		.map((row) => {
			// Parse items dari string kembali ke array
			const itemsRaw = String(row[3]);
			// const items = itemsRaw.split(', ').map(s => {
			//   const match = s.match(/^(.+?) ×(\d+)/);
			//   return match ? { nama: match[1], qty: parseInt(match[2]) } : { nama: s, qty: 1 };
			// });
			const items = itemsRaw.split(", ").map((s) => {
				const match = s.match(/^(.+?) ×(\d+)(?: \(Rp([\d.,]+)\))?/);
				if (match) {
					// Hapus titik ribuan lalu parse jadi angka
					const subtotal = match[3] ? parseInt(match[3].replace(/\./g, "")) : 0;
					return {
						nama: match[1],
						qty: parseInt(match[2]),
						subtotal: subtotal,
					};
				}
				return { nama: s, qty: 1, subtotal: 0 };
			});

			return {
				id: row[0],
				nomorMeja: String(row[1]),
				namaPelanggan: row[2] || "",
				items,
				total: Number(row[4]) || 0,
				catatan: row[5] || "",
				waktu: row[6] || "",
				status: row[7] || "Baru",
			};
		});

	return { orders };
}

function updateOrderStatus(payload) {
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	const sheet = ss.getSheetByName("Orders");
	if (!sheet) return { error: "Sheet Orders tidak ditemukan" };

	const rows = sheet.getDataRange().getValues();
	const rowIdx = rows.findIndex((r, i) => i > 0 && r[0] === payload.orderId);

	if (rowIdx < 0) return { error: "Order tidak ditemukan" };

	// Kolom 8 = Status (index 7)
	sheet.getRange(rowIdx + 1, 8).setValue(payload.status);

	// Beri warna baris sesuai status
	const statusColors = {
		Baru: "#006eff",
		Diproses: "#ffae00",
		Selesai: "#00ff48",
		Batal: "#ff0000",
	};
	const color = statusColors[payload.status] || "#ffffff";
	sheet.getRange(rowIdx + 1, 1, 1, 8).setBackground(color);

	return { success: true };
}

// ================================================================
// NOTIFIKASI EMAIL (OPSIONAL)
// ================================================================
function sendOrderNotification(orderId, payload) {
	const email = Session.getActiveUser().getEmail(); // email pemilik
	const subject = `Pesanan Baru ${orderId} — Meja ${payload.nomorMeja}`;
	const body = `
Pesanan baru masuk!

Order ID : ${orderId}
Meja     : ${payload.nomorMeja}
Pelanggan: ${payload.namaPelanggan || "-"}
Waktu    : ${new Date().toLocaleString("id-ID")}

Item:
${payload.items.map((i) => `  - ${i.nama} ×${i.qty} = Rp${i.subtotal.toLocaleString("id-ID")}`).join("\n")}

Total    : Rp${payload.total.toLocaleString("id-ID")}
Catatan  : ${payload.catatan || "-"}
  `;
	try {
		MailApp.sendEmail(email, subject, body);
	} catch (e) {
		Logger.log("Email gagal dikirim: " + e);
	}
}

// ================================================================
// SETUP AWAL — Jalankan sekali untuk buat semua sheet
// ================================================================
function setupSheets() {
	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

	// Sheet: Menu
	let menuSheet = ss.getSheetByName("Menu");
	if (!menuSheet) menuSheet = ss.insertSheet("Menu");
	if (menuSheet.getLastRow() === 0) {
		menuSheet.appendRow(["id", "nama", "kategori", "harga", "deskripsi", "foto", "tersedia"]);
		menuSheet.getRange(1, 1, 1, 7).setBackground("#c4a882").setFontWeight("bold");
		// Data contoh
		const sampleMenu = [
			["1", "Kopi Susu", "Minuman", 28000, "Espresso dengan susu segar pilihan", "", true],
			["2", "Matcha Latte", "Minuman", 32000, "Matcha premium dengan susu oat", "", true],
			["3", "Es Teh Tarik", "Minuman", 18000, "Teh tarik segar dengan es batu", "", true],
			["4", "Cold Brew", "Minuman", 35000, "Kopi cold brew 12 jam brewing", "", true],
			["5", "Croissant Keju", "Makanan", 22000, "Croissant butter dengan keju mozarella", "", true],
			["6", "Roti Bakar Avocado", "Makanan", 35000, "Sourdough dengan avocado cream & telur", "", true],
			["7", "Tiramisu", "Dessert", 38000, "Tiramisu klasik dengan kopi espresso", "", true],
		];
		menuSheet.getRange(2, 1, sampleMenu.length, 7).setValues(sampleMenu);
	}

	// Sheet: Orders
	let ordersSheet = ss.getSheetByName("Orders");
	if (!ordersSheet) ordersSheet = ss.insertSheet("Orders");
	if (ordersSheet.getLastRow() === 0) {
		ordersSheet.appendRow(["Order ID", "Nomor Meja", "Nama Pelanggan", "Item Pesanan", "Total", "Catatan", "Waktu", "Status"]);
		ordersSheet.getRange(1, 1, 1, 8).setBackground("#c4a882").setFontColor("#ffffff").setFontWeight("bold");
		ordersSheet.setColumnWidth(4, 300);
		ordersSheet.setColumnWidth(7, 150);
	}

	Logger.log("Setup selesai!");
	SpreadsheetApp.getUi().alert("Setup berhasil! Sheet Menu dan Orders sudah siap.");
}
