import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmlSharedModule } from 'app/shared';
import {
    StudentComponent,
    StudentDetailComponent,
    StudentUpdateComponent,
    StudentDeletePopupComponent,
    StudentDeleteDialogComponent,
    studentRoute,
    studentPopupRoute
} from './';

const ENTITY_STATES = [...studentRoute, ...studentPopupRoute];

@NgModule({
    imports: [UmlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentComponent,
        StudentDetailComponent,
        StudentUpdateComponent,
        StudentDeleteDialogComponent,
        StudentDeletePopupComponent
    ],
    entryComponents: [StudentComponent, StudentUpdateComponent, StudentDeleteDialogComponent, StudentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UmlStudentModule {}