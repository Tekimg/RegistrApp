import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  username: string='' ;
  password: string='' ;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService
  ) { }

  ngOnInit(){
   
      this.username = '';
      this.password = '';  
  }

  validateLogin() {
    if (
      this.loginService.validateLogin(this.username, this.password)
    ) {
      this.msgToast('Login correcto','success')
        let extras: NavigationExtras = {
          state: { user: this.username }
        }
        this.router.navigate(['/home'], extras);
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
