/**
 * ===============================
 * استدعاء Express Router
 * ===============================
 * Router يسمح بفصل المسارات عن app.js
 */
const express = require("express");
const router = express.Router();

/**
 * دالة لتعيين APP_URL من app.js
 */
let APP_URL = "";
router.setAppUrl = (url) => {
  APP_URL = url;
};

/**
 * ===============================
 * استدعاء الدوال من الـ Controller
 * ===============================
 * جميع المنطق والعمليات يتم تنفيذها في الـ controller
 */
const { storeUser } = require("../controllers/user.controller");

/**
 * ===============================
 * تعريف مسار POST
 * ===============================
 * عند إرسال بيانات الفورم على /post-username
 * سيتم تنفيذ الدالة storeUser لحفظ المستخدم في قاعدة البيانات
 */
router.post("/post-username", (req, res) => storeUser(req, res, APP_URL));

/**
 * ===============================
 * تصدير الـ Router
 * ===============================
 * لكي يتم استخدامه في app.js
 */
module.exports = router;
