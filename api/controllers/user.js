/*

Descripción: Proyecto de Media Tecnica para el area de psicologia de la I.E Jesus Rey. Especialmente para atenderlas consultas de TDAH. 
Autores: Santiago Morales, Víctor Saúl Quiróz.
Fecha de inicio: 1 de abril del 2018
Fecha de culminación: -
Asesorias: Lina Rodriguez, Eder Lara T., Gilma Alvarez

Creado: 11 de julio del 2018
*/
'use strict'
// Añadimos el metodo para encriptar las contraseñas
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

/* fs que es la libreria de node que nos permite trabajar con archivos
y path que nos permite trabajar con rutas del sistema de ficheros */
var fs = require('fs');
var path = require('path');

// La primera letra va en mayusculas para indicar que esto es un modelo
var User = require('../models/user');
var jwt = require('../services/jwt');

// Métodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Método del api que nos permitira registrar nuevos usuarios
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if(params.nombres && params.apellidos && params.nick && params.correo && params.contrasena){

		user.nombres = params.nombres;
		user.apellidos = params.apellidos;
		user.nick = params.nick;
		user.correo = params.correo;
		user.role = 'ROLE_USER';
		user.image = null;

		// Control de usuarios duplicados
		User.find({$or: [
			{correo: user.correo.toLowerCase()},
			{nick: user.nick.toLowerCase()}
		]}).exec((err, users) => {
			if(err) return res.status(500).send({
					message: 'Error en la petición de usuarios'
			});

			if(users && users.length >= 1){
				return res.status(200).send({
					message: 'El usuario que deseas crear ya existe'
				});
			}else{
				// Metodo encriptación de contraseñas
				bcrypt.hash(params.contrasena, null, null, (err, hash) => {
					user.contrasena = hash;

					user.save ((err, userStored) => {
						if(err) return res.status(500).send({
							message: 'Error al guardar el usuario'
						});

						if(userStored){
							res.status(200).send({
								user: userStored
							});
						}else{
							res.status(404).send({
								message: 'No se ha registrado el usuario'
							});
						}	
					});
				});
			}
		});

	}else{
		res.status(200).send({
			message: 'Debes llenar todos los campos'
		});
	}
}

// Método de inicio de sesión
function loginUser(req, res){
	var params = req.body;

	var correo = params.correo;
	var contrasena = params.contrasena;

	User.findOne({correo: correo}, (err, user) => {

			if(err) return res.status(500).send({
				message: 'Error en la petición'
			});

			if(user){
				bcrypt.compare(contrasena, user.contrasena, (err, check) => {
					if(check){

						if(params.gettoken){
							// Generar y devolver un token
							return res.status(200).send({
								token: jwt.createToken(user)
							}); 
						}else{
							// Devolver datos del usuario
							user.contraseña = undefined;
							return res.status(200).send({user});
						}
						
					}else{
						if(err) return res.status(404).send({
							message: 'El usuario no ha podido iniciar sesión'
						});
					}
				});
			}else{
				if(err) return res.status(404).send({
					message: 'El usuario no ha podido iniciar sesión!'
				});
			}
		});
}

// Método para conseguir datos de un usuario
function getUser(req, res){
	/* Cuando nos llegan datos por la url utilizamos params,
	cuando nos llegan datos por post o por put utilizamos body */
	var userId = req.params.id;

	User.findById(userId, (err, user) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!user) return res.status(404).send({
			message: 'El usuario no existe'
		});	

		return res.status(200).send({user});	
	});
}

// Método para traer a todos los estudiantes sin importar para poder hacer las consultas:
function getEstudiantes(req, res){

	User.find((err, estudiantes) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!estudiantes) return res.status(404).send({
			message: 'No hay Estudiantes Guardados en la Base de Datos'
		});

		return res.status(200).send({
			Estudiantes: estudiantes
		});
	});
}

// Método listado de usuarios paginado
function getUsers(req, res){
	var identity_user_id = req.user.sub;

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

// Método edición de datos de usuario
function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	// Borrar la propiedad password
	delete update.contrasena;

	if(userId != req.user.sub){
		return res.status(500).send({
			message: 'No tienes permiso para actualizar los datos del usuario'
		});
	}

	User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
		if(err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if(!userUpdated) return res.status(404).send({
			message: 'No se ha podido actualizarel usuario'
		});

		return res.status(200).send({user: userUpdated});	
	});
}

// Método para subir archivos de imagen/avatar de usuario
function uploadImage(req, res){
	var userId = req.params.id;

	if(req.files){
		var file_path = req.files.image.path;
		console.log(file_path);

		var file_split = file_path.split('\\'); 
		console.log(file_split);

		var file_name = file_split[2];
		console.log(file_name);

		var ext_split = file_name.split('\.');
		console.log(ext_split);

		var file_ext = ext_split[1];
		console.log(file_ext);	

		if(userId != req.user.sub){
			return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos de usuario');
		}

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
			//Actualizar documento de usuario logueado
			User.findByIdAndUpdate(userId, {image: file_name}, {new:true},
				(err, userUpdated) => {
					if(err) return res.status(500).send({
						message: 'Error en la petición'
					});

					if(!userUpdated) return res.status(404).send({
						message: 'No se ha podido actualizarel usuario'
					});

					return res.status(200).send({user: userUpdated});
				});
		}else{
			return removeFilesOfUploads(res, file_path, 'Extensión no valida');
		}
	}else{
		return res.status(200).send({
			message: 'No se han subido archivos'
		});
	}
}

function removeFilesOfUploads(res, file_path, message){
	fs.unlink(file_path, (err) => {
		return res.status(200).send({message: message});
	});
}

function getImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/users/'+image_file;

	fs.exist(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({
				message: 'No existe la imagen'
			});
		}
	});
}

module.exports = {
	home,
	pruebas,
	saveUser,
	loginUser,
	getUser,
	getEstudiantes,
	getUsers,
	updateUser,
	uploadImage,
	getImageFile
}
