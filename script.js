// Mengunci tinggi tampilan ke ukuran layar SAAT HALAMAN PERTAMA KALI dimuat,
// lewat custom property --app-vh (dipakai di CSS: calc(var(--app-vh) * 100)).
// Sengaja TIDAK ikut berubah tiap kali address bar browser HP
// menyembulkan/menyembunyikan diri (itu yang bikin tampilan atas
// "mengecil sendiri" beberapa detik setelah dibuka kalau kita cuma
// pakai 100dvh) — hanya dihitung ulang kalau LEBAR layar berubah
// (tanda perangkat sungguh berotasi/beralih orientasi), bukan setiap
// kali TINGGI viewport berubah karena address bar.
(function () {
  var lastWidth = window.innerWidth;
  function setAppVh() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-vh', vh + 'px');
    lastWidth = window.innerWidth;
  }
  // Tunggu halaman BENAR-BENAR selesai render (termasuk address bar
  // browser sudah settle) sebelum mengunci ukurannya — supaya angka
  // yang dikunci konsisten tiap kali refresh, bukan acak tergantung
  // kapan skrip ini kebetulan dieksekusi.
  if (document.readyState === 'complete') {
    setAppVh();
  } else {
    window.addEventListener('load', setAppVh);
  }
  window.addEventListener('resize', function () {
    // Hanya kunci ulang kalau lebar berubah (rotasi HP / resize jendela
    // sungguhan), bukan sekadar address bar browser yang muncul/hilang.
    if (window.innerWidth !== lastWidth) setAppVh();
  });
  window.addEventListener('orientationchange', function () {
    setTimeout(setAppVh, 100);
  });
})();


/* ===== next block ===== */


/* ===================== HELPER DOM ===================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/* ===================== DATA ===================== */
const suhuGroup = () => ({
  title: 'Suhu', note: 'Wajib pilih 1', max: 1, min: 1,
  options: [{ id: 'panas', name: 'Panas', extra: 0 }, { id: 'dingin', name: 'Dingin (Es)', extra: 0 }]
});
const gulaGroup = () => ({
  title: 'Level Gula', note: 'Wajib pilih 1', max: 1, min: 1,
  options: [{ id: 'normal', name: 'Normal', extra: 0 }, { id: 'less', name: 'Less Sugar', extra: 0 }, { id: 'no', name: 'No Sugar', extra: 0 }]
});
const toppingGroup = () => ({
  title: 'Tambahan Topping', note: 'Opsional, maks 2', max: 2, min: 0,
  options: [{ id: 'espresso', name: 'Extra Shot Espresso', extra: 5000 }, { id: 'boba', name: 'Boba', extra: 5000 }, { id: 'keju', name: 'Extra Keju Parut', extra: 5000 }]
});
const pedasGroup = () => ({
  title: 'Level Pedas', note: 'Wajib pilih 1', max: 1, min: 1,
  options: [{ id: 'normal', name: 'Pedas Normal', extra: 0 }, { id: 'extra', name: 'Extra Pedas', extra: 0 }, { id: 'tanpa', name: 'Tanpa Sambal', extra: 0 }]
});

const I18N = {
  "NGOPI SANTAI, CERITA BERLANJUT": {
    "en": "SLOW COFFEE, ENDLESS STORIES",
    "ar": "قهوة هادئة، حكايات لا تنتهي",
    "ja": "ゆったりコーヒー、続く物語"
  },
  "Buka hari ini, 07.00–22.00": {
    "en": "Open today, 07:00–22:00",
    "ar": "مفتوح اليوم، 07:00–22:00",
    "ja": "本日営業中 7:00〜22:00"
  },
  "Nomor Meja": {
    "en": "Table Number",
    "ar": "رقم الطاولة",
    "ja": "テーブル番号"
  },
  "Nomor meja diperbarui ke": {
    "en": "Table number updated to",
    "ar": "تم تحديث رقم الطاولة إلى",
    "ja": "テーブル番号を更新しました："
  },
  "Ubah nomor meja lewat halaman menu, ya": {
    "en": "Please change the table number from the menu page",
    "ar": "يرجى تغيير رقم الطاولة من صفحة القائمة",
    "ja": "テーブル番号はメニュー画面で変更してください"
  },
  "Total": {
    "en": "Total",
    "ar": "الإجمالي",
    "ja": "合計"
  },
  "Lanjut Bayar →": {
    "en": "Continue to Pay →",
    "ar": "متابعة الدفع ←",
    "ja": "支払いへ進む →"
  },
  "Lanjut Bayar": {
    "en": "Continue to Pay",
    "ar": "متابعة الدفع",
    "ja": "支払いへ進む"
  },
  "Keranjang": {
    "en": "Cart",
    "ar": "السلة",
    "ja": "カート"
  },
  "Keranjang kosong": {
    "en": "Cart is empty",
    "ar": "السلة فارغة",
    "ja": "カートは空です"
  },
  "Cari kopi, camilan, paket...": {
    "en": "Search coffee, snacks, sets...",
    "ar": "ابحث عن قهوة، وجبات خفيفة، باقات...",
    "ja": "コーヒー、軽食、セットを検索..."
  },
  "Profile": {
    "en": "Profile",
    "ar": "الملف الشخصي",
    "ja": "プロフィール"
  },
  "Riwayat Pesanan": {
    "en": "Order History",
    "ar": "سجل الطلبات",
    "ja": "注文履歴"
  },
  "Bahasa": {
    "en": "Language",
    "ar": "اللغة",
    "ja": "言語"
  },
  "Bantuan": {
    "en": "Help",
    "ar": "المساعدة",
    "ja": "ヘルプ"
  },
  "Bahasa berhasil diubah": {
    "en": "Language changed",
    "ar": "تم تغيير اللغة",
    "ja": "言語を変更しました"
  },
  "Bagaimana cara mengubah nomor meja?": {
    "en": "How do I change the table number?",
    "ar": "كيف يمكنني تغيير رقم الطاولة؟",
    "ja": "テーブル番号はどう変更しますか？"
  },
  "Tap nomor meja di halaman menu untuk mengubahnya. Nomor di halaman pembayaran otomatis mengikuti.": {
    "en": "Tap the table number on the menu page to change it. The number on the payment page follows automatically.",
    "ar": "اضغط على رقم الطاولة في صفحة القائمة لتغييره. الرقم في صفحة الدفع يتبع تلقائيًا.",
    "ja": "メニュー画面のテーブル番号をタップして変更できます。支払い画面の番号は自動的に反映されます。"
  },
  "Metode pembayaran apa saja yang tersedia?": {
    "en": "What payment methods are available?",
    "ar": "ما هي طرق الدفع المتاحة؟",
    "ja": "利用できる支払い方法は？"
  },
  "Kamu bisa bayar online lewat QRIS, atau bayar langsung di kasir warung.": {
    "en": "You can pay online via QRIS, or pay directly at the counter.",
    "ar": "يمكنك الدفع عبر الإنترنت عبر QRIS، أو الدفع مباشرة في الكاشير.",
    "ja": "QRISでオンライン決済するか、店頭レジで直接お支払いいただけます。"
  },
  "Bagaimana cara melihat pesanan sebelumnya?": {
    "en": "How do I see my previous orders?",
    "ar": "كيف يمكنني رؤية طلباتي السابقة؟",
    "ja": "過去の注文はどこで確認できますか？"
  },
  "Buka menu ☰ di pojok kanan atas, lalu pilih \"Riwayat Pesanan\".": {
    "en": "Open the ☰ menu in the top-right corner, then select \"Order History\".",
    "ar": "افتح القائمة ☰ في الزاوية العلوية اليمنى، ثم اختر \"سجل الطلبات\".",
    "ja": "右上の☰メニューを開き、「注文履歴」を選択してください。"
  },
  "Bisa pesan lebih dari 1 meja sekaligus?": {
    "en": "Can I order for more than one table at once?",
    "ar": "هل يمكنني الطلب لأكثر من طاولة واحدة في وقت واحد؟",
    "ja": "一度に複数のテーブル分を注文できますか？"
  },
  "Untuk saat ini satu sesi hanya untuk satu nomor meja. Hubungi staf kami kalau butuh bantuan lebih lanjut.": {
    "en": "For now, one session is for one table only. Contact our staff if you need further help.",
    "ar": "في الوقت الحالي، الجلسة الواحدة مخصصة لطاولة واحدة فقط. تواصل مع فريقنا إذا احتجت لمزيد من المساعدة.",
    "ja": "現在、1回のセッションにつきテーブル1つのみご利用いただけます。詳しいサポートが必要な場合はスタッフまでご連絡ください。"
  },
  "Hubungi Kami via WhatsApp": {
    "en": "Contact Us via WhatsApp",
    "ar": "تواصل معنا عبر واتساب",
    "ja": "WhatsAppでお問い合わせ"
  },
  "Pembayaran": {
    "en": "Payment",
    "ar": "الدفع",
    "ja": "お支払い"
  },
  "Makan di Tempat": {
    "en": "Dine In",
    "ar": "تناول في المكان",
    "ja": "店内飲食"
  },
  "Bawa Pulang": {
    "en": "Take Away",
    "ar": "طلب خارجي",
    "ja": "持ち帰り"
  },
  "Data Pemesan": {
    "en": "Customer Details",
    "ar": "بيانات الطلب",
    "ja": "注文者情報"
  },
  "Nama Lengkap": {
    "en": "Full Name",
    "ar": "الاسم الكامل",
    "ja": "氏名"
  },
  "Nama lengkap": {
    "en": "Full name",
    "ar": "الاسم الكامل",
    "ja": "氏名"
  },
  "Nama wajib diisi": {
    "en": "Name is required",
    "ar": "الاسم مطلوب",
    "ja": "氏名は必須です"
  },
  "Nomor HP (WhatsApp)": {
    "en": "Phone Number (WhatsApp)",
    "ar": "رقم الهاتف (واتساب)",
    "ja": "電話番号（WhatsApp）"
  },
  "Kirim Struk ke Email": {
    "en": "Send Receipt to Email",
    "ar": "إرسال الإيصال إلى البريد الإلكتروني",
    "ja": "レシートをメールで受け取る"
  },
  "Kamu memesan dari": {
    "en": "You ordered from",
    "ar": "أنت تطلب من",
    "ja": "ご注文店舗"
  },
  "Metode Pembayaran": {
    "en": "Payment Method",
    "ar": "طريقة الدفع",
    "ja": "支払い方法"
  },
  "Bayar Online": {
    "en": "Pay Online",
    "ar": "الدفع عبر الإنترنت",
    "ja": "オンライン決済"
  },
  "Bayar di Kasir": {
    "en": "Pay at Cashier",
    "ar": "الدفع عند الكاشير",
    "ja": "レジで支払う"
  },
  "Selesaikan Pembayaran": {
    "en": "Complete Payment",
    "ar": "إتمام الدفع",
    "ja": "支払いを完了する"
  },
  "Ada QR yang belum selesai?": {
    "en": "Have an unfinished QR?",
    "ar": "هل لديك رمز QR غير مكتمل؟",
    "ja": "未完了のQRがありますか？"
  },
  "Tidak ada pesanan yang belum selesai": {
    "en": "No unfinished order found",
    "ar": "لا يوجد طلب غير مكتمل",
    "ja": "未完了の注文はありません"
  },
  "Saya setuju dengan": {
    "en": "I agree to the",
    "ar": "أوافق على",
    "ja": "同意します："
  },
  "Syarat & Ketentuan": {
    "en": "Terms & Conditions",
    "ar": "الشروط والأحكام",
    "ja": "利用規約"
  },
  "dan": {
    "en": "and",
    "ar": "و",
    "ja": "と"
  },
  "Kebijakan Privasi": {
    "en": "Privacy Policy",
    "ar": "سياسة الخصوصية",
    "ja": "プライバシーポリシー"
  },
  "💡 Kamu akan membayar langsung di kasir warung saat pesanan diambil atau diantar ke meja.": {
    "en": "💡 You'll pay directly at the counter when your order is picked up or served at the table.",
    "ar": "💡 ستدفع مباشرة عند الكاشير عند استلام طلبك أو تقديمه إلى الطاولة.",
    "ja": "💡 ご注文をお受け取り・お届けの際に、店頭レジで直接お支払いください。"
  },
  "Total Bayar": {
    "en": "Total Payment",
    "ar": "إجمالي الدفع",
    "ja": "支払い合計"
  },
  "Bayar Sekarang": {
    "en": "Pay Now",
    "ar": "ادفع الآن",
    "ja": "今すぐ支払う"
  },
  "Tambah Promo / Voucher": {
    "en": "Add Promo / Voucher",
    "ar": "إضافة عرض / قسيمة",
    "ja": "プロモ/クーポンを追加"
  },
  "Fitur promo & voucher segera hadir": {
    "en": "Promo & voucher feature coming soon",
    "ar": "ميزة العروض والقسائم قادمة قريبًا",
    "ja": "プロモ・クーポン機能は近日公開です"
  },
  "Setujui Syarat & Ketentuan dan Kebijakan Privasi dulu, ya": {
    "en": "Please agree to the Terms & Conditions and Privacy Policy first",
    "ar": "يرجى الموافقة على الشروط والأحكام وسياسة الخصوصية أولاً",
    "ja": "先に利用規約とプライバシーポリシーに同意してください"
  },
  "Pesanan Diterima": {
    "en": "Order Received",
    "ar": "تم استلام الطلب",
    "ja": "ご注文を受け付けました"
  },
  "Terima kasih! Kopi dan camilanmu sedang diseduh & disiapkan barista. Ambil nomor antrianmu di meja.": {
    "en": "Thank you! Your coffee and snacks are being brewed and prepared by our barista. Keep your queue number at the table.",
    "ar": "شكرًا لك! يقوم الباريستا بتحضير قهوتك ووجباتك الخفيفة الآن. احتفظ برقم الانتظار على الطاولة.",
    "ja": "ありがとうございます！バリスタがコーヒーと軽食を準備しています。整理番号はテーブルでお控えください。"
  },
  "NOMOR ANTRIAN": {
    "en": "QUEUE NUMBER",
    "ar": "رقم الانتظار",
    "ja": "整理番号"
  },
  "Kirim Detail Pesanan ke WhatsApp": {
    "en": "Send Order Details via WhatsApp",
    "ar": "إرسال تفاصيل الطلب عبر واتساب",
    "ja": "注文内容をWhatsAppで送信"
  },
  "WhatsApp akan terbuka otomatis dengan pesan sudah terisi — tinggal tap kirim. Kalau tidak terbuka sendiri, tap tombol di atas.": {
    "en": "WhatsApp will open automatically with the message pre-filled — just tap send. If it doesn't open, tap the button above.",
    "ar": "سيفتح واتساب تلقائيًا مع رسالة معبأة مسبقًا — فقط اضغط إرسال. إذا لم يفتح، اضغط الزر أعلاه.",
    "ja": "WhatsAppが自動的に開き、メッセージが入力済みです。送信をタップするだけです。開かない場合は上のボタンをタップしてください。"
  },
  "Kembali": {
    "en": "Back",
    "ar": "رجوع",
    "ja": "戻る"
  },
  "Hapus pesanan ini": {
    "en": "Delete this order",
    "ar": "حذف هذا الطلب",
    "ja": "この注文を削除"
  },
  "Pesanan dihapus": {
    "en": "Order deleted",
    "ar": "تم حذف الطلب",
    "ja": "注文を削除しました"
  },
  "Yakin ingin keluar dari Kopi Senja?": {
    "en": "Are you sure you want to leave Kopi Senja?",
    "ar": "هل أنت متأكد أنك تريد مغادرة Kopi Senja؟",
    "ja": "Kopi Senjaを終了してもよろしいですか？"
  },
  "Keranjang dan datamu tetap tersimpan kalau kamu kembali lagi.": {
    "en": "Your cart and data will still be saved if you come back.",
    "ar": "ستظل سلتك وبياناتك محفوظة إذا عدت مرة أخرى.",
    "ja": "また戻ってきた際も、カートとデータは保存されています。"
  },
  "Batal": {
    "en": "Cancel",
    "ar": "إلغاء",
    "ja": "キャンセル"
  },
  "Ya, Keluar": {
    "en": "Yes, Exit",
    "ar": "نعم، خروج",
    "ja": "はい、終了する"
  },
  "Sampai jumpa lagi!": {
    "en": "See you again!",
    "ar": "إلى اللقاء!",
    "ja": "またお会いしましょう！"
  },
  "Kamu boleh menutup tab/browser ini sekarang. Terima kasih sudah mampir ke Kopi Senja.": {
    "en": "You may close this tab/browser now. Thanks for visiting Kopi Senja.",
    "ar": "يمكنك الآن إغلاق هذا التبويب/المتصفح. شكرًا لزيارتك Kopi Senja.",
    "ja": "このタブ/ブラウザを閉じていただいて構いません。Kopi Senjaにお越しいただきありがとうございました。"
  },
  "Kembali ke Aplikasi": {
    "en": "Back to App",
    "ar": "العودة إلى التطبيق",
    "ja": "アプリに戻る"
  },
  "Paket Nongkrong": {
    "en": "Hangout Sets",
    "ar": "باقات التجمع",
    "ja": "たまり場セット"
  },
  "Kopi Susu": {
    "en": "Milk Coffee",
    "ar": "قهوة بالحليب",
    "ja": "ミルクコーヒー"
  },
  "Kopi Hitam": {
    "en": "Black Coffee",
    "ar": "قهوة سوداء",
    "ja": "ブラックコーヒー"
  },
  "Non-Kopi": {
    "en": "Non-Coffee",
    "ar": "بدون قهوة",
    "ja": "ノンコーヒー"
  },
  "Camilan": {
    "en": "Snacks",
    "ar": "وجبات خفيفة",
    "ja": "軽食"
  },
  "menu": {
    "en": "items",
    "ar": "عنصر",
    "ja": "品"
  },
  "menu ditemukan": {
    "en": "items found",
    "ar": "عنصر تم العثور عليه",
    "ja": "件見つかりました"
  },
  "Tambah": {
    "en": "Add",
    "ar": "إضافة",
    "ja": "追加"
  },
  "ditambahkan ke keranjang": {
    "en": "added to cart",
    "ar": "أُضيف إلى السلة",
    "ja": "をカートに追加しました"
  },
  "Ketik nama menu, misalnya \"kopi\", \"pisang goreng\", atau \"paket\"…": {
    "en": "Type a menu name, e.g. \"coffee\", \"fried banana\", or \"set\"…",
    "ar": "اكتب اسم عنصر القائمة، مثل \"قهوة\" أو \"موز مقلي\" أو \"باقة\"…",
    "ja": "「コーヒー」「バナナフライ」「セット」など、メニュー名を入力してください…"
  },
  "tidak ditemukan.": {
    "en": "not found.",
    "ar": "غير موجود.",
    "ja": "は見つかりませんでした。"
  },
  "Coba kata kunci lain, ya.": {
    "en": "Try a different keyword.",
    "ar": "جرّب كلمة مفتاحية أخرى.",
    "ja": "別のキーワードをお試しください。"
  },
  "Menu": {
    "en": "Menu",
    "ar": "القائمة",
    "ja": "メニュー"
  },
  "Catatan": {
    "en": "Notes",
    "ar": "ملاحظات",
    "ja": "備考"
  },
  "Contoh: less ice, jangan pakai gula aren": {
    "en": "e.g. less ice, no palm sugar",
    "ar": "مثال: ثلج أقل، بدون سكر جوز الهند",
    "ja": "例：氷少なめ、パームシュガー抜き"
  },
  "Jumlah Pesanan": {
    "en": "Order Quantity",
    "ar": "كمية الطلب",
    "ja": "注文数"
  },
  "Tambah Pesanan": {
    "en": "Add to Order",
    "ar": "أضف إلى الطلب",
    "ja": "注文に追加"
  },
  "Lengkapi pilihan di atas": {
    "en": "Complete your choices above",
    "ar": "أكمل اختياراتك أعلاه",
    "ja": "上の選択を完了してください"
  },
  "Pilih Kopi": {
    "en": "Choose Coffee",
    "ar": "اختر القهوة",
    "ja": "コーヒーを選ぶ"
  },
  "Pilih Camilan": {
    "en": "Choose Snack",
    "ar": "اختر وجبة خفيفة",
    "ja": "軽食を選ぶ"
  },
  "Pilih Kopi (2x)": {
    "en": "Choose Coffee (2x)",
    "ar": "اختر القهوة (مرتين)",
    "ja": "コーヒーを選ぶ（2つ）"
  },
  "Pilih Camilan (2x)": {
    "en": "Choose Snack (2x)",
    "ar": "اختر وجبة خفيفة (مرتين)",
    "ja": "軽食を選ぶ（2つ）"
  },
  "Pilih Minuman": {
    "en": "Choose Drink",
    "ar": "اختر المشروب",
    "ja": "ドリンクを選ぶ"
  },
  "Suhu": {
    "en": "Temperature",
    "ar": "درجة الحرارة",
    "ja": "温度"
  },
  "Level Gula": {
    "en": "Sugar Level",
    "ar": "مستوى السكر",
    "ja": "甘さレベル"
  },
  "Tambahan Topping": {
    "en": "Extra Toppings",
    "ar": "إضافات",
    "ja": "追加トッピング"
  },
  "Saus": {
    "en": "Sauce",
    "ar": "الصلصة",
    "ja": "ソース"
  },
  "Wajib pilih 1": {
    "en": "Choose 1, required",
    "ar": "اختر 1، إلزامي",
    "ja": "必須：1つ選択"
  },
  "Wajib pilih total 2": {
    "en": "Choose 2 total, required",
    "ar": "اختر 2 إجمالاً، إلزامي",
    "ja": "必須：合計2つ選択"
  },
  "Opsional, maks 2": {
    "en": "Optional, max 2",
    "ar": "اختياري، بحد أقصى 2",
    "ja": "任意：最大2つ"
  },
  "Opsional": {
    "en": "Optional",
    "ar": "اختياري",
    "ja": "任意"
  },
  "Kopi Susu Gula Aren": {
    "en": "Palm Sugar Milk Coffee",
    "ar": "قهوة بالحليب وسكر جوز الهند",
    "ja": "パームシュガーミルクコーヒー"
  },
  "Kopi Susu Original": {
    "en": "Original Milk Coffee",
    "ar": "قهوة بالحليب الأصلية",
    "ja": "オリジナルミルクコーヒー"
  },
  "Kopi Susu Hazelnut": {
    "en": "Hazelnut Milk Coffee",
    "ar": "قهوة بالحليب والبندق",
    "ja": "ヘーゼルナッツミルクコーヒー"
  },
  "Kopi Susu Pandan": {
    "en": "Pandan Milk Coffee",
    "ar": "قهوة بالحليب والباندان",
    "ja": "パンダンミルクコーヒー"
  },
  "Pisang Goreng": {
    "en": "Fried Banana",
    "ar": "موز مقلي",
    "ja": "バナナフライ"
  },
  "Tahu Crispy": {
    "en": "Crispy Tofu",
    "ar": "توفو مقرمش",
    "ja": "クリスピー豆腐"
  },
  "Roti Bakar Coklat": {
    "en": "Chocolate Toast",
    "ar": "توست بالشوكولاتة",
    "ja": "チョコレートトースト"
  },
  "Roti Bakar Coklat Keju": {
    "en": "Chocolate Cheese Toast",
    "ar": "توست بالشوكولاتة والجبن",
    "ja": "チョコチーズトースト"
  },
  "Kentang Goreng": {
    "en": "French Fries",
    "ar": "بطاطس مقلية",
    "ja": "フライドポテト"
  },
  "Matcha Latte": {
    "en": "Matcha Latte",
    "ar": "لاتيه ماتشا",
    "ja": "抹茶ラテ"
  },
  "Coklat Susu": {
    "en": "Chocolate Milk",
    "ar": "شوكولاتة بالحليب",
    "ja": "チョコレートミルク"
  },
  "Teh Tarik": {
    "en": "Pulled Milk Tea",
    "ar": "شاي بالحليب (تيه تاريك)",
    "ja": "テタリック（引き伸ばしミルクティー）"
  },
  "Panas": {
    "en": "Hot",
    "ar": "ساخن",
    "ja": "ホット"
  },
  "Dingin (Es)": {
    "en": "Cold (Iced)",
    "ar": "بارد (مثلج)",
    "ja": "アイス"
  },
  "Normal": {
    "en": "Normal",
    "ar": "عادي",
    "ja": "普通"
  },
  "Less Sugar": {
    "en": "Less Sugar",
    "ar": "سكر أقل",
    "ja": "甘さ控えめ"
  },
  "No Sugar": {
    "en": "No Sugar",
    "ar": "بدون سكر",
    "ja": "無糖"
  },
  "Extra Shot Espresso": {
    "en": "Extra Espresso Shot",
    "ar": "جرعة إسبريسو إضافية",
    "ja": "エスプレッソ追加"
  },
  "Boba": {
    "en": "Boba",
    "ar": "بوبا",
    "ja": "タピオカ"
  },
  "Extra Keju Parut": {
    "en": "Extra Grated Cheese",
    "ar": "جبن مبشور إضافي",
    "ja": "追加チーズ"
  },
  "Sambal Matah": {
    "en": "Sambal Matah",
    "ar": "صلصة سامبال ماتاه",
    "ja": "サンバル・マタ"
  },
  "Mayo": {
    "en": "Mayo",
    "ar": "مايونيز",
    "ja": "マヨネーズ"
  },
  "Paket Nongkrong A": {
    "en": "Hangout Set A",
    "ar": "باقة التجمع أ",
    "ja": "たまり場セットA"
  },
  "1 kopi susu pilihan, 1 camilan pilihan, gratis air mineral dingin.": {
    "en": "1 milk coffee of choice, 1 snack of choice, free cold mineral water.",
    "ar": "قهوة بالحليب حسب اختيارك، وجبة خفيفة حسب اختيارك، مياه معدنية باردة مجانية.",
    "ja": "お好きなミルクコーヒー1杯、お好きな軽食1つ、冷水無料付き。"
  },
  "Paket Nongkrong B": {
    "en": "Hangout Set B",
    "ar": "باقة التجمع ب",
    "ja": "たまり場セットB"
  },
  "1 kopi susu, 1 waffle atau kentang goreng, cocok buat kerja santai.": {
    "en": "1 milk coffee, 1 waffle or fries, perfect for relaxed work sessions.",
    "ar": "قهوة بالحليب، وافل أو بطاطس مقلية، مثالية لجلسات العمل الهادئة.",
    "ja": "ミルクコーヒー1杯、ワッフルまたはポテト1つ、まったり作業にぴったり。"
  },
  "Paket Berdua Santai": {
    "en": "Relaxed Duo Set",
    "ar": "باقة الاثنين المريحة",
    "ja": "まったりペアセット"
  },
  "2 kopi susu pilihan + 2 camilan, pas buat ngobrol lama berdua.": {
    "en": "2 milk coffees of choice + 2 snacks, perfect for a long chat together.",
    "ar": "قهوتان بالحليب حسب الاختيار + وجبتان خفيفتان، مثالية للدردشة الطويلة معًا.",
    "ja": "お好きなミルクコーヒー2杯＋軽食2つ、ふたりの長いおしゃべりにぴったり。"
  },
  "Paket Nongkrong C": {
    "en": "Hangout Set C",
    "ar": "باقة التجمع ج",
    "ja": "たまり場セットC"
  },
  "1 non-kopi favorit + 1 camilan manis, buat yang belum minum kopi.": {
    "en": "1 favorite non-coffee drink + 1 sweet snack, for those who don't drink coffee yet.",
    "ar": "مشروب غير قهوة مفضل + وجبة خفيفة حلوة، لمن لا يشربون القهوة بعد.",
    "ja": "人気のノンコーヒードリンク1杯＋甘い軽食1つ、コーヒーが苦手な方にも。"
  },
  "Espresso, susu segar, gula aren asli.": {
    "en": "Espresso, fresh milk, real palm sugar.",
    "ar": "إسبريسو، حليب طازج، سكر جوز الهند الأصلي.",
    "ja": "エスプレッソ、フレッシュミルク、本物のパームシュガー。"
  },
  "Racikan klasik, ringan dan pas di lidah.": {
    "en": "A classic blend, light and easy on the palate.",
    "ar": "مزيج كلاسيكي، خفيف ويناسب الذوق.",
    "ja": "定番のブレンド、軽やかで飲みやすい味わい。"
  },
  "Sentuhan aroma hazelnut yang lembut.": {
    "en": "A gentle touch of hazelnut aroma.",
    "ar": "لمسة ناعمة من رائحة البندق.",
    "ja": "やさしいヘーゼルナッツの香り。"
  },
  "Perpaduan kopi dan aroma pandan khas nusantara.": {
    "en": "A blend of coffee with signature Indonesian pandan aroma.",
    "ar": "مزيج من القهوة برائحة الباندان الإندونيسية المميزة.",
    "ja": "コーヒーとインドネシア伝統のパンダンの香りが融合。"
  },
  "Kopi Tubruk": {
    "en": "Tubruk Coffee",
    "ar": "قهوة توبروك",
    "ja": "トゥブルックコーヒー"
  },
  "Kopi bubuk diseduh langsung, gaya warung klasik.": {
    "en": "Ground coffee brewed directly, classic warung style.",
    "ar": "قهوة مطحونة تُحضّر مباشرة، على الطريقة الكلاسيكية.",
    "ja": "粉のまま直接抽出する、昔ながらのワルン式。"
  },
  "Espresso": {
    "en": "Espresso",
    "ar": "إسبريسو",
    "ja": "エスプレッソ"
  },
  "Dua shot espresso murni, pekat dan tegas.": {
    "en": "Two shots of pure espresso, bold and intense.",
    "ar": "جرعتان من الإسبريسو النقي، قوي ومركّز.",
    "ja": "エスプレッソ2ショット、濃厚でしっかりとした味わい。"
  },
  "Americano": {
    "en": "Americano",
    "ar": "أمريكانو",
    "ja": "アメリカーノ"
  },
  "Espresso dengan air panas, ringan tapi tetap kuat.": {
    "en": "Espresso with hot water, light yet still strong.",
    "ar": "إسبريسو مع ماء ساخن، خفيف لكنه قوي.",
    "ja": "エスプレッソにお湯を加えた、軽やかでもしっかりした味。"
  },
  "V60 Manual Brew": {
    "en": "V60 Manual Brew",
    "ar": "V60 تحضير يدوي",
    "ja": "V60ハンドドリップ"
  },
  "Diseduh manual oleh barista, biji pilihan minggu ini.": {
    "en": "Manually brewed by our barista, this week's selected beans.",
    "ar": "يُحضّر يدويًا بواسطة الباريستا، حبوب مختارة لهذا الأسبوع.",
    "ja": "バリスタによるハンドドリップ、今週の厳選豆を使用。"
  },
  "Matcha premium dengan susu creamy.": {
    "en": "Premium matcha with creamy milk.",
    "ar": "ماتشا فاخرة مع حليب كريمي.",
    "ja": "プレミアム抹茶とクリーミーミルク。"
  },
  "Coklat kental manis dengan susu segar.": {
    "en": "Sweet thick chocolate with fresh milk.",
    "ar": "شوكولاتة سميكة وحلوة مع حليب طازج.",
    "ja": "甘く濃厚なチョコレートとフレッシュミルク。"
  },
  "Teh susu ditarik hingga berbusa lembut.": {
    "en": "Milk tea pulled until softly frothy.",
    "ar": "شاي بالحليب يُسحب حتى يصبح رغويًا وناعمًا.",
    "ja": "なめらかな泡になるまで引き伸ばしたミルクティー。"
  },
  "Lemon Tea": {
    "en": "Lemon Tea",
    "ar": "شاي بالليمون",
    "ja": "レモンティー"
  },
  "Segar, manis asam, cocok siang hari.": {
    "en": "Refreshing, sweet and tangy, perfect for the afternoon.",
    "ar": "منعش، حلو وحامض، مثالي لفترة الظهيرة.",
    "ja": "爽やかな甘酸っぱさ、昼にぴったり。"
  },
  "Pisang Goreng Keju": {
    "en": "Cheese Fried Banana",
    "ar": "موز مقلي بالجبن",
    "ja": "チーズバナナフライ"
  },
  "Pisang goreng renyah dengan taburan keju parut, coklat meses, dan susu kental manis.": {
    "en": "Crispy fried banana topped with grated cheese, chocolate sprinkles, and sweetened condensed milk.",
    "ar": "موز مقلي مقرمش مع جبن مبشور ورشات شوكولاتة وحليب مكثف محلى.",
    "ja": "サクサクのバナナフライに、チーズ、チョコスプレー、練乳をトッピング。"
  },
  "Roti bakar isi coklat leleh, ditaburi keju parut melimpah.": {
    "en": "Toast filled with melted chocolate, topped with generous grated cheese.",
    "ar": "توست محشو بالشوكولاتة الذائبة، مغطى بكمية وفيرة من الجبن المبشور.",
    "ja": "とろけるチョコレート入りトーストに、たっぷりチーズをトッピング。"
  },
  "Kentang goreng renyah, saus sesuai selera.": {
    "en": "Crispy fries, sauce of your choice.",
    "ar": "بطاطس مقلية مقرمشة، مع صلصة حسب الرغبة.",
    "ja": "サクサクのフライドポテト、お好みのソースで。"
  },
  "Tahu Crispy Sambal Matah": {
    "en": "Crispy Tofu with Sambal Matah",
    "ar": "توفو مقرمش مع صلصة سامبال ماتاه",
    "ja": "クリスピー豆腐 サンバル・マタ添え"
  },
  "Tahu crispy dengan sambal matah segar.": {
    "en": "Crispy tofu with fresh sambal matah.",
    "ar": "توفو مقرمش مع صلصة سامبال ماتاه الطازجة.",
    "ja": "新鮮なサンバル・マタ添えのクリスピー豆腐。"
  },
  "Masuk sebagai Pembeli": {
    "en": "Signed in as Buyer",
    "ar": "مسجّل كمشترٍ",
    "ja": "購入者としてログイン中"
  },
  "Masuk sebagai": {
    "en": "Signed in as",
    "ar": "مسجّل باسم",
    "ja": "ログイン中："
  },
  "Masuk dengan Google": {
    "en": "Sign in with Google",
    "ar": "تسجيل الدخول عبر جوجل",
    "ja": "Googleでログイン"
  },
  "Keluar Akun": {
    "en": "Sign Out",
    "ar": "تسجيل الخروج",
    "ja": "ログアウト"
  },
  "Berhasil keluar dari akun": {
    "en": "Successfully signed out",
    "ar": "تم تسجيل الخروج بنجاح",
    "ja": "ログアウトしました"
  },
  "Nama akun Google": {
    "en": "Google account name",
    "ar": "اسم حساب جوجل",
    "ja": "Googleアカウント名"
  },
  "Email Google": {
    "en": "Google email",
    "ar": "البريد الإلكتروني لجوجل",
    "ja": "Googleメールアドレス"
  },
  "Lanjutkan": {
    "en": "Continue",
    "ar": "متابعة",
    "ja": "続ける"
  },
  "Isi nama dan email dulu, ya": {
    "en": "Please fill in name and email first",
    "ar": "يرجى إدخال الاسم والبريد الإلكتروني أولاً",
    "ja": "先に名前とメールアドレスを入力してください"
  },
  "Berhasil masuk dengan Google": {
    "en": "Successfully signed in with Google",
    "ar": "تم تسجيل الدخول بنجاح عبر جوجل",
    "ja": "Googleでログインしました"
  },
  "Belum ada riwayat pesanan.": {
    "en": "No order history yet.",
    "ar": "لا يوجد سجل طلبات بعد.",
    "ja": "まだ注文履歴はありません。"
  },
  "Yuk pesan kopi favoritmu dulu": {
    "en": "Go ahead and order your favorite coffee",
    "ar": "هيا اطلب قهوتك المفضلة",
    "ja": "お気に入りのコーヒーを注文してみましょう"
  },
  "Hapus riwayat ini": {
    "en": "Delete this history",
    "ar": "حذف هذا السجل",
    "ja": "この履歴を削除"
  },
  "Riwayat pesanan dihapus": {
    "en": "Order history deleted",
    "ar": "تم حذف سجل الطلب",
    "ja": "注文履歴を削除しました"
  },
  "Meja": {
    "en": "Table",
    "ar": "الطاولة",
    "ja": "テーブル"
  },

  "Makanan": { "en": "Food", "ar": "الطعام", "ja": "フード" },
  "Nasi Pecel": { "en": "Pecel Rice", "ar": "أرز بيتشل", "ja": "ペチェルライス" },
  "Nasi hangat dengan sayur pecel dan sambal kacang gurih.": {
    "en": "Warm rice with pecel vegetables and savory peanut sambal.",
    "ar": "أرز دافئ مع خضار بيتشل وصلصة الفول السوداني اللذيذة.",
    "ja": "温かいご飯に野菜のペチェルと香ばしいピーナッツソースを添えて。"
  },
  "Penyet Lele": { "en": "Smashed Catfish", "ar": "سمك السلور المهروس", "ja": "ペニエットレレ（ナマズ）" },
  "Lele goreng crispy disajikan dengan sambal terasi pedas.": {
    "en": "Crispy fried catfish served with spicy shrimp-paste sambal.",
    "ar": "سمك السلور المقلي المقرمش يُقدَّم مع صلصة تراسي الحارة.",
    "ja": "カリカリに揚げたナマズに、辛いテラシサンバルを添えて。"
  },
  "Nasi Sambel Ayam": { "en": "Chicken Sambal Rice", "ar": "أرز مع دجاج وصلصة السامبال", "ja": "チキンサンバルライス" },
  "Nasi dengan ayam goreng dan sambal khas warung.": {
    "en": "Rice with fried chicken and the warung's signature sambal.",
    "ar": "أرز مع دجاج مقلي وصلصة السامبال المميزة للمطعم.",
    "ja": "ご飯にフライドチキンとお店特製サンバルを添えて。"
  },
  "Nasi Bebek": { "en": "Duck Rice", "ar": "أرز البط", "ja": "ダックライス" },
  "Bebek goreng empuk dengan sambal korek pedas menggugah selera.": {
    "en": "Tender fried duck with mouth-watering spicy korek sambal.",
    "ar": "بط مقلي طري مع صلصة كوريك الحارة الشهية.",
    "ja": "柔らかい揚げダックに、食欲をそそる辛いコレックサンバルを添えて。"
  },
  "Tambahan": { "en": "Add-ons", "ar": "إضافات", "ja": "追加オプション" },
  "Opsional, pilih 1": { "en": "Optional, choose 1", "ar": "اختياري، اختر 1", "ja": "任意：1つ選択" },
  "Tambah Telur": { "en": "Add Egg", "ar": "إضافة بيضة", "ja": "卵を追加" },
  "Pecel Versi Jumbo": { "en": "Jumbo Pecel", "ar": "بيتشل بحجم كبير", "ja": "ジャンボペチェル" },
  "Level Pedas": { "en": "Spice Level", "ar": "مستوى الحرارة", "ja": "辛さレベル" },
  "Pedas Normal": { "en": "Normal Spicy", "ar": "حار عادي", "ja": "普通辛さ" },
  "Extra Pedas": { "en": "Extra Spicy", "ar": "حار جدًا", "ja": "激辛" },
  "Tanpa Sambal": { "en": "No Sambal", "ar": "بدون صلصة سامبال", "ja": "サンバルなし" },

  "Geser ke kiri untuk hapus pesanan": {
    "en": "Swipe left to remove an item",
    "ar": "اسحب لليسار لحذف عنصر",
    "ja": "左にスワイプして削除"
  },
  "Pesanan dihapus": { "en": "Item removed", "ar": "تم حذف العنصر", "ja": "注文を削除しました" },
  "keranjang kosong": { "en": "cart is empty", "ar": "السلة فارغة", "ja": "カートが空です" },

  "Jam Operasional": { "en": "Opening Hours", "ar": "ساعات العمل", "ja": "営業時間" },
  "Hari ini": { "en": "Today", "ar": "اليوم", "ja": "本日" },
  "Senin": { "en": "Monday", "ar": "الإثنين", "ja": "月曜日" },
  "Selasa": { "en": "Tuesday", "ar": "الثلاثاء", "ja": "火曜日" },
  "Rabu": { "en": "Wednesday", "ar": "الأربعاء", "ja": "水曜日" },
  "Kamis": { "en": "Thursday", "ar": "الخميس", "ja": "木曜日" },
  "Jumat": { "en": "Friday", "ar": "الجمعة", "ja": "金曜日" },
  "Sabtu": { "en": "Saturday", "ar": "السبت", "ja": "土曜日" },
  "Minggu": { "en": "Sunday", "ar": "الأحد", "ja": "日曜日" },
  "Buka setiap hari termasuk Sabtu & Minggu, dengan jam operasional yang sama — tidak ada jam khusus akhir pekan.": {
    "en": "Open every day including Saturday & Sunday, with the same operating hours — no special weekend hours.",
    "ar": "مفتوح كل يوم بما في ذلك السبت والأحد، بنفس ساعات العمل — لا توجد ساعات خاصة لعطلة نهاية الأسبوع.",
    "ja": "土日を含め毎日同じ営業時間で営業しています。週末の特別営業時間はありません。"
  },

  "Bayar dengan QRIS": { "en": "Pay with QRIS", "ar": "الدفع عبر QRIS", "ja": "QRISで支払う" },
  "Simpan QRIS": { "en": "Save QRIS", "ar": "حفظ QRIS", "ja": "QRISを保存" },
  "Bayar sebelum": { "en": "Pay before", "ar": "ادفع قبل", "ja": "支払い期限" },
  "QRIS sudah kedaluwarsa. Perbarui untuk melanjutkan.": {
    "en": "QRIS has expired. Refresh to continue.",
    "ar": "انتهت صلاحية QRIS. حدّث للمتابعة.",
    "ja": "QRISの有効期限が切れました。更新して続けてください。"
  },
  "Perbarui QRIS": { "en": "Refresh QRIS", "ar": "تحديث QRIS", "ja": "QRISを更新" },
  "Scan QRIS ini pakai aplikasi e-wallet atau m-banking kamu. Sistem akan otomatis mendeteksi begitu pembayaran berhasil.": {
    "en": "Scan this QRIS using your e-wallet or mobile banking app. The system will automatically detect once payment succeeds.",
    "ar": "امسح رمز QRIS هذا باستخدام تطبيق المحفظة الإلكترونية أو الخدمات المصرفية عبر الهاتف. سيكتشف النظام تلقائيًا عند نجاح الدفع.",
    "ja": "このQRISをお使いのe-walletまたはモバイルバンキングアプリでスキャンしてください。支払いが完了すると自動的に検出されます。"
  },
  "Menunggu pembayaran... sistem akan otomatis lanjut setelah QRIS terbayar": {
    "en": "Waiting for payment... the system will continue automatically once QRIS is paid",
    "ar": "في انتظار الدفع... سيتابع النظام تلقائيًا بمجرد دفع QRIS",
    "ja": "支払いを待っています... QRISの支払いが完了すると自動的に進みます"
  },
  "Nomor HP harus diawali 08 atau 62": {
    "en": "Phone number must start with 08 or 62",
    "ar": "يجب أن يبدأ رقم الهاتف بـ 08 أو 62",
    "ja": "電話番号は08または62で始まる必要があります"
  },
  "Email harus menggunakan @gmail.com": {
    "en": "Email must use @gmail.com",
    "ar": "يجب أن يستخدم البريد الإلكتروني @gmail.com",
    "ja": "メールアドレスは@gmail.comを使用する必要があります"
  }
};

