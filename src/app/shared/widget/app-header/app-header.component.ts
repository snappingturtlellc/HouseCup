import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from './app-header.service';
import { CurrentUserService } from '../../service/current-user.service';
import { FirebaseAuthService } from '../../service/firebase-auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'gls-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private appService: AppService,
    private appHeaderService: AppHeaderService, 
    private currentUser: CurrentUserService,
    private authService: FirebaseAuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signout() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }
}
