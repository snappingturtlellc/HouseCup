import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseDbService } from './firebase-db.service';
import { Observable } from 'rxjs/Observable';
import { IUser, User } from '../class/user';
import { IHouse } from '../class/house';

@Injectable()
export class UserService extends FirebaseDbService {

  constructor(private db: AngularFireDatabase) {
    super('users', db);
  }

  get(id: string): Promise<IUser> {
    return super.get(id).then(state => new User(state));
  }

  getByEmail(email: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.db.object(this.path).$ref.orderByChild('email').equalTo(email).once('value', function (snap) {
        let value = snap.val();
        if (value == null) {
          resolve(null);
        }
        else {
          resolve(new User(value));
        }
      });
    });
  }

  addHouse(user: IUser, house: IHouse) {
    user._housesRef[house.$key] = true;
    user.$houses.push(house);
  }
}
