import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Member, IMember } from '../class/member';
import { FirebaseHelperService } from './firebase-helper.service';
import { FirebaseDbService } from './firebase-db.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { AppService } from './app.service';
import { IHouse } from '../class/house';

@Injectable()
export class MemberService extends FirebaseDbService {
  constructor(
    private db: AngularFireDatabase,
    private appService: AppService) {
    super('members', db);
  }

  private get houseKey(): string {
    let house = this.appService.house;
    if (house == null)
      throw "House not set";
    return house.$key;    
  }

  getAll(): FirebaseListObservable<any[]> {
    this.path = 'members/' + this.houseKey;
    console.log("getall members path: " + this.houseKey)
    return super.getAll();
  }

  get(id: string): Promise<IMember> {
    this.path = 'members/' + this.houseKey;
    return super.get(id).then(state => new Member(state));
  }

  add(member: IMember): void {
    this.path = 'members/' + this.houseKey;
    super.add(member);
  }

  update(member: IMember) {
    this.path = 'members/' + this.houseKey;
    return super.update(member);
  }

  save(member: IMember) {
    this.path = 'members/' + this.houseKey;
    super.save(member);
  }

  delete(member: IMember): void {
    this.path = 'members/' + this.houseKey;
    super.delete(member);
  }
  
}
