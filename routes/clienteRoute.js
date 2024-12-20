const express= require('express');
const router= express.Router();

const controller = require('../controllers/cliente');

router.get('/usuarios', controller.getAllClientes)
router.post('/guardar', controller.createCliente)
router.put('/modificar-cliente/:id', controller.updateCliente)
router.delete('/eliminar/:id', controller.deleteCliente)

module.exports =router;