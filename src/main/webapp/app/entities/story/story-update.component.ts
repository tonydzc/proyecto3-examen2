import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IStory } from 'app/shared/model/story.model';
import { StoryService } from './story.service';

@Component({
    selector: 'jhi-story-update',
    templateUrl: './story-update.component.html'
})
export class StoryUpdateComponent implements OnInit {
    story: IStory;
    isSaving: boolean;

    constructor(protected storyService: StoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ story }) => {
            this.story = story;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.story.id !== undefined) {
            this.subscribeToSaveResponse(this.storyService.update(this.story));
        } else {
            this.subscribeToSaveResponse(this.storyService.create(this.story));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStory>>) {
        result.subscribe((res: HttpResponse<IStory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
