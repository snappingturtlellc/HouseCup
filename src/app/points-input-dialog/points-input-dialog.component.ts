import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/service/app.service';
import { IMember } from '../shared/class/member';
import { ChallengeService } from '../shared/service/challenge.service';

@Component({
  selector: 'gls-points-input-dialog',
  templateUrl: './points-input-dialog.component.html',
  styleUrls: ['./points-input-dialog.component.scss']
})
export class PointsInputDialogComponent implements OnInit {

  visible: boolean = false;
  member: IMember = null;
  numberOfPoints: number = 1;

  constructor(
    private appService: AppService,
    private challengeService: ChallengeService) { }

  ngOnInit() {
    this.appService.pointsDialogMemberObservable.subscribe(member => {
      this.member = member;
      this.visible = member != null;
    });
  }

  submit() {
    this.challengeService.addPoints(this.appService.challenge, this.member, this.numberOfPoints);
  }
  cancel() {
    this.appService.hidePointsDialog();
  }
}
