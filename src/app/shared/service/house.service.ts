import { Injectable } from '@angular/core';
import { FirebaseDbService } from './firebase-db.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { IHouse, House } from '../class/house';
import { IUser } from '../class/user';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';


@Injectable()
export class HouseService extends FirebaseDbService {
  constructor(private db: AngularFireDatabase) {
    super('houses', db);
  }

  get(id: string): Promise<IHouse> {
    return super.get(id).then(state => { 
      if (state.$exists())
        return new House(state); 
      else
        return null;
    })
    .catch(error => { 
      return null; 
    });      
  }  

  test() {
    //debugger
    //https://firebase.googleblog.com/2013/04/denormalizing-your-data-is-normal.html
    // let house = this.db.list('houses').push({
    //   name: 'tigers',
    //   members: [],
    //   challenges: []
    // }).key;
    //let houseRef = this.db.list('houses');    

    // // GET SNAPSHOT (NO $KEY)
    let houseRef = this.db.object('houses/-Ky8PyqzCghwTvTJ5mGC');    
    houseRef.$ref.once('value', function(snap) {
      console.log(snap.val());
    })

    // // GET OBSERVALBE (WITH KEY)
    // let s = houseRef.subscribe(v => {
    //   s.unsubscribe();

    //   console.log(v);
    //   let ex = v.$exists();
    //   console.log(ex);
    //   //v.members = [];

    //   let user = {
    //     name: 'dad'
    //   }
    //   v.members.push(user);
    //   houseRef.update(v);      
    // })

    let houseRef2 = this.db.object('houses/-Ky8PyqzCghwTvTJ5mGC/members/6');    
    houseRef2.$ref.once('value', function(snap) {
      console.log(snap.val());
    })
    
    //let challenge = {name: 'eggo'}
    //houseRef.$ref.child('challenges').push(challenge);
    let memRef = {  };
    let ch1 = this.db.object('houses/-Ky8PyqzCghwTvTJ5mGC/challenges/-Ky8_UAAEAs4FwCP3qpu');
    ch1.$ref.once('value', function(snap) {
      debugger
      let ch1val = snap.val();
      ch1val.members = {'6': true, '5': true};
      ch1.update(ch1val);
    });
  }

  addUser(house: IHouse, user: IUser) {
    house._usersRef[user.$key] = true;
    house.$users.push(user);
  }
  getUsers(house: IHouse): Observable<IUser> {
    return new Observable<IUser>(observer => {
      async function a() {
        let userService = new UserService(this.db);
        for (let u in house._usersRef) {
          await userService.get(u).then(user => observer.next(user));
        }  
      }
      a();
    });
  }
  setCurrentUser(house: IHouse, user: IUser) {
    house._currentUserRef = user.$key;
    house.$currentUser = user;
  }
  async getCurrentUser(house: IHouse): Promise<IUser> {
    let userService = new UserService(this.db);
    return userService.get(house._currentUserRef);
  }
}
