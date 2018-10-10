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

var ConsultaSchema = Schema({
	estudiante: { type: Schema.ObjectId, ref: 'user' },
	psicologo: { type: Schema.ObjectId, ref: 'user' }, // es el mismo emitido por y persona atiende;
	diagnostico: String,
	fecharevisa: Date,
	recomendaciones: String,
	observaciones: String,
	promovido: String,
	continuidad: String
});

module.exports = mongoose.model('Consulta', ConsultaSchema);