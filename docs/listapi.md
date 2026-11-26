# Rancangan API Website Makanan

Dokumen ini menjadi acuan implementasi backend untuk konten website, menu, pembayaran Midtrans, dan serah terima pesanan. Semua endpoint di bawah merupakan usulan kontrak API, belum berarti sudah tersedia di proyek.

## 1. Ruang lingkup dan asumsi

Kebutuhan utama:

1. CRUD banner homepage.
2. CRUD FAQ.
3. CRUD rating/ulasan.
4. CRUD kisah makanan, termasuk banner gambar dan paragraf cerita.
5. CRUD menu.
6. Pemesanan, pembayaran Midtrans, penerbitan kode 4 digit setelah pembayaran valid, dan penyelesaian pesanan setelah admin memverifikasi kode saat serah terima.

Asumsi rancangan awal:

- Pelanggan harus login untuk memesan dan melihat kode pengambilan. Admin memiliki role terpisah.
- Pesanan diambil langsung di restoran. Pengiriman, alamat, ongkir, voucher, dan reservasi meja belum termasuk.
- Pembayaran menggunakan Midtrans Snap dengan mata uang IDR.
- Kisah berupa kumpulan paragraf teks biasa. Admin dapat menyimpan beberapa kisah, tetapi hanya satu yang aktif untuk halaman publik.
- Rating berasal dari pelanggan yang sudah menyelesaikan pesanan. Admin mengelola publikasi dan moderasinya.
- Menu memakai status tersedia/tidak tersedia. Pengelolaan jumlah stok belum termasuk MVP.
- Semua batas panjang, masa pembayaran, dan batas percobaan di dokumen ini merupakan nilai awal yang dapat dikonfigurasi backend.

## 2. Konvensi API

Base path: `/api/v1`.

| Akses | Keterangan |
| --- | --- |
| Publik | Tanpa login; hanya konten aktif dan ulasan terpublikasi |
| Pelanggan | Login dan hanya boleh mengakses data miliknya |
| Admin | Login dengan role admin; setiap aksi penting dicatat |
| Midtrans | Webhook tanpa login pengguna; wajib validasi notifikasi provider |

Autentikasi dapat memakai session cookie HttpOnly atau bearer token sesuai arsitektur backend. Pilih satu kontrak untuk frontend; jika memakai cookie, terapkan proteksi CSRF pada operasi perubahan data. Jangan mempercayai role atau `customer_id` dari request body.

Aturan umum:

- ID berupa UUID/ULID string; contoh ID pendek di dokumen hanya ilustrasi.
- Waktu disimpan dalam UTC dan dikirim dalam ISO 8601. Frontend menampilkan zona `Asia/Jakarta`.
- Harga berupa integer rupiah, bukan floating point. Contoh `25000` berarti Rp25.000.
- List memakai `page=1&per_page=20`, maksimum `per_page=100`.
- Sort hanya menerima field yang diizinkan, contoh `sort=-created_at`.
- `PATCH` mengubah field yang dikirim saja. Field yang tidak dikirim tetap.
- `DELETE` konten menghapus secara soft delete; data pesanan dan snapshot historis tetap disimpan.
- Properti yang tidak dikenal ditolak agar kesalahan payload mudah terdeteksi.

Contoh respons sukses detail:

```json
{
  "data": { "id": "banner_1", "title": "Menu Spesial" },
  "message": "Data berhasil disimpan"
}
```

Contoh respons list:

```json
{
  "data": [],
  "meta": { "page": 1, "per_page": 20, "total": 0, "total_pages": 0 }
}
```

