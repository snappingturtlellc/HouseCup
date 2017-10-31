import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { IUser, User } from 'app/shared/class/user';

@Injectable()
export class UserService {

  users$: FirebaseListObservable<any[]> = null;;

  constructor(private af: AngularFireDatabase) {
  } 

  getAll(): FirebaseListObservable<any[]> {
    if (this.users$ == null) {
      this.users$ = this.af.list('/users');      
    }
    return this.users$;
  }

  get(id: string): FirebaseObjectObservable<any> {
    return this.af.object('/users/' + id);
  }
  getSnapshot(id: string) {
    return Observable.create(observer => {
      this.af.object('/users/' + id).subscribe(snapshot => {
        var u = new User(snapshot);
        observer.next(u);
      });
    });  
  }

  add(user: User): void {
    this.getAll().push(user.toFirebase());    
  }

  update(user: User): void {
//    this.af.object('/users/' + user.$key).update(user.toFirebase());
  }

  delete(user: IUser): void {
    this.af.object('/users/' + user.$key).remove();
  }
}
