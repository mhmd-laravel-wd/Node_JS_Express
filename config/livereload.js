/**
 * ===============================
 * استدعاء المكتبات
 * ===============================
 */
const path = require("path"); // التعامل مع المسارات
const livereload = require("livereload"); // لإنشاء سيرفر Livereload
const connectLivereload = require("connect-livereload"); // لربط Livereload مع Express

/**
 * ===============================
 * دالة تهيئة Livereload
 * @param {import('express').Application} app - تطبيق Express
 * ===============================
 */
module.exports = function initLiveReload(app) {

  /**
   * إنشاء سيرفر Livereload جديد
   */
  const liveReloadServer = livereload.createServer();

  /**
   * تحديد المجلدات التي سيتم مراقبتها
   * أي تغييرات في هذه المجلدات ستؤدي إلى تحديث الصفحة تلقائيًا
   */
  liveReloadServer.watch([
    path.join(__dirname, "../public"), // ملفات CSS، JS، صور
    path.join(__dirname, "../views"),  // ملفات القوالب EJS
  ]);

  /**
   * ربط Livereload مع Express
   * لإضافة سكريبت التحديث التلقائي إلى الصفحات
   */
  app.use(connectLivereload());

  /**
   * عند الاتصال بالسيرفر لأول مرة
   * نحدث الصفحة بعد 100ms لضمان تحميل كل الملفات
   */
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
};
