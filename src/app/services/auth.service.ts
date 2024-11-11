import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  constructor(
    
    private auth: Auth,
    private router:Router
  
  ) { }

  async loginAuth(email: string, pass: string){
    return signInWithEmailAndPassword(this.auth, email, pass)
  }
  logout(){
    this.auth.signOut();
    
    
  }
  register(newUser:User){
    return createUserWithEmailAndPassword(this.auth, newUser.email,newUser.pass)
  }
  getId(){
    const user= this.auth.currentUser
   
  }
  getUser(): Observable<any> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next(user);  // Emitir el usuario autenticado
        } else {
          observer.next(null);  // Emitir null si no está autenticado
        }
      });
    });
  }
  
}