const LANGUAGES = [
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];
let currentLang = 'id';

function tt(text) {
  if (!text) return text;
  if (currentLang === 'id') return text;
  const entry = I18N[text];
  return (entry && entry[currentLang]) ? entry[currentLang] : text;
}

async function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  await storageSet('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = tt(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', tt(el.getAttribute('data-i18n-placeholder')));
  });

  renderTabs();
  renderMenu();
  renderTableChip();
  if (activeProduct) renderSheet();
  if (!$('#viewSearch').hidden) renderSearchResults($('#searchInput').value);
  if (!$('#viewCheckout').hidden) renderSummary();
  if (!$('#viewProfile').hidden) renderProfileCard();
  if (!$('#viewOrderHistory').hidden) renderOrderHistory();
}

function renderLanguagePage() {
  const body = $('#languageBody');
  body.innerHTML = LANGUAGES.map(l => `
    <button class="profile-row lang-row" data-lang="${l.code}">
      <span class="pr-ic">${l.flag}</span><span class="pr-label">${l.label}</span>
      <span class="lang-check">${currentLang === l.code ? '✓' : ''}</span>
    </button>`).join('');
  body.querySelectorAll('.lang-row').forEach(btn => {
    btn.addEventListener('click', async () => {
      await applyLanguage(btn.dataset.lang);
      renderLanguagePage();
      showToast(tt('Bahasa berhasil diubah'));
    });
  });
}

const CATEGORIES = [
  { id: 'paket', label: 'Paket Nongkrong' },
  { id: 'kopisusu', label: 'Kopi Susu' },
  { id: 'kopihitam', label: 'Kopi Hitam' },
  { id: 'nonkopi', label: 'Non-Kopi' },
  { id: 'camilan', label: 'Camilan' },
  { id: 'gorengan', label: 'Gorengan' },
  { id: 'makanan', label: 'Makanan' },
];

const PRODUCTS = [
  // PAKET (grid)
  {
    id: 'p1', cat: 'paket', layout: 'grid', emoji: '☕🍌', grad: 'g1', img: 'images/img-002.jpg', name: 'Paket Nongkrong Bersama', price: 30000,
    desc: '1 kopi susu pilihan, 1 camilan pilihan, gratis air mineral dingin.',
    groups: [
      { title: 'Pilih Kopi', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'ga', name: 'Kopi Susu Gula Aren', extra: 0 }, { id: 'ori', name: 'Kopi Susu Original', extra: 0 }, { id: 'hz', name: 'Kopi Susu Hazelnut', extra: 0 }] },
      { title: 'Pilih Camilan', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'pisgor', name: 'Pisang Goreng', extra: 0 }, { id: 'tahu', name: 'Tahu Crispy', extra: 0 }, { id: 'roti', name: 'Roti Bakar Coklat', extra: 0 }] },
      toppingGroup(),
    ]
  },
  {
    id: 'p2', cat: 'paket', layout: 'grid', emoji: '☕🧇', grad: 'g2', img: 'images/img-003.jpg', name: 'Paket Nongkrong Bahagia', price: 25000,
    desc: '1 kopi susu, 1 waffle atau kentang goreng, cocok buat kerja santai.',
    groups: [
      { title: 'Pilih Kopi', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'ga', name: 'Kopi Susu Gula Aren', extra: 0 }, { id: 'pandan', name: 'Kopi Susu Pandan', extra: 0 }, { id: 'hz', name: 'Kopi Susu Hazelnut', extra: 0 }] },
      { title: 'Pilih Camilan', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'roti', name: 'Roti Bakar Coklat Keju', extra: 0 }, { id: 'kentang', name: 'Kentang Goreng', extra: 0 }] },
      toppingGroup(),
    ]
  },
  {
    id: 'p3', cat: 'paket', layout: 'grid', emoji: '☕☕', grad: 'g3', img: 'images/img-004.jpg', name: 'Paket Berdua Santai', price: 20000,
    desc: '2 kopi susu pilihan + 2 camilan, pas buat ngobrol lama berdua.',
    groups: [
      { title: 'Pilih Kopi (2x)', note: 'Wajib pilih total 2', max: 2, min: 2, options: [{ id: 'ga', name: 'Kopi Susu Gula Aren', extra: 0 }, { id: 'ori', name: 'Kopi Susu Original', extra: 0 }, { id: 'hz', name: 'Kopi Susu Hazelnut', extra: 0 }, { id: 'pandan', name: 'Kopi Susu Pandan', extra: 0 }] },
      { title: 'Pilih Camilan (2x)', note: 'Wajib pilih total 2', max: 2, min: 2, options: [{ id: 'pisgor', name: 'Pisang Goreng', extra: 0 }, { id: 'tahu', name: 'Tahu Crispy', extra: 0 }, { id: 'kentang', name: 'Kentang Goreng', extra: 0 }] },
      toppingGroup(),
    ]
  },
  {
    id: 'p4', cat: 'paket', layout: 'grid', emoji: '☕🍫', grad: 'g1', img: 'images/img-005.jpg', name: 'Paket Nongkrong Ceria', price: 25000,
    desc: '1 non-kopi favorit + 1 camilan manis, buat yang belum minum kopi.',
    groups: [
      { title: 'Pilih Minuman', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'matcha', name: 'Matcha Latte', extra: 0 }, { id: 'coklat', name: 'Coklat Susu', extra: 0 }, { id: 'tarik', name: 'Teh Tarik', extra: 0 }] },
      { title: 'Pilih Camilan', note: 'Wajib pilih 1', max: 1, min: 1, options: [{ id: 'pisgor', name: 'Pisang Goreng', extra: 0 }, { id: 'roti', name: 'Roti Bakar Coklat', extra: 0 }] },
      toppingGroup(),
    ]
  },

  // KOPI SUSU (list)
  { id: 'k1', cat: 'kopisusu', layout: 'list', emoji: '🥤', grad: 'g1', img: 'images/img-006.jpg', name: 'Kopi Susu Gula Aren', price: 7000, desc: 'Espresso, susu segar, gula aren asli.', groups: [suhuGroup(), gulaGroup()] },
  { id: 'k2', cat: 'kopisusu', layout: 'list', emoji: '🥤', grad: 'g1', img: 'images/img-007.jpg', name: 'Kopi Susu Original', price: 6000, desc: 'Racikan klasik, ringan dan pas di lidah.', groups: [suhuGroup(), gulaGroup()] },
  { id: 'k3', cat: 'kopisusu', layout: 'list', emoji: '🥤', grad: 'g1', img: 'images/img-008.jpg', name: 'Kopi Susu Hazelnut', price: 10000, desc: 'Sentuhan aroma hazelnut yang lembut.', groups: [suhuGroup(), gulaGroup()] },
  { id: 'k4', cat: 'kopisusu', layout: 'list', emoji: '🥤', grad: 'g1', img: 'images/img-009.jpg', name: 'Kopi Susu Pandan', price: 10000, desc: 'Perpaduan kopi dan aroma pandan khas nusantara.', groups: [suhuGroup(), gulaGroup()] },

  // KOPI HITAM (list)
  { id: 'h1', cat: 'kopihitam', layout: 'list', emoji: '☕', grad: 'g2', img: 'images/img-010.jpg', name: 'Kopi Tubruk', price: 8000, desc: 'Kopi bubuk diseduh langsung, gaya warung klasik.', groups: [suhuGroup()] },
  { id: 'h2', cat: 'kopihitam', layout: 'list', emoji: '☕', grad: 'g2', img: 'images/img-011.jpg', name: 'Kopi Espresso', price: 10000, desc: 'Dua shot espresso murni, pekat dan tegas.', groups: [] },
  { id: 'h3', cat: 'kopihitam', layout: 'list', emoji: '☕', grad: 'g2', img: 'images/img-012.jpg', name: 'Kopi Americano', price: 10000, desc: 'Espresso dengan air panas, ringan tapi tetap kuat.', groups: [suhuGroup()] },
  { id: 'h4', cat: 'kopihitam', layout: 'list', emoji: '☕', grad: 'g2', img: 'images/img-013.jpg', name: 'V60 Manual Brew', price: 10000, desc: 'Diseduh manual oleh barista, biji pilihan minggu ini.', groups: [] },
  { id: 'h5', cat: 'kopihitam', layout: 'list', emoji: '☕', grad: 'g2', img: 'images/img-014.jpg', name: 'Kopi Hitam Original', price: 6000, desc: 'Racikan kopi hitam klasik Kopi Senja, pahit pas tanpa campuran.', groups: [suhuGroup()] },

  // NON-KOPI (list)
  { id: 'n1', cat: 'nonkopi', layout: 'list', emoji: '🍵', grad: 'g3', img: 'images/img-015.jpg', name: 'Matcha Latte', price: 8000, desc: 'Matcha premium dengan susu creamy.', groups: [suhuGroup(), gulaGroup()] },
  { id: 'n2', cat: 'nonkopi', layout: 'list', emoji: '🍫', grad: 'g3', img: 'images/img-016.jpg', name: 'Coklat Susu', price: 8000, desc: 'Coklat kental manis dengan susu segar.', groups: [suhuGroup()] },
  { id: 'n3', cat: 'nonkopi', layout: 'list', emoji: '🫖', grad: 'g3', img: 'images/img-017.jpg', name: 'Teh Tarik', price: 7000, desc: 'Teh susu ditarik hingga berbusa lembut.', groups: [suhuGroup()] },
  { id: 'n4', cat: 'nonkopi', layout: 'list', emoji: '🍋', grad: 'g3', img: 'images/img-018.jpg', name: 'Lemon Tea', price: 6000, desc: 'Segar, manis asam, cocok siang hari.', groups: [suhuGroup()] },

  // CAMILAN (list)
  { id: 'c1', cat: 'camilan', layout: 'list', emoji: '🍌', grad: 'g1', img: 'images/img-019.jpg', name: 'Pisang Goreng Keju', price: 10000, desc: 'Pisang goreng renyah dengan taburan keju parut, coklat meses, dan susu kental manis.', groups: [] },
  { id: 'c2', cat: 'camilan', layout: 'list', emoji: '🍞', grad: 'g1', img: 'images/img-020.jpg', name: 'Roti Bakar Coklat Keju', price: 10000, desc: 'Roti bakar isi coklat leleh, ditaburi keju parut melimpah.', groups: [] },
  { id: 'c3', cat: 'camilan', layout: 'list', emoji: '🍟', grad: 'g1', img: 'images/img-021.jpg', name: 'Kentang Goreng', price: 8000, desc: 'Kentang goreng renyah, saus sesuai selera.', groups: [{ title: 'Saus', note: 'Opsional', max: 1, min: 0, options: [{ id: 'sambal', name: 'Sambal Matah', extra: 0 }, { id: 'mayo', name: 'Mayo', extra: 0 }] }] },
  { id: 'c4', cat: 'camilan', layout: 'list', emoji: '🧊', grad: 'g1', img: 'images/img-022.jpg', name: 'Tahu Crispy', price: 8000, desc: 'Tahu crispy dengan sambal matah segar.', groups: [] },


  // GORENGAN (list)
  {
    id: 'g1', cat: 'gorengan', layout: 'list', emoji: '🍢', grad: 'g1', img: 'images/img-023.jpg', name: 'Tempe Goreng', price: 8000,
    desc: 'Tempe mendoan digoreng tipis, gurih dan renyah, cocok dengan sambal kecap.', groups: []
  },
  {
    id: 'g2', cat: 'gorengan', layout: 'list', emoji: '🥟', grad: 'g2', img: 'images/img-024.jpg', name: 'Tahu Isi', price: 8000,
    desc: 'Tahu digoreng berisi sayuran segar, renyah di luar dan gurih di dalam.', groups: []
  },
  {
    id: 'g3', cat: 'gorengan', layout: 'list', emoji: '🌽', grad: 'g3', img: 'images/img-025.jpg', name: 'Bakwan Jagung', price: 8000,
    desc: 'Bakwan jagung manis digoreng garing, disajikan dengan saus sambal.', groups: []
  },
  {
    id: 'g4', cat: 'gorengan', layout: 'list', emoji: '🥦', grad: 'g1', img: 'images/img-026.jpg', name: 'Bakwan Sayur', price: 8000,
    desc: 'Bakwan sayur campur, renyah dan gurih dengan sambal pedas.', groups: []
  },
  {
    id: 'g5', cat: 'gorengan', layout: 'list', emoji: '🍌', grad: 'g2', img: 'images/img-027.jpg', name: 'Sukun Goreng', price: 8000,
    desc: 'Sukun digoreng renyah, disajikan dengan sambal pedas manis.', groups: []
  },
  // MAKANAN (list)
  {
    id: 'm1', cat: 'makanan', layout: 'list', emoji: '🍚🥗', grad: 'g3', img: 'images/img-028.jpg', name: 'Nasi Pecel', price: 7000,
    desc: 'Nasi hangat dengan sayur pecel dan sambal kacang gurih.',
    groups: [{
      title: 'Tambahan', note: 'Opsional, pilih 1', max: 1, min: 0,
      options: [{ id: 'telor', name: 'Tambah Telur', extra: 5000 }, { id: 'jumbo', name: 'Pecel Versi Jumbo', extra: 8000 }]
    }]
  },
  {
    id: 'm2', cat: 'makanan', layout: 'list', emoji: '🐟🌶️', grad: 'g2', img: 'images/img-029.jpg', name: 'Penyet Lele', price: 15000,
    desc: 'Lele goreng crispy disajikan dengan sambal terasi pedas.', groups: [pedasGroup()]
  },
  {
    id: 'm3', cat: 'makanan', layout: 'list', emoji: '🍗🌶️', grad: 'g1', img: 'images/img-030.jpg', name: 'Nasi Ayam', price: 20000,
    desc: 'Nasi dengan ayam goreng dan sambal khas warung.', groups: [pedasGroup()]
  },
  {
    id: 'm4', cat: 'makanan', layout: 'list', emoji: '🦆🍚', grad: 'g2', img: 'images/img-031.jpg', name: 'Nasi Bebek', price: 25000,
    desc: 'Bebek goreng empuk dengan sambal korek pedas menggugah selera.', groups: [pedasGroup()]
  },
];

/* ===================== KELOLA MENU (KASIR): HARGA & STATUS HABIS =====================
   Kasir bisa mengubah harga & menandai menu habis lewat panel "Kelola Menu".
   Perubahan disimpan sebagai "menuOverrides" (per-ID produk) lewat storageSet,
   dan disiarkan lewat BroadcastChannel supaya tab pembeli yang sedang terbuka
   di browser yang sama langsung ter-update tanpa perlu refresh. */
function buildMenuOverridesSnapshot() {
  const map = {};
  PRODUCTS.forEach(p => {
    map[p.id] = { price: p.price, soldOut: !!p.soldOut, name: p.name, desc: p.desc || '', img: p.img || null, cat: p.cat };
  });
  return map;
}
function applyMenuOverrides(map) {
  if (!map) return;
  PRODUCTS.forEach(p => {
    const o = map[p.id];
    if (!o) return;
    if (typeof o.price === 'number' && o.price > 0) p.price = o.price;
    if (typeof o.soldOut === 'boolean') p.soldOut = o.soldOut;
    if (typeof o.name === 'string' && o.name.trim()) p.name = o.name;
    if (typeof o.desc === 'string') p.desc = o.desc;
    if (typeof o.img === 'string' && o.img) p.img = o.img;
    if (typeof o.cat === 'string' && CATEGORIES.some(c => c.id === o.cat)) p.cat = o.cat;
  });
}
async function persistMenuOverrides() {
  await storageSet('menuOverrides', JSON.stringify(buildMenuOverridesSnapshot()));
}

/* ---- Nama kategori (class menu) juga bisa diganti kasir, contoh: "Kopi Susu" -> nama lain ---- */
function buildCategoryOverridesSnapshot() {
  const map = {};
  CATEGORIES.forEach(c => { map[c.id] = c.label; });
  return map;
}
function applyCategoryOverrides(map) {
  if (!map) return;
  CATEGORIES.forEach(c => {
    if (typeof map[c.id] === 'string' && map[c.id].trim()) c.label = map[c.id];
  });
}
async function persistCategoryOverrides() {
  await storageSet('categoryOverrides', JSON.stringify(buildCategoryOverridesSnapshot()));
}

/* ---- Menu baru yang ditambahkan kasir disimpan utuh, supaya tetap ada setelah refresh ---- */
async function persistCustomProducts() {
  const custom = PRODUCTS.filter(p => p.isCustom);
  await storageSet('customProducts', JSON.stringify(custom));
}

let menuChannel = null;
try { menuChannel = new BroadcastChannel('kopi-senja-menu'); } catch (e) { menuChannel = null; }

function broadcastMenuChange() {
  if (menuChannel) menuChannel.postMessage({
    type: 'menu-updated',
    overrides: buildMenuOverridesSnapshot(),
    categories: buildCategoryOverridesSnapshot(),
  });
}

function refreshMenuEverywhere() {
  renderTabs();
  renderMenu();
  renderKasirMenuManage($('#kasirMenuSearch') ? $('#kasirMenuSearch').value : '');
  renderKasirCatManage();
  populateAddMenuCategorySelect();
}

function updateProductPrice(productId, newPriceRaw) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const newPrice = parseInt(String(newPriceRaw).replace(/[^0-9]/g, ''), 10);
  if (!newPrice || newPrice <= 0) {
    showToast(tt('Harga tidak valid'));
    renderKasirMenuManage($('#kasirMenuSearch').value);
    return;
  }
  product.price = newPrice;
  if (product.isCustom) persistCustomProducts();
  persistMenuOverrides();
  broadcastMenuChange();
  renderMenu();
  renderKasirMenuManage($('#kasirMenuSearch').value);
  showToast(`${tt('Harga')} ${tt(product.name)} ${tt('diperbarui')}`);
}

function updateProductName(productId, newNameRaw) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const newName = String(newNameRaw || '').trim();
  if (!newName || newName === product.name) {
    renderKasirMenuManage($('#kasirMenuSearch').value);
    return;
  }
  product.name = newName;
  if (product.isCustom) persistCustomProducts();
  persistMenuOverrides();
  broadcastMenuChange();
  renderMenu();
  renderKasirMenuManage($('#kasirMenuSearch').value);
  showToast(`${tt('Nama menu diperbarui menjadi')} ${tt(newName)}`);
}

function updateProductCategory(productId, newCatId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !CATEGORIES.some(c => c.id === newCatId) || product.cat === newCatId) return;
  product.cat = newCatId;
  if (product.isCustom) persistCustomProducts();
  persistMenuOverrides();
  broadcastMenuChange();
  renderTabs();
  renderMenu();
  renderKasirMenuManage($('#kasirMenuSearch').value);
  showToast(tt('Kategori menu diperbarui'));
}

function updateProductImageFile(productId, file) {
  if (!file) return;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const reader = new FileReader();
  reader.onload = () => {
    product.img = reader.result;
    if (product.isCustom) persistCustomProducts();
    persistMenuOverrides();
    broadcastMenuChange();
    renderMenu();
    renderKasirMenuManage($('#kasirMenuSearch').value);
    showToast(`${tt('Foto')} ${tt(product.name)} ${tt('diperbarui')}`);
  };
  reader.onerror = () => showToast(tt('Gagal membaca gambar'));
  reader.readAsDataURL(file);
}

function toggleSoldOut(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  product.soldOut = !product.soldOut;
  persistMenuOverrides();
  broadcastMenuChange();
  renderMenu();
  renderKasirMenuManage($('#kasirMenuSearch').value);
  showToast(product.soldOut
    ? `${tt(product.name)} ${tt('ditandai habis')}`
    : `${tt(product.name)} ${tt('tersedia lagi')}`);
}

/* ---- Kelola nama kategori (mis. ganti "Paket Nongkrong" atau "Kopi Susu") ---- */
function renderKasirCatManage() {
  const box = $('#kasirCatManage');
  if (!box) return;
  box.innerHTML = `<div class="kasir-cat-manage-title">${tt('Ganti Nama Kategori')}</div>` +
    CATEGORIES.map(c => `
      <div class="kasir-cat-manage-row" data-cat="${c.id}">
        <input type="text" class="kcm-input" data-id="${c.id}" value="${tt(c.label)}">
        <button type="button" data-act="save-cat" data-id="${c.id}">${tt('Simpan')}</button>
      </div>`).join('');

  box.querySelectorAll('[data-act="save-cat"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = box.querySelector(`.kcm-input[data-id="${btn.dataset.id}"]`);
      updateCategoryLabel(btn.dataset.id, input.value);
    });
  });
  box.querySelectorAll('.kcm-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') updateCategoryLabel(input.dataset.id, input.value);
    });
  });
}
function updateCategoryLabel(catId, newLabelRaw) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  const newLabel = String(newLabelRaw || '').trim();
  if (!newLabel) {
    showToast(tt('Nama kategori tidak boleh kosong'));
    renderKasirCatManage();
    return;
  }
  cat.label = newLabel;
  persistCategoryOverrides();
  broadcastMenuChange();
  refreshMenuEverywhere();
  showToast(`${tt('Nama kategori diperbarui menjadi')} ${tt(newLabel)}`);
}

