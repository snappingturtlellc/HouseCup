import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/service/current-user.service';
import { AppService } from '../../shared/service/app.service';

@Component({
  selector: 'gls-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
