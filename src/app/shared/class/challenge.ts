import { IMember } from "./member";

export interface IChallenge {
    $key: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    _memberPointsRef: any;
    $memberPoints: IMemberPoints[];
}

export class Challenge implements IChallenge
{
    $key: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    _memberPointsRef: any = {};
    $memberPoints: IMemberPoints[] = [];
    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.description = p.description || '';
        this.startDate = p.startDate || null;
        this.endDate = p.endDate || null;
        this._memberPointsRef = p._memberPointsRef || {};
    }
}

export class IMemberPoints {
    member: IMember;
    points: number;
}
export class MemberPoints implements IMemberPoints {
    member: IMember;
    points: number;
}