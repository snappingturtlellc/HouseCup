export interface IMember {
    $key: string;
    name: string;
    initials: string;
    passcode: string;
}

export class Member implements IMember
{
    $key: string;
    name: string;
    initials: string;
    passcode: string;
    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.initials = p.initials || '';
        this.passcode = p.passcode || '';
    }
}

