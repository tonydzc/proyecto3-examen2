import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Period } from 'app/shared/model/period.model';
import { PeriodService } from './period.service';
import { PeriodComponent } from './period.component';
import { PeriodDetailComponent } from './period-detail.component';
import { PeriodUpdateComponent } from './period-update.component';
import { PeriodDeletePopupComponent } from './period-delete-dialog.component';
import { IPeriod } from 'app/shared/model/period.model';

@Injectable({ providedIn: 'root' })
export class PeriodResolve implements Resolve<IPeriod> {
    constructor(private service: PeriodService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPeriod> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Period>) => response.ok),
                map((period: HttpResponse<Period>) => period.body)
            );
        }
        return of(new Period());
    }
}

export const periodRoute: Routes = [
    {
        path: '',
        component: PeriodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PeriodDetailComponent,
        resolve: {
            period: PeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PeriodUpdateComponent,
        resolve: {
            period: PeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PeriodUpdateComponent,
        resolve: {
            period: PeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const periodPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PeriodDeletePopupComponent,
        resolve: {
            period: PeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
