import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;  

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar usuarios 
  loadUsers() {
    this.firebaseService.getCollectionChanges<User>('Users').subscribe(data => {
      if (data) {
        this.users = data; 
        console.log('Usuarios cargados desde Firebase:', this.users);

        // Recuperar el email d
        const storedEmail = localStorage.getItem('credenciales');
        
        if (storedEmail) {
          const credenciales = JSON.parse(storedEmail);
          const email = credenciales.email;

          this.filterUserByEmail(email);
        }
      }
    });
  }

  // Función para filtrar
  filterUserByEmail(email: string) {
    const user = this.users.find(u => u.email === email);
    
    if (user) {
      this.currentUser = user;
      console.log('Usuario filtrado:', this.currentUser);
    }
  }
}
