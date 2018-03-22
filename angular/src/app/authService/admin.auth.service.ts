import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()

export class AdminAuthService implements CanActivate{
     
    constructor(private router:Router){}
  
    canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if(localStorage.getItem('user')!==null){
            if(JSON.parse(localStorage.getItem('user')).username =='admin'){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        }else{
            this.router.navigate(['/login']);
                return false;
        }

    }

}