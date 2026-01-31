/**
 * ===============================
 * استدعاء Express Router
 * ===============================
 * يسمح بفصل تعريف المسارات عن app.js
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
 * جميع العمليات والمنطق يتم تنفيذها في الـ controller
 */
const {
  homePage,
  formPage,
  usersPage,
} = require("../controllers/page.controller");

/**
 * ===============================
 * تعريف مسار
 */
router.get("/", (req, res) => homePage(req, res, APP_URL));
router.get("/form", (req, res) => formPage(req, res, APP_URL));
router.get("/users", (req, res) => usersPage(req, res, APP_URL));

/**
 * ===============================
 * تصدير الـ Router
 * لكي يتم استخدامه في app.js
 */
module.exports = router;