/* ---- Tambah menu baru ---- */
function populateAddMenuCategorySelect() {
  const sel = $('#kasirAddCat');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${tt(c.label)}</option>`).join('');
  if (current && CATEGORIES.some(c => c.id === current)) sel.value = current;
}
function closeAddMenuForm() {
  $('#kasirAddForm').hidden = true;
  $('#kasirAddName').value = '';
  $('#kasirAddPrice').value = '';
  $('#kasirAddDesc').value = '';
  $('#kasirAddImg').value = '';
}
function addNewProduct() {
  const catId = $('#kasirAddCat').value;
  const name = $('#kasirAddName').value.trim();
  const priceRaw = $('#kasirAddPrice').value;
  const desc = $('#kasirAddDesc').value.trim();
  const fileInput = $('#kasirAddImg');
  const price = parseInt(String(priceRaw).replace(/[^0-9]/g, ''), 10);

  if (!name) { showToast(tt('Nama menu wajib diisi')); return; }
  if (!price || price <= 0) { showToast(tt('Harga tidak valid')); return; }
  if (!CATEGORIES.some(c => c.id === catId)) { showToast(tt('Kategori tidak valid')); return; }

  const catItems = PRODUCTS.filter(p => p.cat === catId);
  const layout = catItems[0]?.layout || 'list';
  const gradPool = ['g1', 'g2', 'g3'];
  const grad = gradPool[PRODUCTS.length % gradPool.length];

  const finish = (imgDataUrl) => {
    const newProduct = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      cat: catId,
      layout,
      emoji: '🍽️',
      grad,
      img: imgDataUrl || null,
      name,
      price,
      desc: desc || '',
      groups: [],
      isCustom: true,
    };
    PRODUCTS.push(newProduct);
    persistCustomProducts();
    persistMenuOverrides();
    broadcastMenuChange();
    refreshMenuEverywhere();
    closeAddMenuForm();
    showToast(`${tt('Menu')} ${tt(name)} ${tt('berhasil ditambahkan')}`);
  };

  const file = fileInput.files && fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => finish(reader.result);
    reader.onerror = () => finish(null);
    reader.readAsDataURL(file);
  } else {
    finish(null);
  }
}
$('#kasirAddMenuToggle').addEventListener('click', () => {
  const form = $('#kasirAddForm');
  form.hidden = !form.hidden;
  if (!form.hidden) populateAddMenuCategorySelect();
});
$('#kasirAddCancelBtn').addEventListener('click', closeAddMenuForm);
$('#kasirAddSubmitBtn').addEventListener('click', addNewProduct);

function renderKasirMenuManage(filterText) {
  const body = $('#kasirMenuBody');
  if (!body) return;
  const q = (filterText || '').trim().toLowerCase();
  body.innerHTML = CATEGORIES.map(c => {
    const items = PRODUCTS.filter(p => p.cat === c.id && (!q || tt(p.name).toLowerCase().includes(q)));
    if (items.length === 0) return '';
    const catOptions = CATEGORIES.map(cc => `<option value="${cc.id}" ${cc.id === c.id ? 'selected' : ''}>${tt(cc.label)}</option>`).join('');
    const rows = items.map(p => `
      <div class="kasir-menu-row" data-id="${p.id}">
        <label class="kmr-thumb-wrap" style="position:relative;">
          ${thumbHTML(p, 'kmr-thumb')}
          <div class="kmr-thumb-upload">${tt('Ganti Foto')}</div>
          <input type="file" accept="image/*" class="kmr-img-input" data-id="${p.id}" style="display:none;">
        </label>
        <div class="kmr-info">
          <input type="text" class="kmr-name-input" data-id="${p.id}" value="${tt(p.name)}">
          <div class="kmr-price-row">
            <input type="number" inputmode="numeric" class="kmr-price-input" data-id="${p.id}" value="${p.price}" min="0" step="500">
            <button class="kmr-save-btn" data-act="save-price" data-id="${p.id}">${tt('Simpan')}</button>
          </div>
          <div class="kmr-row-bottom">
            <select class="kmr-cat-select" data-id="${p.id}">${catOptions}</select>
            ${p.soldOut ? `<span class="kmr-badge-habis">${tt('Habis')}</span>` : ''}
          </div>
        </div>
        <button class="kmr-stock-btn${p.soldOut ? ' is-sold' : ''}" data-act="toggle-stock" data-id="${p.id}">
          ${p.soldOut ? tt('Tersedia Lagi') : tt('Tandai Habis')}
        </button>
      </div>`).join('');
    return `<div class="kasir-menu-cat-title">${tt(c.label)}</div>${rows}`;
  }).join('') || `<div class="kasir-empty">${tt('Menu tidak ditemukan.')}</div>`;

  body.querySelectorAll('[data-act="save-price"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = body.querySelector(`.kmr-price-input[data-id="${btn.dataset.id}"]`);
      updateProductPrice(btn.dataset.id, input.value);
    });
  });
  body.querySelectorAll('.kmr-price-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') updateProductPrice(input.dataset.id, input.value);
    });
  });
  body.querySelectorAll('.kmr-name-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    });
    input.addEventListener('blur', () => updateProductName(input.dataset.id, input.value));
  });
  body.querySelectorAll('.kmr-cat-select').forEach(sel => {
    sel.addEventListener('change', () => updateProductCategory(sel.dataset.id, sel.value));
  });
  // Catatan: <label class="kmr-thumb-wrap"> otomatis membuka input file di dalamnya saat
  // dipencet (mekanisme native browser), jadi tidak perlu lagi trigger .click() lewat JS.
  body.querySelectorAll('.kmr-img-input').forEach(input => {
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (file) updateProductImageFile(input.dataset.id, file);
    });
  });
  body.querySelectorAll('[data-act="toggle-stock"]').forEach(btn => {
    btn.addEventListener('click', () => toggleSoldOut(btn.dataset.id));
  });
}

if (menuChannel) {
  menuChannel.onmessage = (e) => {
    const msg = e.data;
    if (!msg) return;
    if (msg.type === 'shop-status-updated') {
      shopOpen = !!msg.shopOpen;
      shopOpenTime = msg.shopOpenTime || shopOpenTime;
      shopCloseTime = msg.shopCloseTime || shopCloseTime;
      shopAutoMode = typeof msg.shopAutoMode === 'boolean' ? msg.shopAutoMode : shopAutoMode;
      renderInfoCardStatus();
      renderMenu();
      renderCartBar();
      if (activeProduct) renderSheet();
      if (!$('#viewHours').hidden) syncHoursKasirEditVisibility();
      return;
    }
    if (msg.type === 'hero-media-updated') {
      heroMediaType = msg.heroMediaType || 'default';
      heroMediaData = msg.heroMediaData || null;
      renderHeroMedia();
      return;
    }
    if (msg.type === 'hero-icon-updated') {
      heroIconType = msg.heroIconType || 'default';
      heroIconData = msg.heroIconData || null;
      heroIconVisible = typeof msg.heroIconVisible === 'boolean' ? msg.heroIconVisible : heroIconVisible;
      renderHeroIcon();
      return;
    }
    if (msg.type === 'hero-media-style-updated') {
      heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM, ...(msg.heroMediaStyle || {}) };
      applyHeroMediaTransform();
      syncHeroTransformInputsUI();
      return;
    }
    if (msg.type === 'theme-updated') {
      themeColors = { ...DEFAULT_THEME, ...(msg.themeColors || {}) };
      applyThemeColors(themeColors);
      syncThemeInputsUI(themeColors);
      return;
    }
    if (msg.type === 'brand-style-updated') {
      brandStyle = { ...DEFAULT_BRAND, ...(msg.brandStyle || {}) };
      applyBrandStyle();
      syncBrandInputsUI();
      return;
    }
    if (msg.type !== 'menu-updated') return;
    applyCategoryOverrides(msg.categories);
    applyMenuOverrides(msg.overrides);
    renderTabs();
    renderMenu();
    if (!$('#viewKasir').hidden) {
      renderKasirMenuManage($('#kasirMenuSearch') ? $('#kasirMenuSearch').value : '');
      renderKasirCatManage();
    }
    populateAddMenuCategorySelect();
    if (activeProduct) renderSheet();
  };
}
// Cadangan lintas-tab kalau BroadcastChannel tidak tersedia: pantau perubahan localStorage
window.addEventListener('storage', (e) => {
  if (e.key === (LS_PREFIX + 'shopOpen') || e.key === (LS_PREFIX + 'shopOpenTime') || e.key === (LS_PREFIX + 'shopCloseTime') || e.key === (LS_PREFIX + 'shopAutoMode')) {
    storageGet('shopOpen').then(v => { if (v !== null && v !== undefined) shopOpen = v === '1'; });
    storageGet('shopOpenTime').then(v => { if (v) shopOpenTime = v; });
    storageGet('shopAutoMode').then(v => { if (v !== null && v !== undefined) shopAutoMode = v === '1'; });
    storageGet('shopCloseTime').then(v => { if (v) shopCloseTime = v; scheduleNextAutoShopCheck(); renderInfoCardStatus(); renderMenu(); renderCartBar(); if (activeProduct) renderSheet(); if (!$('#viewHours').hidden) syncHoursKasirEditVisibility(); });
    return;
  }
  if (e.key === (LS_PREFIX + 'heroMediaType') || e.key === (LS_PREFIX + 'heroMediaData')) {
    Promise.all([storageGet('heroMediaType'), storageGet('heroMediaData')]).then(([type, data]) => {
      heroMediaType = type || 'default';
      heroMediaData = data || null;
      renderHeroMedia();
    });
    return;
  }
  if (e.key === (LS_PREFIX + 'heroIconType') || e.key === (LS_PREFIX + 'heroIconData') || e.key === (LS_PREFIX + 'heroIconVisible')) {
    Promise.all([storageGet('heroIconType'), storageGet('heroIconData'), storageGet('heroIconVisible')]).then(([type, data, vis]) => {
      heroIconType = type || 'default';
      heroIconData = data || null;
      if (vis !== null && vis !== undefined && vis !== '') heroIconVisible = vis === '1';
      renderHeroIcon();
    });
    return;
  }
  if (e.key === (LS_PREFIX + 'heroMediaStyle') && e.newValue) {
    try {
      heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM, ...JSON.parse(e.newValue) };
      applyHeroMediaTransform();
      syncHeroTransformInputsUI();
    } catch (err) { }
    return;
  }
  if (e.key === (LS_PREFIX + 'themeColors') && e.newValue) {
    try {
      themeColors = { ...DEFAULT_THEME, ...JSON.parse(e.newValue) };
      applyThemeColors(themeColors);
      syncThemeInputsUI(themeColors);
    } catch (err) { }
    return;
  }
  if (e.key === (LS_PREFIX + 'brandStyle') && e.newValue) {
    try {
      brandStyle = { ...DEFAULT_BRAND, ...JSON.parse(e.newValue) };
      applyBrandStyle();
      syncBrandInputsUI();
    } catch (err) { }
    return;
  }
  if (e.key !== (LS_PREFIX + 'menuOverrides') || !e.newValue) return;
  try {
    applyMenuOverrides(JSON.parse(e.newValue));
    renderMenu();
    if (!$('#viewKasir').hidden) renderKasirMenuManage($('#kasirMenuSearch') ? $('#kasirMenuSearch').value : '');
    if (activeProduct) renderSheet();
  } catch (err) { }
});

/* ===================== STATE ===================== */
let cart = [];
let activeProduct = null;
let groupState = {};
let outerQty = 1;
let tableNumber = '06';
let editingTable = false;

const rupiah = n => 'Rp' + Math.round(n).toLocaleString('id-ID');

/* ===================== PERSISTENT STORAGE =====================
   localStorage adalah sumber utama penyimpanan — ini yang berfungsi di HP/
   browser biasa (Chrome, Safari, dll) begitu file di-hosting atau dibuka
   sebagai halaman web sungguhan. window.storage (API khusus Claude.ai) dicoba
   sebagai tambahan kalau file ini kebetulan dijalankan di dalam artifact
   Claude — tapi kegagalannya tidak akan pernah memutus penyimpanan localStorage. */
const LS_PREFIX = 'kopisenja_';

/* Kunci-kunci berikut ini adalah PENGATURAN milik KASIR yang harus SAMA persis
   di semua perangkat (HP/laptop siapa pun yang membuka website ini) — bukan
   cuma tersimpan sendiri-sendiri di tiap perangkat seperti localStorage biasa.
   Begitu kasir login & mengubah salah satu dari ini (menu, harga, status habis,
   nama kategori, jam operasional, tampilan/tema, dsb), perubahannya disimpan &
   disinkron lewat Firebase supaya SEMUA perangkat lain — termasuk yang sedang
   terbuka saat itu juga — otomatis ikut berubah sama persis, tanpa perlu di-
   refresh satu-satu. Kalau Firebase gagal/offline, aplikasi tetap jalan pakai
   localStorage seperti biasa (cuma tersinkron dalam browser/perangkat yang sama). */
const KASIR_SHARED_KEYS = new Set([
  'menuOverrides', 'categoryOverrides', 'customProducts',
  'shopOpen', 'shopOpenTime', 'shopCloseTime', 'shopAutoMode',
  'heroMediaType', 'heroMediaData', 'heroMediaStyle',
  'heroIconType', 'heroIconData', 'heroIconVisible',
  'brandStyle', 'themeColors'
]);

function hasArtifactStorage() {
  return typeof window.storage === 'object' && window.storage
    && typeof window.storage.get === 'function'
    && typeof window.storage.set === 'function';
}

async function storageGet(key) {
  // Cache lokal (localStorage) dibaca DULUAN dan langsung dikembalikan kalau
  // ada, TANPA menunggu jaringan sama sekali — ini yang membuat tampilan
  // muncul cepat begitu halaman dibuka/di-refresh. Untuk pengaturan milik
  // kasir (KASIR_SHARED_KEYS), data TERBARU dari Firebase tetap masuk lewat
  // listener real-time fbSettingsRef.on('value') (dipasang lebih awal, lihat
  // atas) yang akan memperbarui tampilan begitu balasan server tiba & juga
  // menyegarkan cache ini (lihat applySharedSettingsFromFirebase) — jadi TIDAK
  // perlu lagi mengambil satu-satu lewat .once('value') di sini setiap kali
  // halaman dibuka (dulu itu yang bikin lama, apalagi untuk foto/video latar
  // yang ukuran datanya besar: sama-sama diunduh DUA KALI — sekali oleh
  // listener, sekali lagi di sini — dan tampilan menunggu keduanya selesai).
  try {
    const local = localStorage.getItem(LS_PREFIX + key);
    if (local !== null) return local;
  } catch (e) { console.error('Gagal membaca data lokal:', key, e); }

  // Cache lokal masih kosong sama sekali (mis. pertama kali perangkat ini
  // membuka website) — untuk pengaturan milik kasir, coba ambil SEKALI dari
  // Firebase supaya tidak sempat menampilkan pengaturan bawaan yang salah.
  if (KASIR_SHARED_KEYS.has(key) && fbReady && fbSettingsRef) {
    try {
      const snap = await fbSettingsRef.child(key).once('value');
      const val = snap.val();
      if (val !== null && val !== undefined) {
        try { localStorage.setItem(LS_PREFIX + key, val); } catch (e) { }
        return val;
      }
    } catch (e) { console.error('Gagal membaca pengaturan dari Firebase, pakai data lokal dulu:', key, e); }
  }

  if (hasArtifactStorage()) {
    try {
      const res = await window.storage.get(key, false);
      return res ? res.value : null;
    } catch (e) { /* bukan environment Claude.ai, abaikan */ }
  }
  return null;
}
async function storageSet(key, value) {
  try {
    localStorage.setItem(LS_PREFIX + key, value);
  } catch (e) { console.error('Gagal menyimpan data lokal:', key, e); }

  // Pengaturan milik kasir juga disimpan ke Firebase supaya SEMUA perangkat lain
  // (HP/laptop siapa pun yang sedang atau akan membuka website ini) ikut menerima
  // perubahan yang sama persis, bukan cuma perangkat yang dipakai kasir saat itu.
  if (KASIR_SHARED_KEYS.has(key) && fbReady && fbSettingsRef) {
    try { await fbSettingsRef.child(key).set(value); }
    catch (e) { console.error('Gagal menyimpan pengaturan ke Firebase:', key, e); }
  }

  if (hasArtifactStorage()) {
    try { await window.storage.set(key, value, false); }
    catch (e) { /* bukan environment Claude.ai, abaikan */ }
  }
}

/* ===================== TAHAN TERHADAP "PESANAN HIDUP LAGI" SETELAH DIHAPUS =====================
   Kalau sebuah pesanan dihapus (baik oleh pembeli lewat tombol "Hapus" di
   kartu QR, maupun oleh kasir lewat 🗑), tapi penghapusannya di Firebase
   gagal/telat sampai (mis. masalah jaringan), data LAMA pesanan itu bisa
   datang lagi lewat sinkronisasi (Firebase, BroadcastChannel, atau event
   'storage' antar tab) dan seolah "hidup lagi" di layar — padahal
   sebenarnya sudah dihapus. ID pesanan yang baru saja dihapus DI PERANGKAT
   INI dicatat di sini, supaya data sinkronisasi yang datang belakangan
   TIDAK memunculkannya lagi (lihat pemakaiannya di deleteOrder,
   applyOrdersFromFirebase, & listener orderChannel/'storage' di bawah). */
let deletedOrderIds = [];
function loadDeletedOrderIds() {
  try {
    const raw = localStorage.getItem(LS_PREFIX + 'deletedOrderIds');
    deletedOrderIds = raw ? JSON.parse(raw) : [];
  } catch (e) { deletedOrderIds = []; }
}
function rememberDeletedOrderId(orderId) {
  if (!orderId || deletedOrderIds.includes(orderId)) return;
  deletedOrderIds.push(orderId);
  // Cukup simpan 100 ID terakhir supaya daftarnya tidak membengkak selamanya
  if (deletedOrderIds.length > 100) deletedOrderIds = deletedOrderIds.slice(-100);
  try { localStorage.setItem(LS_PREFIX + 'deletedOrderIds', JSON.stringify(deletedOrderIds)); } catch (e) { }
}
function stripDeletedOrders(list) {
  if (!deletedOrderIds.length) return list;
  return list.filter(o => !deletedOrderIds.includes(o.id));
}
loadDeletedOrderIds();

/* ===================== FIREBASE (SINKRON PESANAN LINTAS PERANGKAT) =====================
   localStorage/BroadcastChannel di atas HANYA jalan dalam satu browser/perangkat
   yang sama (lihat catatan panjang di storageGet/storageSet). Supaya pesanan yang
   dibuat pembeli di HP-nya sendiri bisa benar-benar terbaca & dikonfirmasi oleh
   kasir di HP/tablet yang BERBEDA, data pesanan sekarang JUGA disimpan & disinkron
   real-time lewat Firebase Realtime Database. Semua pemakaiannya dibungkus
   try/catch dan dicek fbReady dulu — kalau Firebase gagal dimuat (mis. tidak ada
   internet / diblokir), aplikasi tetap jalan seperti sebelumnya (localStorage saja,
   sinkron hanya sesama tab di perangkat yang sama). */
const firebaseConfig = {
  apiKey: "AIzaSyDo418FD4LhpfwbICB7dEb-4NfkwbOp_kE",
  authDomain: "kopi-senja-2ae43.firebaseapp.com",
  databaseURL: "https://kopi-senja-2ae43-default-rtdb.firebaseio.com",
  projectId: "kopi-senja-2ae43",
  storageBucket: "kopi-senja-2ae43.firebasestorage.app",
  messagingSenderId: "149085206669",
  appId: "1:149085206669:web:63481ec640ed99a04fcac4",
};
let fbOrdersRef = null;
let fbQueueRef = null;
let fbSettingsRef = null;
let fbReady = false;
let fbAuth = null;
try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    firebase.initializeApp(firebaseConfig);
    const fbDb = firebase.database();
    fbOrdersRef = fbDb.ref('orders');
    fbQueueRef = fbDb.ref('queueMeta');
    // "settings" = semua pengaturan milik KASIR (menu, harga, status habis, nama
    // kategori, jam operasional, tampilan/tema, dll) — lihat KASIR_SHARED_KEYS di
    // storageGet/storageSet di atas. Disimpan terpisah dari "orders" supaya rapi.
    fbSettingsRef = fbDb.ref('settings');
    fbReady = true;
    fbAuth = firebase.auth();
  }
} catch (e) { console.error('Firebase gagal disiapkan, aplikasi lanjut pakai localStorage saja:', e); }

/* ===================================================================
   KOPI SENJA API — jembatan ke server backend (lihat repo kopi-senja-api)
   Ganti KOPI_SENJA_API_BASE ini kalau alamat servernya berubah. Semua
   aksi KASIR (konfirmasi, tandai selesai, hapus) sekarang WAJIB lewat
   sini, bukan langsung tulis ke Firebase dari browser lagi — server
   yang verifikasi bahwa yang minta memang kasir yang sudah login.
   =================================================================== */
const KOPI_SENJA_API_BASE = 'https://kopi-senja-api.onrender.com';

// Panggil endpoint yang TIDAK butuh login (dipakai pembeli: buat pesanan).
async function apiPublic(path, options = {}) {
  const res = await fetch(KOPI_SENJA_API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error('API error ' + res.status);
  return res.json();
}

// Panggil endpoint yang WAJIB login kasir — otomatis menyertakan token
// login Firebase kasir yang sedang aktif di perangkat ini.
async function apiKasir(path, options = {}) {
  if (!fbAuth || !fbAuth.currentUser) throw new Error('Kasir belum login.');
  const token = await fbAuth.currentUser.getIdToken();
  const res = await fetch(KOPI_SENJA_API_BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    ...options,
  });
  if (!res.ok) throw new Error('API error ' + res.status);
  return res.json();
}

/* Dengarkan perubahan pengaturan kasir secara REAL-TIME dari Firebase. Ini yang
   membuat perangkat LAIN yang sedang terbuka (bukan cuma yang baru dibuka/refresh)
   langsung ikut berubah begitu kasir mengubah sesuatu di perangkatnya — persis
   seperti cara kerja sinkronisasi pesanan (fbOrdersRef) di atas, tapi untuk menu,
   harga, kategori, jam buka-tutup, dan tampilan website. */
if (fbReady && fbSettingsRef) {
  fbSettingsRef.on('value', (snapshot) => {
    try { applySharedSettingsFromFirebase(snapshot.val()); }
    catch (e) { console.error('Gagal menerapkan pengaturan dari Firebase:', e); }
  });
}

/* Menerapkan seluruh pengaturan kasir (dari Firebase) ke tampilan yang sedang
   berjalan di perangkat ini. Dipakai oleh listener real-time di atas. Aman
   dipanggil berkali-kali dengan data yang sama (tidak akan merusak apa pun). */
function applySharedSettingsFromFirebase(settings) {
  if (!settings) return;

  // Simpan setiap nilai yang datang dari Firebase ke cache lokal juga, supaya
  // storageGet() di atas (yang sekarang membaca cache lokal dulu tanpa
  // menunggu jaringan) selalu punya data TERBARU siap pakai begitu halaman
  // ini dibuka/di-refresh lagi nanti.
  const cacheLocal = (key, val) => {
    if (typeof val !== 'string') return;
    try { localStorage.setItem(LS_PREFIX + key, val); } catch (e) { }
  };
  KASIR_SHARED_KEYS.forEach(k => cacheLocal(k, settings[k]));

  let menuChanged = false;
  if (typeof settings.categoryOverrides === 'string') {
    try { applyCategoryOverrides(JSON.parse(settings.categoryOverrides)); menuChanged = true; } catch (e) { }
  }
  if (typeof settings.customProducts === 'string') {
    try {
      const customList = JSON.parse(settings.customProducts);
      customList.forEach(cp => {
        if (!cp || !cp.id) return;
        const idx = PRODUCTS.findIndex(p => p.id === cp.id);
        if (idx === -1) PRODUCTS.push(cp); else PRODUCTS[idx] = { ...PRODUCTS[idx], ...cp };
      });
      menuChanged = true;
    } catch (e) { }
  }
  if (typeof settings.menuOverrides === 'string') {
    try { applyMenuOverrides(JSON.parse(settings.menuOverrides)); menuChanged = true; } catch (e) { }
  }
  if (menuChanged) {
    renderTabs();
    renderMenu();
    if ($('#viewKasir') && !$('#viewKasir').hidden) {
      renderKasirMenuManage($('#kasirMenuSearch') ? $('#kasirMenuSearch').value : '');
      renderKasirCatManage();
    }
    populateAddMenuCategorySelect();
    if (activeProduct) renderSheet();
  }

  let hoursChanged = false;
  if (typeof settings.shopAutoMode === 'string') { shopAutoMode = settings.shopAutoMode === '1'; hoursChanged = true; }
  if (typeof settings.shopOpenTime === 'string' && settings.shopOpenTime) { shopOpenTime = settings.shopOpenTime; hoursChanged = true; }
  if (typeof settings.shopCloseTime === 'string' && settings.shopCloseTime) { shopCloseTime = settings.shopCloseTime; hoursChanged = true; }
  if (typeof settings.shopOpen === 'string') { shopOpen = settings.shopOpen === '1'; hoursChanged = true; }
  if (hoursChanged) {
    scheduleNextAutoShopCheck();
    renderInfoCardStatus();
    renderMenu();
    renderCartBar();
    if (activeProduct) renderSheet();
    if ($('#viewHours') && !$('#viewHours').hidden) syncHoursKasirEditVisibility();
  }

  if (typeof settings.heroMediaType === 'string' || typeof settings.heroMediaData === 'string') {
    heroMediaType = settings.heroMediaType || 'default';
    heroMediaData = settings.heroMediaData || null;
    renderHeroMedia();
  }
  if (typeof settings.heroIconType === 'string' || typeof settings.heroIconData === 'string' || typeof settings.heroIconVisible === 'string') {
    heroIconType = settings.heroIconType || 'default';
    heroIconData = settings.heroIconData || null;
    if (typeof settings.heroIconVisible === 'string' && settings.heroIconVisible !== '') heroIconVisible = settings.heroIconVisible === '1';
    renderHeroIcon();
  }
  if (typeof settings.heroMediaStyle === 'string') {
    try {
      heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM, ...JSON.parse(settings.heroMediaStyle) };
      applyHeroMediaTransform();
      syncHeroTransformInputsUI();
    } catch (e) { }
  }
  if (typeof settings.brandStyle === 'string') {
    try {
      brandStyle = { ...DEFAULT_BRAND, ...JSON.parse(settings.brandStyle) };
      applyBrandStyle();
      syncBrandInputsUI();
    } catch (e) { }
  }
  if (typeof settings.themeColors === 'string') {
    try {
      themeColors = { ...DEFAULT_THEME, ...JSON.parse(settings.themeColors) };
      applyThemeColors(themeColors);
      syncThemeInputsUI(themeColors);
    } catch (e) { }
  }
}

/* ===================== PUSH NOTIFICATION (TETAP MASUK WALAU TAB DITUTUP) =====================
   Berbeda dari showBrowserNotification() di bagian bawah file (yang cuma jalan
   selagi tab masih terbuka/di-minimize), bagian ini pakai Firebase Cloud
   Messaging (FCM) supaya notifikasi "pesanan siap" tetap MASUK KE LAYAR HP
   walau website sudah ditutup total.
 
   PENTING — ini TIDAK bisa jalan sendiri cuma dari file HTML ini. Ada 3 syarat:
   1. GANTI nilai VAPID_KEY di bawah ini dengan "Key pair" milikmu sendiri:
      Firebase Console → Project Settings → Cloud Messaging → tab "Web configuration"
      → "Generate key pair" (kalau belum ada) → salin "Key pair"-nya ke sini.
   2. File firebase-messaging-sw.js HARUS ditaruh di folder yang SAMA (sejajar)
      dengan file HTML ini saat di-hosting — bukan di dalam subfolder.
   3. Kode PENGIRIM notifikasinya (Cloud Function) HARUS di-deploy terpisah
      lewat Firebase CLI di komputer — TIDAK bisa ditaruh di file HTML ini,
      karena kunci pengirim FCM tidak boleh terlihat publik (kalau bocor,
      orang lain bisa pakai untuk kirim notifikasi/spam ke semua pembelimu).
      Lihat folder functions/ yang disertakan terpisah untuk kode & panduan
      deploy-nya. */
const VAPID_KEY = 'BNm9ovn0AzxX6xV9UAwuqW4B4_PyO8kHkEekmyDeMFtip2auRMlPtTFateZL2GJaMvrPZDZBMWFA_YeKAbH4Gzw';
let fcmMessaging = null;
let currentFcmToken = null;
async function setupPushNotifications() {
  try {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
    if (!fbReady) return; // Firebase gagal dimuat, lewati (fitur push memang butuh Firebase)
    if (VAPID_KEY.startsWith('GANTI_')) {
      console.warn('VAPID_KEY belum diisi — push notification (notif walau tab ditutup) belum aktif. Lihat catatan PUSH NOTIFICATION di kode.');
      return;
    }
    // Daftarkan service worker khusus FCM. Kalau file ini di-hosting di
    // subfolder (bukan di root domain), path & scope di bawah perlu
    // disesuaikan supaya tetap sejajar dengan file HTML ini.
    const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if (Notification.permission !== 'granted') return;
    fcmMessaging = firebase.messaging();
    currentFcmToken = await fcmMessaging.getToken({ vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
    // Kalau pembeli sedang punya pesanan yang masih berjalan (mis. reload
    // halaman sambil menunggu), lampirkan juga token FCM-nya ke pesanan itu
    // di Firebase, supaya Cloud Function tetap bisa mengirim notifikasi.
    if (currentSuccessOrderId && fbReady && fbOrdersRef && currentFcmToken) {
      try { fbOrdersRef.child(currentSuccessOrderId).update({ fcmToken: currentFcmToken }); } catch (e) { }
    }
  } catch (e) { console.error('Gagal menyiapkan push notification (FCM):', e); }
}

async function persistCart() { await storageSet('cart', JSON.stringify(cart)); }
async function persistCustomer() {
  await storageSet('customer', JSON.stringify({
    name: $('#inputName').value.trim(),
    phone: $('#inputPhone').value.trim(),
    email: $('#inputEmail').value.trim(),
  }));
}
async function persistTable() { await storageSet('tableNumber', tableNumber); }

/* ===================== NOMOR MEJA (EDITABLE) ===================== */
function renderTableChip() {
  const chip = $('#tableChip');
  if (editingTable) {
    chip.innerHTML = `<input type="text" id="tableInput" value="${tableNumber}" maxlength="6" inputmode="numeric" pattern="[0-9]*">
      <button class="edit-table-btn" id="tableSaveBtn" aria-label="Simpan nomor meja">✓</button>`;
    const input = $('#tableInput');
    input.focus();
    input.select();
    $('#tableSaveBtn').addEventListener('click', (e) => { e.stopPropagation(); saveTableNumber(); });
    input.addEventListener('click', e => e.stopPropagation());
    // Nomor meja hanya boleh angka — huruf/simbol langsung dibuang saat mengetik.
    input.addEventListener('input', () => {
      const digitsOnly = input.value.replace(/[^0-9]/g, '');
      if (digitsOnly !== input.value) input.value = digitsOnly;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveTableNumber();
    });
  } else {
    chip.innerHTML = `<span><span data-i18n="Nomor Meja">${tt('Nomor Meja')}</span> <b>${tableNumber}</b></span>`;
    chip.onclick = () => { editingTable = true; renderTableChip(); };
  }
  // Nomor meja di checkout otomatis mengikuti nomor meja utama — tidak perlu ditulis ulang.
  const checkoutInput = document.getElementById('inputTable');
  if (checkoutInput) checkoutInput.value = tableNumber;
}
function saveTableNumber() {
  const val = $('#tableInput').value.trim().replace(/[^0-9]/g, '');
  if (!val) { showToast(tt('Nomor meja harus berupa angka')); return; }
  tableNumber = val;
  editingTable = false;
  renderTableChip();
  persistTable();
  showToast(tt('Nomor meja diperbarui ke') + ' ' + tableNumber);
}

/* ===================== RENDER MENU ===================== */
function renderTabs() {
  const tabs = $('#tabs');
  tabs.innerHTML = CATEGORIES.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-cat="${c.id}">${tt(c.label)}</button>`).join('');
  tabs.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.cat);
      scrollToCategory(btn.dataset.cat);
    });
  });
}

let suppressScrollSpy = false;
let scrollSpyTimeout = null;

function scrollToCategory(catId) {
  const target = document.getElementById('sec-' + catId);
  if (!target) return;
  // 'center' langsung memindahkan bagian kategori ke tengah (kurang lebih setengah) layar
  // secara otomatis begitu tab ditekan, jadi tidak perlu geser manual lagi.
  suppressScrollSpy = true; // supaya scroll-spy tidak "berebut" saat animasi scroll otomatis berjalan
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  clearTimeout(scrollSpyTimeout);
  scrollSpyTimeout = setTimeout(() => { suppressScrollSpy = false; }, 650);
}

function setActiveTab(catId) {
  const tabsEl = $('#tabs');
  const btn = tabsEl.querySelector(`.tab[data-cat="${catId}"]`);
  if (!btn || btn.classList.contains('active')) return;
  tabsEl.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// Scroll-spy: kalau pengguna geser menu secara manual (tanpa tap tab), tab aktif otomatis
// menyesuaikan mengikuti kategori mana yang sedang kelihatan di layar — persis seperti diminta:
// geser dari "Paket Nongkrong" ke "Kopi Susu" ⇒ tab ikut pindah sendiri tanpa perlu ditekan.
function updateActiveTabByScroll() {
  if (suppressScrollSpy) return;
  const container = $('#viewMenu');
  const tabsEl = $('#tabs');
  const containerTop = container.getBoundingClientRect().top;
  const thresholdY = containerTop + tabsEl.offsetHeight + 12;
  let currentCat = CATEGORIES[0].id;
  for (const c of CATEGORIES) {
    const sec = document.getElementById('sec-' + c.id);
    if (sec && sec.getBoundingClientRect().top <= thresholdY) currentCat = c.id;
  }
  setActiveTab(currentCat);
}

function setupScrollSpy() {
  const container = $('#viewMenu');
  let ticking = false;
  container.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateActiveTabByScroll(); ticking = false; });
      ticking = true;
    }
  });
}

/* ===================== DEFAULT SELECTION HELPER ===================== */
function getDefaultSelections(product) {
  const sel = {};
  product.groups.forEach((g, gi) => {
    sel[gi] = {};
    g.options.forEach(o => sel[gi][o.id] = 0);
    let remaining = g.min;
    let idx = 0;
    while (remaining > 0 && g.options.length > 0) {
      const opt = g.options[idx % g.options.length];
      sel[gi][opt.id] += 1;
      remaining--; idx++;
    }
  });
  return sel;
}
function computeExtra(product, sel) {
  let extra = 0;
  product.groups.forEach((g, gi) => { g.options.forEach(o => { extra += (sel[gi][o.id] || 0) * o.extra; }); });
  return extra;
}
function computeSummary(product, sel) {
  const parts = [];
  product.groups.forEach((g, gi) => {
    g.options.forEach(o => {
      const q = sel[gi][o.id];
      if (q > 0) parts.push(q > 1 ? `${tt(o.name)} x${q}` : tt(o.name));
    });
  });
  return parts.join(', ');
}
function selectionsEqual(product, a, b) {
  return product.groups.every((g, gi) => g.options.every(o => (a[gi]?.[o.id] || 0) === (b[gi]?.[o.id] || 0)));
}

/* ===================== QUICK ADD (tombol +/– langsung di kartu) ===================== */
function quickQtyFor(productId) {
  const line = cart.find(i => i.isQuick && i.productId === productId);
  return line ? line.qty : 0;
}
function qtyControlHTML(p) {
  const qty = quickQtyFor(p.id);
  // Warung tutup → jangan tampilkan tombol tambah/stepper sama sekali, cuma
  // label "Tutup" yang non-aktif. Menu tetap bisa dilihat-lihat seperti biasa,
  // cuma tidak bisa memesan apa pun sampai warung dibuka lagi.
  if (!shopOpen) {
    return `<button class="add-btn" disabled>${tt('Tutup')}</button>`;
  }
  if (p.soldOut && qty === 0) {
    return `<button class="add-btn" disabled>${tt('Habis')}</button>`;
  }
  if (qty > 0) {
    return `<div class="qty-stepper" data-id="${p.id}">
      <button class="qs-btn" data-act="dec" data-id="${p.id}">–</button>
      <span class="qs-val">${qty}</span>
      <button class="qs-btn" data-act="inc" data-id="${p.id}" ${p.soldOut ? 'disabled' : ''}>+</button>
    </div>`;
  }
  return `<button class="add-btn" data-id="${p.id}" data-act="quickadd">${tt('Tambah')}</button>`;
}
function refreshQtyControl(productId) {
  const p = PRODUCTS.find(pp => pp.id === productId);
  if (!p) return;
  const els = document.querySelectorAll('[data-qtyctrl="' + productId + '"]');
  els.forEach(el => el.innerHTML = qtyControlHTML(p));
}
function quickAdd(productId) {
  if (!shopOpen) { showToast(tt('Warung sedang tutup, belum bisa menerima pesanan')); return; }
  const product = PRODUCTS.find(p => p.id === productId);
  if (product.soldOut) { showToast(`${tt(product.name)} ${tt('sedang habis')}`); refreshQtyControl(productId); return; }
  let line = cart.find(i => i.isQuick && i.productId === productId);
  if (line) {
    line.qty += 1;
    line.lineTotal = line.unit * line.qty;
  } else {
    const sel = getDefaultSelections(product);
    const unit = product.price + computeExtra(product, sel);
    line = {
      cartId: Date.now() + Math.random(), productId, isQuick: true, name: product.name, unit, qty: 1,
      summary: computeSummary(product, sel), notes: '', lineTotal: unit
    };
    cart.push(line);
  }
  refreshQtyControl(productId);
  renderCartBar();
  persistCart();
}
function quickRemove(productId) {
  const idx = cart.findIndex(i => i.isQuick && i.productId === productId);
  if (idx === -1) return;
  cart[idx].qty -= 1;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  else cart[idx].lineTotal = cart[idx].unit * cart[idx].qty;
  refreshQtyControl(productId);
  renderCartBar();
  persistCart();
}

