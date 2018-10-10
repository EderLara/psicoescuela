/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'

// Conexion al modelo
var Grado = require('../models/grado');

/* fs que es la libreria de node que nos permite trabajar con archivos
y path que nos permite trabajar con rutas del sistema de ficheros */
var fs = require('fs');
var path = require('path');

// Métodos de prueba
function casa(req, res){
	res.status(200).send({
		message: 'Hola jesusrey desde el servidor de NodeJS'
	});
}

function prueb(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Metodo para guardar informacion de grado
function saveGrado(req, res) {
	var params = req.body;
	var grado = new Grado();

	if(params.idgrado && params.nomgrado && params.grupo && params.jornada && params.cantaprendices) {

    	grado.idgrado = params.idgrado;
		grado.nomgrado = params.nomgrado;
		grado.grupo = params.grupo;
		grado.jornada = params.jornada;
		grado.cantaprendices = params.cantaprendices;

	}else{
		res.status(200).send({
			message: 'Debes llenar todos los campos'
		});
	}
}

// Metodo para mostrar datos de el grado
function getGrado(req, res){
	/* Cuando nos llegan datos por la url utilizamos params,
	cuando nos llegan datos por post o por put utilizamos body */
	var gradoId = req.params.id;

	Grado.findById(gradoId, (err, grado) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!grado) return res.status(404).send({
			message: 'El usuario no existe'
		});	

		return res.status(200).send({grado});	
	});
} 

// Método para mostrat varios grados
function getGrados(req, res){
	var identity_grado_id = req.grado.sub;

	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 5;

	User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!users) return res.status(404).send({
			message: 'No hay usuarios disponibles'
		});

		return res.status(200).send({
			users,
			total,
			pages: Math.ceil(total/itemsPerPage)
		})	
	});
}
/*
// Metodo para modificar informacion del grado
function updateGrado(req, res) {
	var gradoId = req.params.id;
	var update =req.body;

	if(gradoId != res.grado.sub) {
		res.status(500).send({
			message: 'No tienes permiso para actualizar los datos de usuario'
		});
	}

	Grado.findByIdAndUpdate(gradoId, update, {new:true}, (err, gradoUpdated) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!gradoUpdated) return res.status(404).send({
			message: 'No se han podido actualizar los datos del grado'
		});

		return res.status(200).send({grado: gradoUpdated});	
	});

}
*/

module.exports = {
	casa,
	prueb,
	saveGrado,
	getGrado,
	getGrados
}