Contoh error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data belum valid",
    "fields": { "price": ["Harga harus lebih besar dari 0"] },
    "request_id": "req_123"
  }
}
```

| HTTP | Penggunaan |
| --- | --- |
| 200 | Baca atau ubah berhasil |
| 201 | Resource baru berhasil dibuat |
| 202 | Operasi eksternal masih diproses/hasilnya belum pasti |
| 204 | Hapus berhasil, tanpa body |
| 400 | Request tidak dapat dibaca |
| 401 / 403 | Belum login / tidak punya hak akses |
| 404 | Data tidak ditemukan; juga untuk akses pelanggan ke pesanan orang lain |
| 409 | Konflik status, data unik, atau idempotency key |
| 422 | Validasi field gagal |
| 429 | Terlalu banyak percobaan; sertakan `Retry-After` |
| 502 / 503 | Layanan pembayaran gagal/sementara tidak tersedia |

## 3. Autentikasi pendukung

Endpoint ini diperlukan bila backend belum memiliki autentikasi.

| Method | Endpoint | Akses | Fungsi/body |
| --- | --- | --- | --- |
| POST | `/auth/register` | Publik | Daftar pelanggan: `name`, `email`, `password`, `password_confirmation` |
| POST | `/auth/login` | Publik | Login: `email`, `password`; respons identitas dan role, serta session/token sesuai kontrak |
| POST | `/auth/logout` | Login | Mengakhiri session/token |
| GET | `/auth/me` | Login | Identitas pengguna aktif: `id`, `name`, `email`, `role` |

Role admin diberikan melalui proses internal yang terkontrol, bukan melalui registrasi publik. Password disimpan sebagai hash; endpoint login dan registrasi diberi rate limit.

## 4. Upload gambar

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| POST | `/admin/uploads` | Admin | Upload `multipart/form-data`: `file`, `purpose` |
| DELETE | `/admin/uploads/{id}` | Admin | Hapus file yang tidak lagi direferensikan resource |

`purpose`: `banner`, `story`, atau `menu`. Format awal JPEG, PNG, WebP; maksimum 5 MB. Validasi isi file dan MIME, jangan hanya ekstensi. Server membuat nama file sendiri. SVG tidak termasuk format awal.

Respons upload `201`:

```json
{
  "data": {
    "id": "upload_1",
    "url": "https://cdn.example.com/uploads/banner.webp",
    "mime_type": "image/webp",
    "size_bytes": 125000,
    "width": 1600,
    "height": 700
  }
}
```

Resource lain menyimpan `image_id` dari hasil upload, sementara respons baca menyertakan `image: { id, url, alt }`. Penghapusan upload yang masih dipakai menghasilkan `409 UPLOAD_IN_USE`. Upload yang belum direferensikan dapat dibersihkan berkala. Mengganti gambar tidak boleh menghapus file yang masih dipakai resource lain.

## 5. CRUD Banner Homepage

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/banners` | Publik | Banner aktif, urut `sort_order` naik |
| GET | `/admin/banners` | Admin | Semua banner, filter `is_active`, pencarian `q` |
| GET | `/admin/banners/{id}` | Admin | Detail banner |
| POST | `/admin/banners` | Admin | Membuat banner |
| PATCH | `/admin/banners/{id}` | Admin | Mengubah banner/urutan/status |
| DELETE | `/admin/banners/{id}` | Admin | Menghapus banner |

Body create:

```json
{
  "title": "Makanan Rumahan Favorit",
  "subtitle": "Pesan dan ambil langsung di restoran",
  "image_id": "upload_1",
  "image_alt": "Hidangan makanan rumahan",
  "button_label": "Lihat Menu",
  "button_url": "/menu",
  "sort_order": 1,
  "is_active": true
}
```

`title` wajib maksimal 150 karakter; `image_id` wajib; `subtitle` opsional maksimal 500 karakter; `image_alt` wajib maksimal 200 karakter. `button_label` dan `button_url` harus sama-sama terisi atau sama-sama kosong. URL hanya path internal atau HTTPS yang diizinkan, tidak menerima `javascript:`. `sort_order` integer >= 0, default 0; `is_active` default false.

## 6. CRUD FAQ

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/faqs` | Publik | FAQ aktif berdasarkan `sort_order` |
| GET | `/admin/faqs` | Admin | List, filter `is_active`, pencarian `q` |
| GET | `/admin/faqs/{id}` | Admin | Detail FAQ |
| POST | `/admin/faqs` | Admin | Membuat FAQ |
| PATCH | `/admin/faqs/{id}` | Admin | Mengubah FAQ |
| DELETE | `/admin/faqs/{id}` | Admin | Menghapus FAQ |

```json
{
  "question": "Bagaimana cara mengambil pesanan?",
  "answer": "Tunjukkan pesanan dan sampaikan kode pengambilan kepada admin.",
  "sort_order": 1,
  "is_active": true
}
```

`question` wajib maksimal 300 karakter; `answer` wajib maksimal 5000 karakter, teks biasa. `sort_order` integer >= 0, default 0; `is_active` default false.

## 7. CRUD Kisah Makanan

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/stories/current` | Publik | Kisah aktif beserta banner dan paragraf; `data: null` bila belum ada |
| GET | `/admin/stories` | Admin | Semua kisah, filter `is_active`, pencarian `q` |
| GET | `/admin/stories/{id}` | Admin | Detail kisah |
| POST | `/admin/stories` | Admin | Membuat kisah |
| PATCH | `/admin/stories/{id}` | Admin | Mengubah atau mengaktifkan kisah |
| DELETE | `/admin/stories/{id}` | Admin | Menghapus kisah |

```json
{
  "title": "Kisah Makanan Kami",
  "image_id": "upload_2",
  "image_alt": "Dapur tempat resep keluarga dibuat",
  "paragraphs": [
    "Perjalanan kami berawal dari resep keluarga.",
    "Setiap hidangan dibuat dengan bahan pilihan."
  ],
  "is_active": true
}
```

`title` wajib maksimal 200 karakter; `image_id` dan `image_alt` wajib. `paragraphs` wajib array berurutan berisi 1–30 string, masing-masing maksimal 5000 karakter. Update `paragraphs` mengganti seluruh array. Aktivasi kisah baru menonaktifkan kisah sebelumnya dalam satu transaksi database; paling banyak satu kisah aktif. `is_active` default false.

