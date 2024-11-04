import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { __await } from 'tslib';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage {
  constructor(private loginService: LoginService) {}

 userData?: User;
isUserDataLoaded = false; // Nueva propiedad

ngOnInit() {
  this.obtenerDatosUsuario();
}

obtenerDatosUsuario() {
  const user = this.loginService.validaUser('Pedrito');
  if (user) {
    this.userData = user;
    this.isUserDataLoaded = true; // Cambia a true una vez que los datos están listos
  } else {
    console.log('Usuario no encontrado');
  }
}
}
