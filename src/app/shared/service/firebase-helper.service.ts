import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseHelperService {

  constructor() { }

  static toFirebase(o: any): any {
    let fobject = {};
    for (let p in o) {
      if (p[0] != '$') {
        fobject[p] = o[p];
      }
    }
    return fobject;
  }

}