## 8. CRUD Menu

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/menus` | Publik | List menu aktif; filter `category`, `is_available`, `q` |
| GET | `/menus/{id}` | Publik | Detail menu aktif |
| GET | `/admin/menus` | Admin | Semua menu; filter `category`, `is_active`, `is_available`, `q` |
| GET | `/admin/menus/{id}` | Admin | Detail menu |
| POST | `/admin/menus` | Admin | Membuat menu |
| PATCH | `/admin/menus/{id}` | Admin | Mengubah harga, ketersediaan, dan konten |
| DELETE | `/admin/menus/{id}` | Admin | Soft delete menu |

```json
{
  "name": "Nasi Goreng",
  "description": "Nasi goreng dengan telur dan acar",
  "category": "makanan",
  "price": 25000,
  "image_id": "upload_3",
  "image_alt": "Sepiring nasi goreng",
  "is_available": true,
  "is_active": true,
  "sort_order": 1
}
```

`name` wajib maksimal 150 karakter; `description` opsional maksimal 2000 karakter; `category` awalnya enum `makanan` atau `minuman`; `price` integer > 0; `image_id` dan `image_alt` wajib. `is_available` default true, `is_active` default false, `sort_order` default 0.

Menu aktif tetapi tidak tersedia tetap boleh muncul di publik dengan label habis, tetapi tidak bisa dipesan. Menu nonaktif/dihapus tidak muncul di publik. Harga dan nama menu pada order disimpan sebagai snapshot agar perubahan menu tidak mengubah transaksi lama.

## 9. CRUD Rating / Ulasan

Rancangan awal: satu ulasan per pesanan selesai, menilai pengalaman pesanan secara keseluruhan. Rating per item menu dapat ditambahkan kemudian.

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/ratings` | Publik | Ulasan berstatus `published`, filter `score`, pagination |
| GET | `/ratings/summary` | Publik | `average_score`, `total_ratings`, `distribution` skor 1–5; hanya dari ulasan published |
| GET | `/me/ratings` | Pelanggan | Ulasan milik sendiri, termasuk yang pending/hidden |
| GET | `/me/ratings/{id}` | Pemilik | Detail ulasan sendiri |
| POST | `/orders/{id}/rating` | Pemilik | Membuat ulasan untuk order completed |
| PATCH | `/me/ratings/{id}` | Pemilik | Mengubah `score` dan `comment`; kembali pending |
| DELETE | `/me/ratings/{id}` | Pemilik | Menghapus ulasan |
| GET | `/admin/ratings` | Admin | Semua ulasan; filter `status`, `score`, `order_id` |
| GET | `/admin/ratings/{id}` | Admin | Detail untuk moderasi |
| PATCH | `/admin/ratings/{id}` | Admin | Mengubah `status`, `moderation_reason` |
| DELETE | `/admin/ratings/{id}` | Admin | Menghapus ulasan dengan alasan dan audit |

Body pelanggan:

```json
{ "score": 5, "comment": "Makanannya enak dan pengambilan cepat." }
```

Body moderasi:

```json
{ "status": "published", "moderation_reason": null }
```

`score` integer 1–5; `comment` opsional maksimal 2000 karakter. Status: `pending`, `published`, `hidden`; default `pending`. Alasan wajib saat hidden atau penghapusan admin. Untuk DELETE admin, kirim alasan melalui body JSON `{ "reason": "..." }` dan pastikan server mendukung kontrak ini.

Admin tidak membuat ulasan seolah-olah pelanggan atau mengubah skor/komentar pelanggan. CRUD rating terdiri dari create oleh pelanggan dan read/update/delete sesuai kewenangan di atas. Jika yang dimaksud rating adalah testimoni manual dari admin, perlu resource terpisah dengan label sumber testimoni yang jelas.

Terapkan unique constraint pada `order_id`, termasuk ulasan soft deleted: penghapusan tidak membuka kesempatan membuat ulasan kedua. Percobaan kedua menghasilkan `409 RATING_ALREADY_EXISTS`. Respons publik hanya menampilkan nama tampilan, skor, komentar, dan waktu; jangan mengirim email, telepon, atau detail order.

## 10. Model Pesanan dan Pembayaran

Pisahkan status pemenuhan pesanan dari status pembayaran.

### 10.1 Status pesanan (`order_status`)

| Status | Arti | Transisi normal |
| --- | --- | --- |
| `awaiting_payment` | Pesanan dibuat, belum lunas | `paid`, `cancelled`, `expired` |
| `paid` | Pembayaran tervalidasi, kode sudah tersedia | `preparing` |
| `preparing` | Sedang disiapkan admin | `ready` |
| `ready` | Siap diserahkan ke pelanggan | `completed` melalui verifikasi kode |
| `completed` | Pesanan diserahkan dan kode terverifikasi | Terminal untuk pemenuhan |
| `cancelled` | Dibatalkan sebelum pembayaran | Terminal normal |
| `expired` | Batas pembayaran berakhir dan provider memastikan tidak terbayar | Terminal normal |

