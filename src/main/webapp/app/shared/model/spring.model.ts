import { Moment } from 'moment';
import { ITeam } from 'app/shared/model/team.model';

export interface ISpring {
    id?: number;
    name?: string;
    starDate?: Moment;
    endDate?: Moment;
    status?: string;
    team?: ITeam;
}

export class Spring implements ISpring {
    constructor(
        public id?: number,
        public name?: string,
        public starDate?: Moment,
        public endDate?: Moment,
        public status?: string,
        public team?: ITeam
    ) {}
}
