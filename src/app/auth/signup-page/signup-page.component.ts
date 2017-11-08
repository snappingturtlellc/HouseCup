import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../shared/service/firebase-auth.service';
import { HouseService } from '../../shared/service/house.service';
import { UserService } from '../../shared/service/user.service';
// import { House, IHouse } from '../../shared/class/house';
import { User } from '../../shared/class/user';
import { House } from '../../shared/class/house';
import { AppService } from '../../shared/service/app.service';
import { FeedService } from '../../shared/service/feed.service';

@Component({
  selector: 'gls-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  // admin@housecup.com:kickB@ss
  // username: string = "admin@housecup.com";
  // password: string = "kickB@ss";

  houseName: string = "Tigers";
  password: string = "family";
  confirmPassword: string = "family"
  userName: string = "Mike";
  userEmail: string = "tiger.parent@hotmail.com";

  constructor(
    private appService: AppService,
    private authService: FirebaseAuthService,
    private houseService: HouseService,
    private userService: UserService,
    private feedService: FeedService,
    private router: Router) { }

  ngOnInit() {
  }

  async signup() {
    try {

      if (this.password == this.confirmPassword) {

        let houseEmail = this.houseName.replace(' ', '_').toLowerCase() + '@housecup.com';

        let authState = await this.authService.emailSignup(houseEmail, this.password);
        if (authState == null) 
          throw "authentication failed";             

          // add user
          let user = await this.userService.getByEmail(this.userEmail);
          if (user == null) {
            user = new User({
              name: this.userName,
              email: this.userEmail
            });
            this.userService.add(user);        
          }

          // add house
          let house = new House(new House({
            $key: this.authService.currentUserId,
            name: this.houseName,
            email: houseEmail
          }));
                    
          this.houseService.addUser(house, user);
          this.houseService.setCurrentUser(house, user);
          await this.houseService.update(house);

          this.userService.addHouse(user, house);
          await this.userService.update(user);

          this.feedService.append("Welcome to House Cup.", house);
          this.feedService.append("You need some members!", house);                  

          // Create member? Is member needed?
          this.router.navigate(['/feed']);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  userexists() {
    this.houseService.test();
  }
}