Urutan MVP: `awaiting_payment → paid → preparing → ready → completed`. Admin tidak boleh mengubah langsung ke completed melalui endpoint status biasa.

### 10.2 Status pembayaran lokal (`payment_status`)

`unpaid`, `pending`, `paid`, `failed`, `expired`, `cancelled`, `partially_refunded`, `refunded`, `disputed`.

Simpan juga `provider_status` mentah untuk investigasi. Order memiliki banyak payment attempt historis tetapi paling banyak satu attempt aktif. Pada MVP pelanggan tidak dapat membuat attempt baru untuk order yang attempt-nya terminal; buat order baru. Jangan membuat tagihan ganda saat request diulang.

### 10.3 Data minimum

| Resource | Field utama |
| --- | --- |
| Order | `id`, `order_number`, `customer_id`, `customer_name`, `customer_phone`, `notes`, `order_status`, `payment_status`, `subtotal`, `tax_amount`, `service_fee`, `total`, `currency`, `payment_expires_at`, timestamps |
| Order item | `id`, `order_id`, `menu_id`, `menu_name`, `unit_price`, `quantity`, `line_total`, `notes` |
| Payment attempt | `id`, `order_id`, `provider_order_id` unik, `provider_transaction_id`, `snap_token`, `redirect_url`, `provider_status`, `fraud_status`, `amount`, `paid_at`, `last_synced_at` |
| Pickup verification | `order_id` unik, kode terenkripsi untuk ditampilkan kembali ke pemilik, HMAC kode untuk pembandingan, `failed_attempts`, `locked_until`, `used_at`, `verified_by` |
| Audit/status history | `order_id`, status sebelum/sesudah, aktor, alasan, waktu, `request_id` |
| Webhook inbox | provider transaction/order ID, status, waktu provider, fingerprint event, hasil pemrosesan, waktu diterima |

Kode, Snap token, server key, dan data sensitif tidak masuk log biasa. Kunci enkripsi dan HMAC disimpan di pengelola secret, terpisah dari database.

## 11. Endpoint Pemesanan Pelanggan

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| POST | `/orders/quote` | Validasi menu dan hitung total terkini tanpa membuat order |
| POST | `/orders` | Membuat order dan snapshot item; wajib `Idempotency-Key` |
| GET | `/orders` | Riwayat milik pelanggan; filter `order_status`, `payment_status` |
| GET | `/orders/{id}` | Detail milik pelanggan, item, total, status, dan waktu |
| POST | `/orders/{id}/payment` | Membuat/mengembalikan sesi Snap yang sama; wajib `Idempotency-Key` |
| GET | `/orders/{id}/payment` | Status pembayaran lokal dan instruksi melanjutkan sesi yang masih berlaku |
| POST | `/orders/{id}/payment/sync` | Meminta backend memeriksa status Midtrans; rate limited |
| POST | `/orders/{id}/cancel` | Membatalkan order belum lunas secara terkoordinasi dengan provider |
| GET | `/orders/{id}/pickup-code` | Kode hanya untuk pemilik setelah lunas dan sebelum completed |

Semua endpoint pada bagian ini memerlukan login dan pemeriksaan kepemilikan.

### 11.1 Quote dan create order

Body quote/create:

```json
{
  "items": [
    { "menu_id": "menu_1", "quantity": 2, "notes": "Tidak pedas" },
    { "menu_id": "menu_2", "quantity": 1, "notes": "Es sedikit" }
  ],
  "customer_name": "Bena",
  "customer_phone": "081234567890",
  "notes": "Akan diambil langsung"
}
```

`items` wajib 1–50 item; jumlah integer 1–99 per item; ID menu tidak boleh duplikat (gabungkan kuantitas di frontend). Catatan per item maksimal 300 karakter, catatan order maksimal 1000 karakter. Nama dan telepon wajib pada create, opsional pada quote. Validasi telepon 8–15 digit dengan awalan `+` opsional; normalisasi format penyimpanan.

Backend mengambil harga dari database dan menolak menu nonaktif/habis. Jangan menerima harga, total, user ID, atau status dari frontend. Untuk MVP pajak dan biaya layanan bernilai 0; jika ditambahkan, aturan dan pembulatannya harus terpusat di backend.

`line_total = unit_price × quantity`; `subtotal = jumlah line_total`; `total = subtotal + tax_amount + service_fee`.

Quote mengembalikan rincian harga dengan struktur item/total yang sama seperti order, tanpa ID order. Quote tidak mengunci harga. Saat create, backend menghitung ulang; bila harga berubah, frontend harus menampilkan total terbaru sebelum pelanggan melanjutkan pembayaran.

Respons create `201`:

