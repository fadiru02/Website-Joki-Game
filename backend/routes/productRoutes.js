const express = require('express');
const router = express.Router();

// Import masing-masing controller
const userProduct = require('../controllers/user/productController');
const adminProduct = require('../controllers/admin/productController');

// --- PUBLIC ROUTES (USER) ---
router.get('/katalog', userProduct.getKatalog);
router.get('/katalog/:slug', userProduct.getDetailBySlug);

// --- ADMIN ROUTES (CRUD) ---
router.get('/admin/list', adminProduct.getAdminTable);
router.post('/admin/add', adminProduct.createProduct);
router.put('/admin/update/:id', adminProduct.updateProduct);
router.delete('/admin/delete/:id', adminProduct.deleteProduct);

module.exports = router;