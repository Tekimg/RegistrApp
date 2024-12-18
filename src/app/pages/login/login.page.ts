import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandler } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credenciales: { email: string, pass: string } = { email: '', pass: '' };
  user: User;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private auth: AuthService,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    // Este método solo se ejecuta una vez cuando se carga el componente.
    // No sirve para limpiar los campos al regresar de otras páginas
  }

  ionViewWillEnter() {
    // Limpia las credenciales y los datos en el localStorage cada vez que la vista se muestra
    console.log('Página de login recargada');
    this.resetCredentials();
  }

  resetCredentials() {
    // Restablece las credenciales a un objeto vacío
    this.credenciales = { email: '', pass: '' }; // Limpia los campos de entrada
    localStorage.removeItem('credenciales');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  async login() {
    try {
      if (!this.credenciales.email || !this.credenciales.pass) {
        this.msgToast('Por favor ingresa todos los campos', 'tertiary');
        return;
      }

      await this.auth.loginAuth(this.credenciales.email, this.credenciales.pass);

      console.log('Usuario autenticado:', this.credenciales);

      // Guardar el token y las credenciales en el localStorage
      localStorage.setItem('token', 'token-auth');
      localStorage.setItem('credenciales', JSON.stringify(this.credenciales));
      localStorage.setItem('user', JSON.stringify(this.user));

      console.log(this.credenciales);
      console.log(this.user);

      this.router.navigate(['/home']);
      this.msgToast('Bienvenido', 'success');

    } catch (error) {
      if (ErrorHandler.name === 'auth/invalid-credential') {
        this.msgToast('Credenciales inválidas', 'danger');
      } else if (ErrorHandler.name === 'auth/user-not-found') {
        this.msgToast('Usuario no encontrado', 'danger');
      } else {
        this.msgToast('Error al autenticar', 'danger');
        console.log(error);
      }
    }
  }

  async msgToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}
