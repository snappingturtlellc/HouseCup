// import { IFirebaseOutput } from "app/shared/model/firebase-output";

export interface IUser {
    $key: string;
    name: string;
    email: string;
}

export interface IFirebaseOutput {
  toFirebase(): any;
}

export class BaseObject {
    toFirebase(): any {
        return {};
    }
}

export class User implements IUser, BaseObject
//, IFirebaseOutput 
{
    $key: string;
    name: string;
    email: string;
    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.email = p.email || '';
    }
    toFirebase(): any {
        return {
            'name': this.name,
            'email': this.email
        }
    }
}

//   toFirebase(): any {
//     return {
//       'name': this.name,
//       'email': this.email
//     }
//   }

