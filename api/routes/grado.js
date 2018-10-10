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
var GradoController = require('../controllers/grado');

/* Cargamos el Router de express para tener acceso a los 
metodos get, post, put, delete, etc */
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

// Metodos de prueba
api.get('/grados', GradoController.casa);
api.get('/grados/prueba', GradoController.prueb);

// Metodos
api.post('/grados/guardar', GradoController.saveGrado);
api.get('/grados/get-grado/:id', GradoController.getGrado);
// api.get('/grados/get-grados/:id', GradoController.getGrados);
// api.put('/grados/update-grado/:id', GradoController.updateGrado);

module.exports = api;
