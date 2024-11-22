import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  alertButtons: any = [];


  constructor(private firebaseService: FirebaseService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadUsers();

    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelado');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Ok presionado');
        }
      }
    ];
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