function thumbHTML(p, extraClass) {
  const soldClass = p.soldOut ? ' is-sold-out' : '';
  const badge = p.soldOut ? `<span class="sold-out-badge">${tt('Habis')}</span>` : '';
  if (p.img) {
    return `<div class="thumb ${extraClass || ''} has-photo${soldClass}" style="background-image:url('${p.img}')">${badge}</div>`;
  }
  return `<div class="thumb ${extraClass || ''} ${p.grad}${soldClass}">${p.emoji}${badge}</div>`;
}

function productCardHTML(p) {
  if (p.layout === 'grid') {
    return `<div class="card" data-id="${p.id}">
      ${thumbHTML(p)}
      <div class="card-body">
        <div class="nm">${tt(p.name)}</div>
        <div class="ds">${tt(p.desc)}</div>
        <div class="price-row"><span class="price">${rupiah(p.price)}</span><span class="qty-area" data-qtyctrl="${p.id}">${qtyControlHTML(p)}</span></div>
      </div>
    </div>`;
  }
  return `<div class="list-row" data-id="${p.id}">
    ${thumbHTML(p)}
    <div class="info">
      <div class="nm">${tt(p.name)}</div>
      <div class="ds">${tt(p.desc)}</div>
      <div class="price-row"><span class="price">${rupiah(p.price)}</span><span class="qty-area" data-qtyctrl="${p.id}">${qtyControlHTML(p)}</span></div>
    </div>
  </div>`;
}

function renderMenu() {
  const content = $('#menuContent');
  content.innerHTML = CATEGORIES.map(c => {
    const items = PRODUCTS.filter(p => p.cat === c.id);
    const isGrid = items[0]?.layout === 'grid';
    return `<section id="sec-${c.id}">
      <div class="section-title">${tt(c.label)} <small>${items.length} ${tt('menu')}</small></div>
      <div class="${isGrid ? 'grid' : 'list'}">${items.map(productCardHTML).join('')}</div>
    </section>`;
  }).join('');

  wireProductClicks(content);
}

// Delegasi klik yang dipakai bersama oleh daftar menu utama & panel pencarian:
// tombol +/- dan "Tambah" mengubah keranjang langsung tanpa buka detail;
// tap di area kartu lainnya (gambar/nama) baru membuka detail untuk kustomisasi.
function wireProductClicks(container) {
  container.addEventListener('click', (e) => {
    const qsBtn = e.target.closest('.qs-btn');
    if (qsBtn) {
      e.stopPropagation();
      if (qsBtn.dataset.act === 'inc') quickAdd(qsBtn.dataset.id);
      else quickRemove(qsBtn.dataset.id);
      return;
    }
    const addBtn = e.target.closest('.add-btn[data-act="quickadd"]');
    if (addBtn) {
      e.stopPropagation();
      quickAdd(addBtn.dataset.id);
      return;
    }
    const card = e.target.closest('.card, .list-row');
    if (card) openItem(card.dataset.id);
  });
  setupThumbDoubleTap(container);
}

/* ===================== FOTO ASLI MENU (ketuk 2x di foto) ===================== */
// Ketuk dua kali (double tap di HP, double click di desktop) pada foto menu untuk
// melihat foto asli menu tersebut secara UTUH (tidak terpotong), supaya pembeli
// bisa melihat jelas bentuk menunya sebelum memesan — semacam "review" visual menu.
let lastThumbTap = { el: null, time: 0 };
function openPhotoView(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  if (!p.img) {
    showToast(tt('Foto asli belum tersedia untuk menu ini'));
    return;
  }
  $('#photoViewImg').src = p.img;
  $('#photoViewImg').alt = tt(p.name);
  $('#photoViewName').textContent = tt(p.name);
  $('#photoViewOverlay').hidden = false;
}
function closePhotoView() { $('#photoViewOverlay').hidden = true; }
$('#photoViewClose').addEventListener('click', closePhotoView);
$('#photoViewOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'photoViewOverlay') closePhotoView();
});

function setupThumbDoubleTap(container) {
  container.addEventListener('dblclick', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    e.preventDefault();
    e.stopPropagation();
    const card = thumb.closest('[data-id]');
    if (card) openPhotoView(card.dataset.id);
  });
  container.addEventListener('touchend', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    const now = Date.now();
    if (lastThumbTap.el === thumb && (now - lastThumbTap.time) < 400) {
      e.preventDefault();
      e.stopPropagation();
      const card = thumb.closest('[data-id]');
      if (card) openPhotoView(card.dataset.id);
      lastThumbTap = { el: null, time: 0 };
    } else {
      lastThumbTap = { el: thumb, time: now };
    }
  });
}

/* ===================== PENCARIAN MENU ===================== */
function highlightMatch(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const results = $('#searchResults');
  if (!q) {
    results.innerHTML = `<div class="search-hint">${tt('Ketik nama menu, misalnya "kopi", "pisang goreng", atau "paket"…')}</div>`;
    return;
  }
  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) ||
    tt(p.name).toLowerCase().includes(q) || tt(p.desc).toLowerCase().includes(q)
  );
  if (matches.length === 0) {
    results.innerHTML = `<div class="search-empty">${tt('Menu')} "${query}" ${tt('tidak ditemukan.')}<br>${tt('Coba kata kunci lain, ya.')}</div>`;
    return;
  }
  results.innerHTML = `<div class="search-count">${matches.length} ${tt('menu ditemukan')}</div>
    <div class="search-results-list">${matches.map(p => {
    const nameHi = highlightMatch(tt(p.name), query.trim());
    return `<div class="list-row" data-id="${p.id}">
        ${thumbHTML(p)}
        <div class="info">
          <div class="nm">${nameHi}</div>
          <div class="ds">${tt(p.desc)}</div>
          <div class="price-row"><span class="price">${rupiah(p.price)}</span><span class="qty-area" data-qtyctrl="${p.id}">${qtyControlHTML(p)}</span></div>
        </div>
      </div>`;
  }).join('')}</div>`;
}

function openSearch() {
  $('#viewSearch').hidden = false;
  $('#searchInput').value = '';
  $('#clearSearch').hidden = true;
  renderSearchResults('');
  setTimeout(() => $('#searchInput').focus(), 60);
}
function closeSearchPanel() { $('#viewSearch').hidden = true; }

$('#searchBtn').addEventListener('click', openSearch);
$('#closeSearch').addEventListener('click', closeSearchPanel);
$('#searchInput').addEventListener('input', () => {
  const v = $('#searchInput').value;
  $('#clearSearch').hidden = v.length === 0;
  renderSearchResults(v);
});
$('#clearSearch').addEventListener('click', () => {
  $('#searchInput').value = '';
  $('#clearSearch').hidden = true;
  renderSearchResults('');
  $('#searchInput').focus();
});
wireProductClicks($('#searchResults'));

/* ===================== ITEM SHEET ===================== */
function openItem(id) {
  activeProduct = PRODUCTS.find(p => p.id === id);
  groupState = getDefaultSelections(activeProduct); // opsi wajib langsung terisi default, siap tambah cepat
  outerQty = 1;
  renderSheet();
  $('#itemOverlay').hidden = false;
}

function closeItem() { $('#itemOverlay').hidden = true; activeProduct = null; }

function groupFilled(gi) {
  const g = activeProduct.groups[gi];
  const total = Object.values(groupState[gi]).reduce((a, b) => a + b, 0);
  return total >= g.min;
}
function allGroupsValid() { return activeProduct.groups.every((g, i) => groupFilled(i)); }
function unitExtra() { return computeExtra(activeProduct, groupState); }
function selectionSummary() { return computeSummary(activeProduct, groupState); }

function renderSheet() {
  const p = activeProduct;
  const unit = p.price + unitExtra();
  const valid = shopOpen && allGroupsValid() && !p.soldOut;

  const groupsHTML = p.groups.map((g, gi) => {
    const filled = groupFilled(gi);
    if (g.max === 1) {
      const optsHTML = g.options.map(o => {
        const sel = groupState[gi][o.id] === 1;
        return `<div class="opt-radio${sel ? ' sel' : ''}" data-gi="${gi}" data-oi="${o.id}">
          <span class="oc"></span><span class="ol">${tt(o.name)}</span>
          <span class="oe">${o.extra > 0 ? '+' + rupiah(o.extra) : ''}</span>
        </div>`;
      }).join('');
      return `<div class="group">
        <div class="group-head"><div><span class="t">${tt(g.title)}</span><span class="n">${tt(g.note)}</span></div><span class="status-dot${filled ? ' ok' : ''}">✓</span></div>
        ${optsHTML}
      </div>`;
    } else {
      const totalSel = Object.values(groupState[gi]).reduce((a, b) => a + b, 0);
      const optsHTML = g.options.map(o => {
        const q = groupState[gi][o.id] || 0;
        const canInc = totalSel < g.max;
        return `<div class="opt-stepper">
          <div><span class="ol">${tt(o.name)}</span>${o.extra > 0 ? `<span class="oe">+${rupiah(o.extra)}</span>` : ''}</div>
          <div class="stepper">
            <button data-act="dec" data-gi="${gi}" data-oi="${o.id}" ${q === 0 ? 'disabled' : ''}>–</button>
            <span class="qv">${q}</span>
            <button data-act="inc" data-gi="${gi}" data-oi="${o.id}" ${!canInc ? 'disabled' : ''}>+</button>
          </div>
        </div>`;
      }).join('');
      return `<div class="group">
        <div class="group-head"><div><span class="t">${tt(g.title)}</span><span class="n">${tt(g.note)}</span></div><span class="status-dot${filled ? ' ok' : ''}">✓</span></div>
        ${optsHTML}
      </div>`;
    }
  }).join('');

  $('#itemSheet').innerHTML = `
    <div class="sheet-hero ${p.img ? 'has-photo' : p.grad}" ${p.img ? `style="background-image:url('${p.img}')"` : ''}>${p.img ? '' : p.emoji}<button class="close" id="closeSheet">✕</button></div>
    <div class="sheet-scroll">
      <h2>${tt(p.name)}</h2>
      <div class="sprice">${rupiah(p.price)}</div>
      <div class="sdesc">${tt(p.desc)}</div>
      ${groupsHTML}
      <div class="notes-block">
        <div class="t">${tt('Catatan')}</div>
        <textarea id="notesInput" placeholder="${tt('Contoh: less ice, jangan pakai gula aren')}"></textarea>
      </div>
    </div>
    <div class="sheet-footer">
      <div class="total-order-row">
        <span class="t">${tt('Jumlah Pesanan')}</span>
        <div class="stepper">
          <button id="outerDec" ${outerQty <= 1 ? 'disabled' : ''}>–</button>
          <span class="qv" id="outerQv">${outerQty}</span>
          <button id="outerInc">+</button>
        </div>
      </div>
      <button class="cta" id="addOrderBtn" ${valid ? '' : 'disabled'}>
        <span>${!shopOpen ? tt('Warung sedang tutup') : (p.soldOut ? tt('Menu sedang habis') : (valid ? tt('Tambah Pesanan') : tt('Lengkapi pilihan di atas')))}</span>
        <span class="amt">${rupiah(unit * outerQty)}</span>
      </button>
    </div>
  `;

  $('#closeSheet').addEventListener('click', closeItem);

  // Ketuk 2x pada foto besar di halaman detail pesanan untuk lihat foto asli menu secara utuh
  const heroEl = $('.sheet-hero');
  if (heroEl && p.img) {
    heroEl.addEventListener('dblclick', (e) => {
      e.preventDefault();
      openPhotoView(p.id);
    });
    heroEl.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (lastThumbTap.el === heroEl && (now - lastThumbTap.time) < 400) {
        e.preventDefault();
        openPhotoView(p.id);
        lastThumbTap = { el: null, time: 0 };
      } else {
        lastThumbTap = { el: heroEl, time: now };
      }
    });
  }

  $$('.opt-radio').forEach(el => {
    el.addEventListener('click', () => {
      const gi = el.dataset.gi, oi = el.dataset.oi;
      Object.keys(groupState[gi]).forEach(k => groupState[gi][k] = 0);
      groupState[gi][oi] = 1;
      renderSheet();
    });
  });
  $$('.opt-stepper .stepper button').forEach(btn => {
    btn.addEventListener('click', () => {
      const gi = btn.dataset.gi, oi = btn.dataset.oi, act = btn.dataset.act;
      if (act === 'inc') groupState[gi][oi] = (groupState[gi][oi] || 0) + 1;
      else groupState[gi][oi] = Math.max(0, (groupState[gi][oi] || 0) - 1);
      renderSheet();
    });
  });
  $('#outerInc').addEventListener('click', () => { outerQty++; renderSheet(); });
  $('#outerDec').addEventListener('click', () => { if (outerQty > 1) { outerQty--; renderSheet(); } });
  $('#addOrderBtn').addEventListener('click', () => {
    if (!allGroupsValid()) return;
    addToCart();
  });
}

function addToCart() {
  if (!shopOpen) { showToast(tt('Warung sedang tutup, belum bisa menerima pesanan')); return; }
  const p = activeProduct;
  const unit = p.price + unitExtra();
  const notesVal = $('#notesInput').value.trim();
  const isDefaultConfig = !notesVal && selectionsEqual(p, groupState, getDefaultSelections(p));

  if (isDefaultConfig) {
    // Konfigurasi sama dengan default → gabung ke baris quick-add yang sama seperti di kartu
    let line = cart.find(i => i.isQuick && i.productId === p.id);
    if (line) { line.qty += outerQty; line.lineTotal = line.unit * line.qty; }
    else {
      line = {
        cartId: Date.now() + Math.random(), productId: p.id, isQuick: true, name: p.name, unit,
        qty: outerQty, summary: selectionSummary(), notes: '', lineTotal: unit * outerQty
      };
      cart.push(line);
    }
  } else {
    cart.push({
      cartId: Date.now() + Math.random(),
      productId: p.id, isQuick: false,
      name: p.name, unit, qty: outerQty,
      summary: selectionSummary(), notes: notesVal,
      lineTotal: unit * outerQty,
    });
  }
  closeItem();
  refreshQtyControl(p.id);
  renderCartBar();
  persistCart();
  showToast(`${tt(p.name)} ${tt('ditambahkan ke keranjang')}`);
}

/* ===================== CART BAR ===================== */
function cartTotal() { return cart.reduce((s, i) => s + i.lineTotal, 0); }
function cartQty() { return cart.reduce((s, i) => s + i.qty, 0); }
function renderCartBar() {
  const bar = $('#cartBar');
  if (cart.length === 0 || !shopOpen) { bar.hidden = true; return; }
  bar.hidden = false;
  $('#cartCount').textContent = cartQty();
  $('#cartTotal').textContent = rupiah(cartTotal());
  if (!$('#miniCartOverlay').hidden) renderMiniCart();
}

/* ===================== TOAST ===================== */
let toastTimer;
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ===================== CHECKOUT ===================== */
let orderType = 'Makan di Tempat';
let paymentMethod = 'online';

function openCheckout() {
  if (!shopOpen) { showToast(tt('Warung sedang tutup, belum bisa menerima pesanan')); return; }
  renderSummary();
  renderRelatedMenu();
  $('#payTotal').textContent = rupiah(cartTotal());
  $('#viewCheckout').hidden = false;
  selectPaymentMethod('online');
  $('#agreeTerms').checked = false;
  updatePayButtonState();
  updatePendingCashLink();
}
function orderedProductsForDisplay() {
  // Ambil daftar produk unik yang benar-benar ada di keranjang, sesuai pesanan
  const seen = new Set();
  const list = [];
  cart.forEach(line => {
    const p = PRODUCTS.find(pp => pp.id === line.productId);
    if (p && !seen.has(p.id)) {
      seen.add(p.id);
      list.push(p);
    }
  });
  return list;
}
function relatedThumbStyle(p) {
  return p.img ? `style="background-image:url('${p.img}')"` : '';
}
function renderRelatedMenu() {
  const box = $('#relatedMenuScroll');
  const block = box.closest('.related-menu-block');
  const items = orderedProductsForDisplay();
  if (items.length === 0) {
    if (block) block.hidden = true;
    box.innerHTML = '';
    return;
  }
  if (block) block.hidden = false;
  box.innerHTML = items.map(p => `
    <div class="related-card">
      <div class="rc-thumb ${p.img ? 'has-photo' : p.grad || 'g1'}" ${relatedThumbStyle(p)}>${p.img ? '' : (p.emoji || '☕')}</div>
      <div class="rc-body">
        <div class="rc-name">${tt(p.name)}</div>
        <div class="rc-row">
          <span class="rc-price">${rupiah(p.price)}</span>
          <button class="rc-add" data-related-id="${p.id}" type="button">+</button>
        </div>
      </div>
    </div>`).join('');
}
function quickAddRelated(productId) {
  quickAdd(productId);
  renderSummary();
  renderRelatedMenu();
  $('#payTotal').textContent = rupiah(cartTotal());
  updatePayButtonState();
  const p = PRODUCTS.find(pp => pp.id === productId);
  if (p) showToast(`${tt(p.name)} ${tt('ditambahkan ke keranjang')}`);
}
$('#relatedMenuScroll').addEventListener('click', (e) => {
  const btn = e.target.closest('.rc-add[data-related-id]');
  if (!btn) return;
  quickAddRelated(btn.dataset.relatedId);
});
function renderSummary() {
  if (cart.length === 0) {
    $('#summaryLines').innerHTML = '';
    return;
  }
  $('#summaryLines').innerHTML = `
    ${cart.map(i => `
    <div class="swipe-wrap" data-cartid="${i.cartId}">
      <div class="swipe-delete-bg"><button class="swipe-delete-btn" data-cartid="${i.cartId}">🗑</button></div>
      <div class="summary-line" data-cartid="${i.cartId}">
        <div><div class="l1">${i.qty}x ${tt(i.name)}</div>${i.summary ? `<div class="l2">${i.summary}</div>` : ''}${i.notes ? `<div class="l2">${tt('Catatan')}: ${i.notes}</div>` : ''}</div>
        <div class="r">${rupiah(i.lineTotal)}</div>
      </div>
    </div>`).join('')}`;
  wireSwipeToDelete();
}

/* ===================== MINI KERANJANG ==================
   Panel cepat yang dibuka lewat ikon 🧺 di cart-bar, tanpa harus masuk ke
   halaman checkout penuh dulu — supaya pembeli bisa cek & hapus pesanan
   langsung dari sini. Struktur barisnya sengaja disamakan persis dengan
   #summaryLines (swipe-wrap + swipe-delete-btn) supaya bisa pakai ulang
   wireSwipeToDelete() & removeCartLine() yang sama. */
function renderMiniCart() {
  const box = $('#miniCartLines');
  $('#miniCartTotal').textContent = rupiah(cartTotal());
  if (cart.length === 0) {
    box.innerHTML = `<div class="mini-cart-empty">${tt('Keranjang kosong')}</div>`;
    return;
  }
  box.innerHTML = cart.map(i => `
    <div class="swipe-wrap" data-cartid="${i.cartId}">
      <div class="swipe-delete-bg"><button class="swipe-delete-btn" data-cartid="${i.cartId}">🗑</button></div>
      <div class="summary-line" data-cartid="${i.cartId}">
        <div><div class="l1">${i.qty}x ${tt(i.name)}</div>${i.summary ? `<div class="l2">${i.summary}</div>` : ''}${i.notes ? `<div class="l2">${tt('Catatan')}: ${i.notes}</div>` : ''}</div>
        <div class="r">${rupiah(i.lineTotal)}</div>
      </div>
    </div>`).join('');
  wireSwipeToDelete();
}
function openMiniCart() {
  if (cart.length === 0) return;
  renderMiniCart();
  $('#miniCartOverlay').hidden = false;
}
function closeMiniCart() {
  $('#miniCartOverlay').hidden = true;
}
$('#cartBasketBtn').addEventListener('click', (e) => {
  e.stopPropagation(); // jangan sampai ikut memicu klik #cartBar (buka checkout penuh)
  openMiniCart();
});
$('#closeMiniCart').addEventListener('click', closeMiniCart);
$('#miniCartOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'miniCartOverlay') closeMiniCart(); // tap area gelap di luar sheet → tutup
});
$('#miniCartCheckoutBtn').addEventListener('click', () => {
  closeMiniCart();
  openCheckout();
});

function removeCartLine(cartId) {
  const idx = cart.findIndex(i => String(i.cartId) === String(cartId));
  if (idx === -1) return;
  const removed = cart[idx];
  cart.splice(idx, 1);
  persistCart();
  renderCartBar();
  if (removed.isQuick && removed.productId) refreshQtyControl(removed.productId);
  if (cart.length === 0) {
    // Kalau keranjang kosong, tutup halaman pembayaran & mini keranjang, balik ke menu
    $('#viewCheckout').hidden = true;
    closeMiniCart();
    showToast(tt('Pesanan dihapus') + ' — ' + tt('keranjang kosong'));
  } else {
    // Segarkan yang mana pun sedang terbuka — bisa jadi checkout penuh,
    // bisa jadi mini keranjang, atau malah dua-duanya (jarang, tapi aman).
    if (!$('#viewCheckout').hidden) {
      renderSummary();
      renderRelatedMenu();
      $('#payTotal').textContent = rupiah(cartTotal());
    }
    if (!$('#miniCartOverlay').hidden) {
      renderMiniCart();
    }
    showToast(tt('Pesanan dihapus'));
  }
}

function wireSwipeToDelete() {
  const DELETE_WIDTH = 76;
  const LOCK_THRESHOLD = 8; // px pergerakan minimum sebelum arah gesekan ditentukan

  $$('.swipe-wrap').forEach(wrap => {
    const row = wrap.querySelector('.summary-line');
    let startX = 0, startY = 0, currentX = 0;
    let dragging = false;       // sedang menekan & menggeser (belum tentu terkunci horizontal)
    let axisLocked = null;      // null | 'x' | 'y'  — hasil deteksi arah gesekan awal
    let opened = false;
    let activePointerId = null;

    function setX(x, animate) {
      row.style.transition = animate ? 'transform .2s ease' : 'none';
      row.style.transform = `translateX(${x}px)`;
    }
    function clamp(x) { return Math.max(-DELETE_WIDTH, Math.min(0, x)); }

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      const finalX = (opened ? -DELETE_WIDTH : 0) + currentX;
      if (finalX < -DELETE_WIDTH / 2) { setX(-DELETE_WIDTH, true); opened = true; }
      else { setX(0, true); opened = false; }
      currentX = 0;
      axisLocked = null;
      if (activePointerId !== null) {
        try { row.releasePointerCapture(activePointerId); } catch (err) { }
        activePointerId = null;
      }
    }

    // Pointer Events menyatukan mouse, touch, dan pen dalam satu jalur logika —
    // jauh lebih andal di HP asli dibanding menggabung Touch Events + Pointer Events terpisah.
    // CSS touch-action:pan-y pada .summary-line sudah memberi tahu browser bahwa gesekan
    // horizontal ditangani JS, jadi tidak dibajak jadi scroll.
    row.addEventListener('pointerdown', (e) => {
      dragging = true;
      axisLocked = null;
      startX = e.clientX; startY = e.clientY; currentX = 0;
      activePointerId = e.pointerId;
    });

    row.addEventListener('pointermove', (e) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (axisLocked === null) {
        if (Math.abs(dx) < LOCK_THRESHOLD && Math.abs(dy) < LOCK_THRESHOLD) return; // belum cukup gerak, tunggu
        axisLocked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (axisLocked === 'y') { dragging = false; return; } // vertikal → serahkan ke scroll bawaan
        try { row.setPointerCapture(activePointerId); } catch (err) { }
      }
      if (axisLocked === 'x') {
        if (e.cancelable) e.preventDefault(); // kunci gesekan horizontal, cegah dibajak scroll
        currentX = dx;
        setX(clamp((opened ? -DELETE_WIDTH : 0) + currentX), false);
      }
    });

    row.addEventListener('pointerup', endDrag);
    row.addEventListener('pointercancel', endDrag);
    row.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') endDrag(); });
  });

  $$('.swipe-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => removeCartLine(btn.dataset.cartid));
  });
}

$('#cartBar').addEventListener('click', openCheckout);
$('#cartBar').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCheckout(); }
});
$('#backFromCheckout').addEventListener('click', () => $('#viewCheckout').hidden = true);

$('#typeDineIn').addEventListener('click', () => {
  orderType = 'Makan di Tempat';
  $('#typeDineIn').classList.add('active'); $('#typeTakeAway').classList.remove('active');
});
$('#typeTakeAway').addEventListener('click', () => {
  orderType = 'Bawa Pulang';
  $('#typeTakeAway').classList.add('active'); $('#typeDineIn').classList.remove('active');
});

/* ---- Metode Pembayaran ---- */
function selectPaymentMethod(pm) {
  paymentMethod = pm;
  $('#pmOnline').classList.toggle('active', pm === 'online');
  $('#pmCashier').classList.toggle('active', pm === 'cashier');
  $('#completePayment').hidden = pm !== 'online';
  updatePayButtonState();
}
$('#pmOnline').addEventListener('click', () => selectPaymentMethod('online'));
$('#pmCashier').addEventListener('click', () => selectPaymentMethod('cashier'));
$('#agreeTerms').addEventListener('change', updatePayButtonState);

/* Cari pesanan "Bayar di Kasir" yang sudah dibuat tapi BELUM di-scan/diterima
   kasir (status 'awaiting_scan'). Dipakai oleh tautan kecil "Ada QR yang
   belum selesai?" di halaman checkout — lihat pendingCashLink. */
function findPendingCashOrder() {
  return orders.find(o => o.status === 'awaiting_scan') || null;
}

/* Tampilkan lagi halaman "Menunggu Dikonfirmasi Kasir" + QR untuk sebuah
   pesanan yang masih pending — dipakai oleh tautan "Ada QR yang belum
   selesai?" maupun pemulihan otomatis saat init(). */
function showPendingCashOrderView(order) {
  $('#viewCheckout').hidden = true;
  $('#queueNo').textContent = order.queueNo;
  currentQueueNo = order.queueNo;
  currentSuccessOrderId = order.id;
  renderOrderQr(order);
  // allowCancel: true — ini QR pesanan LAMA yang dibuka lagi lewat tautan
  // "Ada QR yang belum selesai?", jadi tombol Hapus harus tetap muncul.
  applySuccessStatus('awaiting', { allowCancel: true });
  $('#viewSuccess').hidden = false;
}

/* Tampilkan/sembunyikan tautan kecil merah "Ada QR yang belum selesai?" di
   sebelah judul "Selesaikan Pembayaran" — cuma muncul kalau memang ada
   pesanan "Bayar di Kasir" lama yang belum di-scan kasir. */
function updatePendingCashLink() {
  const link = $('#pendingCashLink');
  if (!link) return;
  link.hidden = !findPendingCashOrder();
}

$('#pendingCashLink').addEventListener('click', () => {
  const pending = findPendingCashOrder();
  if (pending) {
    showPendingCashOrderView(pending);
  } else {
    showToast(tt('Tidak ada pesanan yang belum selesai'));
    updatePendingCashLink();
  }
});

function updatePayButtonState() {
  const needsAgree = paymentMethod === 'online';
  $('#payBtn').classList.toggle('disabled-look', needsAgree && !$('#agreeTerms').checked);
}

// Kolom Nomor Meja di checkout bersifat read-only (mengikuti chip di halaman utama).
// Tap kolom ini akan mengarahkan ke halaman menu agar pengguna mengubahnya dari sana.
$('#inputTable').addEventListener('click', () => {
  showToast(tt('Ubah nomor meja lewat halaman menu, ya'));
});

$('#promoRow').addEventListener('click', () => showToast(tt('Fitur promo & voucher segera hadir')));

/* ===================== KIRIM PESANAN KE HALAMAN KASIR =====================
   Alurnya sekarang mendeteksi status "sudah discan" secara otomatis untuk
   KEDUA metode pembayaran:
 
   A) Bayar di Kasir → status awal 'awaiting_scan'.
   B) Bayar Online (QRIS) → status awal 'awaiting_payment_verification'.
 
   Kedua jenis pesanan SAMA-SAMA mendapat QR unik (isinya referensi ke
   order.id, beda tiap pesanan) di halaman sukses pembeli. Kasir cukup buka
   SATU tombol "Scan QR Pesanan" di Halaman Kasir untuk kedua kasus:
   - Kalau QR yang discan berstatus 'awaiting_scan' → pesanan sah, langsung
     jadi 'pending' dan masuk antrean dapur.
   - Kalau QR yang discan berstatus 'awaiting_payment_verification' → scan
     dipakai sebagai jalan pintas konfirmasi ganti tombol manual "Konfirmasi
     Pembayaran Diterima" (kasir tetap wajib mengecek dulu dana benar-benar
     masuk di aplikasi DANA/e-wallet SEBELUM men-scan). Tombol manualnya
     tetap ada di daftar "Belum Diverifikasi" untuk jaga-jaga kalau pembeli
     sudah pergi / kamera tidak bisa dipakai.
   - Kode yang sama/sudah pernah dikonfirmasi otomatis ditolak kalau discan
     ulang (lihat confirmOrderByCode), jadi tidak bisa dipakai dua kali.
 
   Data disimpan lewat storageSet + disiarkan lewat BroadcastChannel (dengan
   fallback event 'storage' untuk browser yang tidak mendukungnya) supaya
   tab/halaman Kasir & halaman sukses pembeli yang terbuka di browser yang
   sama langsung ter-update tanpa reload, untuk kedua metode pembayaran.
   CATATAN: BroadcastChannel & localStorage hanya bekerja dalam SATU browser/
   perangkat yang sama. Untuk sinkron nyata antar 2 HP berbeda (HP pembeli vs
   tablet kasir discan dari HP lain), sistem ini butuh server/backend
   sungguhan (mis. Supabase) — belum ada di file statis ini. */
const WA_NOMOR_WARUNG = '6285792304673'; // 085792304673 dalam format internasional (62 + tanpa angka 0 di depan), dipakai untuk tombol "Bantuan"

let orderChannel = null;
try { orderChannel = new BroadcastChannel('kopi-senja-orders'); } catch (e) { orderChannel = null; }

let orders = []; // antrean pesanan untuk Halaman Kasir
async function persistOrders() { await storageSet('orders', JSON.stringify(orders)); }

function pushOrderToKasir(queueNo) {
  const order = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    queueNo,
    tableNumber, orderType, paymentMethod,
    items: cart.map(i => ({ qty: i.qty, name: i.name, summary: i.summary || '', notes: i.notes || '' })),
    total: cartTotal(),
    customerName: $('#inputName').value.trim(),
    customerPhone: $('#inputPhone').value.trim(),
    // Token perangkat untuk push notification (FCM) — kalau ada, dipakai
    // Cloud Function di sisi server untuk mengirim notifikasi "pesanan siap"
    // ke HP pembeli ini walau website sudah ditutup total. Kalau kosong
    // (mis. pembeli belum kasih izin notifikasi), notifikasi tab-terbuka
    // biasa (showBrowserNotification) tetap jadi cadangannya.
    fcmToken: currentFcmToken || null,
    // Pesanan "Bayar Online" (QRIS) TIDAK langsung 'pending' — baru masuk antrean
    // dapur SETELAH kasir mengonfirmasi dana QRIS benar-benar diterima (lihat
    // renderKasirPaymentVerify & confirmPaymentReceived). Ini mencegah pesanan
    // "lolos" walau pembayaran online-nya sebenarnya gagal/belum masuk.
    // Pesanan "Bayar di Kasir" baru 'pending' SETELAH kasir men-scan QR pesanan pembeli.
    status: paymentMethod === 'online' ? 'awaiting_payment_verification' : 'awaiting_scan',
    createdAt: Date.now(),
  };
  orders.unshift(order);
  persistOrders();
  if (orderChannel) orderChannel.postMessage({ type: 'new-order', order });
  // Kirim ke server (API) supaya kasir di PERANGKAT LAIN bisa langsung
  // melihat & memindai pesanan ini. Server yang menyimpan ke Firebase,
  // browser pembeli tidak lagi menulis langsung ke Firebase.
  apiPublic('/api/orders', { method: 'POST', body: JSON.stringify(order) })
    .catch(e => console.error('Gagal kirim pesanan baru ke API:', e));
  return order;
}

/* Bersihkan teks dari karakter yang bisa bikin pembuatan QR gagal (mis. tanda
   pisah "—", bullet "•", emoji, atau huruf beraksen dari nama menu/catatan
   custom). Pustaka QR yang dipakai di sini kadang gagal total meng-encode
   karakter non-ASCII seperti itu, sehingga QR tidak pernah muncul walau isi
   pesanannya pendek. Dengan disaring dulu, teks yang masuk ke QR selalu
   berhasil dibuat DAN tetap persis mencerminkan menu, jumlah, catatan, dan
   total pesanan yang sebenarnya — cuma tanda bacanya yang disederhanakan. */
function qrSafeText(str) {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')      // buang aksen (é → e, dst.)
    .replace(/[—–]/g, '-')                // en/em dash → tanda hubung biasa
    .replace(/[•●]/g, '-')                // bullet → tanda hubung biasa
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[^\x00-\x7E\n]/g, '');      // buang sisa karakter non-ASCII (emoji, dll.)
}

/* Awalan tetap yang menandai QR ini sebagai kode pesanan Kopi Senja. Catatan
   jujur: QR code adalah standar terbuka — TIDAK ADA cara bikin QR yang secara
   teknis hanya bisa "dibaca kamera" oleh satu aplikasi tertentu, aplikasi
   pembaca QR apa pun tetap bisa mendekode data mentahnya. Yang bisa kita
   lakukan (dan sudah dilakukan di sini) supaya QR ini PRAKTIS tidak berguna
   di luar fitur "Scan QR Pesanan" milik kasir:
   1. Isinya tidak lagi teks pesanan yang bisa langsung dibaca manusia — cuma
      berupa kode acak (base64) yang tidak bermakna apa pun kalau dibuka
      pakai aplikasi scanner biasa.
   2. Kode itu cuma REFERENSI ke pesanan yang tersimpan di penyimpanan lokal
      HP/browser kasir — tanpa data pesanan tersimpan di situ (mis. dibuka di
      HP lain), kode ini tidak bisa dipakai untuk apa pun.
   3. Setiap pesanan hanya bisa dikonfirmasi SEKALI (lihat confirmOrderByCode) —
      scan ulang kode yang sama setelah dikonfirmasi akan ditolak. */
