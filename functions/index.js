/* ===================== functions/index.js =====================
Ini kode "pengirim" notifikasi (Cloud Function). Berjalan di server
Firebase, BUKAN di file HTML — ini yang aman menyimpan izin kirim FCM.

CARA KERJA:
Setiap kali status pesanan di Firebase Realtime Database berubah jadi
'done' (pas kasir tekan "Tandai Selesai"), fungsi ini otomatis terpicu
dan mengirim notifikasi ke fcmToken milik pesanan tersebut (fcmToken
ini sudah dikirim otomatis dari file HTML utama saat pembeli membuka
website & memberi izin notifikasi).

CARA DEPLOY (dari laptop/komputer, sekali saja di awal):
1. Install Node.js kalau belum ada: https://nodejs.org (pilih versi LTS)
2. Buka Terminal / Command Prompt, install Firebase CLI:
   npm install -g firebase-tools
3. Login ke akun Firebase (Google) yang sama dengan project Kopi Senja:
   firebase login
4. Taruh folder "functions" ini (persis dengan nama folder "functions")
   di dalam sebuah folder project, lalu di folder project itu jalankan:
   firebase init functions
   - Pilih "Use an existing project" → pilih project "kopi-senja-2ae43"
   - Kalau ditanya "language", pilih JavaScript
   - Kalau ditanya mau menimpa functions/index.js & package.json yang
     sudah ada → jawab TIDAK/No (biar tidak menimpa file yang sudah
     disiapkan di sini)
5. Deploy:
   firebase deploy --only functions
6. Tunggu sampai selesai (muncul tulisan "Deploy complete!"). Setelah
   ini, notifikasi push otomatis aktif — tidak perlu diulang lagi kecuali
   kamu mengubah kode di file ini.

CATATAN: Firebase mengharuskan project di paket "Blaze" (bayar sesuai
pemakaian) supaya Cloud Function bisa jalan — tapi ada kuota gratis
bulanan yang cukup besar, jadi untuk 1 toko kopi biasanya tetap Rp0.
Kalau project masih paket gratis "Spark", Firebase akan minta kamu
upgrade dulu ke Blaze saat `firebase deploy` (tinggal ikuti link yang
diberikan, tidak perlu masukkan kartu kredit sampai benar-benar dipakai
melebihi kuota gratis).

=== UPDATE: HEADS-UP NOTIFICATION ===
Ditambahkan `webpush.headers.Urgency: 'high'` supaya notifikasi
diperlakukan sebagai "mendesak" oleh Android — ini yang membuat
notifikasi berpeluang muncul sebagai pop-up melayang di atas layar
(heads-up), bukan cuma masuk ke notification shade secara diam-diam.
Catatan: hasil akhirnya tetap tergantung juga pada setelan notifikasi
di HP pembeli (Setelan → Aplikasi → nama browser → Notifikasi → pilih
level "Segera"/"Prioritas Tinggi").
=================================================================== */
const { onValueUpdated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

initializeApp();

exports.sendOrderDoneNotification = onValueUpdated(
  '/orders/{orderId}',
  async (event) => {
    const before = event.data.before.val();
    const after = event.data.after.val();

    // Hanya kirim notifikasi kalau statusnya BARU SAJA berubah jadi 'done'
    // (bukan setiap kali data pesanan diubah untuk alasan lain).
    if (!after || after.status !== 'done' || (before && before.status === 'done')) {
      return null;
    }

    const token = after.fcmToken;
    if (!token) {
      console.log(`Pesanan ${after.queueNo || event.params.orderId} tidak punya fcmToken, lewati push notification.`);
      return null;
    }

    const namaSapaan = after.customerName || 'Pesananmu';

    const message = {
      token,
      notification: {
        title: 'Kopi Senja',
        body: `☕ Pesanan ${namaSapaan} siap! Segera ambil di kasir, ya. Nikmati kopinya!`,
      },
      data: {
        tag: 'kopi-senja-' + (after.queueNo || event.params.orderId),
      },
      webpush: {
        headers: {
          // 'high' membuat Android memperlakukan notifikasi ini sebagai mendesak,
          // sehingga berpeluang tampil sebagai pop-up di atas layar (heads-up)
          // alih-alih hanya diam masuk ke notification shade.
          Urgency: 'high',
        },
        notification: {
          // requireInteraction: notifikasi tetap ditampilkan sampai disentuh/ditutup
          // manual (tidak langsung hilang sendiri dalam beberapa detik).
          requireInteraction: true,
        },
        fcmOptions: {
          // Ganti dengan URL asli website kamu setelah di-hosting, supaya
          // saat notifikasi disentuh, otomatis membuka halaman ini.
          link: '/',
        },
      },
    };

    try {
      await getMessaging().send(message);
      console.log(`Push notification terkirim untuk pesanan ${after.queueNo || event.params.orderId}`);
    } catch (err) {
      console.error('Gagal mengirim push notification:', err);
    }
    return null;
  }
);
