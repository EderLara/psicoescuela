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
var Schema = mongoose.Schema;

var GrupoSchema = Schema ({
	idgrado: { type: Schema.ObjectId, ref: 'grado' },
	nombgrupo: String,
	periodolectivo: Number, // Año en curso, para poder registrar datos de este grado.
	estudiantes: [{type: Schema.ObjectId, ref: 'user' }] 
});

module.exports = mongoose.model('Grupo', GrupoSchema); 
