import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../shared/service/app.service';

@Component({
  selector: 'gls-leader-board-card',
  templateUrl: './leader-board-card.component.html',
  styleUrls: ['./leader-board-card.component.scss']
})
export class LeaderBoardCardComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }

}
