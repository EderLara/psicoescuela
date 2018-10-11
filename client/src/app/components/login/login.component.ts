import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
  
}) 
export class LoginComponent implements OnInit {
	public title:string;
	public ualx:string;
	public user:User;
	public status:string;
	public identity;
	public token;
	public barra: boolean;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Acceso de administrador';
		this.ualx = 'Solo autorizado para administradores.';
		this.user = new User("","","","","","","","","","","","");
		this.barra = false;	
	}

	ngOnInit(){
	console.log('Componente de login listo');
	console.log(this.status);
	}

	onSubmit(){
		// Loguear al usuario obtener sus datos
		this._userService.signup(this.user).subscribe(
			response => {
				this.identity = response;
				console.log(this.identity);
				
				if(this.identity){
					
					this.status = 'success';
					// Persistir datos del usuario
					localStorage.setItem('identity', JSON.stringify(this.identity));

					// Conseguir token
					this.getToken();

				}else{
					this.status = 'error';
				}
				
			},
			error => {
				var errorMsg =<any>error;
				console.log(errorMsg);

				if (errorMsg != null) {
					// Si no existe ningun error asignar valores de éxito:
					this.status = 'error';
				}
			}
		);
	}

	getToken(){
		this._userService.signup(this.user, 'true').subscribe(
			response => {
				this.token = response.token;
				console.log(this.token);

				if(this.token.length <= 0) {
					this.status = 'error';
				}else{
					this.status = 'success';
					// Persistir token del usuario
					localStorage.setItem('token', this.token);

					// Conseguir contadores o estadisticas del usuario
					/*
					this.getCounters();
					*/
					this._router.navigate(['/']);
				}
				
			},
			error => { 
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}

	/*
	getCounters() {
		this._userService.getCounters().suscribe(
			response => {
				console.log(response);
				this._router.navigate(['/']);
			},
			error => {
				console.log(<any>error);
			}
		)
	}
	*/
}	
