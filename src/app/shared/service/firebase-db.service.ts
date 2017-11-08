import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseDbService {
  items$: FirebaseListObservable<any[]> = null;
  path: string;

  constructor(path: string, private af: AngularFireDatabase) {
    this.path = path;
  }

  getAll(): FirebaseListObservable<any[]> {
    if (this.items$ == null) {
      this.items$ = this.af.list(this.path);
    }
    return this.items$;
  }

  get(id: string): Promise<any> {
    console.log("get: " + this.path + '/' + id)
    //return this.af.object(this.path + '/' + id).toPromise();
    return new Promise((resolve, reject) => {
      this.af.object(this.path + '/' + id).subscribe(state => {
        resolve(state);
      })
    });
  }

  add(item: any): void {
    let key = this.af.list(this.path).push(this.toPlainObject(item)).key;
    item.$key = key;
  }

  update(item: any) {
    return this.af.object(this.path + '/' + item.$key).update(this.toPlainObject(item));
  }

  save(item: any) {
    if (item.$key && item.$key.length > 0)
      this.update(item);
    else
      this.add(item);
  }

  delete(item: any): void {
    this.af.object(this.path + '/' + item.$key).remove();
  }

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

