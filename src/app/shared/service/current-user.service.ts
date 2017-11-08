import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseAuthService } from './firebase-auth.service';
// import { UserService } from 'app/shared/service/user.service';
import { Observable } from 'rxjs/Observable';
//import { IUser, User } from 'model/user';
import { UserService } from './user.service';
import { IUser } from '../class/user';
import { FirebaseAuthService } from './firebase-auth.service';
import { HouseService } from './house.service';
import { AppService } from './app.service';

@Injectable()
export class CurrentUserService  {

  $key: string;
  name: string;
  email: string;

  constructor(
    private appService: AppService,
    private houseService: HouseService,
    private userService: UserService,
    private authService: FirebaseAuthService) {

    this.authService.currentUserObservable.subscribe(u => {
      if (u == null) {
        console.log("logged out from current user")
        this.$key = '';
        this.name = 'logged out';
        this.email = 'logged out email';
      }
      else {
        // this.houseService.get(u.uid).subscribe(h => {
        //   this.name = h.email;
        // });
      }
    });

    // this.appService.user.
  }
}
