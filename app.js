/**
 * ===============================
 * تحميل متغيرات البيئة
 * ===============================
 * يقوم بتحميل المتغيرات من ملف .env إلى process.env
 */
require("dotenv").config();

/**
 * ===============================
 * الاستدعاءات الأساسية
 * ===============================
 */
const express = require("express");
const path = require("path");

/**
 * ===============================
 * إعدادات التطبيق
 * ===============================
 * - الاتصال بقاعدة البيانات
 * - تشغيل Livereload للتطوير
 */
const { connectDB } = require("./config/database");
const initLiveReload = require("./config/livereload");

/**
 * ===============================
 * إنشاء تطبيق Express
 * ===============================
 */
const app = express();

/**
 * ===============================
 * الميدل ويرز (Middlewares)
 * ===============================
 */

/**
 * تحليل بيانات النماذج (Forms)
 * يمكن الوصول لبيانات الفورم عبر req.body
 */
app.use(express.urlencoded({ extended: true }));

/**
 * تقديم الملفات الثابتة (CSS, JS, صور)
 * الملفات موجودة في مجلد /public
 */
app.use(express.static("public"));

/**
 * ضبط محرك القوالب ليكون EJS
 */
app.set("view engine", "ejs");

/**
 * ===============================
 * تحديث تلقائي للصفحة (Auto Reload)
 * ===============================
 * يقوم بتحديث الصفحة تلقائيًا عند تغيير الملفات أثناء التطوير
 * يتم تعطيله في بيئة الإنتاج
 */
if (process.env.NODE_ENV !== "production") {
  initLiveReload(app);
}

/**
 * ===============================
 * تعريف المسارات (Routes)
 * ===============================
 * يتم تنظيم المسارات في ملفات منفصلة لسهولة الصيانة
 */
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");

/**
 * ===============================
 * تشغيل السيرفر
 * ===============================
 * يبدأ السيرفر فقط بعد الاتصال الناجح بقاعدة البيانات
 */
const PORT = process.env.APP_PORT || 3000;
const URL = process.env.APP_URL || "localhost";

// Send AppURl to the pages
indexRoutes.setAppUrl(`http://${URL}:${PORT}`);
userRoutes.setAppUrl(`http://${URL}:${PORT}`);

// استخدام الروترات
app.use("/", indexRoutes);
app.use("/", userRoutes);

app.use((req, res, next) => {
  res.locals.appUrl = `http://${URL}:${PORT}`; // <%= appUrl %> في القوالب
  next();
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at: http://${URL}:${PORT}`);
  });
});
