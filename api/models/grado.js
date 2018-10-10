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

var GradoSchema = Schema ({
	idgrado: String,
	nomgrado: String,
	jornada: String,
	cantestudiantes: Number
});

module.exports = mongoose.model('Grado', GradoSchema); 
