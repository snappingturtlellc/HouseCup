import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Member, IMember } from '../class/member';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable()
export class MemberService {

  members$: FirebaseListObservable<any[]> = null;;
  
    constructor(private af: AngularFireDatabase, private fbhelper: FirebaseHelperService) {
    } 
  
    getAll(): FirebaseListObservable<any[]> {
      if (this.members$ == null) {
        this.members$ = this.af.list('/members');      
      }
      return this.members$;
    }
  
    get(id: string): FirebaseObjectObservable<any> {
      return this.af.object('/members/' + id);
    }
    getSnapshot(id: string) {
      return Observable.create(observer => {
        this.af.object('/members/' + id).subscribe(snapshot => {
          var m = new Member(snapshot);
          observer.next(m);
        });
      });  
    }
  
    add(member: Member): void {
      this.getAll().push(FirebaseHelperService.toFirebase(member));    
    }
  
    update(member: Member): void {
      this.af.object('/members/' + member.$key).update(FirebaseHelperService.toFirebase(member));
    }
  
    delete(member: IMember): void {
      this.af.object('/members/' + member.$key).remove();
    }
  }
  