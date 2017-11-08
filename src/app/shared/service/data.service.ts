import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { IUser, User } from '../class/user';
import { House, IHouse } from '../class/house';
import { Feed, IFeed } from '../class/feed';
import { AppService } from './app.service';

@Injectable()
export class DataService {

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService) { }

  ///////////////////////////////////////////////////////////////////////////
  // user
  ///////////////////////////////////////////////////////////////////////////

  getUserByEmail(email: string): Observable<IUser> {
    return new Observable(observer => {
      this.db.object('users').$ref.orderByChild('email').equalTo(email).once('value', function (snap) {
        let u = snap.val();
        if (!u)
          observer.next(null);
        else
          observer.next(new User(u));
      },
        error => {
          observer.error(error);
        });
    });
  }
  provideUser(userEmail: string): Observable<IUser> {
    return new Observable(observer => {
      this.getUserByEmail(userEmail).subscribe(
        value => {
          let user: IUser;
          debugger
          if (value == null) {
            // doesn't exist, create new
            let userName = userEmail.substring(0, userEmail.indexOf('@'));
            user = new User({
              name: userName,
              email: userEmail
            });
            user.$key = this.db.list('users').push(this.toPlainObject(user)).key;
            observer.next(user);
          }
          else {
            user = new User(value);
            observer.next(user);
          }

        }, error => {
          observer.error(error);
        });
    });
  }
//   addUser(name: string, email: string) {
//     var add = function() {
//       let user = new User({
//         name: name
//       });
      
//       let house = this.appService.house;
  
//       house.addUser(user);
//       user.addHouse(house);
  
//       this.updateHouse(house);
//       this.updateUser(user);  
//     }
// debugger
//     if (!email || email.length == 0) {
//       add();
//     }
//     else {
//       this.getUserByEmail(email).subscribe(u => {
//         if (u == null)
//           add();
//       });
//     }
//   }  
  updateUser(user: IUser) {
      return this.db.object('users/' + user.$key).update(this.toPlainObject(user));
  }

  ///////////////////////////////////////////////////////////////////////////
  // house
  ///////////////////////////////////////////////////////////////////////////  

  addHouse(houseKey: string, houseName: string, userEmail: string) {
    let houseEmail = houseName.replace(' ', '_').toLowerCase() + '@housecup.com';
    let house = new House({
      $key: houseKey,
      name: houseName,
      email: houseEmail,
      users: {},
      currentUser: null
    });
    return this.updateHouse(house);
  }
  updateHouse(house: IHouse) {
    return this.db.object('houses/' + house.$key).update(this.toPlainObject(house));
  }
  getHouse(id: string): Observable<IHouse> {
    return new Observable(observer => {
        this.db.object('houses/' + id).subscribe(h => {
          if (h.$exists())
            observer.next(new House(h));
          else
            observer.error("not found");
        },
        error => {
          observer.error(error);
        });
    });
  }

  ///////////////////////////////////////////////////////////////////////////
  // feed
  ///////////////////////////////////////////////////////////////////////////  

  addFeed(content: string, house: IHouse) {
    let feed = new Feed({
      content: content,
      houseRef: house.$key
    });
    this.db.object('feed').$ref.child(house.$key).push(this.toPlainObject(feed));
  }
  deleteFeed(feed: IFeed) {
    this.db.object('feed/' + feed.$key).remove();
  }

  ///////////////////////////////////////////////////////////////////////////
  // helper functions
  ///////////////////////////////////////////////////////////////////////////  

  // removes special fields, like $key
  toPlainObject(o: any): any {
    let out = {};
    for (let p in o) {
      if (p[0] != '$' && typeof o[p] != 'function') {
        out[p] = o[p];
      }
    }
    return out;
  }

}
