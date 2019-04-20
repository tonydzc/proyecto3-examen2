import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISpring } from 'app/shared/model/spring.model';
import { SpringService } from './spring.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
    selector: 'jhi-spring-update',
    templateUrl: './spring-update.component.html'
})
export class SpringUpdateComponent implements OnInit {
    spring: ISpring;
    isSaving: boolean;

    teams: ITeam[];
    starDate: string;
    endDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected springService: SpringService,
        protected teamService: TeamService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ spring }) => {
            this.spring = spring;
            this.starDate = this.spring.starDate != null ? this.spring.starDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.spring.endDate != null ? this.spring.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.teamService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeam[]>) => response.body)
            )
            .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.spring.starDate = this.starDate != null ? moment(this.starDate, DATE_TIME_FORMAT) : null;
        this.spring.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.spring.id !== undefined) {
            this.subscribeToSaveResponse(this.springService.update(this.spring));
        } else {
            this.subscribeToSaveResponse(this.springService.create(this.spring));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpring>>) {
        result.subscribe((res: HttpResponse<ISpring>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }
}
