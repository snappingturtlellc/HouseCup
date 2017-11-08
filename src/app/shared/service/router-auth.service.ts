import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FirebaseAuthService } from 'app/shared/service/firebase-auth.service';

@Injectable()
export class RouterAuthService implements CanActivate {

  constructor(private router: Router, private firebaseAuth: FirebaseAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("canActivate")
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string): boolean {
    console.log("verify login")
    if (this.firebaseAuth.authenticated)
      return true;

    this.router.navigate(['/signin']);
    return false;
  }  
}