const ORDER_QR_PREFIX = 'KSNJ1:';
function encodeOrderQrPayload(order) {
  const payload = JSON.stringify({ id: order.id, q: order.queueNo });
  let b64;
  try { b64 = btoa(payload); } catch (e) { b64 = payload; }
  return ORDER_QR_PREFIX + b64;
}
function decodeOrderQrPayload(text) {
  const raw = String(text || '').trim();
  if (!raw.startsWith(ORDER_QR_PREFIX)) return null;
  const b64 = raw.slice(ORDER_QR_PREFIX.length);
  try {
    const payload = JSON.parse(atob(b64));
    return payload && payload.id ? payload : null;
  } catch (e) { return null; }
}
function buildOrderQrText(order) {
  return qrSafeText(encodeOrderQrPayload(order));
}

/* Gambar QR unik untuk pesanan ini di halaman sukses. Isinya rincian pesanan
   lengkap (menu + total) — lihat buildOrderQrText di atas. Karena tiap
   pesanan punya isi (menu, jumlah, total) yang berbeda, QR yang dihasilkan
   otomatis berbeda pula untuk tiap pesanan/pembeli. QR ini TIDAK hilang
   otomatis — tetap tampil sampai kasir men-scan & menerima pesanan (lihat
   penyimpanan pendingOrderId di finalizeOrderSuccess & init). */
function renderOrderQr(order) {
  const box = $('#orderQrCode');
  if (!box) return;
  box.innerHTML = '';
  const qrText = buildOrderQrText(order);
  // PENTING: qrcodejs punya kapasitas kecil di typeNumber default (4) — teks
  // pesanan yang lumayan panjang (menu + total) akan gagal dibuat dan diam-diam
  // meninggalkan kotak QR kosong. Di sini kita coba typeNumber makin besar
  // sampai ketemu ukuran yang muat, jadi QR SELALU tergambar berapa pun
  // panjang isi pesanannya.
  let drawn = false;
  for (let typeNumber = 4; typeNumber <= 40 && !drawn; typeNumber++) {
    try {
      box.innerHTML = '';
      new QRCode(box, {
        text: qrText,
        width: 216,
        height: 216,
        colorDark: '#2B1B12',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L,
        typeNumber: typeNumber,
      });
      drawn = true;
    } catch (e) { /* teks belum muat di ukuran ini, coba ukuran berikutnya */ }
  }
  if (!drawn) {
    box.innerHTML = `<div class="kasir-empty" style="padding:24px 10px;">${tt('QR gagal dibuat, gunakan kode di bawah secara manual.')}</div>`;
  }
  const textEl = $('#orderQrCodeText');
  if (textEl) textEl.textContent = order.queueNo;

  // QR sekarang cuma berisi kode referensi acak (lihat encodeOrderQrPayload),
  // jadi rincian pesanan (total) ditampilkan terpisah di halaman ini untuk
  // pembeli — bukan di dalam QR-nya.
  const summaryEl = $('#orderQrSummary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="oqs-total"><span>${tt('Total')}</span><b>${rupiah(order.total)}</b></div>
    `;
  }
}

/* ---- Nomor antrian berurutan (A-01, A-02, ...), reset otomatis ke 1 tiap ganti hari ---- */
let queueCounter = 0;
let queueDate = '';
function todayDateKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
async function nextQueueNo() {
  const today = todayDateKey();
  // Kalau Firebase tersedia: pakai transaction (operasi atomik) di server supaya
  // dua pembeli yang pesan BERSAMAAN dari 2 HP berbeda tidak pernah dapat nomor
  // antrian yang sama — penghitung lokal biasa tidak bisa menjamin ini lintas
  // perangkat, cuma benar kalau semua pesanan datang dari satu perangkat yang sama.
  if (fbReady && fbQueueRef) {
    try {
      const result = await fbQueueRef.transaction(current => {
        if (!current || current.date !== today) return { date: today, counter: 1 };
        return { date: today, counter: (current.counter || 0) + 1 };
      });
      if (result && result.committed && result.snapshot && result.snapshot.exists()) {
        const val = result.snapshot.val();
        queueDate = val.date;
        queueCounter = val.counter;
        storageSet('queueCounter', String(queueCounter));
        storageSet('queueDate', queueDate);
        return 'A-' + String(queueCounter).padStart(2, '0');
      }
    } catch (e) { console.error('Gagal ambil nomor antrian dari Firebase, pakai penghitung lokal:', e); }
  }
  // Fallback: penghitung lokal (dipakai kalau Firebase tidak tersedia/gagal)
  if (queueDate !== today) {
    queueDate = today;
    queueCounter = 0;
  }
  queueCounter += 1;
  storageSet('queueCounter', String(queueCounter));
  storageSet('queueDate', queueDate);
  if (orderChannel) orderChannel.postMessage({ type: 'queue-sync', queueCounter, queueDate });
  return 'A-' + String(queueCounter).padStart(2, '0');
}

/* Tandai variabel global "pesanan yang sedang ditampilkan di halaman sukses",
   supaya kalau kasir men-scan-nya SEMENTARA halaman ini masih terbuka di sisi
   pembeli, tampilan bisa otomatis lanjut ke "Pesanan Diterima" tanpa reload —
   persis seperti auto-deteksi pembayaran QRIS. */
let currentSuccessOrderId = null;

/* Ganti tampilan halaman sukses antara dua status:
   'awaiting'  → belum discan kasir: ikon jam, judul "Menunggu Dikonfirmasi Kasir"
   'confirmed' → sudah discan (atau sudah lunas via QRIS): ikon centang hijau seperti biasa */
/* Tombol "Hapus" pada kartu QR HANYA relevan selama pesanan masih
   "belum selesai" (menunggu di-scan kasir / menunggu verifikasi
   pembayaran QRIS) — di situ pembeli masih bisa membatalkan sendiri.
   Begitu kasir sudah men-scan/mengonfirmasi (status 'confirmed', mis.
   untuk pesanan yang langsung dibayar & discan di kasir), tombol ini
   disembunyikan karena pesanan sudah masuk dapur dan tidak lagi bisa
   dibatalkan dari sisi pembeli. */
/* allowCancel membedakan dua kasus yang SAMA-SAMA berstatus 'awaiting'/
   'awaiting_payment' tapi HARUS beda tombol Hapus-nya:
   - QR yang baru saja muncul langsung setelah checkout (pembeli baru
     menekan "Buat Pesanan") → allowCancel = false → tombol Hapus
     disembunyikan, karena ini QR resmi yang harus ditunjukkan ke kasir,
     bukan draft yang "belum selesai".
   - QR pesanan lama yang dibuka lagi lewat tautan "Ada QR yang belum
     selesai?" (showPendingCashOrderView) → allowCancel = true → tombol
     Hapus tetap muncul, supaya pembeli bisa membatalkan pesanan lama itu. */
function toggleCancelPendingBtn(state, allowCancel) {
  const btn = $('#cancelPendingOrderBtn');
  if (!btn) return;
  const isPendingState = (state === 'awaiting' || state === 'awaiting_payment');
  btn.hidden = !(isPendingState && allowCancel);
}

function applySuccessStatus(state, opts) {
  const allowCancel = !!(opts && opts.allowCancel);
  const icon = $('#successIcon');
  const title = $('#successTitle');
  const desc = $('#successDesc');
  const hint = $('#sentToKasirHint');
  const waitBadge = $('#scanWaitingBadge');
  const qrBox = $('.order-qr-box');
  const queueBox = $('.queue');
  const successBody = $('.success-body');
  const successView = $('#viewSuccess');
  toggleCancelPendingBtn(state, allowCancel);
  // Ikon, judul, deskripsi, hint, dan badge menunggu sengaja disembunyikan permanen —
  // halaman sukses hanya menampilkan nomor antrian, QR, dan ringkasan pesanan.
  if (state === 'awaiting') {
    // Bayar di Kasir: belum discan kasir — tampilkan QR untuk ditunjukkan ke kasir.
    // Nomor antrian sengaja disembunyikan di status ini — yang tampil cuma QR,
    // ringkasan total, dan tombol tutup (✕).
    icon.textContent = '⏳';
    icon.classList.add('waiting');
    title.textContent = tt('Menunggu Dikonfirmasi Kasir');
    desc.textContent = tt('Pesananmu sudah dibuat. Tunjukkan QR di bawah ke kasir untuk mulai diproses.');
    hint.textContent = tt('Kode ini referensi khusus pesananmu untuk kasir. Halaman ini otomatis lanjut begitu kasir men-scan QR-nya.');
    if (qrBox) qrBox.hidden = false;
    if (queueBox) queueBox.hidden = true;
    // Kartu putih besar TETAP ditampilkan di status ini supaya QR, Total, dan
    // tombol Hapus terbungkus rapi dan tidak bertabrakan dengan gambar hero
    // di belakangnya.
    if (successBody) successBody.classList.remove('success-body--minimal');
    if (successView) successView.classList.remove('success-minimal-bg');
  } else if (state === 'awaiting_payment') {
    // Bayar Online (QRIS): sudah ditekan "Saya Sudah Bayar" tapi kasir BELUM
    // mengonfirmasi dana benar-benar diterima. QR pesanan tetap ditampilkan
    // (sama seperti alur Bayar di Kasir) supaya kasir bisa langsung men-scan-nya
    // sebagai jalan pintas konfirmasi setelah mengecek dana masuk — lihat
    // confirmOrderByCode yang sekarang menerima kode dari status ini juga.
    // Nomor antrian juga disembunyikan di status ini, sama seperti 'awaiting'.
    icon.textContent = '⏳';
    icon.classList.add('waiting');
    title.textContent = tt('Menunggu Verifikasi Pembayaran');
    desc.textContent = tt('Terima kasih! Kasir sedang memeriksa pembayaran QRIS-mu. Pesanan baru masuk ke antrean dapur setelah pembayaran dikonfirmasi diterima.');
    hint.textContent = tt('Tunjukkan QR di bawah ke kasir untuk mempercepat konfirmasi. Halaman ini otomatis lanjut begitu kasir mengonfirmasi pembayaranmu diterima.');
    if (qrBox) qrBox.hidden = false;
    if (queueBox) queueBox.hidden = true;
    if (successBody) successBody.classList.remove('success-body--minimal');
    if (successView) successView.classList.remove('success-minimal-bg');
  } else {
    // Sudah dikonfirmasi kasir: QR tidak lagi diperlukan, dan supaya halaman
    // tidak menampilkan kartu putih besar untuk konten yang cuma nomor antrian,
    // kartu & latar belakang gelapnya dibuat transparan — yang tersisa cuma
    // kotak nomor antrian mengambang dan tombol tutup (✕).
    icon.textContent = '✓';
    icon.classList.remove('waiting');
    title.textContent = tt('Pesanan Diterima');
    desc.textContent = tt('Terima kasih! Kopi dan camilanmu sedang diseduh & disiapkan barista. Ambil nomor antrianmu di meja.');
    hint.textContent = tt('Pesanan sudah diterima kasir dan masuk ke antrean dapur. Kamu akan mendapat notifikasi begitu pesanan siap diambil.');
    if (qrBox) qrBox.hidden = true;
    if (queueBox) queueBox.hidden = false;
    if (successBody) successBody.classList.add('success-body--minimal');
    if (successView) successView.classList.add('success-minimal-bg');
  }
  icon.hidden = true;
  title.hidden = true;
  desc.hidden = true;
  hint.hidden = true;
  waitBadge.hidden = true;
}

async function finalizeOrderSuccess(opts) {
  // opts.showSuccessView === false → dipakai oleh alur QRIS baru: pesanan
  // dibuat & disimpan seperti biasa, tapi halaman #viewSuccess TIDAK langsung
  // ditampilkan (halaman QRIS yang tetap terlihat) — lihat openQrisPage &
  // autoAdvanceFromQrisIfConfirmed.
  const showSuccessView = !opts || opts.showSuccessView !== false;
  persistCustomer();
  // PENTING: rincian pesanan (item + total) HARUS diambil dari keranjang
  // SEBELUM keranjang dikosongkan di bawah — dulu urutannya terbalik, jadi
  // cartTotal() dihitung dari keranjang yang sudah kosong dan QR pesanan
  // selalu menampilkan "Total Rp0".
  const order = pushOrderToKasir(await nextQueueNo());
  // Keranjang dikosongkan begitu pesanan berhasil dibuat (dulu ini menunggu
  // tombol "Kembali"/"Saya Sudah Bayar" ditekan pembeli — sekarang otomatis,
  // karena halaman sukses/menunggu berpindah status sendiri tanpa aksi manual).
  // Nama, HP, email, dan nomor meja SENGAJA tidak dihapus supaya tidak perlu diisi ulang tiap pesan.
  cart = [];
  renderCartBar();
  persistCart();
  // Menu diambar ulang supaya stepper qty menu yang barusan dipesan kembali
  // ke 0/"Tambah" — lihat renderMenu().
  renderMenu();
  $('#queueNo').textContent = order.queueNo;
  currentQueueNo = order.queueNo;
  if (showSuccessView) $('#viewSuccess').hidden = false;
  currentSuccessOrderId = order.id;
  if (order.status === 'awaiting_scan') {
    // Bayar di Kasir: tampilkan QR pesanan + status menunggu, dan simpan
    // pendingOrderId supaya kalau halaman ini ditutup/dimuat ulang SEBELUM kasir
    // sempat scan, QR-nya bisa ditampilkan lagi persis sama — lihat pemulihan di init().
    renderOrderQr(order);
    if (showSuccessView) applySuccessStatus('awaiting');
    storageSet('pendingOrderId', order.id);
  } else if (order.status === 'awaiting_payment_verification') {
    // Bayar Online (QRIS): tetap gambar QR pesanan — bisa discan kasir sebagai
    // jalan pintas konfirmasi (lihat confirmOrderByCode), selain jalur manual
    // tombol "Konfirmasi Pembayaran Diterima" yang tetap tersedia di Halaman Kasir.
    renderOrderQr(order);
    if (showSuccessView) applySuccessStatus('awaiting_payment');
    storageSet('pendingOrderId', order.id);
  } else {
    renderOrderQr(order);
    if (showSuccessView) applySuccessStatus('confirmed');
    storageSet('pendingOrderId', '');
  }
  saveOrderToHistory(order.queueNo);
  requestNotificationPermission();
  setupPushNotifications();
  // "Panaskan" daftar suara text-to-speech browser dari sekarang, supaya nanti saat
  // notifikasi "pesanan siap" muncul, suaranya sudah siap & langsung terdengar (tidak diam di percobaan pertama).
  try { if ('speechSynthesis' in window) window.speechSynthesis.getVoices(); } catch (e) { }
  return order;
}

/* Hapus pendingOrderId dari storage HANYA kalau ID yang cocok/sudah discan
   memang ID pesanan yang sedang "ditunggu" itu — supaya tidak salah hapus
   status pesanan pembeli lain. */
function clearPendingOrderIdIfMatches(orderId) {
  storageGet('pendingOrderId').then(saved => {
    if (saved === orderId) storageSet('pendingOrderId', '');
  }).catch(() => { });
}

/* ---- Gerbang Login Kasir (nama + sandi) ----
   Sandi disimpan langsung di kode karena file ini statis tanpa server/database
   sungguhan. Login TIDAK disimpan permanen (harus login ulang tiap sesi/refresh)
   supaya HP yang tergeletak tidak otomatis bisa dipakai buka Kasir tanpa sandi. */
const KASIR_EMAIL = 'kasir@kopisenja.com';
/* Sandi CADANGAN khusus untuk login OFFLINE — dipakai HANYA kalau internet/Firebase
   benar-benar tidak bisa dihubungi (misalnya warung sudah tutup & WiFi/data mati),
   supaya kasir tetap bisa masuk ke halaman Kasir walau tidak ada koneksi sama sekali
   (misalnya untuk membuka kembali warung, mengubah jam, dll). GANTI nilai di bawah
   ini dengan sandi rahasia pilihanmu sendiri. Saat login offline, pesanan/perubahan
   tetap tersimpan di HP itu dan akan otomatis tersinkron begitu internet kembali. */
const KASIR_OFFLINE_PASSWORD = 'GANTI_SANDI_OFFLINE_INI';
let kasirLoggedIn = false;
let kasirName = '';
let kasirOfflineMode = false;

async function openKasirPage() {
  $('#viewProfile').hidden = true;
  if (kasirLoggedIn) {
    showKasirOrdersPage();
  } else {
    $('#fieldKasirName').classList.remove('invalid');
    $('#fieldKasirPass').classList.remove('invalid');
    // Isi otomatis nama & sandi kasir dari login TERAKHIR yang berhasil di perangkat
    // ini — siapa pun yang pernah login di HP/tablet ini, kolomnya sudah terisi
    // sendiri lain kali. Disimpan HANYA di localStorage perangkat ini (bukan
    // Firebase/settings bersama), supaya sandi tidak ikut tersebar ke perangkat lain.
    $('#kasirNameInput').value = (await storageGet('kasirSavedName')) || '';
    $('#kasirPassInput').value = (await storageGet('kasirSavedPass')) || '';
    $('#viewKasirLogin').hidden = false;
  }
}
function showKasirOrdersPage() {
  // Tampilkan halaman Kasir DULUAN sebelum mengisi kontennya. Kalau ternyata ada
  // error saat merender daftar pesanan (mis. satu pesanan lama datanya rusak/tidak
  // lengkap), kasir tetap MASUK ke halamannya — tidak lagi nyangkut di layar login.
  $('#viewKasir').hidden = false;
  document.body.classList.add('kasir-open');
  try {
    renderKasirOrders();
    switchKasirSubtab('orders');
  } catch (e) {
    // Gagal menggambar sebagian isi (mis. data pesanan lama yang rusak) TIDAK
    // BOLEH membuat kasir gagal masuk — cukup dicatat di console & lewatkan.
    console.error('Sebagian tampilan halaman Kasir gagal digambar:', e);
  }
  enterKasirFullscreen();
}

/* ---- Layar penuh + miring (landscape) otomatis untuk halaman Kasir ----
   Dipanggil begitu kasir berhasil masuk. CATATAN KETERBATASAN PLATFORM:

   - Mengunci orientasi layar (screen.orientation.lock) HANYA berfungsi
     setelah elemen benar-benar dalam mode layar penuh, dan browser HARUS
     mengizinkannya — kebanyakan berhasil di Android/Chrome, tapi Safari
     di iPhone TIDAK mendukung penguncian orientasi sama sekali (keterbatasan
     Apple, bukan bug di kode ini). Di iPhone, kasir tetap bisa memutar HP
     secara manual — tata letak sidebar/landscape (lihat CSS) akan tetap
     menyesuaikan begitu HP diputar, walau layar tidak otomatis berputar sendiri.
   - Semua percobaan dibungkus try/catch supaya kalau gagal/tidak didukung,
     halaman Kasir tetap berfungsi normal seperti biasa (cuma tanpa efek
     layar penuh/otomatis miring). */
async function enterKasirFullscreen() {
  try {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    }
  } catch (e) { console.error('Gagal masuk mode layar penuh (mungkin tidak didukung browser ini):', e); }
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
    }
  } catch (e) { console.error('Gagal mengunci layar ke mode miring (mungkin tidak didukung perangkat/browser ini):', e); }
}
function exitKasirFullscreen() {
  document.body.classList.remove('kasir-open');
  try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) { }
  try {
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
  } catch (e) { }
}

/* ---- Subtab Halaman Kasir: "Pesanan Masuk" vs "Kelola Menu" ---- */
function switchKasirSubtab(which) {
  $('#kasirTabOrders').classList.toggle('active', which === 'orders');
  $('#kasirTabMenu').classList.toggle('active', which === 'menu');
  $('#kasirTabKas').classList.toggle('active', which === 'kas');
  $('#kasirOrdersPane').hidden = which !== 'orders';
  $('#kasirMenuPane').hidden = which !== 'menu';
  $('#kasirKasPane').hidden = which !== 'kas';
  if (which === 'menu') {
    renderKasirMenuManage($('#kasirMenuSearch').value);
    renderKasirCatManage();
    populateAddMenuCategorySelect();
  }
  if (which === 'kas') {
    renderKasirKas();
  }
}
$('#kasirTabOrders').addEventListener('click', () => switchKasirSubtab('orders'));
$('#kasirTabMenu').addEventListener('click', () => switchKasirSubtab('menu'));
$('#kasirTabKas').addEventListener('click', () => switchKasirSubtab('kas'));
$('#kasirMenuSearch').addEventListener('input', (e) => renderKasirMenuManage(e.target.value));
$('#kasirLoginBtn').addEventListener('click', async () => {
  const name = $('#kasirNameInput').value.trim();
  const pass = $('#kasirPassInput').value;
  let valid = true;
  if (!name) { $('#fieldKasirName').classList.add('invalid'); valid = false; }
  else { $('#fieldKasirName').classList.remove('invalid'); }
  if (!pass) {
    $('#fieldKasirPass').classList.add('invalid');
    valid = false;
  } else {
    $('#fieldKasirPass').classList.remove('invalid');
  }
  if (!valid) return;

  // Firebase gagal disiapkan sejak halaman dimuat (biasanya karena tidak ada
  // internet sama sekali saat itu, mis. warung sudah tutup & WiFi/data mati).
  // Dulu ini langsung memblokir login kasir sepenuhnya — sekarang izinkan
  // login OFFLINE lewat sandi cadangan supaya kasir tidak terkunci.
  if (!fbAuth) {
    loginKasirOffline(name, pass);
    return;
  }

  try {
    await fbAuth.signInWithEmailAndPassword(KASIR_EMAIL, pass);
  } catch (e) {
    console.error('Login kasir gagal:', e);
    // Kalau gagalnya karena masalah JARINGAN (bukan sandi salah), jangan langsung
    // dianggap sandi salah — coba dulu jalur sandi cadangan offline supaya kasir
    // tetap bisa masuk walau internet sedang bermasalah/mati.
    const isNetworkError = e && (e.code === 'auth/network-request-failed' || !navigator.onLine);
    if (isNetworkError) {
      loginKasirOffline(name, pass);
    } else {
      $('#fieldKasirPass').classList.add('invalid');
    }
    return;
  }
  // SENGAJA di luar try/catch di atas: sandi sudah terbukti BENAR (signIn berhasil
  // tanpa error). Kalau ada error lain sesudah ini (mis. saat menggambar halaman
  // Kasir), itu BUKAN masalah sandi — jangan sampai malah ditandai "sandi salah".
  finishKasirLogin(name, false);
});

function loginKasirOffline(name, pass) {
  if (pass === KASIR_OFFLINE_PASSWORD) {
    finishKasirLogin(name, true);
  } else {
    $('#fieldKasirPass').classList.add('invalid');
    showToast(tt('Tidak ada koneksi internet. Masukkan sandi offline yang benar untuk tetap masuk.'));
  }
}

function finishKasirLogin(name, offline) {
  $('#fieldKasirPass').classList.remove('invalid');
  kasirLoggedIn = true;
  kasirOfflineMode = offline;
  kasirName = name;
  // Simpan otomatis nama & sandi yang baru saja berhasil login, supaya lain kali
  // kolomnya sudah terisi sendiri di perangkat ini — tidak perlu centang apa pun.
  storageSet('kasirSavedName', name);
  storageSet('kasirSavedPass', $('#kasirPassInput').value);
  $('#viewKasirLogin').hidden = true;
  showToast((offline ? tt('Mode offline') + ' — ' : '') + tt('Selamat bertugas') + ', ' + name + '!');
  showKasirOrdersPage();
}
$('#backFromKasirLogin').addEventListener('click', () => {
  $('#viewKasirLogin').hidden = true;
  // Batal login → kembalikan peran ke Pembeli supaya tombol Kasir tidak tampak "aktif" tanpa login
  userRole = 'pembeli';
  storageSet('userRole', userRole);
});
const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
const EYE_OFF_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.86 21.86 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a21.86 21.86 0 0 1-3.22 4.36M14.12 14.12a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
$('#kasirPassToggle').addEventListener('click', () => {
  const input = $('#kasirPassInput');
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  $('#kasirPassToggle').innerHTML = isHidden ? EYE_OFF_SVG : EYE_OPEN_SVG;
  $('#kasirPassToggle').setAttribute('aria-label', isHidden ? tt('Sembunyikan sandi') : tt('Tampilkan sandi'));
});
$('#kasirLogoutBtn').addEventListener('click', async () => {
  if (fbAuth) {
    try { await fbAuth.signOut(); } catch (e) { console.error('Gagal logout dari Firebase:', e); }
  }
  kasirLoggedIn = false;
  kasirName = '';
  $('#viewKasir').hidden = true;
  exitKasirFullscreen();
  syncHoursKasirEditVisibility();
  showToast(tt('Berhasil keluar dari Kasir'));
  // Langsung tampilkan lagi layar login Kasir (nama & sandi otomatis terisi dari
  // login terakhir yang tersimpan di perangkat ini) — supaya kasir berikutnya
  // (atau kasir yang sama) tinggal masuk lagi tanpa perlu balik ke menu pembeli dulu.
  await openKasirPage();
});

/* ===================== KAS: UANG MASUK & UANG KELUAR =====================
   "Uang Masuk" DIHITUNG OTOMATIS dari pesanan yang sudah dikonfirmasi (status
   'pending' atau 'done', bukan yang masih menunggu scan/verifikasi) pada HARI
   INI — kasir tidak perlu mencatat manual sama sekali.
   "Uang Keluar" dicatat MANUAL oleh kasir (mis. belanja stok, bayar gas) lewat
   form di bawah, lalu otomatis dijumlahkan bersama supaya kelihatan sisa kasnya.
   Catatan uang keluar disimpan per-perangkat (localStorage), belum disinkron
   lintas perangkat lewat Firebase. */
let cashExpenses = [];
async function loadCashExpenses() {
  const saved = await storageGet('cashExpenses');
  if (saved) {
    try { cashExpenses = JSON.parse(saved); } catch (e) { cashExpenses = []; }
  }
}
function persistCashExpenses() { storageSet('cashExpenses', JSON.stringify(cashExpenses)); }
function dateKeyOf(ts) {
  const d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function renderKasirKas() {
  if (!$('#kasMasukTotal')) return;
  const today = todayDateKey();
  // Uang masuk = total pesanan HARI INI yang sudah dikonfirmasi (bukan lagi
  // 'awaiting_scan'/'awaiting_payment_verification' — itu artinya uangnya
  // belum benar-benar diterima kasir).
  const masuk = orders
    .filter(o => o.status !== 'awaiting_scan' && o.status !== 'awaiting_payment_verification' && dateKeyOf(o.createdAt) === today)
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const todaysExpenses = cashExpenses.filter(e => dateKeyOf(e.createdAt) === today);
  const keluar = todaysExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  $('#kasMasukTotal').textContent = rupiah(masuk);
  $('#kasKeluarTotal').textContent = rupiah(keluar);
  $('#kasSaldoTotal').textContent = rupiah(masuk - keluar);

  const list = $('#kasExpenseList');
  if (todaysExpenses.length === 0) {
    list.innerHTML = '';
    return;
  }
  list.innerHTML = todaysExpenses.map(e => {
    const jam = e.createdAt ? new Date(e.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--';
    return `<div class="kas-expense-item" data-id="${e.id}">
          <div class="kas-expense-info"><b>${escapeHtml(e.desc || tt('Tanpa keterangan'))}</b><span>${jam} · ${rupiah(e.amount)}</span></div>
          <button type="button" class="kas-expense-del" data-id="${e.id}" data-i18n="Hapus">${tt('Hapus')}</button>
        </div>`;
  }).join('');
  list.querySelectorAll('.kas-expense-del').forEach(btn => {
    btn.addEventListener('click', () => {
      cashExpenses = cashExpenses.filter(e => e.id !== btn.dataset.id);
      persistCashExpenses();
      renderKasirKas();
    });
  });
}
$('#kasExpenseAddBtn').addEventListener('click', () => {
  const desc = $('#kasExpenseDesc').value.trim();
  const amount = Number($('#kasExpenseAmount').value);
  if (!amount || amount <= 0) {
    showToast(tt('Isi jumlah uang keluar dulu'));
    return;
  }
  cashExpenses.unshift({ id: 'exp_' + Date.now() + '_' + Math.floor(Math.random() * 1000), desc, amount, createdAt: Date.now() });
  persistCashExpenses();
  $('#kasExpenseDesc').value = '';
  $('#kasExpenseAmount').value = '';
  renderKasirKas();
});
function renderKasirOrders() {
  const body = $('#kasirOrdersBody');
  updateAwaitingScanBadge();
  renderKasirPaymentVerify();
  renderKasirKas();
  // Pesanan berstatus 'awaiting_scan' (Bayar di Kasir, belum discan) DAN
  // 'awaiting_payment_verification' (Bayar Online, belum dikonfirmasi kasir)
  // sengaja DISEMBUNYIKAN dari antrean dapur sampai masing-masing dikonfirmasi.
  const visibleOrders = orders.filter(o => o.status !== 'awaiting_scan' && o.status !== 'awaiting_payment_verification');
  if (visibleOrders.length === 0) {
    body.innerHTML = `<div class="kasir-empty">${tt('Belum ada pesanan masuk. Tekan "QR Pesanan" untuk menerima pesanan dari pembeli.')}</div>`;
    return;
  }
  body.innerHTML = visibleOrders.map(o => {
    // Pakai (o.items || []) supaya kalau ada pesanan lama yang datanya tidak
    // lengkap (mis. field items kosong/rusak), tidak sampai bikin SELURUH
    // halaman Kasir gagal digambar hanya gara-gara satu pesanan bermasalah.
    const itemsHtml = (o.items || []).map(i => `${i.qty}x ${tt(i.name)}${i.summary ? ' — ' + i.summary : ''}`).join('<br>');
    const jam = o.createdAt ? new Date(o.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--';
    return `
    <div class="kasir-order-card ${o.status === 'done' ? 'done' : ''}">
      <div class="kasir-order-head">
        <b>${o.queueNo}</b>
        <span>${jam}</span>
        <span class="kasir-order-status ${o.status}">${o.status === 'done' ? tt('Selesai') : tt('Menunggu')}</span>
        <button class="kasir-delete-btn" data-id="${o.id}" aria-label="${tt('Hapus pesanan ini')}">🗑</button>
      </div>
      <div class="kasir-order-meta">${tt('Meja')} ${o.tableNumber} · ${tt(o.orderType)} · ${o.paymentMethod === 'online' ? 'QRIS' : tt('Bayar di Kasir')}${o.customerName ? ' · ' + o.customerName : ''}</div>
      <div class="kasir-order-items">${itemsHtml}</div>
      <div class="kasir-order-total"><span>${tt('Total')}</span><b>${rupiah(o.total)}</b></div>
      <button class="kasir-done-btn" data-id="${o.id}" ${o.status === 'done' ? 'disabled' : ''}>${o.status === 'done' ? '✓ ' + tt('Selesai') : tt('Tandai Selesai')}</button>
    </div>`;
  }).join('');
  body.querySelectorAll('.kasir-done-btn').forEach(btn => {
    btn.addEventListener('click', () => markOrderDone(btn.dataset.id));
  });
  body.querySelectorAll('.kasir-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteOrder(btn.dataset.id));
  });
}
/* Daftar pesanan "Bayar Online" (QRIS) yang pembelinya sudah menekan "Saya
   Sudah Bayar" tapi kasir BELUM mengonfirmasi dana benar-benar diterima.
   Pesanan ini SENGAJA tidak masuk antrean dapur (lihat filter di
   renderKasirOrders) — supaya kalau pembayaran QRIS pembeli sebenarnya gagal/
   belum masuk, kasir bisa menahan pesanan itu alih-alih memprosesnya begitu saja. */
function renderKasirPaymentVerify() {
  const section = $('#kasirPaymentVerifySection');
  const body = $('#kasirPaymentVerifyBody');
  if (!section || !body) return;
  const pending = orders.filter(o => o.status === 'awaiting_payment_verification');
  section.hidden = pending.length === 0;
  if (pending.length === 0) { body.innerHTML = ''; return; }
  body.innerHTML = pending.map(o => {
    const itemsHtml = (o.items || []).map(i => `${i.qty}x ${tt(i.name)}${i.summary ? ' — ' + i.summary : ''}`).join('<br>');
    const jam = o.createdAt ? new Date(o.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--';
    return `
    <div class="kasir-order-card">
      <div class="kasir-order-head">
        <b>${o.queueNo}</b>
        <span>${jam}</span>
        <span class="kasir-order-status awaiting_scan">${tt('Belum Diverifikasi')}</span>
        <button class="kasir-delete-btn" data-id="${o.id}" aria-label="${tt('Hapus pesanan ini')}">🗑</button>
      </div>
      <div class="kasir-order-meta">${tt('Meja')} ${o.tableNumber} · ${tt(o.orderType)} · QRIS${o.customerName ? ' · ' + o.customerName : ''}</div>
      <div class="kasir-order-items">${itemsHtml}</div>
      <div class="kasir-order-total"><span>${tt('Total')}</span><b>${rupiah(o.total)}</b></div>
      <button class="kasir-done-btn confirm-payment-btn" data-id="${o.id}">${tt('Konfirmasi Pembayaran Diterima')}</button>
      <button class="kasir-delete-btn reject-payment-btn" data-id="${o.id}" style="width:100%; margin-top:6px; border-radius:10px; padding:8px;" data-i18n="Tolak / Belum Bayar">${tt('Tolak / Belum Bayar')}</button>
    </div>`;
  }).join('');
  body.querySelectorAll('.confirm-payment-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmPaymentReceived(btn.dataset.id));
  });
  body.querySelectorAll('.reject-payment-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteOrder(btn.dataset.id));
  });
}
/* Kasir menekan ini SETELAH benar-benar mengecek mutasi/notifikasi di aplikasi
   DANA/e-wallet kasir bahwa dana pesanan ini sudah masuk. Baru di sinilah
   pesanan online dianggap lunas dan dipindahkan ke antrean dapur. */
function confirmPaymentReceived(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order || order.status !== 'awaiting_payment_verification') return;
  order.status = 'pending';
  persistOrders();
  clearPendingOrderIdIfMatches(order.id);
  if (orderChannel) orderChannel.postMessage({ type: 'order-confirmed', orderId: order.id });
  apiKasir('/api/orders/' + order.id + '/confirm-payment', { method: 'POST' })
    .catch(e => console.error('Gagal konfirmasi pembayaran lewat API:', e));
  renderKasirOrders();
  showToast(`${tt('Pesanan')} ${order.queueNo} ${tt('diterima & masuk antrean dapur')}`);
}
function deleteOrder(orderId) {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return;
  orders.splice(idx, 1);
  rememberDeletedOrderId(orderId);
  persistOrders();
  renderKasirOrders();
  updateAwaitingScanBadge();
  // Kalau pembeli sedang membuka halaman checkout tepat setelah menghapus
  // pesanan lamanya (lewat tombol "Hapus" di kartu QR), tautan "Ada QR yang
  // belum selesai?" langsung disegarkan juga, tanpa perlu ditutup-buka dulu.
  if (!$('#viewCheckout').hidden) updatePendingCashLink();
  if (orderChannel) orderChannel.postMessage({ type: 'order-deleted', orderId });
  apiKasir('/api/orders/' + orderId, { method: 'DELETE' })
    .catch(e => console.error('Gagal hapus pesanan lewat API:', e));
  showToast(tt('Pesanan dihapus'));
}
/* Ubah berbagai format nomor HP Indonesia (08xx, +62xx, 62xx, spasi/strip)
   jadi format internasional polos yang dipakai wa.me (62xxxxxxxxxx).
   Mengembalikan null kalau nomornya kosong/tidak terlihat valid, supaya
   kita tidak membuka tab WhatsApp kosong/rusak. */
function normalizePhoneToWa(raw) {
  if (!raw) return null;
  let digits = String(raw).trim().replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) digits = digits.slice(1);
  if (digits.startsWith('0')) digits = '62' + digits.slice(1);
  else if (digits.startsWith('8')) digits = '62' + digits; // pembeli kadang ketik tanpa 0 di depan
  if (!/^62\d{8,13}$/.test(digits)) return null;
  return digits;
}
/* Buka WhatsApp dengan pesan "pesanan siap diambil" yang sudah terisi otomatis
   ke nomor pembeli, supaya kasir tinggal menekan tombol "Kirim" di WhatsApp.
   PENTING: window.open ini harus tetap berjalan SINKRON di dalam alur klik
   tombol "Tandai Selesai" (tidak boleh lewat setTimeout/await) — kalau tidak,
   browser akan menganggapnya bukan lagi bagian dari gestur pengguna dan
   memblokirnya sebagai popup.
   Nomor WA dikirim ke wa.me — sebuah layanan resmi milik WhatsApp/Meta yang
   dipakai untuk membuka percakapan dengan pesan yang sudah diisi. */
function openWhatsAppOrderReady(order) {
  const waNumber = normalizePhoneToWa(order.customerPhone);
  if (!waNumber) return; // pembeli tidak isi nomor WA / nomornya tidak valid — lewati
  const namaSapaan = order.customerName ? order.customerName + ', ' : '';
  const pesan = `Halo ${namaSapaan}pesananmu di Kopi Senja dengan nomor antrian *${order.queueNo}* sudah *selesai* dan siap diambil ya! ☕😊`;
  window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(pesan), '_blank');
}
function markOrderDone(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order || order.status === 'done') return;
  order.status = 'done';
  persistOrders();
  renderKasirOrders();
  if (orderChannel) orderChannel.postMessage({ type: 'order-done', queueNo: order.queueNo });
  apiKasir('/api/orders/' + order.id + '/done', { method: 'POST' })
    .catch(e => console.error('Gagal tandai pesanan selesai lewat API:', e));
  // Panggil langsung juga (bukan cuma lewat broadcast), karena di app ini
  // peran Kasir & Pembeli berbagi satu halaman/tab yang sama — BroadcastChannel
  // tidak mengirim pesan balik ke pengirimnya sendiri, jadi tanpa baris ini
  // notifikasi "pesanan siap" tidak akan pernah muncul di sisi Pembeli.
  handleOrderDoneNotice(order.queueNo);
  // Notifikasi kedua: buka WhatsApp ke nomor pembeli (kalau diisi) dengan
  // pesan "pesanan siap diambil" yang sudah terisi otomatis — kasir tinggal
  // tap "Kirim" satu kali. Dijalankan bersamaan dengan notifikasi HP di atas.
  openWhatsAppOrderReady(order);
  showToast(tt('Pesanan ditandai selesai'));
}

/* ===================== SCAN QR PESANAN (sisi Kasir) =====================
   Kasir menekan "Scan QR Pesanan" → kamera menyala → QR pembeli discan →
   kode hasil scan (order.id) dicocokkan dengan pesanan berstatus
   'awaiting_scan' → kalau cocok, status diubah jadi 'pending' dan pesanan
   baru saat itu muncul di antrean dapur. Ada juga input manual (ketik kode/
   nomor antrian) untuk jaga-jaga kalau kamera tidak bisa dipakai. */
let html5QrScanner = null;
let scannerIsRunning = false;
let scannerFacingMode = 'environment'; // 'environment' = kamera belakang, 'user' = kamera depan
let torchOn = false;
let scanProcessing = false; // true sesaat setelah 1 QR berhasil terbaca, sampai kamera benar-benar ditutup

function updateAwaitingScanBadge() {
  const el = $('#awaitingScanCount');
  if (!el) return;
  // Dihitung dari KEDUA status "belum dikonfirmasi": 'awaiting_scan' (Bayar di
  // Kasir) DAN 'awaiting_payment_verification' (Bayar Online) — sebab tombol
  // "Scan QR Pesanan" sekarang bisa mengonfirmasi QR dari kedua jenis pesanan
  // itu sekaligus (lihat confirmOrderByCode).
  const count = orders.filter(o => o.status === 'awaiting_scan' || o.status === 'awaiting_payment_verification').length;
  el.textContent = String(count);
  el.hidden = count === 0;
}

let kasirSubtabBeforeScan = 'orders';
function openScanOverlay() {
  // Tombol "QR Pesanan" sekarang ikut berganti warna (aktif/tidak aktif) seperti
  // 3 tab lain di sampingnya — jadi sebelum overlay kamera dibuka, ingat dulu tab
  // mana yang sedang aktif supaya bisa dikembalikan lagi begitu overlay ditutup.
  kasirSubtabBeforeScan = $('#kasirTabMenu').classList.contains('active') ? 'menu'
    : $('#kasirTabKas').classList.contains('active') ? 'kas' : 'orders';
  $('#kasirTabOrders').classList.remove('active');
  $('#kasirTabMenu').classList.remove('active');
  $('#kasirTabKas').classList.remove('active');
  $('#openScanBtn').classList.add('active');
  $('#scanOverlay').hidden = false;
  $('#scanManualInput').value = '';
  scannerFacingMode = 'environment';
  torchOn = false;
  scanProcessing = false;
  startQrCameraScanner();
}
function closeScanOverlay() {
  $('#scanOverlay').hidden = true;
  scanProcessing = false;
  stopQrCameraScanner();
  $('#openScanBtn').classList.remove('active');
  switchKasirSubtab(kasirSubtabBeforeScan);
}
$('#openScanBtn').addEventListener('click', openScanOverlay);
$('#closeScanBtn').addEventListener('click', closeScanOverlay);

/* Area kotak pemindaian dibuat MENGIKUTI ukuran video kamera (bukan angka
   tetap), tapi sekarang dibuat lebih KECIL (55% dari sisi terpendek, maksimal
   200px) sesuai permintaan — supaya kotak target QR tidak lagi memenuhi
   hampir seluruh lebar layar kamera. */
function computeQrBox(viewfinderWidth, viewfinderHeight) {
  const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
  const size = Math.floor(Math.min(minEdge * 0.55, 200));
  return { width: size, height: size };
}

function startQrCameraScanner() {
  if (scannerIsRunning) return;
  if (typeof Html5Qrcode === 'undefined') {
    $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff;">${tt('Modul kamera gagal dimuat. Gunakan input manual di bawah.')}</div>`;
    return;
  }
  // Browser HANYA mengizinkan akses kamera (getUserMedia) di "konteks aman":
  // halaman yang dibuka lewat https:// atau lewat localhost/127.0.0.1. Kalau
  // file HTML ini dibuka langsung dari penyimpanan HP (file:///...) atau lewat
  // http:// biasa, kamera akan SELALU ditolak oleh sistem — bukan soal kode,
  // dan bukan bisa diperbaiki dari sisi JavaScript. Deteksi ini di awal supaya
  // pesannya jelas menyebut penyebab sebenarnya, bukan cuma "izin ditolak".
  if (!window.isSecureContext) {
    $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff; line-height:1.5;">${tt('Kamera hanya bisa diakses kalau halaman ini dibuka lewat HTTPS (atau localhost), bukan langsung dari file di HP. Upload file ini ke hosting web (mis. Netlify/GitHub Pages) lalu buka lewat alamat https://, atau gunakan input manual di bawah.')}</div>`;
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff;">${tt('Browser ini tidak mendukung akses kamera. Gunakan input manual di bawah.')}</div>`;
    return;
  }
  html5QrScanner = new Html5Qrcode('scanReader', {
    // CATATAN: BarcodeDetector bawaan browser (useBarCodeDetectorIfSupported)
    // ternyata di beberapa Android/WebView malah lebih SULIT membaca QR padat
    // dari jarak dekat (sering gagal fokus/deteksi dibanding decoder JS bawaan
    // pustaka ini) — makanya sekarang dimatikan supaya perilaku pemindaian
    // konsisten sama bagusnya di semua perangkat, bukan tergantung dukungan
    // API tiap browser.
    useBarCodeDetectorIfSupported: false,
    verbose: false,
  });
  const scanConfig = {
    fps: 15,
    // qrbox SENGAJA dihapus (dulu membatasi area pindai ke kotak kecil ~200px
    // dengan garis putih di tengah layar kamera). Efeknya kotak putih pemandu
    // itu tidak lagi tampil, DAN seluruh frame kamera dipakai untuk memindai —
    // bukan cuma area kecil itu. Ini sekaligus mempercepat/mempermudah deteksi
    // karena QR tidak perlu diposisikan pas di kotak kecil itu, cukup ada di
    // mana saja dalam jangkauan kamera.
    disableFlip: false,
    // Minta resolusi kamera yang cukup tinggi — kamera resolusi rendah kesulitan
    // membaca QR padat (banyak modul kecil) dari jarak tangan memegang HP.
    // CATATAN: aspectRatio TIDAK lagi dipaksa 1:1 — memaksa rasio persegi bikin
    // sebagian browser HP men-crop/nge-zoom gambar kamera secara digital demi
    // memenuhi rasio itu, yang malah bikin gambar QR jadi kurang tajam & susah
    // fokus. Membiarkan kamera pakai rasio aslinya menghasilkan gambar paling
    // tajam yang tersedia dari sensornya.
    videoConstraints: {
      facingMode: scannerFacingMode,
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      // Minta browser aktifkan autofokus terus-menerus kalau didukung — tanpa
      // ini, sebagian HP mengunci fokus di jarak jauh sejak awal video dibuka,
      // sehingga QR yang dipegang dekat ke kamera selalu terlihat blur/buram
      // walau kamera sendiri sebenarnya sanggup fokus dekat.
      advanced: [{ focusMode: 'continuous' }],
    },
  };
  const onSuccess = (decodedText) => {
    // Begitu SATU QR berhasil terbaca, langsung jeda kamera saat itu juga —
    // supaya frame berikutnya (yang mungkin masih sempat diproses sepersekian
    // detik kemudian) tidak memicu pembacaan/konfirmasi ganda sebelum overlay
    // benar-benar tertutup.
    if (scanProcessing) return;
    scanProcessing = true;
    try { if (html5QrScanner && scannerIsRunning) html5QrScanner.pause(true); } catch (e) { }
    confirmOrderByCode(decodedText);
  };
  const onFail = () => { /* satu frame tanpa QR terbaca — normal, terus coba frame berikutnya */ };

  // Cara utama: minta langsung lewat facingMode (paling andal lintas perangkat,
  // tidak bergantung pada label kamera yang sering tidak konsisten antar HP/browser).
  html5QrScanner.start({ facingMode: scannerFacingMode }, scanConfig, onSuccess, onFail)
    .then(() => { scannerIsRunning = true; setupCameraControls(); })
    .catch(() => {
      // Fallback: kalau constraint facingMode ditolak perangkat (jarang terjadi,
      // biasanya di laptop/webcam), coba lagi dengan memilih dari daftar kamera yang tersedia.
      Html5Qrcode.getCameras().then(devices => {
        if (!devices || !devices.length) {
          $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff;">${tt('Kamera tidak ditemukan. Gunakan input manual di bawah.')}</div>`;
          return;
        }
        const backCam = devices.find(d => /back|belakang|rear/i.test(d.label)) || devices[0];
        html5QrScanner.start(backCam.id, scanConfig, onSuccess, onFail)
          .then(() => { scannerIsRunning = true; setupCameraControls(); })
          .catch(() => {
            $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff;">${tt('Tidak bisa mengakses kamera. Gunakan input manual di bawah.')}</div>`;
          });
      }).catch(() => {
        $('#scanReader').innerHTML = `<div class="kasir-empty" style="color:#fff;">${tt('Izin kamera ditolak. Gunakan input manual di bawah.')}</div>`;
      });
    });
}

