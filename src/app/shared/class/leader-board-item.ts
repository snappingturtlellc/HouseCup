export interface ILeaderBoardItem {
    challengeKey: string;
    memberKey: string;
    memberName: string;
    memberPoints: number;
}

export class LeaderBoardItem implements ILeaderBoardItem{
    challengeKey: string;
    memberKey: string;
    memberName: string;
    memberPoints: number;
    constructor(p) {
        this.challengeKey = p.challengeKey || "";
        this.memberKey = p.memberKey || "";
        this.memberName = p.memberName || "";
        this.memberPoints = p.memberPoints || 0;
    }
}
