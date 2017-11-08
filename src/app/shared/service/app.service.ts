import { Injectable } from '@angular/core';
import { IHouse, House } from '../class/house';
import { IUser, User } from '../class/user';
import { FirebaseAuthService } from './firebase-auth.service';
import { HouseService } from './house.service';
import { DataService } from './data.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  house: IHouse = null;
  user: IUser = null;

  houseName: string = "";
  userName: string = "";

  houseObservable = new Subject<IHouse>();
  userObservable = new Subject<IUser>();
  
  constructor(
    private authService: FirebaseAuthService,
    private houseService: HouseService,
    private dataService: DataService) {

    // Watch for authentication changes
    this.authService.currentUserObservable.subscribe(u => {
      if (u == null) {
        console.log("logged out from current user")
        this.house = new House({});
      }
      else {
        console.log("logged in " + u.uid)
        this.loadHouse(u.uid); 
      }
    })
  }

  async loadHouse(id: string) {
    this.house = await this.houseService.get(id);
    this.houseObservable.next(this.house);

    if (this.house != null) {
      this.user = await this.houseService.getCurrentUser(this.house);
      this.userObservable.next(this.user);

      this.houseName = this.house.name;
      this.userName = this.user.name;
    }
    else {
      this.user = null;
      this.houseName = "";
      this.userName = "";
    }
  }

  signInUser(user: IUser) {
    this.user = user;
  }

  signOutUser() {
    this.user = new User({});
  }
}
