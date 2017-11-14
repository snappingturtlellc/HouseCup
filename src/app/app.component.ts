import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from './shared/service/firebase-auth.service';
import { HouseService } from './shared/service/house.service';
import { MemberService } from './shared/service/member.service';
import { ChallengeService } from './shared/service/challenge.service';
import { AppService } from './shared/service/app.service';
import { UserService } from './shared/service/user.service';
import { LeaderBoardItem } from './shared/class/leader-board-item';
import { Member } from './shared/class/member';
import { FeedService } from './shared/service/feed.service';

@Component({
  selector: 'gls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gls';
  members: any;

  constructor(
    private appService: AppService,
    private authService: FirebaseAuthService,
    private houseService: HouseService,
    private memberService: MemberService,
    private challengeService: ChallengeService,
    private userService: UserService,
    private feedService: FeedService) {

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
      
      this.appService.members$.subscribe(members => {
        for (let m of members) {
          let member = new Member(m);          
          let f = this.appService.members.find(value => value.$key == member.$key);
          if (f == null)
            this.appService.members.push(member);
        }

        for (let m of this.appService.members)
          this.appService.leaderBoard.push(m);

        this.challengeService.getMembers(challenge).subscribe(memberPoints => {
          console.log("challenge member change");
          for (let mp in memberPoints) {
            let member = this.appService.members.find(value => value.$key == mp);
            if (member != null)            
                member.$points = memberPoints[mp];
          }                  

          this.appService.leaderBoard.sort((a,b) => { return b.$points - a.$points});
          console.log(this.appService.leaderBoard);                      

          this.appService.feed$ = this.feedService.getAll();
          this.appService.feed$.subscribe(f => {
            console.log(f)
          })
        });
      })

    }
    else {
      this.appService.setCurrentUser(null);
      this.appService.setCurrentChallenge(null);
    }
  }  
}
