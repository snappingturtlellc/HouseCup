import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/service/current-user.service';
import { AppService } from '../../shared/service/app.service';
import { FeedService } from '../../shared/service/feed.service';

@Component({
  selector: 'gls-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  feed$: any;

  constructor(
    private appService: AppService) { }

  ngOnInit() {
  }

}
