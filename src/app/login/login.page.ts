import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username!: string ;
  password!: string ;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  login() {
    if (this.username && this.password) {
      this.msgToast('Login correcto','success')
      this.router.navigate(['/home'], { state: { username: this.username } }).then(() => {
        this.username = '';
        this.password = '';
      })
    } else {
      this.msgToast('Login fallido','danger');
    }
  }

  async msgToast(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}
