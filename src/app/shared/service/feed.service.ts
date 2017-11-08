import { Injectable } from '@angular/core';
import { FirebaseDbService } from './firebase-db.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { IHouse } from '../class/house';
import { Feed } from '../class/feed';

@Injectable()
export class FeedService extends FirebaseDbService {
  constructor(private db: AngularFireDatabase) { 
    super('feeds', db);
  }

  append(content: string, house: IHouse) {
    let feed = new Feed({
      content: content,
      houseRef: house.$key
    });
    this.db.object(this.path).$ref.child(house.$key).push(this.toPlainObject(feed));
  }
}