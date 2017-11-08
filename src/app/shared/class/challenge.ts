export interface IChallenge {
    $key: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export class Challenge implements IChallenge
{
    $key: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    constructor(p) {
        this.$key = p.$key || '';
        this.name = p.name || '';
        this.description = p.description || '';
        this.startDate = p.startDate || null;
        this.endDate = p.endDate || null;
    }
}

