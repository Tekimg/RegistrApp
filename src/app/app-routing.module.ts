import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [


  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[authGuard]
  },
  { 
    path: 'escaneo-qr',
    loadChildren: () => import('./pages/escaneo-qr/escaneo-qr.module').then( m => m.EscaneoQrPageModule),
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'recover-pass',
    loadChildren: () => import('./pages/recover-pass/recover-pass.module').then( m => m.RecoverPassPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },

  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserProfilePageModule)
  },




  //redirigir paginas no encontradas - final del codigo
  {
    path: 'notfoundpage',
    loadChildren: () => import('./pages/notfoundpage/notfoundpage.module').then( m => m.NotfoundpagePageModule)
  },
  {
    path:'**', 
    redirectTo:'notfoundpage'
  },

    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
