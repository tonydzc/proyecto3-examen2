import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmlSharedModule } from 'app/shared';
import {
    StoryComponent,
    StoryDetailComponent,
    StoryUpdateComponent,
    StoryDeletePopupComponent,
    StoryDeleteDialogComponent,
    storyRoute,
    storyPopupRoute
} from './';

const ENTITY_STATES = [...storyRoute, ...storyPopupRoute];

@NgModule({
    imports: [UmlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StoryComponent, StoryDetailComponent, StoryUpdateComponent, StoryDeleteDialogComponent, StoryDeletePopupComponent],
    entryComponents: [StoryComponent, StoryUpdateComponent, StoryDeleteDialogComponent, StoryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UmlStoryModule {}
