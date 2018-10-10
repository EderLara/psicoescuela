/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var port = 3800;

// Conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TDAH', {useNewUrlParser: true})
	.then(() => {
		console.log("La conexión a la base de datos TDAH se ha realizado correctamente");
	
		// Crear servidor
		app.listen(port, () => {
			console.log("Servidor corriendo en http://localhost:3800");
		});
	})
	.catch(err => console.log(err));