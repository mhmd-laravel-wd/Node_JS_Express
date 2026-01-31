/**
 * ===============================
 * استدعاء مكتبة Mongoose
 * ===============================
 * Mongoose لتسهيل التعامل مع MongoDB
 */
const mongoose = require("mongoose");

/**
 * ===============================
 * تحميل متغيرات البيئة
 * ===============================
 * لتحميل القيم من ملف .env
 */
require("dotenv").config();

/**
 * ===============================
 * جلب بيانات الاتصال من متغيرات البيئة
 * ===============================
 */
const {
  DB_USERNAME, // اسم المستخدم لقاعدة البيانات
  DB_PASSWORD, // كلمة المرور لقاعدة البيانات
  DB_NAME      // اسم قاعدة البيانات
} = process.env;

/**
 * ===============================
 * إنشاء رابط الاتصال بقاعدة البيانات
 * ===============================
 */
const mongoURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ygya0jz.mongodb.net/${DB_NAME}?appName=Cluster0`;

/**
 * ===============================
 * دالة الاتصال بقاعدة البيانات
 * ===============================
 */
const connectDB = async () => {
  try {
    // محاولة الاتصال بالـ MongoDB
    await mongoose.connect(mongoURL);

    // إذا تم الاتصال بنجاح
    console.log("MongoDB connected successfully!");
  } catch (error) {
    // إذا حدث خطأ أثناء الاتصال
    console.error("MongoDB connection error:", error);

    // إيقاف السيرفر عند فشل الاتصال
    process.exit(1);
  }
};

/**
 * ===============================
 * تصدير الدالة والموديل Mongoose
 * ===============================
 * لكي يتم استخدامها في الملفات الأخرى مثل app.js
 */
module.exports = {
  connectDB,
  mongoose
};
