import { Component, OnInit } from '@angular/core';
// Importar modulos y librerias que tienen que ver con el router
import { Router, ActivatedRoute, Params } from '@angular/router';
// Importar el modelo de usuario
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
}) 
export class RegisterComponent implements OnInit {
	public title:string;
	public aska:string;
	public user: User;
	public status: string;

	constructor(
		// Configurar propiedades del router
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
	this.title = 'Creación de una cuenta';
	this.aska = 'Es necesario crear una cuenta para acceder a la información';
	this.user = new User("","","","","","","","","","","","");
	}
	// Metodos
	ngOnInit(){
	console.log('Componente de register listo');
	}

	onSubmit(form){
		this._userService.register(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					// console.log(response.user);

					this.status = 'success';
					form.reset();
				}else{
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}	