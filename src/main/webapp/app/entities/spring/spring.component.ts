import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISpring } from 'app/shared/model/spring.model';
import { AccountService } from 'app/core';
import { SpringService } from './spring.service';

@Component({
    selector: 'jhi-spring',
    templateUrl: './spring.component.html'
})
export class SpringComponent implements OnInit, OnDestroy {
    springs: ISpring[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected springService: SpringService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.springService
            .query()
            .pipe(
                filter((res: HttpResponse<ISpring[]>) => res.ok),
                map((res: HttpResponse<ISpring[]>) => res.body)
            )
            .subscribe(
                (res: ISpring[]) => {
                    this.springs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSprings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISpring) {
        return item.id;
    }

    registerChangeInSprings() {
        this.eventSubscriber = this.eventManager.subscribe('springListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