/* Tampilkan tombol Senter/Ganti Kamera setelah kamera berhasil menyala, dan
   sembunyikan tombol yang memang tidak didukung perangkat (mis. laptop tanpa
   senter, atau device dengan cuma 1 kamera). */
function setupCameraControls() {
  $('#scanCamControls').hidden = false;
  $('#switchCamBtn').hidden = false; // aman ditampilkan; kalau kamera lain tak ada, tinggal gagal & fallback balik

  const torchBtn = $('#toggleTorchBtn');
  torchBtn.hidden = true;
  try {
    const capabilities = html5QrScanner.getRunningTrackCameraCapabilities
      ? html5QrScanner.getRunningTrackCameraCapabilities()
      : null;
    const torchSupported = capabilities && capabilities.torchFeature && capabilities.torchFeature().isSupported && capabilities.torchFeature().isSupported();
    if (torchSupported) torchBtn.hidden = false;
  } catch (e) { /* API senter tidak tersedia di browser ini, sembunyikan saja tombolnya */ }
}

$('#toggleTorchBtn').addEventListener('click', () => {
  if (!scannerIsRunning || !html5QrScanner) return;
  torchOn = !torchOn;
  try {
    html5QrScanner.applyVideoConstraints({ advanced: [{ torch: torchOn }] });
    $('#toggleTorchBtn').classList.toggle('active', torchOn);
  } catch (e) {
    torchOn = false;
    showToast(tt('Senter tidak didukung di perangkat ini'));
  }
});

$('#switchCamBtn').addEventListener('click', () => {
  scannerFacingMode = scannerFacingMode === 'environment' ? 'user' : 'environment';
  torchOn = false;
  stopQrCameraScanner();
  setTimeout(startQrCameraScanner, 250); // jeda singkat supaya stream kamera lama benar-benar lepas dulu
});

function stopQrCameraScanner() {
  $('#scanCamControls').hidden = true;
  if (scannerIsRunning && html5QrScanner) {
    html5QrScanner.stop().then(() => { html5QrScanner.clear(); }).catch(() => { });
    scannerIsRunning = false;
  }
}

/* Lanjutkan lagi pemindaian kamera yang sempat dijeda (lihat onSuccess) kalau
   ternyata kode yang terbaca bukan pesanan yang valid — supaya kasir tidak
   perlu tutup-buka ulang overlay hanya karena sekali salah scan. */
function resumeScannerIfPaused() {
  scanProcessing = false;
  try { if (html5QrScanner && scannerIsRunning) html5QrScanner.resume(); } catch (e) { }
}

$('#scanManualBtn').addEventListener('click', () => {
  const val = $('#scanManualInput').value.trim();
  if (val) confirmOrderByCode(val);
});
$('#scanManualInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); $('#scanManualBtn').click(); }
});

/* Cocokkan kode hasil scan/ketik manual dengan pesanan yang masih menunggu
   di-scan. QR sekarang berisi teks lengkap (menu + total) dengan baris
   pertama "ID:xxx" — fungsi ini mengambil ID dari baris itu. Kalau yang
   diketik/discan cuma satu baris pendek (mis. input manual "A-02" atau
   "ord_xxx"), teks itu dipakai apa adanya dan dicocokkan lewat order.id
   ATAU queueNo (nomor antrian, supaya kasir gampang ketik manual). QR yang
   dibuat aplikasi ini sendiri (lihat encodeOrderQrPayload) dibongkar dulu
   lewat decodeOrderQrPayload — hasil scan kode acak semacam itu TIDAK akan
   cocok apa pun kalau dibuka dari luar aplikasi ini. */
function extractOrderIdFromScan(text) {
  const raw = String(text || '').trim();
  const decoded = decodeOrderQrPayload(raw);
  if (decoded) return decoded.id;
  const match = raw.match(/ID:\s*(\S+)/i);
  return match ? match[1] : raw;
}
/* Satu pintu scan untuk KEDUA alur pemesanan:
   - 'awaiting_scan'                 → pesanan "Bayar di Kasir": scan = pesanan sah & mulai diproses.
   - 'awaiting_payment_verification' → pesanan "Bayar Online" (QRIS): scan di kasir dipakai
     SEBAGAI GANTI tombol manual "Konfirmasi Pembayaran Diterima" — kasir tetap wajib mengecek
     dulu mutasi/notifikasi dana di aplikasi DANA/e-wallet SEBELUM mengarahkan kamera ke QR
     pembeli, persis seperti sebelum menekan tombol manualnya. Scan hanya mempercepat
     langkah konfirmasi, bukan menggantikan pengecekan dana itu sendiri.
   Kedua jenis pesanan dicocokkan lewat kode yang sama (order.id / nomor antrian), jadi satu
   tombol "Scan QR Pesanan" ini sekarang otomatis mendeteksi & memproses pesanan dari
   manapun asalnya. Begitu status berubah, event 'order-confirmed' disiarkan lewat
   BroadcastChannel + localStorage fallback (lihat listener di bawah) supaya halaman sukses
   di sisi pembeli ikut ter-update otomatis tanpa reload, untuk kedua jenis pembayaran. */
function confirmOrderByCode(rawCode) {
  const code = extractOrderIdFromScan(rawCode);
  if (!code) { resumeScannerIfPaused(); return; }
  const order = orders.find(o =>
    (o.status === 'awaiting_scan' || o.status === 'awaiting_payment_verification') &&
    (o.id === code || o.queueNo.toUpperCase() === code.toUpperCase())
  );
  if (!order) {
    // Cek juga: mungkin kode ini valid tapi pesanannya sudah pernah dikonfirmasi/dihapus sebelumnya
    const already = orders.find(o => o.id === code || o.queueNo.toUpperCase() === code.toUpperCase());
    showToast(already ? tt('Pesanan ini sudah pernah discan/dikonfirmasi sebelumnya') : tt('Kode tidak ditemukan / bukan pesanan yang valid'));
    // Kode ini bukan pesanan yang valid — overlay TETAP terbuka, jadi kamera
    // harus dilanjutkan lagi supaya kasir bisa langsung coba scan yang benar.
    resumeScannerIfPaused();
    return;
  }
  const wasOnlinePayment = order.status === 'awaiting_payment_verification';
  order.status = 'pending';
  persistOrders();
  clearPendingOrderIdIfMatches(order.id);
  if (orderChannel) orderChannel.postMessage({ type: 'order-confirmed', orderId: order.id });
  const scanEndpoint = wasOnlinePayment ? '/confirm-payment' : '/confirm-scan';
  apiKasir('/api/orders/' + order.id + scanEndpoint, { method: 'POST' })
    .catch(e => console.error('Gagal konfirmasi scan lewat API:', e));
  closeScanOverlay();
  renderKasirOrders(); // otomatis juga menyegarkan daftar "Belum Diverifikasi" (renderKasirPaymentVerify)
  updateAwaitingScanBadge();
  showToast(wasOnlinePayment
    ? `${tt('Pembayaran')} ${order.queueNo} ${tt('dikonfirmasi via scan & masuk antrean dapur')}`
    : `${tt('Pesanan')} ${order.queueNo} ${tt('diterima & masuk antrean dapur')}`);
}

/* ---- Notifikasi + suara di sisi Pembeli saat pesanan selesai ---- */
let currentQueueNo = null;
function playOrderDoneSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Sebagian browser (terutama di HP) menaruh AudioContext dalam status "suspended"
    // sampai ada gestur pengguna — resume paksa supaya suara pasti keluar.
    if (ctx.state === 'suspended') ctx.resume();
    const master = ctx.createGain();
    master.gain.value = 1; // volume penuh, dinaikkan supaya bunyinya keras & jelas
    master.connect(ctx.destination);
    // 3 nada lonceng (naik) supaya lebih nyaring & terasa seperti notifikasi penting
    [0, 0.16, 0.34].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = [880, 1175, 1480][idx];
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.4);
      osc.connect(gain); gain.connect(master);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.45);
    });
  } catch (e) { /* Web Audio tidak didukung, lewati suara */ }
}
/* Suara bicara (text-to-speech) yang membacakan langsung tulisan notifikasinya,
   supaya pembeli dengar "Pesanan A-04 sudah selesai, silakan diambil" bukan cuma bunyi bip.
   PENTING: speak() WAJIB dipanggil LANGSUNG & SINKRON di dalam aksi ketukan tombol —
   banyak browser HP (Safari/WebView) membisukan suara kalau dipanggil lewat setTimeout/delay,
   karena dianggap bukan lagi bagian dari gestur pengguna. */
function speakOrderDoneMessage(queueNo) {
  try {
    if (!('speechSynthesis' in window)) return;
    const text = `${tt('Pesanan')} ${queueNo} ${tt('sudah selesai, silakan diambil')}`;
    window.speechSynthesis.cancel(); // hentikan antrian suara lama biar tidak numpuk
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = currentLang === 'en' ? 'en-US' : 'id-ID';
    utter.rate = 0.95;
    utter.pitch = 1.05;
    utter.volume = 1; // volume maksimal
    // Pilih suara yang paling cocok dengan bahasa saat ini kalau daftar suara sudah termuat
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(utter.lang.slice(0, 2).toLowerCase()));
    if (match) utter.voice = match;
    window.speechSynthesis.speak(utter);
  } catch (e) { /* Web Speech API tidak didukung, lewati suara bicara */ }
}
function showOrderDoneBanner(queueNo) {
  const old = document.getElementById('orderDoneBanner');
  if (old) old.remove();
  const banner = document.createElement('div');
  banner.className = 'order-done-banner';
  banner.id = 'orderDoneBanner';
  banner.innerHTML = `<span>🔔</span><span>${tt('Pesanan')} ${queueNo} ${tt('sudah selesai, silakan diambil!')}</span><button class="odb-close">✕</button>`;
  document.getElementById('app').appendChild(banner);
  banner.querySelector('.odb-close').addEventListener('click', () => banner.remove());
  setTimeout(() => { if (document.getElementById('orderDoneBanner')) banner.remove(); }, 8000);
}
/* Notifikasi sistem (browser) supaya pembeli tetap dapat notif walau tab
   sedang tidak aktif/diminimize. Dukungan browser bervariasi (butuh izin
   pengguna); banner + suara di atas tetap jadi jalur notifikasi utama. */
function requestNotificationPermission() {
  try {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  } catch (e) { /* Notification API tidak didukung, lewati */ }
}
/* Ikon notifikasi berbentuk cangkir kopi, dibuat dari SVG langsung (data URI)
   supaya notifikasi sistem punya "logo" toko seperti aplikasi lain — tidak
   perlu file gambar terpisah. */
const NOTIF_ICON = 'data:image/svg+xml,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#2B1B12"/>
    <text x="50" y="66" font-size="52" text-anchor="middle">☕</text>
  </svg>
