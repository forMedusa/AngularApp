import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core' 
import { CookieService } from 'ngx-cookie-service';
export const authGuard: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let cookies = inject(CookieService);
    let authenticatedUser = cookies.get('id');
    if(authenticatedUser){
      return true;
    }else{
      alert("You are not a valid user");
      router.navigateByUrl('users')
      return false;
    }
};
