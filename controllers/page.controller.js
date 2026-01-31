/**
 * ===============================
 * استدعاء الموديل
 * ===============================
 * استدعاء موديل User للتعامل مع قاعدة البيانات
 */
const User = require("../models/userSchema");

/**
 * ===============================
 * الصفحة الرئيسية
 * ===============================
 * تقوم بعرض صفحة home.ejs عند الدخول إلى "/"
 */
exports.homePage = (req, res, appUrl) => {
  res.render("home.ejs", {
    appUrl, // إرسال appUrl للقالب
  });
};

/**
 * ===============================
 * صفحة الفورم
 * ===============================
 * تقوم بجلب جميع المستخدمين من قاعدة البيانات
 * ثم تمريرهم إلى قالب form.ejs للعرض
 */
exports.formPage = async (req, res, appUrl) => {
  try {
    // جلب جميع المستخدمين
    const users = await User.find();

    // عرض الصفحة مع تمرير البيانات
    res.render("form.ejs", {
      users,
      appUrl, // إرسال appUrl للقالب
    });
  } catch (error) {
    // طباعة أي خطأ في الكونسول
    console.error(error);
  }
};

exports.usersPage = async (req, res, appUrl) => {
  try {
    // جلب جميع المستخدمين
    const users = await User.find();

    // عرض الصفحة مع تمرير البيانات
    res.render("users.ejs", {
      users,
      appUrl, // إرسال appUrl للقالب
    });
  } catch (error) {
    // طباعة أي خطأ في الكونسول
    console.error(error);
  }
};
