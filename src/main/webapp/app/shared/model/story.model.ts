import { IStudent } from 'app/shared/model/student.model';
import { IReview } from 'app/shared/model/review.model';

export interface IStory {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    status?: string;
    students?: IStudent[];
    reviews?: IReview[];
}

export class Story implements IStory {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public status?: string,
        public students?: IStudent[],
        public reviews?: IReview[]
    ) {}
}
