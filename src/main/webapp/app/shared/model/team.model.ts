import { IProject } from 'app/shared/model/project.model';
import { ISpring } from 'app/shared/model/spring.model';
import { IStudent } from 'app/shared/model/student.model';

export interface ITeam {
    id?: number;
    name?: string;
    status?: string;
    project?: IProject;
    springs?: ISpring[];
    students?: IStudent[];
}

export class Team implements ITeam {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public project?: IProject,
        public springs?: ISpring[],
        public students?: IStudent[]
    ) {}
}
