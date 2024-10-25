import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUser();
  }

 getUser(){
    this.apiService.getUsers().subscribe(
    (data) => {
      this.users = data;  // Asignar los datos recibidos a la variable users
      console.log(this.users);  // Imprimir los datos en la consola
    },
    (error) => {
      console.error('Error al obtener los usuarios', error);  // Manejo de errores
    })
  }

}
