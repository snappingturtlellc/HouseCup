import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service';
import { AuthService } from 'app/shared/service/auth.service';

@Component({
  selector: 'gls-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  // admin@housecup.com:kickB@ss
  username: string = "admin@housecup.com";
  password: string = "kickB@ss";
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signin() {
    this.authService.emailSignin(this.username, this.password);

    var user = this.authService.getCurrentUser();
  }
}
