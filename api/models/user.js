/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'

/*  */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de usuario, Administrador, Psicologo(a), Estudiante.

var UserSchema = Schema({
	tipodocu: String, // Tipo de Documento
	iduser: String,
	nombres: String,
	apellidos: String,
	fenace: Date,
	genero: String,
	etnia: String,		// Y estos por qué no los tenia en cuenta?
	nick: String,		// El nick no se si dejarlo
	correo: String,
	contrasena: String,
	perfil: String, //Cambie ese role tan maluco
	image: String
});

module.exports = mongoose.model('User', UserSchema);

