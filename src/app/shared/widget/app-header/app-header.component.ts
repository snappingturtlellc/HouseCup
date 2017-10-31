import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from './app-header.service';

@Component({
  selector: 'gls-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private appHeaderService: AppHeaderService) { }

  ngOnInit() {
  }

}
