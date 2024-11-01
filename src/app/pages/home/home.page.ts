import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    username!: string;
    password!: string;
  
    constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
    
    }

   

    ngOnInit(){
      this.username = localStorage.getItem('username') || 'Invitado'; 
    }
    logout(){
           
      localStorage.removeItem('username');
      this.router.navigate(['/login']);

    }
  }
