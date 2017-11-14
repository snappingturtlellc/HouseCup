import { Injectable } from '@angular/core';
import { FirebaseDbService } from './firebase-db.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IHouse } from '../class/house';
import { Feed, IFeed } from '../class/feed';
import { AppService } from './app.service';

@Injectable()
export class FeedService extends FirebaseDbService {
  constructor(
    private db: AngularFireDatabase,
    private appService: AppService) {
    super('feeds', db);
  }

  private get houseKey(): string {
    let house = this.appService.house;
    if (house == null)
      throw "House not set";
    return house.$key;    
  }

  getAll(): FirebaseListObservable<any[]> {
    this.path = 'feeds/' + this.houseKey;
    return super.getAll();
  }

  get(id: string): Promise<IFeed> {
    this.path = 'feeds/' + this.houseKey;
    return super.get(id).then(state => new Feed(state));
  }

  add(feed: IFeed): void {
    this.path = 'feeds/' + this.houseKey;
    super.add(feed);
  }

  update(feed: IFeed) {
    this.path = 'feeds/' + this.houseKey;
    return super.update(feed);
  }

  save(feed: IFeed) {
    this.path = 'feeds/' + this.houseKey;
    super.save(feed);
  }

  delete(feed: IFeed): void {
    this.path = 'feeds/' + this.houseKey;
    super.delete(feed);
  }
    
  append(content: string, house: IHouse) {
    let feed = new Feed({
      content: content,
      houseRef: house.$key
    });
    this.db.object(this.path).$ref.child(house.$key).push(this.toPlainObject(feed));
  }
}