```json
{
  "data": {
    "id": "order_1",
    "order_number": "ORD-20261124-0001",
    "order_status": "awaiting_payment",
    "payment_status": "unpaid",
    "currency": "IDR",
    "items": [
      { "menu_id": "menu_1", "menu_name": "Nasi Goreng", "unit_price": 25000, "quantity": 2, "line_total": 50000, "notes": "Tidak pedas" },
      { "menu_id": "menu_2", "menu_name": "Es Teh", "unit_price": 5000, "quantity": 1, "line_total": 5000, "notes": "Es sedikit" }
    ],
    "subtotal": 55000,
    "tax_amount": 0,
    "service_fee": 0,
    "total": 55000,
    "payment_expires_at": "2026-11-24T06:30:00Z"
  }
}
```

Masa pembayaran awal 30 menit sejak create; atur expiry Snap agar selaras dengan sisa masa tersebut dan metode pembayaran yang didukung. Sebelum membuat sesi pembayaran, validasi kembali ketersediaan menu. Harga snapshot order tidak berubah; jika order sudah tidak dapat dipenuhi, jangan buat sesi baru.

### 11.2 Membuka pembayaran Midtrans

`POST /orders/{id}/payment`, body `{}`. Backend membuat transaksi Snap dengan `provider_order_id` unik per attempt, `gross_amount` dari total order, `item_details`, serta detail pelanggan yang diperlukan. Panggilan Midtrans dilakukan dari server.

Respons `201` untuk sesi baru atau `200` untuk sesi yang sudah ada:

```json
{
  "data": {
    "order_id": "order_1",
    "payment_id": "payment_1",
    "provider": "midtrans",
    "snap_token": "token-dari-midtrans",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/example",
    "payment_status": "pending",
    "expires_at": "2026-11-24T06:30:00Z"
  }
}
```

Frontend membuka Snap menggunakan token atau mengarahkan ke redirect URL. Callback sukses dari browser hanya memicu refresh/sync; tidak boleh menetapkan status paid atau membuat kode.

Jika request ke Midtrans timeout, simpan attempt sebagai hasil belum pasti dan balas `202 PAYMENT_INITIALIZING` dengan `payment_id` serta instruksi polling. Rekonsiliasi attempt yang sama; jangan membuat provider order baru sebelum hasil attempt lama jelas. Get Status dapat belum menemukan transaksi Snap saat pelanggan belum memilih metode; ini bukan bukti transaksi gagal.

### 11.3 Idempotency

Untuk create order dan create payment, simpan kombinasi pengguna, endpoint/resource, key, hash body, serta hasil operasi sekurangnya 24 jam. Key yang sama dengan payload sama mengembalikan resource/hasil yang sama; payload berbeda menghasilkan `409 IDEMPOTENCY_CONFLICT`. Request paralel dengan key sama harus terserialisasi. Unique constraint/lock order tetap mencegah dua sesi aktif meskipun client mengirim key berbeda.

### 11.4 Pembatalan dan expiry

Pelanggan hanya boleh membatalkan sebelum lunas. Jika belum ada attempt, pembatalan lokal dapat langsung dilakukan. Jika ada transaksi provider, periksa status dan ajukan cancel/expire sesuai dukungan metode; jangan menyatakan berhasil sebelum hasilnya pasti. Hasil belum pasti mengembalikan `202`, dengan `cancellation_pending: true` pada detail order, lalu diselesaikan worker. Bila ternyata sudah paid, tolak pembatalan dengan `409 ORDER_ALREADY_PAID`.

Worker expiry juga wajib memeriksa provider sebelum menutup order. Dana yang sudah diterima tidak boleh hilang dari pencatatan hanya karena jam lokal melewati deadline.

## 12. Webhook dan Validasi Midtrans

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| POST | `/payments/midtrans/notifications` | Midtrans | Menerima HTTP notification pembayaran |

Payload menggunakan kontrak asli Midtrans, bukan envelope API aplikasi. Field relevan antara lain `order_id`, `transaction_id`, `transaction_status`, `fraud_status`, `status_code`, `gross_amount`, `signature_key`.

Proses wajib:

1. Validasi signature sesuai produk/config Midtrans yang dipakai. Untuk notifikasi Snap klasik yang dirujuk dokumen ini, verifikasi SHA-512 gabungan string `order_id + status_code + gross_amount + ServerKey`; pertahankan representasi string `gross_amount` ketika menghitung signature. Cocokkan secara constant-time. Jika akun memakai skema kunci lain, ikuti dokumentasi konfigurasi akun tersebut.
2. Cocokkan `order_id` provider ke payment attempt tersimpan. Cocokkan nominal secara decimal exact dengan total tersimpan dan periksa mata uang IDR jika dikirim. Nilai callback tidak boleh mengganti total order.
3. Ambil Get Status dari Midtrans melalui backend untuk memastikan status terkini sebelum perubahan yang berdampak pada dana. Jika provider tidak tersedia, simpan event secara durable dan retry di worker; jangan menerbitkan kode dahulu.
4. Simpan inbox event dan proses secara idempotent. Notifikasi duplikat tidak boleh menggandakan kode, pendapatan, atau transisi.
5. Gunakan lock payment/order dan transaksi database saat menerapkan status serta membuat kode. Simpan perubahan dan audit bersama.
6. Balas HTTP 200 setelah event berhasil diproses atau tersimpan durable untuk diproses worker. Bila penyimpanan gagal, balas 5xx agar provider dapat retry. Signature invalid mendapat 403. Event valid dengan order tak dikenal dicatat untuk rekonsiliasi dan tidak membuat order baru.

