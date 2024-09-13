import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
const router = new Router();
const isLoggedIn = !!localStorage.getItem('token')

if(!isLoggedIn) {
  router.navigate(['/login']);
  return false;
}
  return true;
  
};