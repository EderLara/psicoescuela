/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clavesecreta';

exports.createToken = function(user){
	var payload = {
		sub: user.id,
		nombres: user.nombre,
		apellidos: user.apellidos,
		nick: user.nick,
		correo: user.correo,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};