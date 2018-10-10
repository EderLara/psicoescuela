/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'

var express = require('express');
var UserController = require('../controllers/user');

/* Cargamos el Router de express para tener acceso a los 
metodos get, post, put, delete, etc */
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({
	uploadDir: './uploads/users'
});

// Metodos de prueba
api.get('/home', UserController.home); 
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);

api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/estudiantes', UserController.getEstudiantes);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);

module.exports = api;