`);
function showBrowserNotification(queueNo, customerName) {
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      const namaSapaan = customerName ? customerName : tt('Pesananmu');
      const n = new Notification('Kopi Senja', {
        body: `☕ ${tt('Pesanan')} ${namaSapaan} ${tt('siap! Segera ambil di kasir, ya. Nikmati kopinya!')}`,
        tag: 'kopi-senja-' + queueNo,
        icon: NOTIF_ICON,
        badge: NOTIF_ICON,
      });
      n.onclick = () => { window.focus(); n.close(); };
    }
  } catch (e) { /* Notification API tidak didukung, lewati */ }
}
function handleOrderDoneNotice(queueNo) {
  if (!currentQueueNo || queueNo !== currentQueueNo) return;
  const order = orders.find(o => o.queueNo === queueNo);
  const customerName = order ? order.customerName : '';
  playOrderDoneSound();
  speakOrderDoneMessage(queueNo);
  showOrderDoneBanner(queueNo);
  showBrowserNotification(queueNo, customerName);
}
if (orderChannel) {
  orderChannel.onmessage = (e) => {
    const msg = e.data;
    if (!msg) return;
    if (msg.type === 'new-order') {
      orders.unshift(msg.order);
      updateAwaitingScanBadge();
      if (!$('#viewKasir').hidden) renderKasirOrders();
    } else if (msg.type === 'order-confirmed') {
      const o = orders.find(x => x.id === msg.orderId);
      if (o) o.status = 'pending';
      clearPendingOrderIdIfMatches(msg.orderId);
      if (!$('#viewKasir').hidden) renderKasirOrders();
      // Kalau pembeli masih membuka halaman sukses pesanan ini, langsung ganti
      // ke status "Pesanan Diterima" tanpa perlu reload — mirip auto-deteksi QRIS.
      if (msg.orderId === currentSuccessOrderId && !$('#viewSuccess').hidden) {
        applySuccessStatus('confirmed');
      }
      // Kalau pembeli masih di halaman QRIS (belum pindah), otomatis lanjutkan
      // ke halaman sukses — ini yang menggantikan tombol "Saya Sudah Bayar".
      if (o) autoAdvanceFromQrisIfConfirmed(o);
      // Kalau pembeli sedang di halaman checkout saat pesanan lamanya baru
      // saja dikonfirmasi kasir, tautan "Ada QR yang belum selesai?" otomatis
      // hilang tanpa perlu reload.
      if (!$('#viewCheckout').hidden) updatePendingCashLink();
    } else if (msg.type === 'order-done') {
      // Sinkronkan status lokal juga, untuk browser tab lain yang membuka Halaman Kasir
      const o = orders.find(x => x.queueNo === msg.queueNo);
      if (o) o.status = 'done';
      if (!$('#viewKasir').hidden) renderKasirOrders();
      handleOrderDoneNotice(msg.queueNo);
    } else if (msg.type === 'order-deleted') {
      const idx = orders.findIndex(x => x.id === msg.orderId);
      if (idx !== -1) orders.splice(idx, 1);
      rememberDeletedOrderId(msg.orderId);
      if (!$('#viewKasir').hidden) renderKasirOrders();
      if (!$('#viewCheckout').hidden) updatePendingCashLink();
    } else if (msg.type === 'queue-sync') {
      // Sinkronkan nomor antrian antar tab di browser yang sama
      if (msg.queueDate === queueDate) {
        queueCounter = Math.max(queueCounter, msg.queueCounter);
      } else if (msg.queueDate > queueDate) {
        queueDate = msg.queueDate;
        queueCounter = msg.queueCounter;
      }
    }
  };
}
// Cadangan lintas-tab kalau BroadcastChannel tidak tersedia: pantau perubahan localStorage
window.addEventListener('storage', (e) => {
  if (e.key !== LS_PREFIX + 'orders' || !e.newValue) return;
  try {
    const updated = JSON.parse(e.newValue);
    const prevDone = new Set(orders.filter(o => o.status === 'done').map(o => o.queueNo));
    const prevAwaiting = new Set(orders.filter(o => o.status === 'awaiting_scan' || o.status === 'awaiting_payment_verification').map(o => o.id));
    orders = stripDeletedOrders(updated);
    orders.forEach(o => {
      if (o.status === 'done' && !prevDone.has(o.queueNo)) handleOrderDoneNotice(o.queueNo);
    });
    // Kalau pesanan yang sedang ditampilkan di halaman sukses pembeli baru saja
    // berpindah dari 'awaiting_scan'/'awaiting_payment_verification' ke status lain
    // (dikonfirmasi kasir), langsung update tampilannya — tanpa BroadcastChannel,
    // ini jalur cadangannya (fallback antar tab).
    if (currentSuccessOrderId && prevAwaiting.has(currentSuccessOrderId)) {
      const o = orders.find(x => x.id === currentSuccessOrderId);
      if (o && o.status !== 'awaiting_scan' && o.status !== 'awaiting_payment_verification') {
        clearPendingOrderIdIfMatches(currentSuccessOrderId);
        if (!$('#viewSuccess').hidden) applySuccessStatus('confirmed');
        // Fallback juga untuk pembeli yang masih di halaman QRIS (lihat versi
        // BroadcastChannel-nya di orderChannel.onmessage).
        autoAdvanceFromQrisIfConfirmed(o);
      }
    }
    if (!$('#viewKasir').hidden) renderKasirOrders();
  } catch (err) { }
});

/* ===================== SINKRON PESANAN REAL-TIME LEWAT FIREBASE =====================
   Ini yang membuat pesanan bisa dikonfirmasi kasir dari PERANGKAT LAIN (bukan cuma
   tab/browser yang sama seperti BroadcastChannel & event 'storage' di atas). Logikanya
   sengaja dibuat mirip persis dengan fallback 'storage' di atas: bandingkan status
   SEBELUM & SESUDAH data terbaru datang, lalu jalankan efek yang sesuai (notifikasi
   "pesanan selesai", auto-lanjut halaman sukses pembeli, refresh Halaman Kasir, dst).
   applySnapshot dipanggil setiap kali ADA PERUBAHAN di node 'orders' Firebase — baik
   perubahan itu datang dari perangkat ini sendiri maupun dari perangkat lain. */
function applyOrdersFromFirebase(snapshotVal) {
  const updated = snapshotVal ? Object.values(snapshotVal) : [];
  updated.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const prevDone = new Set(orders.filter(o => o.status === 'done').map(o => o.queueNo));
  const prevAwaiting = new Set(orders.filter(o => o.status === 'awaiting_scan' || o.status === 'awaiting_payment_verification').map(o => o.id));
  // Buang dulu pesanan yang baru saja dihapus DI PERANGKAT INI — supaya kalau
  // penghapusannya di server Firebase telat/gagal, pesanan itu tidak "hidup
  // lagi" muncul di layar hanya karena snapshot lama ini datang belakangan.
  orders = stripDeletedOrders(updated);
  persistOrders();
  orders.forEach(o => {
    if (o.status === 'done' && !prevDone.has(o.queueNo)) handleOrderDoneNotice(o.queueNo);
  });
  if (currentSuccessOrderId && prevAwaiting.has(currentSuccessOrderId)) {
    const o = orders.find(x => x.id === currentSuccessOrderId);
    if (o && o.status !== 'awaiting_scan' && o.status !== 'awaiting_payment_verification') {
      clearPendingOrderIdIfMatches(currentSuccessOrderId);
      if (!$('#viewSuccess').hidden) applySuccessStatus('confirmed');
      autoAdvanceFromQrisIfConfirmed(o);
    }
  }
  updateAwaitingScanBadge();
  if (!$('#viewKasir').hidden) {
    renderKasirOrders(); // otomatis juga menyegarkan daftar "Belum Diverifikasi" (renderKasirPaymentVerify)
  }
}
if (fbReady && fbOrdersRef) {
  fbOrdersRef.on('value', (snapshot) => {
    try { applyOrdersFromFirebase(snapshot.val()); }
    catch (e) { console.error('Gagal memproses update pesanan dari Firebase:', e); }
  }, (err) => {
    console.error('Koneksi ke Firebase terputus/ditolak, pesanan tidak lagi tersinkron otomatis lintas perangkat:', err);
  });
}

/* ---- Halaman QRIS (khusus Bayar Online) ----
   PENTING: file statis ini tidak terhubung ke payment gateway sungguhan, jadi
   TIDAK BISA memverifikasi sendiri apakah QRIS benar-benar sudah dibayar.
   Makanya di sini TIDAK ADA lagi "auto-sukses" otomatis — pesanan online cuma
   pindah ke antrean dapur setelah KASIR mengonfirmasi manual bahwa dana sudah
   masuk ke rekening/DANA kasir (lihat renderKasirPaymentVerify). Tombol
   "Saya Sudah Bayar" di bawah cuma memberi tahu kasir bahwa pembeli mengklaim
   sudah membayar — bukan bukti pembayaran itu sendiri. */
let qrisTimer = null;
let qrisSecondsLeft = 300; // 5 menit

function updateQrisCountdownDisplay() {
  const m = String(Math.floor(qrisSecondsLeft / 60)).padStart(2, '0');
  const s = String(qrisSecondsLeft % 60).padStart(2, '0');
  $('#qrisCountdown').textContent = `${m}:${s}`;
}
function startQrisCountdown() {
  clearInterval(qrisTimer);
  qrisSecondsLeft = 300;
  $('#qrisExpired').hidden = true;
  $('#qrisTimerBox').hidden = false;
  updateQrisCountdownDisplay();
  qrisTimer = setInterval(() => {
    qrisSecondsLeft--;
    updateQrisCountdownDisplay();
    if (qrisSecondsLeft <= 0) {
      clearInterval(qrisTimer);
      $('#qrisTimerBox').hidden = true;
      $('#qrisExpired').hidden = false;
    }
  }, 1000);
}

/* ===================== HALAMAN QRIS — OTOMATIS, TANPA TOMBOL =====================
   Dulu pembeli harus menekan tombol "Saya Sudah Bayar" secara manual dulu baru
   pesanan dibuat. Sekarang pesanan (status 'awaiting_payment_verification')
   langsung dibuat OTOMATIS begitu halaman QRIS ini dibuka — pembeli tinggal
   scan & bayar QRIS-nya di aplikasi e-wallet/m-banking mereka sendiri.
   Halaman ini menampilkan status "menunggu" secara permanen (bukan tombol) dan
   BERPINDAH SENDIRI ke halaman berikutnya begitu sistem mendeteksi dana sudah
   dikonfirmasi masuk oleh kasir (lewat event 'order-confirmed' yang disiarkan
   ketika kasir menekan "Konfirmasi Pembayaran Diterima" ATAU men-scan QR
   pesanan pembeli) — lihat listener order-confirmed di bawah. Tidak ada aksi
   apa pun yang perlu dilakukan pembeli setelah halaman ini terbuka. */
async function openQrisPage() {
  $('#qrisAmount').textContent = rupiah(cartTotal());
  $('#qrisSaveBtn').href = $('.qris-img').src; // simpan QR sebagai gambar (base64, jadi bisa disimpan offline)
  $('#qrisWaiting').hidden = false;
  startQrisCountdown();
  $('#viewQris').hidden = false;

  // Buat pesanan online sekarang juga (bukan menunggu tombol) — status awal
  // tetap 'awaiting_payment_verification' sampai kasir benar-benar mengonfirmasi
  // dana diterima; lihat comment panjang di dekat pushOrderToKasir untuk alasannya.
  await finalizeOrderSuccess({ showSuccessView: false });
}
/* Tombol "Simpan QRIS" sebelumnya cuma mengandalkan atribut download bawaan
   <a> pada data URI base64. Ini TIDAK jalan di banyak browser HP (terutama
   Safari iOS, dan sebagian WebView Android) — attribute download diabaikan
   untuk data: URI, jadi gambar cuma kebuka/tidak terjadi apa-apa, bukannya
   kesimpan. Diganti dengan strategi bertingkat: (1) Web Share API kalau
   didukung (paling andal di HP, muncul opsi "Simpan Gambar"), (2) fallback
   Blob URL + klik <a> terprogram (lebih kompatibel daripada data URI
   langsung), (3) fallback terakhir buka gambar di tab baru supaya pembeli
   bisa tekan-lama gambar lalu pilih "Simpan Gambar" secara manual. */
function dataURItoBlob(dataURI) {
  const parts = dataURI.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binary = atob(parts[1]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
  return new Blob([bytes], { type: mime });
}
async function saveQrisImage() {
  const src = $('.qris-img').src;
  try {
    const blob = dataURItoBlob(src);
    const file = new File([blob], 'QRIS-KopiSenja.jpg', { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: tt('Simpan QRIS') });
      return;
    }
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'QRIS-KopiSenja.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  } catch (e) {
    if (e && e.name === 'AbortError') return; // pembeli batal share, tidak perlu fallback
    window.open(src, '_blank');
    showToast(tt('Tekan lama gambar untuk menyimpan'));
  }
}
$('#qrisSaveBtn').addEventListener('click', (e) => {
  e.preventDefault();
  saveQrisImage();
});
$('#backFromQris').addEventListener('click', () => {
  clearInterval(qrisTimer);
  $('#viewQris').hidden = true;
});
/* Tombol ✕ di halaman sukses/QR pesanan: hanya MENYEMBUNYIKAN popup-nya,
   TIDAK menghapus status "menunggu di-scan" (pendingOrderId tetap tersimpan).
   Jadi kalau halaman ini dibuka/dimuat ulang lagi dan pesanan masih belum
   di-scan kasir, popup ini otomatis muncul lagi sendiri — lihat pemulihan
   pendingOrderId di init(). */
$('#closeSuccessBtn').addEventListener('click', () => {
  $('#viewSuccess').hidden = true;
});
/* Tombol "Hapus" di pojok kiri atas kartu QR: dipakai pembeli untuk MEMBATALKAN
   pesanannya sendiri selama masih menunggu di-scan/diverifikasi kasir (belum
   masuk dapur). Pesanan langsung dihapus dari daftar kasir (lokal + Firebase),
   dan status "menunggu" di perangkat ini juga dibersihkan supaya tidak muncul
   lagi kalau halaman dimuat ulang. */
$('#cancelPendingOrderBtn').addEventListener('click', () => {
  if (!currentSuccessOrderId) return;
  if (!confirm(tt('Yakin ingin menghapus pesanan ini?'))) return;
  const orderId = currentSuccessOrderId;
  clearPendingOrderIdIfMatches(orderId);
  deleteOrder(orderId);
  currentSuccessOrderId = null;
  $('#viewSuccess').hidden = true;
});
$('#qrisRefreshBtn').addEventListener('click', () => {
  startQrisCountdown();
});

/* Begitu halaman QRIS mendeteksi pesanan yang sedang ditunggu (currentSuccessOrderId)
   sudah dikonfirmasi kasir, halaman ini otomatis ditutup dan berpindah ke halaman
   sukses (menampilkan QR pesanan sebagai bukti + status "Pesanan Diterima") —
   tanpa pembeli perlu menekan apa pun. */
function autoAdvanceFromQrisIfConfirmed(order) {
  if ($('#viewQris').hidden) return;
  if (!order || order.id !== currentSuccessOrderId) return;
  clearInterval(qrisTimer);
  $('#viewQris').hidden = true;
  renderOrderQr(order);
  applySuccessStatus('confirmed');
  $('#viewSuccess').hidden = false;
}

// Nomor HP wajib diawali 62 atau 08 (boleh ada spasi/strip, dicek setelah dibersihkan)
function isPhoneValid(v) {
  const cleaned = v.replace(/[\s-]/g, '');
  return /^(62|08)[0-9]{6,}$/.test(cleaned);
}
// Email wajib memakai domain gmail.com
function isEmailValid(v) {
  return /^[^\s@]+@gmail\.com$/i.test(v.trim());
}

$('#payBtn').addEventListener('click', async () => {
  const nameField = $('#fieldName');
  const nameVal = $('#inputName').value.trim();
  if (!nameVal) {
    nameField.classList.add('invalid');
    $('#inputName').focus();
    return;
  }
  nameField.classList.remove('invalid');

  const phoneField = $('#fieldPhone');
  const phoneVal = $('#inputPhone').value.trim();
  if (phoneVal && !isPhoneValid(phoneVal)) {
    phoneField.classList.add('invalid');
    $('#inputPhone').focus();
    return;
  }
  phoneField.classList.remove('invalid');

  const emailField = $('#fieldEmail');
  const emailVal = $('#inputEmail').value.trim();
  if (emailVal && !isEmailValid(emailVal)) {
    emailField.classList.add('invalid');
    $('#inputEmail').focus();
    return;
  }
  emailField.classList.remove('invalid');

  if (paymentMethod === 'online' && !$('#agreeTerms').checked) {
    showToast(tt('Setujui Syarat & Ketentuan dan Kebijakan Privasi dulu, ya'));
    $('#agreeTerms').focus();
    return;
  }

  $('#viewCheckout').hidden = true;

  if (paymentMethod === 'online') {
    // Tampilkan QRIS dulu (bisa dipindai & disimpan, berlaku 5 menit) sebelum "Pesanan Diterima"
    await openQrisPage();
  } else {
    // Bayar di kasir: tidak perlu QRIS, langsung ke "Pesanan Diterima"
    await finalizeOrderSuccess();
  }
});

// Hilangkan tanda error begitu pengguna mulai memperbaiki isian
$('#inputName').addEventListener('input', () => $('#fieldName').classList.remove('invalid'));
$('#inputPhone').addEventListener('input', (e) => {
  $('#fieldPhone').classList.remove('invalid');
  const el = e.target;
  const cursorFromEnd = el.value.length - el.selectionStart;
  const digitsOnly = el.value.replace(/\D/g, '').slice(0, 15);
  const grouped = digitsOnly.replace(/(.{4})(?=.)/g, '$1 ');
  el.value = grouped;
  const newPos = Math.max(0, el.value.length - cursorFromEnd);
  el.setSelectionRange(newPos, newPos);
});
$('#inputEmail').addEventListener('input', () => $('#fieldEmail').classList.remove('invalid'));

/* ===================== PROFILE (AKUN GOOGLE — LOGIN ASLI) ===================== */
let googleAccount = null; // {name, email} — diisi dari data akun Google asli setelah login

// >>> WAJIB DIISI: Client ID OAuth dari Google Cloud Console (Credentials > OAuth client ID > Web application) <<<
// Tanpa ini diisi dengan Client ID asli, tombol Google tidak akan bisa menampilkan akun sungguhan.
const GOOGLE_CLIENT_ID = '437410939682-s0l63n3615emkiobqil0mjslck61jah2.apps.googleusercontent.com';

// Membongkar bagian data (payload) dari token JWT yang dikirim Google setelah login berhasil,
// supaya kita bisa ambil nama, email, dan foto profil asli dari akun yang dipilih.
function decodeGoogleJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(json);
}

// Dipanggil otomatis oleh Google setelah orang memilih akun di jendela "Pilih akun" resmi.
function handleGoogleCredentialResponse(response) {
  try {
    const payload = decodeGoogleJwt(response.credential);
    googleAccount = { name: payload.name || payload.email, email: payload.email };
    userAvatar = payload.picture || null; // foto profil asli dari akun Google yang dipilih
    storageSet('googleAccount', JSON.stringify(googleAccount));
    storageSet('userAvatar', userAvatar || '');
    renderProfileCard();
    showToast(tt('Berhasil masuk dengan Google'));
  } catch (e) {
    showToast(tt('Gagal memproses login Google'));
  }
}

let gsiReady = false;
function initGoogleSignIn() {
  if (!window.google || !google.accounts || !google.accounts.id) return;
  if (GOOGLE_CLIENT_ID.startsWith('GANTI_DENGAN_')) return; // belum dikonfigurasi
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredentialResponse,
    use_fedcm_for_prompt: true,
  });
  gsiReady = true;
}
window.addEventListener('load', initGoogleSignIn);

// Menampilkan tombol Google resmi (dari Google sendiri) di dalam kontainer yang sudah disiapkan,
// atau pesan setup kalau Client ID belum diisi.
function renderGoogleButton(gsiAttempt) {
  gsiAttempt = gsiAttempt || 0;
  const container = document.getElementById('gsiButtonContainer');
  if (!container) return;
  if (GOOGLE_CLIENT_ID.startsWith('GANTI_DENGAN_')) {
    container.innerHTML = `<div class="gsi-setup-note">${tt('Client ID Google belum diisi. Lihat komentar GOOGLE_CLIENT_ID di kode untuk menghubungkan akun Google asli.')}</div>`;
    return;
  }
  if (!window.google || !google.accounts || !google.accounts.id) {
    if (gsiAttempt >= 15) { // sudah nunggu ~4.5 detik dan script Google tetap belum termuat
      container.innerHTML = `<div class="gsi-setup-note">
        ${tt('Google Sign-In gagal dimuat.')}<br>
        ${tt('Kemungkinan besar halaman ini dibuka di dalam preview/webview aplikasi (bukan browser asli seperti Chrome/Safari). Google memang memblokir login Google di dalam webview tertanam demi keamanan.')}<br>
        ${tt('Coba buka file ini lewat browser asli setelah di-hosting, bukan lewat jendela pratinjau.')}
      </div>`;
      return;
    }
    container.innerHTML = `<div class="gsi-setup-note">${tt('Memuat Google Sign-In...')}</div>`;
    setTimeout(() => renderGoogleButton(gsiAttempt + 1), 300);
    return;
  }
  if (!gsiReady) initGoogleSignIn();
  container.innerHTML = '';
  try {
    google.accounts.id.renderButton(container, {
      type: 'standard', theme: 'outline', size: 'medium', shape: 'pill', text: 'signin_with', logo_alignment: 'center', width: 220
    });
  } catch (e) {
    showGsiOriginError(container);
    return;
  }
  // Google diam-diam tidak menggambar tombol kalau origin belum terdaftar di Cloud Console.
  // Cek setelah sesaat: kalau container masih kosong, tampilkan pesan bantuan yang jelas.
  setTimeout(() => {
    if (container.innerHTML.trim() === '') {
      showGsiOriginError(container);
    }
  }, 700);
}

// Menampilkan pesan bantuan kalau tombol Google gagal muncul karena origin belum terdaftar.
function showGsiOriginError(container) {
  const origin = window.location.origin || window.location.href;
  container.innerHTML = `<div class="gsi-setup-note">
    ${tt('Tombol Google Sign-In gagal dimuat.')}<br>
    ${tt('Kemungkinan besar: origin berikut belum didaftarkan di Google Cloud Console > Credentials > OAuth Client ID > Authorized JavaScript origins')}:<br>
    <code style="user-select:all">${origin}</code><br>
    ${tt('Catatan: kalau file dibuka langsung dari HP/komputer (bukan lewat http/https), Google Sign-In tidak akan pernah bisa jalan — file harus di-hosting dulu (misalnya lewat domain asli, localhost, atau layanan hosting).')}
  </div>`;
}

/* ---- Foto profil (diambil dari galeri HP, disimpan sebagai base64 lokal) ---- */
let userAvatar = null; // base64 data URL, URL foto Google, atau null
$('#avatarFileInput').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast(tt('File harus berupa gambar')); return; }
  const reader = new FileReader();
  reader.onload = () => {
    userAvatar = reader.result;
    storageSet('userAvatar', userAvatar);
    renderProfileCard();
    // Kalau viewer foto sedang terbuka (mis. ganti foto ditekan dari dalam viewer),
    // perbarui juga gambar yang ditampilkan di viewer supaya langsung terlihat.
    if (!$('#avatarViewerOverlay').hidden) $('#avatarViewerImg').src = userAvatar;
    showToast(tt('Foto profil diperbarui'));
  };
  reader.readAsDataURL(file);
  e.target.value = '';
});
function avatarStyle() {
  return userAvatar ? `style="background-image:url('${userAvatar}')"` : '';
}

/* ---- Peran: Pembeli / Kasir ---- */
let userRole = 'pembeli'; // 'pembeli' | 'kasir'
function renderRoleSwitch() {
  // CATATAN: Tombol "Kasir" SENGAJA tidak lagi dirender di sini.
  // Halaman Kasir & Pengaturan sekarang punya file terpisah (kasir.html),
  // supaya tidak muncul sama sekali di web pembeli. Fungsi ini
  // dibiarkan ada (kosong) supaya pemanggilannya di tempat lain tidak
  // error, tapi tidak lagi menampilkan apa pun.
  const box = $('#roleSwitch');
  if (box) box.innerHTML = '';
}

function renderProfileCard() {
  const card = $('#profileCard');
  // Kalau SUDAH ada foto profil: avatarnya jadi tombol yang membuka VIEWER (lihat foto
  // besar + tombol Ganti Foto & Hapus Foto di dalamnya) — bukan langsung membuka file
  // picker. Kalau BELUM ada foto: tetap label yang langsung membuka file picker seperti
  // sebelumnya, karena belum ada apa-apa untuk dilihat.
  const avatarTag = userAvatar
    ? `<button type="button" class="profile-avatar${googleAccount ? ' profile-avatar-logged' : ''}" id="avatarClickTarget" ${avatarStyle()}><span class="avatar-edit-badge">📷</span></button>`
    : `<label class="profile-avatar${googleAccount ? ' profile-avatar-logged' : ''}" id="avatarClickTarget" for="avatarFileInput">${googleAccount ? ((googleAccount.name.trim().charAt(0) || 'G').toUpperCase()) : '👤'}<span class="avatar-edit-badge">📷</span></label>`;
  if (googleAccount) {
    card.innerHTML = `
      ${avatarTag}
      <div class="profile-info">
        <div class="profile-title">${tt('Masuk sebagai')} ${googleAccount.name}</div>
        <div class="profile-email">${googleAccount.email}</div>
        <button class="google-btn logout-btn" id="googleLogoutBtn"><span>🚪</span> ${tt('Keluar Akun')}</button>
      </div>`;
    $('#googleLogoutBtn').addEventListener('click', () => {
      googleAccount = null;
      storageSet('googleAccount', '');
      renderProfileCard();
      showToast(tt('Berhasil keluar dari akun'));
    });
  } else {
    card.innerHTML = `
      ${avatarTag}
      <div class="profile-info">
        <div class="profile-title">${tt('Masuk sebagai Pembeli')}</div>
        <div id="gsiButtonContainer"></div>
      </div>`;
    renderGoogleButton();
  }
  // Catatan: label#avatarClickTarget (saat BELUM ada foto) sudah otomatis membuka
  // #avatarFileInput lewat atribut for="avatarFileInput" (mekanisme native browser).
  if (userAvatar) {
    $('#avatarClickTarget').addEventListener('click', openAvatarViewer);
  }
  renderRoleSwitch();
}

// Buka viewer foto profil (foto besar + tombol Ganti Foto & Hapus Foto di dalamnya)
function openAvatarViewer() {
  if (!userAvatar) return;
  $('#avatarViewerImg').src = userAvatar;
  $('#avatarViewerOverlay').hidden = false;
}
function closeAvatarViewer() {
  $('#avatarViewerOverlay').hidden = true;
}
$('#avatarViewerClose').addEventListener('click', closeAvatarViewer);
$('#avatarViewerOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'avatarViewerOverlay') closeAvatarViewer();
});
$('#avatarViewerDeleteBtn').addEventListener('click', () => {
  removeAvatar();
  closeAvatarViewer();
});

// Menghapus foto profil jika sedang tidak digunakan (kembali ke ikon/inisial bawaan)
function removeAvatar() {
  userAvatar = null;
  storageSet('userAvatar', '');
  renderProfileCard();
  showToast(tt('Foto profil dihapus'));
}

/* ===================== PENGATURAN: LATAR BELAKANG BANNER =====================
   Dari Profil > Pengaturan, kasir/pemilik warung bisa mengganti warna coklat
   latar belakang banner atas dengan foto/video sendiri (mengisi PENUH area
   banner). Ini TERPISAH dari ikon cangkir kopi — lihat blok "IKON CANGKIR"
   di bawah untuk itu. */
let heroMediaType = 'default'; // 'default' | 'image' | 'video' — LATAR BELAKANG
let heroMediaData = null;      // base64 data URL untuk foto/video latar kustom
let heroMediaObjectUrl = null; // object URL sementara dipakai untuk pratinjau INSTAN (lihat handler input di bawah)

// HTML latar belakang PENUH (mengisi seluruh banner). Sengaja mengembalikan
// string kosong kalau masih pakai warna coklat bawaan, supaya gradasi asli
// banner tetap terlihat tanpa ada elemen media yang menutupinya.
function heroBgHTML() {
  if (heroMediaType === 'image' && heroMediaData) {
    return `<img src="${heroMediaData}" class="hero-bg-media" alt="Latar Banner">`;
  }
  if (heroMediaType === 'video' && heroMediaData) {
    return `<video src="${heroMediaData}" class="hero-bg-media" autoplay loop muted playsinline></video>`;
  }
  return '';
}

function renderHeroMedia() {
  const isCustomBg = (heroMediaType === 'image' || heroMediaType === 'video') && !!heroMediaData;
  const bg = $('#heroMediaBg');
  if (bg) bg.innerHTML = isCustomBg ? heroBgHTML() : '';
  const preview = $('#settingsHeroPreview');
  if (preview) preview.innerHTML = isCustomBg ? heroBgHTML() : '';
  applyHeroMediaTransform();
}

async function persistHeroMedia() {
  await storageSet('heroMediaType', heroMediaType);
  await storageSet('heroMediaData', heroMediaData || '');
}
function broadcastHeroMedia() {
  if (menuChannel) menuChannel.postMessage({ type: 'hero-media-updated', heroMediaType, heroMediaData });
}

$('#settingsHeroMediaInput').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) { showToast(tt('File harus berupa foto atau video')); e.target.value = ''; return; }

  // Tampilkan LANGSUNG pakai Object URL (dibuat instan dari file, tanpa perlu
  // menunggu proses baca+konversi ke base64 selesai — itu yang bikin lama,
  // terutama untuk file video berukuran besar). Kasir jadi langsung lihat
  // hasilnya begitu file dipilih.
  if (heroMediaObjectUrl) URL.revokeObjectURL(heroMediaObjectUrl);
  heroMediaObjectUrl = URL.createObjectURL(file);
  heroMediaType = isImage ? 'image' : 'video';
  heroMediaData = heroMediaObjectUrl;

  // Setiap kali foto/video latar diganti dengan yang BARU, ukuran & posisi
  // zoom dikembalikan dulu ke bawaan (100%, tanpa geser) — supaya foto baru
  // selalu tampil penuh & rapi seperti tampilan awal, TIDAK ikut memakai
  // zoom/posisi bekas foto SEBELUMNYA (proporsi foto lama & baru biasanya
  // beda, itu yang bikin ukurannya terlihat "berubah-ubah" tiap ganti foto).
  heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM };
  syncHeroTransformInputsUI();
  persistHeroMediaStyle();
  broadcastHeroMediaStyle();

  renderHeroMedia();
  showToast(isImage ? tt('Foto latar belakang diperbarui') : tt('Video latar belakang diperbarui'));

  // Konversi ke base64 tetap dilakukan di belakang layar (dibutuhkan supaya
  // tersimpan permanen & tersinkron ke perangkat lain — Object URL di atas
  // hanya berlaku sementara di perangkat & sesi ini), TANPA menunda tampilan
  // yang sudah terlanjur berubah di atas.
  const reader = new FileReader();
  reader.onload = () => {
    heroMediaData = reader.result;
    persistHeroMedia();
    broadcastHeroMedia();
  };
  reader.onerror = () => showToast(tt('Gagal menyimpan file secara permanen, coba lagi'));
  reader.readAsDataURL(file);
  e.target.value = '';
});

$('#settingsResetHeroBtn').addEventListener('click', () => {
  if (heroMediaObjectUrl) { URL.revokeObjectURL(heroMediaObjectUrl); heroMediaObjectUrl = null; }
  heroMediaType = 'default';
  heroMediaData = null;
  heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM };
  syncHeroTransformInputsUI();
  persistHeroMedia();
  persistHeroMediaStyle();
  broadcastHeroMedia();
  broadcastHeroMediaStyle();
  renderHeroMedia();
  showToast(tt('Dikembalikan ke latar coklat bawaan'));
});

/* ===================== PENGATURAN: IKON CANGKIR (TERPISAH DARI LATAR) =====================
   Ikon cangkir kopi di tengah banner bisa diganti foto/video sendiri SECARA
   TERPISAH dari latar belakangnya, dan bisa ditampilkan atau disembunyikan
   sama sekali lewat toggle "Tampilkan ikon cangkir di banner". */
let heroIconType = 'default'; // 'default' | 'image' | 'video' — IKON CANGKIR
let heroIconData = null;
let heroIconVisible = true;   // tampil/sembunyi ikon, terlepas dari isi ikonnya
let heroIconObjectUrl = null; // object URL sementara dipakai untuk pratinjau INSTAN (lihat handler input di bawah)

function heroIconHTML() {
  if (heroIconType === 'image' && heroIconData) {
    return `<img src="${heroIconData}" class="hero-media-custom" alt="Ikon">`;
  }
  if (heroIconType === 'video' && heroIconData) {
    return `<video src="${heroIconData}" class="hero-media-custom hero-media-video" autoplay loop muted playsinline></video>`;
  }
  return `<div class="cup-wrap"><div class="steam"><span></span><span></span><span></span></div><span class="cup-emoji">☕</span></div>`;
}

function renderHeroIcon() {
  const slot = $('#heroMediaSlot');
  if (slot) {
    slot.innerHTML = heroIconHTML();
    slot.hidden = !heroIconVisible;
  }
  const iconPreview = $('#settingsIconPreview');
  if (iconPreview) iconPreview.innerHTML = heroIconHTML();
  const toggle = $('#heroIconVisibleToggle');
  if (toggle) toggle.checked = heroIconVisible;
  applyHeroIconTransform();
}

async function persistHeroIcon() {
  await storageSet('heroIconType', heroIconType);
  await storageSet('heroIconData', heroIconData || '');
  await storageSet('heroIconVisible', heroIconVisible ? '1' : '0');
}
function broadcastHeroIcon() {
  if (menuChannel) menuChannel.postMessage({ type: 'hero-icon-updated', heroIconType, heroIconData, heroIconVisible });
}

$('#settingsIconMediaInput').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) { showToast(tt('File harus berupa foto atau video')); e.target.value = ''; return; }

  // Sama seperti latar belakang di atas: tampilkan instan lewat Object URL
  // dulu, konversi ke base64 (untuk simpan permanen & sinkron) jalan belakangan.
  if (heroIconObjectUrl) URL.revokeObjectURL(heroIconObjectUrl);
  heroIconObjectUrl = URL.createObjectURL(file);
  heroIconType = isImage ? 'image' : 'video';
  heroIconData = heroIconObjectUrl;
  renderHeroIcon();
  showToast(isImage ? tt('Foto ikon diperbarui') : tt('Video ikon diperbarui'));

  const reader = new FileReader();
  reader.onload = () => {
    heroIconData = reader.result;
    persistHeroIcon();
    broadcastHeroIcon();
  };
  reader.onerror = () => showToast(tt('Gagal menyimpan file secara permanen, coba lagi'));
  reader.readAsDataURL(file);
  e.target.value = '';
});

$('#settingsResetIconBtn').addEventListener('click', () => {
  if (heroIconObjectUrl) { URL.revokeObjectURL(heroIconObjectUrl); heroIconObjectUrl = null; }
  heroIconType = 'default';
  heroIconData = null;
  persistHeroIcon();
  broadcastHeroIcon();
  renderHeroIcon();
  showToast(tt('Dikembalikan ke ikon cangkir bawaan'));
});

$('#heroIconVisibleToggle').addEventListener('change', (e) => {
  heroIconVisible = !!e.target.checked;
  persistHeroIcon();
  broadcastHeroIcon();
  renderHeroIcon();
  showToast(heroIconVisible ? tt('Ikon cangkir ditampilkan') : tt('Ikon cangkir disembunyikan'));
});

/* ===================== PENGATURAN: UKURAN & POSISI LATAR BELAKANG =====================
   Kasir/pemilik warung bisa membesar-kecilkan (zoom) dan menggeser posisi
   (kiri-kanan, atas-bawah) foto/video LATAR BELAKANG banner. Ikon cangkir
   TIDAK ikut memakai pengaturan ini — ukurannya sudah menyesuaikan sendiri
   sesuai desain aslinya. */
const DEFAULT_HERO_TRANSFORM = { size: 100, offsetX: 0, offsetY: 0 };
let heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM };

function heroMediaTransformCSS() {
  return `translate(${heroMediaStyle.offsetX}px, ${heroMediaStyle.offsetY}px) scale(${heroMediaStyle.size / 100})`;
}
function applyHeroMediaTransform() {
  const css = heroMediaTransformCSS();
  const bgChild = $('#heroMediaBg') && $('#heroMediaBg').firstElementChild;
  if (bgChild) bgChild.style.transform = css;
  const previewChild = $('#settingsHeroPreview') && $('#settingsHeroPreview').firstElementChild;
  if (previewChild) previewChild.style.transform = css;
}
// Ikon cangkir dulunya ikut memakai transform di atas — sekarang dipisah
// sendiri (saat ini tanpa slider khusus, memakai ukuran bawaannya) supaya
// mengubah ukuran/posisi latar belakang TIDAK ikut menggeser/membesarkan
// ikon cangkir, dan sebaliknya.
function applyHeroIconTransform() {
  const slotChild = $('#heroMediaSlot') && $('#heroMediaSlot').firstElementChild;
  if (slotChild) slotChild.style.transform = '';
  const iconPreviewChild = $('#settingsIconPreview') && $('#settingsIconPreview').firstElementChild;
  if (iconPreviewChild) iconPreviewChild.style.transform = '';
}
function syncHeroTransformInputsUI() {
  const sizeRange = $('#heroSizeRange'), sizeValue = $('#heroSizeValue');
  const xRange = $('#heroPosXRange'), xValue = $('#heroPosXValue');
  const yRange = $('#heroPosYRange'), yValue = $('#heroPosYValue');
  if (sizeRange) sizeRange.value = heroMediaStyle.size;
  if (sizeValue) sizeValue.textContent = heroMediaStyle.size + '%';
  if (xRange) xRange.value = heroMediaStyle.offsetX;
  if (xValue) xValue.textContent = heroMediaStyle.offsetX + 'px';
  if (yRange) yRange.value = heroMediaStyle.offsetY;
  if (yValue) yValue.textContent = heroMediaStyle.offsetY + 'px';
}
async function persistHeroMediaStyle() {
  await storageSet('heroMediaStyle', JSON.stringify(heroMediaStyle));
}
function broadcastHeroMediaStyle() {
  if (menuChannel) menuChannel.postMessage({ type: 'hero-media-style-updated', heroMediaStyle });
}

$('#heroSizeRange').addEventListener('input', (e) => {
  heroMediaStyle.size = parseInt(e.target.value, 10) || DEFAULT_HERO_TRANSFORM.size;
  $('#heroSizeValue').textContent = heroMediaStyle.size + '%';
  applyHeroMediaTransform();
});
$('#heroSizeRange').addEventListener('change', () => {
  persistHeroMediaStyle();
  broadcastHeroMediaStyle();
  showToast(tt('Ukuran gambar/video diperbarui'));
});

$('#heroPosXRange').addEventListener('input', (e) => {
  heroMediaStyle.offsetX = parseInt(e.target.value, 10) || 0;
  $('#heroPosXValue').textContent = heroMediaStyle.offsetX + 'px';
  applyHeroMediaTransform();
});
$('#heroPosXRange').addEventListener('change', () => {
  persistHeroMediaStyle();
  broadcastHeroMediaStyle();
  showToast(tt('Posisi gambar/video diperbarui'));
});

$('#heroPosYRange').addEventListener('input', (e) => {
  heroMediaStyle.offsetY = parseInt(e.target.value, 10) || 0;
  $('#heroPosYValue').textContent = heroMediaStyle.offsetY + 'px';
  applyHeroMediaTransform();
});
$('#heroPosYRange').addEventListener('change', () => {
  persistHeroMediaStyle();
  broadcastHeroMediaStyle();
  showToast(tt('Posisi gambar/video diperbarui'));
});

$('#settingsResetHeroTransformBtn').addEventListener('click', () => {
  heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM };
  applyHeroMediaTransform();
  syncHeroTransformInputsUI();
  persistHeroMediaStyle();
  broadcastHeroMediaStyle();
  showToast(tt('Ukuran & posisi dikembalikan ke bawaan'));
});

/* ===================== PENGATURAN: TEKS & FONT NAMA TOKO =====================
   Dari Profil > Pengaturan, kasir/pemilik warung bisa mengubah tulisan "Kopi Senja"
   di bawah foto/video tampilan depan, mengganti jenis font, dan mengatur ukurannya.
   Sama seperti foto/video & warna, perubahan disimpan lewat storageSet & disiarkan
   lewat BroadcastChannel supaya tab lain (termasuk halaman pembeli) ikut berubah. */
const DEFAULT_BRAND = { text: 'Kopi Senja', tagline: 'NGOPI SANTAI, CERITA BERLANJUT', font: 'Fraunces', size: 30, visible: true };
let brandStyle = { ...DEFAULT_BRAND };

function applyBrandStyle() {
  const el = $('#heroBrandTitle');
  if (el) {
    el.textContent = brandStyle.text || DEFAULT_BRAND.text;
    el.style.fontFamily = `'${brandStyle.font}', serif`;
    el.style.fontSize = brandStyle.size + 'px';
  }
  const taglineEl = $('#heroBrandTagline');
  if (taglineEl) taglineEl.textContent = brandStyle.tagline || DEFAULT_BRAND.tagline;
  // Tampil/sembunyikan tulisan nama toko + slogan, terlepas dari isi tulisannya
  // (mirip toggle ikon cangkir) — dipakai kalau kasir ingin banner tanpa teks,
  // misalnya saat foto/video latar sudah punya nama toko sendiri.
  const isVisible = brandStyle.visible !== false;
  if (el) el.hidden = !isVisible;
  if (taglineEl) taglineEl.hidden = !isVisible;
}
function syncBrandInputsUI() {
  const textInput = $('#brandTextInput');
  const taglineInput = $('#brandTaglineInput');
  const fontSelect = $('#brandFontSelect');
  const sizeRange = $('#brandSizeRange');
  const sizeValue = $('#brandSizeValue');
  const visibleToggle = $('#brandTextVisibleToggle');
  if (textInput) textInput.value = brandStyle.text;
  if (taglineInput) taglineInput.value = brandStyle.tagline;
  if (fontSelect) fontSelect.value = brandStyle.font;
  if (sizeRange) sizeRange.value = brandStyle.size;
  if (sizeValue) sizeValue.textContent = brandStyle.size + 'px';
  if (visibleToggle) visibleToggle.checked = brandStyle.visible !== false;
}
async function persistBrandStyle() {
  await storageSet('brandStyle', JSON.stringify(brandStyle));
}
function broadcastBrandStyle() {
  if (menuChannel) menuChannel.postMessage({ type: 'brand-style-updated', brandStyle });
}

$('#brandTextInput').addEventListener('input', (e) => {
  brandStyle.text = e.target.value;
  applyBrandStyle();
});
$('#brandTextInput').addEventListener('change', () => {
  if (!brandStyle.text.trim()) brandStyle.text = DEFAULT_BRAND.text;
  applyBrandStyle();
  syncBrandInputsUI();
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(tt('Tulisan nama toko diperbarui'));
});

$('#brandTaglineInput').addEventListener('input', (e) => {
  brandStyle.tagline = e.target.value;
  applyBrandStyle();
});
$('#brandTaglineInput').addEventListener('change', () => {
  if (!brandStyle.tagline.trim()) brandStyle.tagline = DEFAULT_BRAND.tagline;
  applyBrandStyle();
  syncBrandInputsUI();
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(tt('Tulisan slogan diperbarui'));
});

$('#brandFontSelect').addEventListener('change', (e) => {
  brandStyle.font = e.target.value;
  applyBrandStyle();
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(tt('Font tulisan diperbarui'));
});

$('#brandSizeRange').addEventListener('input', (e) => {
  brandStyle.size = parseInt(e.target.value, 10) || DEFAULT_BRAND.size;
  $('#brandSizeValue').textContent = brandStyle.size + 'px';
  applyBrandStyle();
});
$('#brandSizeRange').addEventListener('change', () => {
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(tt('Ukuran tulisan diperbarui'));
});

$('#brandTextVisibleToggle').addEventListener('change', (e) => {
  brandStyle.visible = !!e.target.checked;
  applyBrandStyle();
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(brandStyle.visible ? tt('Nama toko & slogan ditampilkan') : tt('Nama toko & slogan disembunyikan'));
});

$('#settingsResetBrandBtn').addEventListener('click', () => {
  brandStyle = { ...DEFAULT_BRAND };
  applyBrandStyle();
  syncBrandInputsUI();
  persistBrandStyle();
  broadcastBrandStyle();
  showToast(tt('Tulisan nama toko dikembalikan ke bawaan'));
});

/* ===================== KUSTOMISASI WARNA WEBSITE =====================
   Pemilik warung bisa mengganti SEMUA warna inti website — latar belakang,
   kartu, font (utama & sekunder), aksen (utama, muda, kedua, hijau), garis
   pembatas, dan teks redup — sesuka hati lewat color picker bawaan browser
   (jadi SEMUA warna tersedia, tidak dibatasi pilihan preset). Warna disimpan
   lewat storageSet & disiarkan lewat BroadcastChannel supaya tab lain
   (termasuk halaman pembeli) ikut berubah tanpa perlu refresh. */
const THEME_VARS = [
  { key: 'cream', cssVar: '--cream' },
  { key: 'paper', cssVar: '--paper' },
  { key: 'espresso', cssVar: '--espresso' },
  { key: 'espresso2', cssVar: '--espresso-2' },
  { key: 'amber', cssVar: '--amber' },
  { key: 'amberLight', cssVar: '--amber-light' },
  { key: 'cherry', cssVar: '--cherry' },
  { key: 'sage', cssVar: '--sage' },
  { key: 'line', cssVar: '--line' },
  { key: 'muted', cssVar: '--muted' },
];
const DEFAULT_THEME = {
  cream: '#F6ECDA',
  paper: '#FFFBF3',
  espresso: '#2B1B12',
  espresso2: '#4A3324',
  amber: '#C17A3E',
  amberLight: '#E7C393',
  cherry: '#9C2B3D',
  sage: '#6E7B58',
  line: '#E6D6B8',
  muted: '#8A7A63',
};
let themeColors = { ...DEFAULT_THEME };

/* Menempelkan warna terpilih ke CSS custom property di :root — ini yang
   membuat SELURUH halaman (bukan cuma preview) langsung berubah warnanya,
   karena semua elemen di file ini sudah dibangun memakai var(--cream) dkk. */
function applyThemeColors(colors) {
  const root = document.documentElement.style;
  THEME_VARS.forEach(v => {
    if (colors[v.key]) root.setProperty(v.cssVar, colors[v.key]);
  });
}
function syncThemeInputsUI(colors) {
  THEME_VARS.forEach(v => {
    const input = $('#color-' + v.key);
    const swatch = $('#swatch-' + v.key);
    const hexLabel = $('#hex-' + v.key);
    if (input) input.value = colors[v.key];
    if (swatch) swatch.style.background = colors[v.key];
    if (hexLabel) hexLabel.textContent = colors[v.key].toUpperCase();
  });
}
async function persistThemeColors() {
  await storageSet('themeColors', JSON.stringify(themeColors));
}
function broadcastThemeColors() {
  if (menuChannel) menuChannel.postMessage({ type: 'theme-updated', themeColors });
}

THEME_VARS.forEach(v => {
  const input = $('#color-' + v.key);
  if (!input) return;
  input.addEventListener('input', (e) => {
    themeColors[v.key] = e.target.value;
    applyThemeColors(themeColors);
    syncThemeInputsUI(themeColors);
  });
  input.addEventListener('change', () => {
    persistThemeColors();
    broadcastThemeColors();
    showToast(tt('Warna website diperbarui'));
  });
});

$('#settingsResetThemeBtn').addEventListener('click', () => {
  themeColors = { ...DEFAULT_THEME };
  applyThemeColors(themeColors);
  syncThemeInputsUI(themeColors);
  persistThemeColors();
  broadcastThemeColors();
  showToast(tt('Warna dikembalikan ke bawaan'));
});

/* ---- Gerbang ID Kasir untuk masuk ke Pengaturan ----
   ID disimpan langsung di kode karena file ini statis tanpa server/database
   sungguhan. Sama seperti login Kasir, status "sudah masuk" TIDAK disimpan
   permanen (harus masukkan ID lagi tiap sesi/refresh) supaya HP yang
   tergeletak tidak otomatis bisa membuka Pengaturan tanpa ID. */
const SETTINGS_KASIR_ID = '180520071986';
let settingsUnlocked = false;

$('#rowSettings').addEventListener('click', () => {
  if (settingsUnlocked) {
    renderHeroMedia();
    renderHeroIcon();
    syncHeroTransformInputsUI();
    syncBrandInputsUI();
    syncThemeInputsUI(themeColors);
    $('#viewSettings').hidden = false;
  } else {
    $('#settingsIdInput').value = '';
    $('#fieldSettingsId').classList.remove('invalid');
    $('#viewSettingsLogin').hidden = false;
  }
});
$('#settingsLoginBtn').addEventListener('click', () => {
  const id = $('#settingsIdInput').value.trim();
  if (id !== SETTINGS_KASIR_ID) {
    $('#fieldSettingsId').classList.add('invalid');
    return;
  }
  $('#fieldSettingsId').classList.remove('invalid');
  settingsUnlocked = true;
  $('#viewSettingsLogin').hidden = true;
  renderHeroMedia();
  renderHeroIcon();
  syncHeroTransformInputsUI();
  syncBrandInputsUI();
  syncThemeInputsUI(themeColors);
  $('#viewSettings').hidden = false;
});
$('#settingsIdInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); $('#settingsLoginBtn').click(); }
});
$('#backFromSettingsLogin').addEventListener('click', () => $('#viewSettingsLogin').hidden = true);
$('#backFromSettings').addEventListener('click', () => $('#viewSettings').hidden = true);

/* ===================== RIWAYAT PESANAN ===================== */
let orderHistory = [];
async function persistHistory() { await storageSet('orderHistory', JSON.stringify(orderHistory)); }

function saveOrderToHistory(queueNo) {
  orderHistory.unshift({
    queueNo,
    date: new Date().toISOString(),
    tableNumber, orderType, paymentMethod,
    items: cart.map(i => ({ name: i.name, qty: i.qty, summary: i.summary, notes: i.notes, lineTotal: i.lineTotal })),
    total: cartTotal(),
  });
  persistHistory();
}

function deleteHistoryEntry(idx) {
  orderHistory.splice(idx, 1);
  persistHistory();
  renderOrderHistory();
  showToast(tt('Riwayat pesanan dihapus'));
}

function renderOrderHistory() {
  const body = $('#orderHistoryBody');
  if (orderHistory.length === 0) {
    body.innerHTML = `<div class="search-hint">${tt('Belum ada riwayat pesanan.')}<br>${tt('Yuk pesan kopi favoritmu dulu')} ☕</div>`;
    return;
  }
  body.innerHTML = orderHistory.map((h, idx) => {
    const d = new Date(h.date);
    const tgl = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const itemsHtml = h.items.map(it => `
      <div class="summary-line">
        <div><div class="l1">${it.qty}x ${tt(it.name)}</div>${it.summary ? `<div class="l2">${it.summary}</div>` : ''}</div>
        <div class="r">${rupiah(it.lineTotal)}</div>
      </div>`).join('');
    return `<div class="history-card">
      <div class="history-head">
        <b>${h.queueNo}</b>
        <span>${tgl}</span>
        <button class="history-delete-btn" data-idx="${idx}" aria-label="${tt('Hapus riwayat ini')}">🗑</button>
      </div>
      <div class="history-meta">${tt('Meja')} ${h.tableNumber} · ${tt(h.orderType)} · ${h.paymentMethod === 'online' ? 'QRIS' : tt('Bayar di Kasir')}</div>
      ${itemsHtml}
      <div class="history-total"><span>${tt('Total')}</span><b>${rupiah(h.total)}</b></div>
    </div>`;
  }).join('');
  body.querySelectorAll('.history-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteHistoryEntry(Number(btn.dataset.idx)));
  });
}

function openHelp() {
  const pesan = 'Halo Kopi Senja, saya butuh bantuan seputar pemesanan.';
  $('#helpWaBtn').href = 'https://wa.me/' + WA_NOMOR_WARUNG + '?text=' + encodeURIComponent(pesan);
  $('#viewHelp').hidden = false;
}

/* ===================== JAM & STATUS OPERASIONAL ===================== */
// Jam & status buka/tutup diatur langsung oleh kasir di tab "Jam Operasional".
// Sama tiap hari (Senin–Minggu, termasuk Sabtu & Minggu) — tidak ada jam khusus weekend.
let shopOpen = true;
let shopOpenTime = '07:00';  // format HH:MM, dipakai <input type="time">
let shopCloseTime = '22:00';
// shopAutoMode = true  → status buka/tutup dihitung OTOMATIS dari jam saat ini
//                        dibandingkan dengan shopOpenTime/shopCloseTime.
// shopAutoMode = false → kasir sedang mengatur status buka/tutup secara MANUAL
//                        lewat tombol "Buka Warung"/"Tutup Warung" (dipakai
//                        misalnya untuk tutup mendadak di luar jadwal biasa).
let shopAutoMode = true;
const DAY_NAMES = { 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu', 0: 'Minggu' };
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Senin ... Minggu, Sabtu & Minggu tetap tercantum dengan jam yang sama

function formatHourDot(t) { return (t || '').replace(':', '.'); }
function currentHoursLabel() { return `${formatHourDot(shopOpenTime)} – ${formatHourDot(shopCloseTime)}`; }

async function persistShopStatus() {
  await storageSet('shopOpen', shopOpen ? '1' : '0');
  await storageSet('shopOpenTime', shopOpenTime);
  await storageSet('shopCloseTime', shopCloseTime);
  await storageSet('shopAutoMode', shopAutoMode ? '1' : '0');
}
function broadcastShopStatus() {
  if (menuChannel) menuChannel.postMessage({ type: 'shop-status-updated', shopOpen, shopOpenTime, shopCloseTime, shopAutoMode });
}

/* ===================== BUKA/TUTUP OTOMATIS SESUAI JAM =====================
   Kalau shopAutoMode aktif (bawaan), status buka/tutup warung dihitung sendiri
   dari jam saat ini dibandingkan jam buka & jam tutup yang diatur kasir — tidak
   perlu ditekan manual lagi. Dicek ulang tiap 30 detik (lihat setInterval di
   bawah) supaya perpindahan buka→tutup atau tutup→buka tepat waktu. */
function timeStringToMinutes(t) {
  if (!t || typeof t !== 'string' || !t.includes(':')) return null;
  const [h, m] = t.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function isWithinShopSchedule() {
  const openMin = timeStringToMinutes(shopOpenTime);
  const closeMin = timeStringToMinutes(shopCloseTime);
  if (openMin === null || closeMin === null) return true; // data jam belum lengkap, anggap buka
  if (openMin === closeMin) return true; // jam buka = jam tutup → dianggap buka 24 jam
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (openMin < closeMin) {
    // Jam operasional normal dalam satu hari yang sama, misalnya 07:00–22:00
    return nowMin >= openMin && nowMin < closeMin;
  }
  // Jam operasional melewati tengah malam, misalnya buka jam 20:00, tutup jam 02:00
  return nowMin >= openMin || nowMin < closeMin;
}
function applyAutoShopStatus() {
  if (!shopAutoMode) return; // kasir sedang mengatur manual, jangan ditimpa otomatis
  const shouldBeOpen = isWithinShopSchedule();
  if (shouldBeOpen !== shopOpen) {
    shopOpen = shouldBeOpen;
    persistShopStatus();
    broadcastShopStatus();
    renderInfoCardStatus();
    renderMenu();
    renderCartBar();
    if ($('#viewHours') && !$('#viewHours').hidden) renderKasirHoursPane();
    if (activeProduct) renderSheet();
  }
}

/* ---- Penjadwalan TEPAT WAKTU (bukan sekadar polling tiap sekian detik) ----
   Alih-alih cuma mengecek tiap 30 detik (yang berarti bisa telat sampai ~30
   detik dari jam tutup/buka sebenarnya), fungsi ini menghitung PERSIS berapa
   milidetik lagi sampai jam buka/tutup berikutnya, lalu memasang satu timer
   yang akan menyala TEPAT di detik ke-0 pada menit itu juga. Setelah menyala,
   fungsi ini memanggil dirinya sendiri lagi untuk menjadwalkan boundary
   berikutnya (misalnya, sesudah tepat jam tutup, langsung menjadwalkan jam
   buka besok). Dipanggil ulang setiap kali jam operasional/mode auto berubah
   supaya jadwalnya selalu mengikuti pengaturan terbaru. */
let autoShopScheduleTimer = null;
function scheduleNextAutoShopCheck() {
  if (autoShopScheduleTimer) { clearTimeout(autoShopScheduleTimer); autoShopScheduleTimer = null; }
  applyAutoShopStatus(); // sinkronkan status saat ini dulu, baru jadwalkan perubahan berikutnya

  if (!shopAutoMode) return; // mode manual: tidak perlu timer otomatis

  const openMin = timeStringToMinutes(shopOpenTime);
  const closeMin = timeStringToMinutes(shopCloseTime);
  if (openMin === null || closeMin === null || openMin === closeMin) return; // jadwal tidak valid/24 jam

  const now = new Date();
  // Cari waktu (Date) berikutnya untuk jam buka & jam tutup, majukan ke besok
  // kalau jam itu untuk hari ini sudah lewat.
  const nextOccurrence = (minutesOfDay) => {
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(minutesOfDay / 60), minutesOfDay % 60, 0, 0);
    if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 1);
    return t;
  };
  const nextOpen = nextOccurrence(openMin);
  const nextClose = nextOccurrence(closeMin);
  const nextBoundary = nextOpen < nextClose ? nextOpen : nextClose;
  const delayMs = Math.max(nextBoundary.getTime() - now.getTime(), 250);

  autoShopScheduleTimer = setTimeout(() => {
    applyAutoShopStatus();
    scheduleNextAutoShopCheck(); // langsung jadwalkan boundary berikutnya
  }, delayMs);
}

// Jaring pengaman: kalau HP/laptop sempat tertidur atau tab di-background
// (browser sering menunda timer saat tab tidak aktif), timer presisi di atas
// bisa meleset. Setiap tab kembali aktif/terlihat, langsung cek & jadwalkan
// ulang supaya statusnya tetap akurat.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) scheduleNextAutoShopCheck();
});
// Jaring pengaman tambahan tiap 15 detik, jaga-jaga kalau timer presisi di atas
// gagal terpasang (mis. karena jam belum lengkap saat pertama kali dijadwalkan).
setInterval(applyAutoShopStatus, 15000);

// Menampilkan status buka/tutup di kartu info depan (dekat "Warkop Senja")
function renderInfoCardStatus() {
  const hoursEl = $('#infoCardHoursText');
  const badge = $('#closeBadge');
  const card = $('#infoCard');
  if (hoursEl) {
    hoursEl.textContent = shopOpen
      ? `${tt('Buka hari ini')}, ${currentHoursLabel()}`
      : tt('Tutup sementara');
  }
  if (badge) badge.hidden = shopOpen;
  if (card) card.classList.toggle('is-closed', !shopOpen);
}

// Panel kasir untuk atur jam & tombol buka/tutup
function renderKasirHoursPane() {
  const statusText = $('#kasirShopStatusText');
  const toggleBtn = $('#kasirToggleOpenBtn');
  if (statusText) {
    const modeLabel = shopAutoMode ? tt('Otomatis') : tt('Manual');
    statusText.textContent = (shopOpen ? tt('Buka') : tt('Tutup')) + ' · ' + modeLabel;
    statusText.classList.toggle('is-open', shopOpen);
    statusText.classList.toggle('is-closed', !shopOpen);
  }
  if (toggleBtn) {
    toggleBtn.textContent = shopOpen ? tt('Tutup Warung') : tt('Buka Warung');
    toggleBtn.classList.toggle('act-close', shopOpen);
    toggleBtn.classList.toggle('act-open', !shopOpen);
  }
  if ($('#kasirOpenTimeInput')) $('#kasirOpenTimeInput').value = shopOpenTime;
  if ($('#kasirCloseTimeInput')) $('#kasirCloseTimeInput').value = shopCloseTime;
  if ($('#kasirAutoScheduleToggle')) $('#kasirAutoScheduleToggle').checked = shopAutoMode;
}

/* Blok "Atur Jam Operasional" di halaman Jam Operasional pembeli HANYA
   ditampilkan kalau sedang login sebagai Kasir (kasirLoggedIn === true).
   Kalau belum/tidak login kasir, blok ini otomatis disembunyikan lagi —
   jadi pembeli biasa tidak akan pernah melihat atau bisa mengakses fitur
   atur jam ini sama sekali. */
function syncHoursKasirEditVisibility() {
  const pane = $('#hoursKasirEditPane');
  if (!pane) return;
  pane.hidden = !kasirLoggedIn;
  if (kasirLoggedIn) renderKasirHoursPane();
}

$('#kasirToggleOpenBtn').addEventListener('click', () => {
  // Menekan tombol ini = kasir mengambil alih status secara MANUAL (misalnya
  // tutup mendadak di luar jadwal biasa), jadi mode otomatis dimatikan dulu
  // supaya tidak langsung ditimpa lagi oleh pengecekan jadwal berikutnya.
  shopAutoMode = false;
  shopOpen = !shopOpen;
  persistShopStatus();
  broadcastShopStatus();
  renderKasirHoursPane();
  renderInfoCardStatus();
  renderMenu();
  renderCartBar();
  showToast(shopOpen ? tt('Warung ditandai Buka (manual)') : tt('Warung ditandai Tutup (manual)'));
});

if ($('#kasirAutoScheduleToggle')) {
  $('#kasirAutoScheduleToggle').addEventListener('change', (e) => {
    shopAutoMode = e.target.checked;
    persistShopStatus();
    broadcastShopStatus();
    scheduleNextAutoShopCheck(); // langsung hitung status & jadwalkan boundary berikutnya
    renderKasirHoursPane();
    renderInfoCardStatus();
    renderMenu();
    renderCartBar();
    showToast(shopAutoMode ? tt('Buka/tutup otomatis diaktifkan') : tt('Diubah ke mode manual'));
  });
}

$('#kasirSaveHoursBtn').addEventListener('click', () => {
  const openVal = $('#kasirOpenTimeInput').value;
  const closeVal = $('#kasirCloseTimeInput').value;
  if (!openVal || !closeVal) {
    showToast(tt('Isi jam buka dan jam tutup dulu'));
    return;
  }
  shopOpenTime = openVal;
  shopCloseTime = closeVal;
  persistShopStatus();
  broadcastShopStatus();
  scheduleNextAutoShopCheck();
  renderKasirHoursPane();
  renderInfoCardStatus();
  showToast(tt('Jam operasional disimpan'));
});

function renderHoursPage() {
  const body = $('#hoursBody');
  const todayIdx = new Date().getDay();
  body.innerHTML = `
    ${!shopOpen ? `<div class="hours-note" style="color:var(--cherry); font-weight:700;">${tt('Warung sedang tutup sementara.')}</div>` : ''}
    <div class="hours-list">${DAY_ORDER.map(d => {
    const isToday = d === todayIdx;
    return `<div class="hours-row${isToday ? ' today' : ''}">
        <span>${tt(DAY_NAMES[d])}${isToday ? `<span class="hd-today-badge">${tt('Hari ini')}</span>` : ''}</span>
        <span class="hd-time">${currentHoursLabel()}</span>
      </div>`;
  }).join('')}</div>
  `;
  syncHoursKasirEditVisibility();
}

$('#infoCard').addEventListener('click', () => { renderHoursPage(); $('#viewHours').hidden = false; });
$('#backFromHours').addEventListener('click', () => $('#viewHours').hidden = true);

$('#menuBtn').addEventListener('click', () => { renderProfileCard(); $('#viewProfile').hidden = false; });
$('#closeProfile').addEventListener('click', () => $('#viewProfile').hidden = true);
$('#rowOrderHistory').addEventListener('click', () => { renderOrderHistory(); $('#viewOrderHistory').hidden = false; });
$('#backFromHistory').addEventListener('click', () => $('#viewOrderHistory').hidden = true);
$('#rowHelp').addEventListener('click', openHelp);
$('#backFromHelp').addEventListener('click', () => $('#viewHelp').hidden = true);
$('#rowLanguage').addEventListener('click', () => { renderLanguagePage(); $('#viewLanguage').hidden = false; });
$('#backFromKasir').addEventListener('click', () => {
  $('#viewKasir').hidden = true;
  exitKasirFullscreen();
});
$('#backFromLanguage').addEventListener('click', () => $('#viewLanguage').hidden = true);

/* ===================== TOMBOL KELUAR ===================== */
$('#exitBtn').addEventListener('click', () => { $('#exitConfirm').hidden = false; });
$('#exitCancelBtn').addEventListener('click', () => { $('#exitConfirm').hidden = true; });
$('#exitConfirmBtn').addEventListener('click', () => {
  $('#exitConfirm').hidden = true;
  window.close();
});

/* ===================== INIT ===================== */
async function init() {
  // PENTING: gambar dulu tampilan dengan nilai BAWAAN/lokal (tabs, menu, info toko,
  // hero, dll) SEBELUM menunggu data kasir dari Firebase. Sebelumnya bagian menu baru
  // digambar setelah SEMUA 12 pengaturan kasir selesai diambil dari Firebase — jadi
  // kalau koneksi lambat, area menu tampil kosong cukup lama (persis keluhan: bagian
  // bawah lama munculnya) walaupun menu bawaan (PRODUCTS) sebenarnya sudah tersedia
  // secara lokal tanpa perlu menunggu jaringan sama sekali. Sekarang menu tampil
  // SEKETIKA dengan data bawaan, lalu digambar ULANG begitu override kasir (kalau ada)
  // datang dari Firebase/localStorage.
  try {
    const ls = (k) => localStorage.getItem(LS_PREFIX + k);
    const v = ls('heroIconVisible');
    if (v === '0' || v === '1') heroIconVisible = v === '1';
    if (ls('heroIconType')) heroIconType = ls('heroIconType');
    if (ls('heroIconData')) heroIconData = ls('heroIconData');
    if (ls('heroMediaType')) heroMediaType = ls('heroMediaType');
    if (ls('heroMediaData')) heroMediaData = ls('heroMediaData');
    if (ls('heroMediaStyle')) heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM, ...JSON.parse(ls('heroMediaStyle')) };
    if (ls('brandStyle')) brandStyle = { ...DEFAULT_BRAND, ...JSON.parse(ls('brandStyle')) };
    if (ls('themeColors')) themeColors = { ...DEFAULT_THEME, ...JSON.parse(ls('themeColors')) };
  } catch (e) { }
  
  renderInfoCardStatus();
  renderHeroMedia();
  renderHeroIcon();
  applyBrandStyle();
  applyThemeColors(themeColors);
  renderTabs();
  renderMenu();
  renderTableChip();
  renderCartBar();
  setupScrollSpy();

  // Ambil SEMUA pengaturan milik kasir dari Firebase SEKALIGUS/BERSAMAAN (bukan satu
  // per satu berurutan) — supaya begitu semuanya datang, override bisa langsung
  // diterapkan dan tampilan digambar ulang, alih-alih menunggu 12 kali bolak-balik ke
  // server satu-satu.
  const [
    savedCategoryOverrides,
    savedCustomProducts,
    savedMenuOverrides,
    savedShopOpen,
    savedShopOpenTime,
    savedShopCloseTime,
    savedShopAutoMode,
    savedHeroMediaType,
    savedHeroMediaData,
    savedHeroMediaStyle,
    savedHeroIconType,
    savedHeroIconData,
    savedHeroIconVisible,
    savedBrandStyle,
    savedThemeColors
  ] = await Promise.all([
    storageGet('categoryOverrides'),
    storageGet('customProducts'),
    storageGet('menuOverrides'),
    storageGet('shopOpen'),
    storageGet('shopOpenTime'),
    storageGet('shopCloseTime'),
    storageGet('shopAutoMode'),
    storageGet('heroMediaType'),
    storageGet('heroMediaData'),
    storageGet('heroMediaStyle'),
    storageGet('heroIconType'),
    storageGet('heroIconData'),
    storageGet('heroIconVisible'),
    storageGet('brandStyle'),
    storageGet('themeColors'),
  ]);

  // Kategori & menu tambahan kasir SEBELUM menu pertama kali digambar,
  // supaya pembeli langsung melihat kategori/menu terbaru sejak halaman pertama kali dibuka.
  if (savedCategoryOverrides) {
    try { applyCategoryOverrides(JSON.parse(savedCategoryOverrides)); } catch (e) { }
  }
  if (savedCustomProducts) {
    try {
      const customList = JSON.parse(savedCustomProducts);
      customList.forEach(cp => {
        if (cp && cp.id && !PRODUCTS.some(p => p.id === cp.id)) PRODUCTS.push(cp);
      });
    } catch (e) { }
  }

  // Harga & status habis dari kasir SEBELUM menu pertama kali digambar,
  // supaya pembeli langsung melihat harga/stok terbaru sejak halaman pertama kali dibuka.
  if (savedMenuOverrides) {
    try { applyMenuOverrides(JSON.parse(savedMenuOverrides)); } catch (e) { }
  }

  // Status buka/tutup & jam operasional SEBELUM kartu info digambar,
  // supaya pembeli langsung melihat status terbaru sejak halaman pertama kali dibuka.
  if (savedShopOpen !== null && savedShopOpen !== undefined && savedShopOpen !== '') shopOpen = savedShopOpen === '1';
  if (savedShopOpenTime) shopOpenTime = savedShopOpenTime;
  if (savedShopCloseTime) shopCloseTime = savedShopCloseTime;
  if (savedShopAutoMode !== null && savedShopAutoMode !== undefined && savedShopAutoMode !== '') shopAutoMode = savedShopAutoMode === '1';
  // Langsung hitung status buka/tutup terkini sesuai jadwal begitu halaman dibuka,
  // dan pasang timer presisi supaya perpindahan berikutnya (mis. tepat jam 22:00)
  // terjadi seketika, bukan menunggu jaring pengaman poll berikutnya.
  scheduleNextAutoShopCheck();
  renderInfoCardStatus();

  // Foto/video kustom LATAR BELAKANG (jika kasir pernah mengganti dari coklat bawaan)
  if (savedHeroMediaType) heroMediaType = savedHeroMediaType;
  if (savedHeroMediaData) heroMediaData = savedHeroMediaData;

  // Ukuran & posisi kustom latar belakang (jika pernah diubah dari bawaan)
  if (savedHeroMediaStyle) {
    try { heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM, ...JSON.parse(savedHeroMediaStyle) }; } catch (e) { heroMediaStyle = { ...DEFAULT_HERO_TRANSFORM }; }
  }
  renderHeroMedia();
  syncHeroTransformInputsUI();

  // Foto/video kustom IKON CANGKIR (terpisah dari latar belakang) & status
  // tampil/sembunyinya (jika kasir pernah mengganti dari bawaan)
  if (savedHeroIconType) heroIconType = savedHeroIconType;
  if (savedHeroIconData) heroIconData = savedHeroIconData;
  if (savedHeroIconVisible !== null && savedHeroIconVisible !== undefined && savedHeroIconVisible !== '') {
    heroIconVisible = savedHeroIconVisible === '1';
  }
  renderHeroIcon();

  // Tulisan/font/ukuran nama toko kustom (jika kasir pernah mengganti dari bawaan)
  if (savedBrandStyle) {
    try { brandStyle = { ...DEFAULT_BRAND, ...JSON.parse(savedBrandStyle) }; } catch (e) { brandStyle = { ...DEFAULT_BRAND }; }
  }
  applyBrandStyle();
  syncBrandInputsUI();

  // Warna website kustom (jika kasir pernah mengganti dari warna bawaan)
  if (savedThemeColors) {
    try { themeColors = { ...DEFAULT_THEME, ...JSON.parse(savedThemeColors) }; } catch (e) { themeColors = { ...DEFAULT_THEME }; }
  }
  applyThemeColors(themeColors);
  syncThemeInputsUI(themeColors);

  renderTabs();
  renderMenu();
  renderTableChip();
  renderCartBar();
  setupScrollSpy();
  renderKasirCatManage();
  populateAddMenuCategorySelect();

  // Muat data tersimpan (keranjang, data pelanggan, nomor meja, riwayat pesanan) jika ada
  const savedCart = await storageGet('cart');
  if (savedCart) {
    try { cart = JSON.parse(savedCart); } catch (e) { cart = []; }
  }
  const savedCustomer = await storageGet('customer');
  if (savedCustomer) {
    try {
      const u = JSON.parse(savedCustomer);
      $('#inputName').value = u.name || '';
      $('#inputPhone').value = u.phone || '';
      $('#inputEmail').value = u.email || '';
    } catch (e) { }
  }
  const savedTable = await storageGet('tableNumber');
  if (savedTable) tableNumber = savedTable;

  const savedHistory = await storageGet('orderHistory');
  if (savedHistory) {
    try { orderHistory = JSON.parse(savedHistory); } catch (e) { orderHistory = []; }
  }

  await loadCashExpenses();

  const savedGoogle = await storageGet('googleAccount');
  if (savedGoogle) {
    try { googleAccount = JSON.parse(savedGoogle); } catch (e) { googleAccount = null; }
  }

  const savedAvatar = await storageGet('userAvatar');
  if (savedAvatar) userAvatar = savedAvatar;

  const savedRole = await storageGet('userRole');
  if (savedRole === 'kasir' || savedRole === 'pembeli') userRole = savedRole;

  // Kalau Firebase aktif, JANGAN timpa dengan data localStorage di sini — listener
  // fbOrdersRef.on('value', ...) (dipasang lebih awal, lihat atas) yang akan mengisi
  // `orders` dengan data TERBARU & LENGKAP dari server begitu koneksi tersambung
  // (termasuk pesanan yang dibuat dari perangkat lain). Menimpanya dengan data lokal
  // di sini berisiko malah mengganti data terbaru dengan data lama milik perangkat ini
  // saja. Kalau Firebase TIDAK aktif (offline/gagal), baru pakai data lokal seperti biasa.
  if (!fbReady) {
    const savedOrders = await storageGet('orders');
    if (savedOrders) {
      try { orders = JSON.parse(savedOrders); } catch (e) { orders = []; }
    }
  } else {
    // Tunggu SATU kali ambilan data awal dari Firebase supaya `orders` sudah
    // terisi lengkap SEBELUM pengecekan pendingOrderId di bawah (penting supaya
    // QR "menunggu dikonfirmasi" milik pembeli tidak salah dianggap hilang cuma
    // karena data dari server belum sempat datang). Listener .on('value', ...)
    // di atas tetap jalan terus setelah ini untuk update berikutnya secara real-time.
    try {
      const firstSnap = await fbOrdersRef.once('value');
      applyOrdersFromFirebase(firstSnap.val());
    } catch (e) { console.error('Gagal mengambil data pesanan awal dari Firebase, pakai data lokal dulu:', e); }
  }
  updateAwaitingScanBadge();

  const savedQueueCounter = await storageGet('queueCounter');
  const savedQueueDate = await storageGet('queueDate');
  const today = todayDateKey();
  if (savedQueueDate === today && savedQueueCounter) {
    queueDate = savedQueueDate;
    queueCounter = parseInt(savedQueueCounter, 10) || 0;
  } else {
    // Hari sudah berganti (atau belum pernah ada pesanan) → mulai dari nomor 1
    queueDate = today;
    queueCounter = 0;
  }

  const savedLang = await storageGet('lang');
  if (savedLang && savedLang !== 'id') {
    await applyLanguage(savedLang);
  }

  renderTableChip();
  renderCartBar();

  // Catatan status pesanan yang masih menunggu (belum discan/diverifikasi kasir)
  // TETAP dilacak di latar belakang (dipakai tautan "Ada QR yang belum
  // selesai?" & auto-update saat kasir mengonfirmasi), TAPI halaman yang
  // tampil saat web dibuka/dimuat ulang SELALU halaman menu biasa — QR/halaman
  // menunggu TIDAK lagi otomatis muncul sendiri seperti sebelumnya.
  try {
    const pendingId = await storageGet('pendingOrderId');
    if (pendingId) {
      const pendingOrder = orders.find(o => o.id === pendingId);
      if (pendingOrder && (pendingOrder.status === 'awaiting_scan' || pendingOrder.status === 'awaiting_payment_verification')) {
        currentQueueNo = pendingOrder.queueNo;
        currentSuccessOrderId = pendingOrder.id;
      } else {
        // Pesanan sudah dikonfirmasi/selesai (atau sudah tidak ada) — bersihkan penanda lama
        storageSet('pendingOrderId', '');
      }
    }
  } catch (e) { }
}
init();

// ===== Cookie Consent: fungsi cookie asli (document.cookie) =====
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
function hideCookieBanner() {
  const el = document.getElementById('cookieBanner');
  if (el) el.classList.add('hidden');
}
function toggleCookieSettings() {
  document.getElementById('cookieSettingsPanel').classList.toggle('open');
}
function acceptAllCookies() {
  setCookie('essential_cookie', 'true', 365);
  setCookie('analytics_cookie', 'true', 365);
  setCookie('marketing_cookie', 'true', 365);
  hideCookieBanner();
}
function rejectOptionalCookies() {
  setCookie('essential_cookie', 'true', 365);
  setCookie('analytics_cookie', 'false', 365);
  setCookie('marketing_cookie', 'false', 365);
  hideCookieBanner();
}
function saveCookieSettings() {
  const analytics = document.getElementById('cookieAnalytics').checked;
  const marketing = document.getElementById('cookieMarketing').checked;
  setCookie('essential_cookie', 'true', 365);
  setCookie('analytics_cookie', analytics, 365);
  setCookie('marketing_cookie', marketing, 365);
  hideCookieBanner();
}
// Kalau user sudah pernah memilih sebelumnya, banner tidak muncul lagi
if (getCookie('essential_cookie')) {
  window.addEventListener('DOMContentLoaded', hideCookieBanner);
}
