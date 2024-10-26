import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('admin', '12345','admin@duoc.cl'),
    new User('Pedrito', '123','pedrope@gmail.com'),

  ];
  constructor() { }
  
  validarLogin(u: string, p: string): boolean {
    const found = this.users.find(user => user.username === u);
    if (found) {
      return found.password === p;
    }
    return false;
  }

  validaUser(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
 
  findUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
  }

  updateUserPass(username: string, newPassword: string): boolean {
    const user = this.findUserByUsername(username);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }
}
