import { Injectable } from '@angular/core';

@Injectable()
export class AppHeaderService {

  constructor() { }

  pageName: string = "House Cup";

  reset() {
    this.pageName = "House Cup";
  }


}
