import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//utilizacion de la clase de la api rest
interface User {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  cel: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl='http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  /*obtener usuarios
  getUsers(user:User): Observable<User> {
    return this.http.get<User>(this.apiUrl, user);
  }*/

  //crear usuarios
  createUsers(user:User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
