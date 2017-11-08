import { IHouse } from "./house";

export interface IUser {
    $key: string;
    name: string;
    email: string;
    _housesRef: any;
    $houses: any[];
}

export class User implements IUser
{
    $key: string;
    name: string;
    email: string;
    _housesRef: any = {};
    $houses: any[] = [];

    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.email = p.email || '';
        this._housesRef = p._housesRef || {};
    }
}

