import { Injectable } from '@angular/core';
import { IHouse, House } from '../class/house';
import { IUser, User } from '../class/user';
import { FirebaseAuthService } from './firebase-auth.service';
import { HouseService } from './house.service';
import { DataService } from './data.service';
import { Subject } from 'rxjs/Subject';
import { IChallenge } from '../class/challenge';
import { ChallengeService } from './challenge.service';
import { IMember } from '../class/member';
import { FirebaseListObservable } from 'angularfire2/database';
import { MemberService } from './member.service';

@Injectable()
export class AppService {

  members$: FirebaseListObservable<any[]> = null;

  house: IHouse = null;
  user: IUser = null;
  challenge: IChallenge = null;

  houseName: string = "";
  userName: string = "";
  challengeName: string = "";

  houseObservable = new Subject<IHouse>();
  userObservable = new Subject<IUser>();
  challengeObservable = new Subject<IChallenge>();
  pointsDialogMemberObservable = new Subject<IMember>();

  constructor(
    // private authService: FirebaseAuthService,
  //   private houseService: HouseService,
  //   private memberService: MemberService,
  //   private challengeService: ChallengeService
   ) {

    // // Watch for authentication changes
    // this.authService.currentUserObservable.subscribe(u => {
    //   if (u == null) {
    //     console.log("logged out from current user")
    //     this.house = new House({});
    //   }
    //   else {
    //     console.log("logged in " + u.uid)
    //     this.loadHouse(u.uid); 
    //   }
    // })

    // this.houseObservable.subscribe(house => {
    //   if (this.house) {
    //     if (this.members$ == null)
    //       this.members$ = this.memberService.getAll();
    //   }
    //   else {
    //     this.members$ = null;
    //   }
    // });

  }

  // async loadHouse(id: string) {
  //   this.house = await this.houseService.get(id);
  //   this.challengeService.setHouse(this.house);
  //   this.houseObservable.next(this.house);

  //   if (this.house != null) {
  //     this.user = await this.houseService.getCurrentUser(this.house);
  //     this.userObservable.next(this.user);

  //     this.challenge = await this.houseService.getCurrentChallenge(this.house);
  //     this.challengeObservable.next(this.challenge);

  //     this.houseName = this.house.name;
  //     this.userName = this.user.name;
  //     this.challengeName = this.challenge.name;
  //   }
  //   else {
  //     this.user = null;
  //     this.houseName = "";
  //     this.userName = "";
  //   }
  // }

  signInUser(user: IUser) {
    this.user = user;
  }

  signOutUser() {
    this.user = new User({});
  }

  setHouse(house: IHouse) {
    this.house = house;
    this.houseName = house.name;
    this.houseObservable.next(house);
  }

  setCurrentUser(user: IUser) {
    this.user = user;
    this.userName = user.name;
    this.userObservable.next(user);
  }

  setCurrentChallenge(challenge: IChallenge) {
    this.challenge = challenge;
    this.challengeName = challenge.name;
    this.challengeObservable.next(challenge);
  }

  showPointsDialog(member: IMember) {
    this.pointsDialogMemberObservable.next(member);
  }
  hidePointsDialog() {
    this.pointsDialogMemberObservable.next(null);
  }
}
