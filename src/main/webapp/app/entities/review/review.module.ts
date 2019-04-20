import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmlSharedModule } from 'app/shared';
import {
    ReviewComponent,
    ReviewDetailComponent,
    ReviewUpdateComponent,
    ReviewDeletePopupComponent,
    ReviewDeleteDialogComponent,
    reviewRoute,
    reviewPopupRoute
} from './';

const ENTITY_STATES = [...reviewRoute, ...reviewPopupRoute];

@NgModule({
    imports: [UmlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ReviewComponent, ReviewDetailComponent, ReviewUpdateComponent, ReviewDeleteDialogComponent, ReviewDeletePopupComponent],
    entryComponents: [ReviewComponent, ReviewUpdateComponent, ReviewDeleteDialogComponent, ReviewDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UmlReviewModule {}