Pemetaan awal status provider:

| Status Midtrans | Status lokal / tindakan |
| --- | --- |
| `pending` | `pending`; order tetap awaiting_payment |
| `settlement` | `paid` setelah verifikasi |
| `capture` | `paid` hanya bila `fraud_status=accept`; status challenge/missing perlu verifikasi lanjutan dan belum menerbitkan kode |
| `deny`, `failure` | `failed`; order dibatalkan bila memang belum pernah lunas |
| `cancel` | `cancelled`; order cancelled bila belum lunas |
| `expire` | `expired`; order expired bila belum lunas |
| `authorize` | Belum dianggap lunas untuk alur ini |
| `partial_refund` | `partially_refunded`; rekam nominal refund dan perlu penanganan admin |
| `refund` | `refunded`; blokir pengambilan bila belum diserahkan |
| `chargeback`, `partial_chargeback` | `disputed`; tandai penanganan admin dan blokir pengambilan yang belum selesai |

Jika `fraud_status` dikirim, keberhasilan pembayaran harus konsisten dengan penerimaan fraud provider. Status tak dikenal masuk antrean pemeriksaan dan tidak menerbitkan kode.

Notifikasi terlambat atau tidak berurutan tidak boleh menurunkan paid menjadi pending/expired. Gunakan status terkini provider dan riwayat transisi. Jika pembayaran terkonfirmasi setelah order cancelled/expired, catat pembayaran paid tetapi tandai `requires_review=true`, jangan otomatis proses makanan atau keluarkan kode sampai admin merekonsiliasi. Kasus pembayaran ganda juga masuk review dan hanya satu pembayaran dipakai memenuhi order.

Refund/dispute tidak menghapus histori serah terima: order yang sudah completed tetap completed pada sisi pemenuhan, dengan payment_status terbaru. Order belum completed dengan refund/dispute diblokir dari verifikasi kode dan ditangani admin. Refund otomatis dan API refund belum termasuk MVP; rekonsiliasi perubahan yang terjadi di Midtrans tetap wajib.

## 13. Kode 4 Digit dan Konfirmasi Serah Terima

### 13.1 Penerbitan dan tampilan kode

- Buat kode hanya ketika backend sudah memvalidasi pembayaran paid dan order tidak dalam review.
- Format string tepat 4 digit, termasuk nol awal; contoh `"0372"`. Gunakan generator acak kriptografis, bukan urutan nomor order.
- Kode dibuat sekali dalam transaksi database yang sama dengan perubahan paid; webhook berulang tidak mengganti kode.
- Kode melekat pada order, tidak harus unik secara global. Admin wajib membuka/memilih order terlebih dahulu lalu memasukkan kode; pencarian order menggunakan kode saja tidak disediakan.
- Kode ditampilkan pada detail pembayaran berhasil melalui endpoint khusus pemilik, bukan dari callback Snap. Respons kode diberi `Cache-Control: no-store`.
- Backend menyimpan kode terenkripsi agar dapat ditampilkan lagi kepada pemilik, serta HMAC terikat order untuk validasi. Jangan memakai hash biasa untuk ruang kode yang hanya 10.000 kemungkinan.
- Admin tidak menerima kode lewat endpoint detail, list, log, atau ekspor. Pelanggan menyampaikan kode saat pengambilan.
- Kode hanya berlaku untuk order paid/preparing/ready yang belum selesai, tidak refunded/disputed, tidak dalam review. Pada MVP kode tidak memiliki expiry terpisah; order lama yang belum diambil masuk penanganan admin, bukan otomatis dianggap diserahkan.

Respons `GET /orders/{id}/pickup-code`:

```json
{
  "data": {
    "order_id": "order_1",
    "order_number": "ORD-20261124-0001",
    "pickup_code": "0372",
    "order_status": "ready"
  }
}
```

Sebelum paid: `409 PAYMENT_NOT_PAID`. Setelah completed: `409 PICKUP_CODE_ALREADY_USED`. Saat refund/dispute/review: `409 PICKUP_BLOCKED`. Saat kode terkunci akibat percobaan salah, pelanggan tetap dapat melihat kode tetapi konfirmasi admin menunggu lock selesai.

### 13.2 Endpoint operasional admin

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| GET | `/admin/orders` | List; filter `order_status`, `payment_status`, `requires_review`, rentang tanggal, `q` nomor order/nama |
| GET | `/admin/orders/{id}` | Detail pelanggan, item, status pembayaran, histori; tanpa kode |
| PATCH | `/admin/orders/{id}/status` | Transisi paid → preparing atau preparing → ready |
| POST | `/admin/orders/{id}/complete` | Verifikasi kode dan tandai serah terima completed secara atomik |
| POST | `/admin/orders/{id}/payment/sync` | Sinkronisasi provider untuk penanganan masalah; rate limited dan diaudit |

