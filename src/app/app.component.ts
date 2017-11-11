import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from './shared/service/firebase-auth.service';
import { HouseService } from './shared/service/house.service';
import { MemberService } from './shared/service/member.service';
import { ChallengeService } from './shared/service/challenge.service';
import { AppService } from './shared/service/app.service';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'gls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gls';

  constructor(
    private appService: AppService,
    private authService: FirebaseAuthService,
    private houseService: HouseService,
    private memberService: MemberService,
    private challengeService: ChallengeService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    // Watch for authentication changes
    this.authService.currentUserObservable.subscribe(u => {
      this.authChanged(u);
    })    
  }
  
  async authChanged(authState: any) {
    if (authState == null) {
      this.appService.setHouse(null);
      return;
    }
    let id = authState.uid;
  
    let house = await this.houseService.get(id);
    this.appService.setHouse(house);

    if (house != null) {
      let user = await this.userService.get(house._currentUserRef);
      this.appService.setCurrentUser(user);

      let challenge = await this.challengeService.get(house._currentChallengeRef);
      this.appService.setCurrentChallenge(challenge);
      this.appService.members$ = await this.memberService.getAll();
    }
    else {
      this.appService.setCurrentUser(null);
      this.appService.setCurrentChallenge(null);
    }
  }  
}
