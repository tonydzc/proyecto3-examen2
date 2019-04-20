import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmlSharedModule } from 'app/shared';
import {
    SpringComponent,
    SpringDetailComponent,
    SpringUpdateComponent,
    SpringDeletePopupComponent,
    SpringDeleteDialogComponent,
    springRoute,
    springPopupRoute
} from './';

const ENTITY_STATES = [...springRoute, ...springPopupRoute];

@NgModule({
    imports: [UmlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SpringComponent, SpringDetailComponent, SpringUpdateComponent, SpringDeleteDialogComponent, SpringDeletePopupComponent],
    entryComponents: [SpringComponent, SpringUpdateComponent, SpringDeleteDialogComponent, SpringDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UmlSpringModule {}
