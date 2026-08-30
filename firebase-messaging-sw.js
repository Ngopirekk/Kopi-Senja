/* ===================== firebase-messaging-sw.js =====================
INI FILE WAJIB supaya notifikasi "pesanan siap" tetap muncul di layar HP
walau website Kopi Senja sudah ditutup total (bukan cuma di-minimize).

CARA PAKAI:
1. Taruh file ini di folder yang SAMA (sejajar) dengan file HTML utama
   (kopi-senja-kelola-menu.html) saat kamu upload/hosting websitenya.
   Contoh kalau website-nya ada di:
     https://tokokamu.com/kopi-senja-kelola-menu.html
   maka file ini harus bisa diakses di:
     https://tokokamu.com/firebase-messaging-sw.js
   (bukan di dalam subfolder seperti /assets/firebase-messaging-sw.js)

2. firebaseConfig di bawah ini HARUS SAMA PERSIS dengan yang ada di file
   HTML utama (sudah saya salin otomatis, tidak perlu diubah kecuali
   kamu mengganti project Firebase-nya).

Kenapa harus file terpisah? Service Worker (kode yang tetap "hidup" di
background HP walau tab/website ditutup) memang wajib berupa file .js
tersendiri menurut aturan browser — tidak bisa ditulis di dalam file
HTML seperti kode JavaScript biasa.
===================================================================== */
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDo418FD4LhpfwbICB7dEb4NfkwbOp_kE",
  authDomain: "kopi-senja-2ae43.firebaseapp.com",
  databaseURL: "https://kopi-senja-2ae43-default-rtdb.firebaseio.com",
  projectId: "kopi-senja-2ae43",
  storageBucket: "kopi-senja-2ae43.firebasestorage.app",
  messagingSenderId: "149085206669",
  appId: "1:149085206669:web:63481ec640ed99a04fcac4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Ikon notifikasi berbentuk cangkir kopi, sama seperti yang dipakai untuk
// notifikasi selagi tab masih terbuka (lihat NOTIF_ICON di file HTML utama).
const NOTIF_ICON = 'data:image/svg+xml,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#2B1B12"/>
  <text x="50" y="66" font-size="52" text-anchor="middle">☕</text>
</svg>
`);

// Dipanggil otomatis oleh Firebase saat ada notifikasi masuk SEDANGKAN
// website/tab sedang tidak aktif/tertutup — inilah bagian yang membuat
// notifikasi tetap muncul di layar HP seperti notifikasi aplikasi biasa.
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Kopi Senja';
  const body = (payload.notification && payload.notification.body) || 'Pesananmu sudah siap, silakan diambil!';
  self.registration.showNotification(title, {
    body,
    icon: NOTIF_ICON,
    badge: NOTIF_ICON,
    tag: (payload.data && payload.data.tag) || 'kopi-senja-order-done',
  });
});

// Kalau notifikasi di layar HP disentuh, buka/fokuskan tab website Kopi Senja.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