Body update status:

```json
{ "order_status": "preparing" }
```

Body complete:

```json
{ "pickup_code": "0372" }
```

Syarat complete: role admin, order `ready`, pembayaran `paid`, tidak dalam review, kode cocok, belum digunakan, dan tidak terkunci. Body kode wajib string sesuai regex `^[0-9]{4}$`.

Jika benar, lakukan satu transaksi database dengan row lock: validasi kondisi, ubah order ke completed, isi `completed_at`, `completed_by`, `used_at`, dan catat audit. Konfirmasi paralel hanya boleh menghasilkan satu kejadian serah terima.

Respons sukses:

```json
{
  "data": {
    "id": "order_1",
    "order_status": "completed",
    "payment_status": "paid",
    "completed_at": "2026-11-24T06:45:00Z"
  },
  "message": "Kode valid. Serah terima pesanan berhasil dikonfirmasi."
}
```

| Kondisi | Respons |
| --- | --- |
| Format kode salah | `422 VALIDATION_ERROR` |
| Kode tidak cocok | `422 INVALID_PICKUP_CODE`; tambahkan penghitung percobaan |
| Order belum ready | `409 ORDER_NOT_READY` |
| Pembayaran belum paid | `409 PAYMENT_NOT_PAID` |
| Sudah completed | `200` dengan hasil completed sebelumnya, tanpa audit serah terima baru |
| Dalam review/refund/dispute | `409 PICKUP_BLOCKED` |
| Terlalu banyak percobaan | `429 PICKUP_CODE_LOCKED` dan `Retry-After` |

Batas awal: 5 kesalahan per order dalam 15 menit, lalu kunci 15 menit; reset penghitung setelah masa lock lewat. Tambahkan batas per akun admin dan IP agar mengganti order tidak melewati proteksi. Percobaan gagal dicatat tanpa menyimpan isi kode. Tidak ada endpoint bypass completed atau reset kode pada MVP; kasus kode hilang ditangani lewat akses akun pelanggan dan prosedur support yang diaudit.

## 14. Alur dari Awal sampai Selesai

1. Pelanggan membaca menu melalui `GET /menus`, lalu memilih item dan jumlah. Keranjang awal boleh disimpan di frontend; CRUD cart server belum diperlukan.
2. Pelanggan login. Frontend memanggil quote dan menampilkan rincian harga.
3. Pelanggan menyetujui rincian, lalu frontend membuat order dengan idempotency key.
4. Frontend menampilkan total snapshot order, lalu meminta sesi pembayaran Midtrans dengan key tersendiri.
5. Pelanggan membayar melalui Snap. Menutup popup tidak berarti pembayaran dibatalkan.
6. Midtrans mengirim webhook. Backend memverifikasi dan menyimpan pembayaran valid, mengubah order ke paid, lalu membuat kode satu kali.
7. Frontend memuat ulang detail order. Selama pending, polling detail setiap sekitar 5 detik dan hentikan saat terminal atau halaman ditutup. Jika belum sinkron, tampilkan “Pembayaran sedang diverifikasi” dan sediakan sync yang dibatasi server.
8. Setelah paid, pelanggan dapat melihat kode 4 digit. Admin melihat order masuk tanpa melihat kode.
9. Admin mengubah status ke preparing lalu ready.
10. Saat pengambilan, pelanggan menyampaikan nomor pesanan dan kode. Admin memilih order tersebut, mencocokkan barang, lalu memasukkan kode melalui endpoint complete pada saat serah terima.
11. Backend memverifikasi kode dan menandai completed. Pelanggan melihat pesanan selesai dan dapat memberi rating.

## 15. Dashboard Admin (Pendukung)

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| GET | `/admin/dashboard/summary` | Admin | Ringkasan berdasarkan `date_from`, `date_to`, `timezone=Asia/Jakarta` |

Parameter tanggal berbentuk `YYYY-MM-DD`, inklusif pada zona yang dipilih; backend mengubahnya ke rentang UTC. Batas awal maksimum 366 hari. Default hari ini di Asia/Jakarta.

Field usulan: `total_orders` berdasarkan waktu create, `paid_amount` berdasarkan waktu paid, `refunded_amount` berdasarkan waktu refund, `completed_orders` berdasarkan waktu completed, `active_menus` sebagai jumlah saat ini, dan `rating_average` dari ulasan published yang dibuat pada rentang tersebut. Respons menyertakan rentang dan zona yang digunakan. Nilai pembayaran merupakan ringkasan operasional, belum laporan akuntansi/net settlement Midtrans.

## 16. Aturan Data dan Keandalan

