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
import { ILeaderBoardItem } from '../class/leader-board-item';
import { IFeed } from '../class/feed';

@Injectable()
export class AppService {

  members$: FirebaseListObservable<any[]> = null;
  members: IMember[] = [];
  leaderBoard: IMember[] = [];

  feed$: FirebaseListObservable<any[]> = null;

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
  leaderBoardObservable = new Subject<ILeaderBoardItem>();

  constructor() {}

  signInUser(user: IUser) {
    this.user = user;
  }

  signOutUser() {
    this.user = new User({});
  }

  setHouse(house: IHouse) {
    this.house = house;
    if (house != null) {
      this.houseName = house.name;

      
    }
    else {
      this.houseName = "";
      this.setCurrentUser(null);
      this.setCurrentChallenge(null);

      this.leaderBoard = null;
      this.leaderBoardObservable.next(null);
    }
    this.houseObservable.next(house);
  }

  setCurrentUser(user: IUser) {
    this.user = user;
    if (user != null) 
      this.userName = user.name;
    else
      this.userName = "";
    this.userObservable.next(user);
  }

  setCurrentChallenge(challenge: IChallenge) {
    this.challenge = challenge;
    if (challenge != null)
      this.challengeName = challenge.name;
    else
      this.challengeName = "";
    this.challengeObservable.next(challenge);
  }

  showPointsDialog(member: IMember) {
    this.pointsDialogMemberObservable.next(member);
  }
  hidePointsDialog() {
    this.pointsDialogMemberObservable.next(null);
  }
}
