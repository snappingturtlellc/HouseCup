export interface IMember {
    $key: string;
    name: string;
    initials: string;
}

export class Member implements IMember
{
    $key: string;
    name: string;
    initials: string;
    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.initials = p.initials || '';
    }
    // toFirebase(): any {
    //     return {
    //         'name': this.name,
    //         'initials': this.initials
    //     }
    // }
}

