import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/class/user';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../shared/service/firebase-auth.service';
import { CurrentUserService } from '../../shared/service/current-user.service';

@Component({
  selector: 'gls-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  // admin@housecup.com:kickB@ss
  // username: string = "admin@housecup.com";
  // password: string = "kickB@ss";
  //email: string = "bobby.grant@housecup.com";
  houseName: string = "Tigers";
  password: string = "family";
  errorMessage: string = "";

  constructor(
    private router: Router,
    private authService: FirebaseAuthService) {
  }

  ngOnInit() {
  }

  signin() {

    this.authService.emailSignin(this.houseName + "@housecup.com", this.password)
      .then(authState => {
        if (authState == null) {
          console.log("invalid user name or password");
          this.errorMessage = "Invalid house name or password."
        }
        else {
          this.router.navigate(['/feed']);
        }
      }, f => {
        console.log("login failed")
      })
  }
}

// add error message
// fix error on signin when not authenticated