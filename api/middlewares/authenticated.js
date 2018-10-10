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

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({
			message: 'La petición no tiene la cabecera de autentificación'
		});
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				message: 'El token ha expirado'
			});
		}
	}catch(ex){
		return res.status(404).send({
				message: 'El token no es válido'
			});
	}

	req.user = payload;

	next
}