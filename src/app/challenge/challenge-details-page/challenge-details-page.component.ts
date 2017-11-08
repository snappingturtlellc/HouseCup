import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '../../shared/class/challenge';
import { ChallengeService } from '../../shared/service/challenge.service';
import { Location } from '@angular/common';
import { AppService } from '../../shared/service/app.service';

@Component({
  selector: 'gls-challenge-details-page',
  templateUrl: './challenge-details-page.component.html',
  styleUrls: ['./challenge-details-page.component.scss']
})
export class ChallengeDetailsPageComponent implements OnInit {

  isNew: boolean = false;
  challengeId: string;
  challenge: Challenge = new Challenge({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private location: Location) {
    console.log("ChallengeDetailsPageComponent:constructor");

  }

  async ngOnInit() {
    console.log("ChallengeDetailsPageComponent:ngOnInit");
    let id = this.activatedRoute.snapshot.params['id'];
    if (id == 'new') {
      this.isNew = true;
      this.challengeId = 'new';
      this.challenge = new Challenge({});
    }
    else {
      this.isNew = false;
      this.challengeId = id;
      this.challenge = await this.challengeService.get(id);
    }
  }

  add() {
    this.challengeService.add(this.challenge);
    this.location.back();
  }

  async edit() {
    await this.challengeService.update(this.challenge);
    this.location.back();
  }

  delete() {
    this.challengeService.delete(this.challenge);
    this.location.back();
  }

}
