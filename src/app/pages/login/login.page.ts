import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';


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

  login():boolean {

    if(!this.username || !this.password){
      this.msgToast('Todos los campos son obligatorios','tertiary');
      return false;
    }


    if (
      this.loginService.validarLogin(this.username, this.password)
    ) {
        this.msgToast('Login correcto','success');
        
      
        localStorage.setItem('username',this.username);

        localStorage.setItem('token','some-auth-token');
        
        this.router.navigate(['/home']);
        this.username = '';
        this.password = ''; 
        return true;
    } else {
      this.msgToast('Login fallido','danger');
      return false;
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
