import { IUser, User } from "./user";

export interface IHouse {
    $key: string;
    name: string;
    email: string;
    _usersRef: any;
    $users: any[];    
    _currentUserRef: string;
    $currentUser: IUser;        
}

export class House implements IHouse
{
    $key: string;
    name: string;
    email: string;
    _usersRef: any = {};
    $users: any[] = [];    
    _currentUserRef: string;    
    $currentUser: IUser;        

    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.email = p.email || '';
        this._usersRef = p.usersRef || {};
        this._currentUserRef = p._currentUserRef || '';        
    }
}
