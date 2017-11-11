import { Injectable } from '@angular/core';
import { FirebaseDbService } from './firebase-db.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AppService } from './app.service';
import { IChallenge, Challenge } from '../class/challenge';
import { IHouse } from '../class/house';
import { IMember } from '../class/member';

@Injectable()
export class ChallengeService extends FirebaseDbService {
  
  constructor(
    private db: AngularFireDatabase, 
    private appService: AppService) {
    super('challenges', db);
  }

  private get houseKey(): string {
    let house = this.appService.house;
    if (house == null)
      throw "House not set";
    return house.$key;    
  }
  // _house: IHouse = null;
  // setHouse(house: IHouse) {
  //   this._house = house;
  // }

  getAll(): FirebaseListObservable<any[]> {
    this.path = 'challenges/' + this.houseKey;
    return super.getAll();
  }

  get(id: string): Promise<IChallenge> {
    this.path = 'challenges/' + this.houseKey;
    return super.get(id).then(state => new Challenge(state));
  }

  add(challenge: IChallenge): void {
    this.path = 'challenges/' + this.houseKey;
    super.add(challenge);
  }

  update(challenge: IChallenge) {
    this.path = 'challenges/' + this.houseKey;
    return super.update(challenge);
  }

  save(challenge: IChallenge) {
    this.path = 'challenges/' + this.houseKey;
    super.save(challenge);
  }

  delete(challenge: IChallenge): void {
    this.path = 'challenges/' + this.houseKey;
    super.delete(challenge);
  }

  async addPoints(challenge: IChallenge, member: IMember, numberOfPoints: number) {
    challenge._memberPointsRef[member.$key] = numberOfPoints;
    await this.update(challenge);
  }
  getPoints(challenge: IChallenge) {

  }
}
