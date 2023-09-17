import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core' 
export const authGuard: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let authenticatedUser = localStorage.getItem('id');
    if(authenticatedUser){
      return true;
    }else{
      alert("You are not a valid user");
      router.navigateByUrl('users')
      return false;
    }
};