- Simpan timestamps dan audit aktor pada perubahan konten, moderasi, status pesanan, dan konfirmasi serah terima.
- Order item tetap menyimpan snapshot saat menu dihapus; jangan cascade delete histori transaksi.
- Webhook inbox, payment attempt, pickup verification, dan order number memiliki constraint unik yang sesuai. Jangan hanya mengandalkan pemeriksaan aplikasi sebelum insert.
- Jalankan worker rekonsiliasi untuk payment pending, hasil request belum pasti, cancel/expiry tertunda, dan notifikasi gagal diproses. Gunakan retry dengan backoff dan antrean penanganan kegagalan permanen.
- Bedakan environment sandbox dan production beserta server key, client key, endpoint, dan provider order ID. Server key tidak pernah dikirim ke frontend.
- Gunakan HTTPS pada webhook dan aplikasi production. Respons API sensitif tidak boleh disimpan cache publik.
- Jangan sediakan pengubahan nominal, payment_status paid, atau completed secara bebas dari frontend/admin. Perubahan dana berasal dari verifikasi provider; completed berasal dari verifikasi kode.

## 17. Skenario Penerimaan untuk Backend dan QA

| Skenario | Hasil yang harus terjadi |
| --- | --- |
| CRUD setiap konten | Validasi berjalan; publik hanya menerima konten aktif/published; gambar dan urutan benar |
| Aktivasi dua kisah bersamaan | Hanya satu kisah aktif setelah transaksi selesai |
| Hapus menu yang pernah dipesan | Menu hilang dari publik; snapshot order tetap terbaca |
| Manipulasi harga/user ID dari frontend | Ditolak/tidak dipakai; total dan pemilik berasal dari server |
| Request order/payment diulang atau paralel | Satu order untuk key sama dan paling banyak satu attempt aktif |
| Midtrans timeout | Tidak membuat tagihan kedua; attempt direkonsiliasi |
| Callback browser mengaku sukses tanpa verifikasi | Order tetap belum paid dan belum memiliki kode |
| Webhook valid dikirim berulang/tidak berurutan | Tidak ada kode ganda atau penurunan paid ke pending |
| Signature/nominal tidak cocok | Tidak menandai paid; kejadian dapat ditelusuri |
| Get Status Snap belum menemukan transaksi | Tidak langsung dianggap gagal; lanjut rekonsiliasi |
| Expiry/cancel bersamaan dengan pembayaran | Dana tetap tercatat; konflik masuk review, tidak diam-diam dibuang |
| Pelanggan membuka order orang lain | 404, tidak membocorkan kode atau data pribadi |
| Kode dengan nol awal | `"0372"` disimpan/diproses sebagai string |
| Kode benar pada order belum ready | Ditolak tanpa menyelesaikan order |
| Kode salah lima kali | Konfirmasi terkunci; percobaan berikutnya 429 |
| Konfirmasi kode benar secara paralel | Satu transisi completed dan satu audit serah terima |
| Refund/dispute sebelum pengambilan | Konfirmasi kode diblokir |
| Rating sebelum completed atau ulasan kedua | Ditolak; agregat publik hanya menghitung published |

## 18. Keputusan Produk yang Masih Perlu Ditetapkan

Implementasi awal dapat mengikuti asumsi dokumen ini. Sebelum production, pastikan keputusan berikut:

1. Apakah rating menilai order keseluruhan atau masing-masing menu? Apakah yang dimaksud justru testimoni manual admin?
2. Apakah kisah cukup satu cerita aktif atau perlu halaman detail banyak kisah?
3. Apakah pemesanan mendukung tamu, delivery, meja, atau jadwal pengambilan?
4. Apakah perlu stok kuantitatif? Jika ya, tambahkan reservasi stok dan pelepasannya saat gagal/expired secara atomik sebelum membuka pemesanan.
5. Berapa pajak/biaya layanan, masa pembayaran, jam operasional, dan batas pesanan yang belum diambil?
6. Bagaimana prosedur refund, pesanan terlambat terbayar, kode tidak bisa diakses, serta penanganan kasus review? Pada MVP kasus review diblokir dari serah terima sampai diselesaikan secara terkontrol; endpoint resolusi khusus belum didefinisikan.
7. Apakah admin boleh langsung menyerahkan dari paid? Dokumen ini mewajibkan preparing dan ready agar alur jelas.

## 19. Referensi Midtrans

Gunakan dokumentasi resmi dan SDK sesuai produk serta konfigurasi akun yang dipakai. Detail provider harus diverifikasi lagi saat integrasi sandbox.

- [Snap Integration Guide](https://docs.midtrans.com/docs/snap-snap-integration-guide) — pembuatan sesi dan integrasi frontend/backend.
- [HTTP(S) Notification / Webhooks](https://docs.midtrans.com/docs/https-notification-webhooks) — validasi notifikasi, signature, dan penanganan status.
- [Get Transaction Status](https://docs.midtrans.com/reference/get-transaction-status) — pemeriksaan status provider dari server.
- [Get Status API Requests](https://docs.midtrans.com/docs/get-status-api-requests) — interpretasi status dan keterbatasan pemeriksaan sesi Snap awal.

Aturan keamanan kode, lifecycle order, endpoint aplikasi, batas validasi, dan asumsi produk merupakan usulan rancangan proyek ini; bukan ketentuan dari Midtrans.
