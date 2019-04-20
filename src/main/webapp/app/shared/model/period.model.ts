import { Moment } from 'moment';
import { IProject } from 'app/shared/model/project.model';

export interface IPeriod {
    id?: number;
    starDate?: Moment;
    endDate?: Moment;
    name?: string;
    projects?: IProject[];
}

export class Period implements IPeriod {
    constructor(
        public id?: number,
        public starDate?: Moment,
        public endDate?: Moment,
        public name?: string,
        public projects?: IProject[]
    ) {}
}
