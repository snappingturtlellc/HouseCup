import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service';
import { AuthService } from 'app/shared/service/auth.service';

@Component({
  selector: 'gls-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  // admin@housecup.com:kickB@ss
  username: string = "admin@housecup.com";
  password: string = "kickB@ss";

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    console.log("username: " + this.username);
    this.authService.emailSignup(this.username, this.password);
  }

}
