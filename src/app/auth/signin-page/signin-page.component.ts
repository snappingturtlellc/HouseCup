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

  passcode: string = "";

  constructor(private router: Router, 
    private authService: FirebaseAuthService, 
    private userService: UserService,
    private currentUserService: CurrentUserService) { 
    }

  ngOnInit() {
    this.displayStatus();
  }

  signin() {
    
    this.authService.emailSignin(this.houseName + "@housecup.com", this.password)
    .then(() => {
      // this.authService.displayName = "Bob";
      
      this.displayStatus();  
      this.router.navigate(['/feed']);
      
      //let user = this.userService.get(this.username);
    }, f => {
      console.log("login failed")
    })

  }

  signinMember() {
console.log("signin member")
  }

  logout() {
    setTimeout(() => {
      this.router.navigate(['/login']);      
    }, 300);
    //  this.authService.signOut();
    }

  displayStatus() {   
    console.log("-----") ;
    console.log("authenticated: " + this.authService.authenticated);
    // Returns current user data
    console.log("currentUser: " + this.authService.currentUser);
    // Returns
    console.log("currentUserObservable: " + this.authService.currentUserObservable);

    // Returns current user UID
    console.log("currentUserId: " + this.authService.currentUserId);

    // Anonymous User
    console.log("currentUserAnonymous: " + this.authService.currentUserAnonymous);

    // Returns current user display name or Guest
    console.log("currentUserDisplayName: " + this.authService.displayName);

  }

  showAllUsers() {
    debugger
    this.userService.getAll().subscribe(users => {
      for (let u of users) {
        console.log(u.$key);
      }  
    })
  }

  createUser() {
    debugger
    let user = new User({
      name: "test1",
      email: "test1@test1.com"
    });
    this.userService.add(user)
  }
}

