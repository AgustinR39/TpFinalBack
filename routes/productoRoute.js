const express= require('express');
const router= express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/producto');


const dikstorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
   
    filename: (req, file, cb) => {
        cb(null, Date.now() + 'productoPat' + file.originalname); 
    }
});

const fileUpload = multer({ storage: dikstorage }).single('fotoProducto');

router.get('/el-producto', controller.getAllProductos)
router.post('/guardar', fileUpload, controller.createProducto)
router.put('/modificar-producto/:id',fileUpload, controller.updateProducto)
router.delete('/eliminar/:id', controller.deleteProducto)

module.exports =router;