/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez
Coleccion para el codigo de las enfermedades

Creado: 11 de julio del 2018
*/
'use strict'

/*  */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de usuario, Administrador, Psicologo(a), Estudiante.

var Cie10Schema = Schema({
	codigo: String,
	descripcion: String,
	sexo: String,
	liminferior: String,
	limSuperior: String

});

module.exports = mongoose.model('Cie10', Cie10Schema);