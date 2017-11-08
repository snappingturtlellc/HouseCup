import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseHelperService {

  constructor() { }

  static toFirebase(o: any): any {
    let fobject = {};
    for (let p in o) {
      if (p[0] != '$' && typeof p[0] != 'object') {
        fobject[p] = o[p];
      }
    }
    return fobject;
  }

}
