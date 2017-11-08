import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/service/app.service';
import { FirebaseAuthService } from '../../shared/service/firebase-auth.service';
import { UserService } from '../../shared/service/user.service';
import { User, IUser } from '../../shared/class/user';
import { House, IHouse } from '../../shared/class/house';
import { HouseService } from '../../shared/service/house.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseDbService } from '../../shared/service/firebase-db.service';
import { Observable } from 'rxjs/Observable';
import { Feed } from '../../shared/class/feed';
import { FeedService } from '../../shared/service/feed.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'gls-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  houseName: string = "bears";
  password: string = "family";
  userName: string = "dad";
  userEmail: string = "dad.bears@test.com";

  challengeName: string = "waffle";

  amyPoints: number = 0;
  mattPoints: number = 0;
  andrewPoints: number = 0;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private houseService: HouseService,
    private feedService: FeedService,
    private authService: FirebaseAuthService,
    private af: AngularFireDatabase,
    private dataService: DataService) { }

  ngOnInit() {
  }

  createHouse(houseKey: string, houseName: string, password: string, userEmail: string) {
    return new Observable(observer => {
      let houseEmail = houseName.replace(' ', '_').toLowerCase() + '@housecup.com';
      let house = new House({
        $key: houseKey,
        name: this.houseName,
        email: houseEmail,
        users: {},
        currentUser: null
      });
      this.houseService.update(house).then(
        resolve => {
          observer.next(house);
        },
        reject => {
          observer.error(reject);
        });
    });
  }

  getUserByEmail(userEmail: string) {
    // return new Observable(observer => {
    //   this.userService.getByEmail(this.userEmail).subscribe(
    //     value => {
    //       let user: IUser;
    //       if (value == null) {
    //         // doesn't exist, create new
    //         user = new User({
    //           name: this.userEmail,
    //           email: this.userEmail
    //         });
    //         this.userService.add(user);
    //         observer.next(user);
    //       }
    //       else {
    //         user = new User(value);
    //         observer.next(user);
    //       }

    //     }, error => {
    //       observer.error(error);
    //     });
    // });
  }

  addUserByEmail(userName: string, userEmail: string) {
    // this.getUserByEmail(userEmail).subscribe(u => {
    //     let user = u as IUser;
    //     user.name = userName;

    //     let house = this.appService.house;

    //     // house.addUser(user);
    //     // user.addHouse(house);

    //     this.houseService.update(house);
    //     this.userService.update(user);
    //   },
    //   error => {

    //   });    
  }

  addUserNoEmail(userName: string) {
        let user = new User({
          name: userName
        });
        
        let house = this.appService.house;

        // house.addUser(user);
        // user.addHouse(house);

        this.houseService.update(house);
        this.userService.update(user);
  }

  signup() {
    let houseEmail = this.houseName.replace(' ', '_').toLowerCase() + '@housecup.com';
    this.authService.emailSignup(houseEmail, this.password).then(
      resolve => {

        this.dataService.addHouse(this.authService.currentUserId, this.houseName, houseEmail).then(h => {
          let house = new House(h);

          this.dataService.provideUser(this.userEmail).subscribe(user => {

            // house.setCurrentUser(user);

            // user.addHouse(house);
            // house.addUser(user);

            this.dataService.updateHouse(house);
            this.dataService.updateUser(user);

            this.dataService.addFeed("Welcome to House Cup.", house);
            this.dataService.addFeed("You need some members!", house);        

          }); // provideUser

        }); // addHouse

      },
      reject => {
        // emailSignup failed
      }); // emailSignup
  }
  signin() {
    let houseEmail = this.houseName.replace(' ', '_').toLowerCase() + '@housecup.com';
    this.authService.emailSignup(houseEmail, this.password).then(
      resolve => {
        console.log("successfully signed in")
      },
      error => {
        console.log(error);
      });
  }
  signout() {
    this.authService.signOut();
  }
  addAmy() {
    //this.addUserByEmail("Amy", "amysharp@live.com");
    this.dataService.provideUser("amysharp@live.com").subscribe(user => {
      debugger
      // user.addHouse(this.appService.house);
      this.dataService.updateUser(user);
      this.dataService.addFeed("Welcome Amy", this.appService.house);
    });
  }

  addMatthew() {
    this.addUserByEmail("Matt", "matthewsharp@live.com");    
  }

  addEmily() {
    this.addUserNoEmail("Emily");
  }

  addChallenge() {

  }
}
