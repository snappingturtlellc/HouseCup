import { IHouse, House } from "./house";

export interface IFeed {
    $key: string;
    content: string;
}
export class Feed implements IFeed
{
    $key: string;
    content: string;
    constructor(p) {
        this.$key = p.$key || '';
        this.content = p.content || '';
    }
}
