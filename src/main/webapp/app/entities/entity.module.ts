import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'period',
                loadChildren: './period/period.module#UmlPeriodModule'
            },
            {
                path: 'project',
                loadChildren: './project/project.module#UmlProjectModule'
            },
            {
                path: 'team',
                loadChildren: './team/team.module#UmlTeamModule'
            },
            {
                path: 'spring',
                loadChildren: './spring/spring.module#UmlSpringModule'
            },
            {
                path: 'student',
                loadChildren: './student/student.module#UmlStudentModule'
            },
            {
                path: 'story',
                loadChildren: './story/story.module#UmlStoryModule'
            },
            {
                path: 'review',
                loadChildren: './review/review.module#UmlReviewModule'
            },
            {
                path: 'project',
                loadChildren: './project/project.module#UmlProjectModule'
            },
            {
                path: 'team',
                loadChildren: './team/team.module#UmlTeamModule'
            },
            {
                path: 'spring',
                loadChildren: './spring/spring.module#UmlSpringModule'
            },
            {
                path: 'student',
                loadChildren: './student/student.module#UmlStudentModule'
            },
            {
                path: 'story',
                loadChildren: './story/story.module#UmlStoryModule'
            },
            {
                path: 'review',
                loadChildren: './review/review.module#UmlReviewModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UmlEntityModule {}
