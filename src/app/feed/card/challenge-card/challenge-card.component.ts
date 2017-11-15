import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ChallengeService } from '../../../shared/service/challenge.service';
import { AppService } from '../../../shared/service/app.service';
import { IChallenge } from '../../../shared/class/challenge';
import { Router } from '@angular/router';

@Component({
  selector: 'gls-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {

  challenges$: FirebaseListObservable<any[]> = null;

  constructor(
    private appService: AppService,
    private challengeService: ChallengeService,
    private router: Router) { }

  ngOnInit() {
    this.appService.houseObservable.subscribe(house => {
      console.log("house change detected" + (house != null))
      this.loadChallenges();
    });

    setTimeout(() => {
      this.loadChallenges();      
    });  
  }

  loadChallenges() {
    console.log("load members: " + (this.appService.house != null))
    if (this.appService.house) {
      if (this.challenges$ == null)
        this.challenges$ = this.challengeService.getAll();
    }
    else {
      this.challenges$ = null;
    }
  }

  challengeSlideLeft() {

  }

  challengeSlideRight() {

  }

  challengeSelect(challenge: IChallenge) {
    this.appService.setCurrentChallenge(challenge);
  }

  goChallenges() {
    this.router.navigate(["/challenges"]);
  }
}
