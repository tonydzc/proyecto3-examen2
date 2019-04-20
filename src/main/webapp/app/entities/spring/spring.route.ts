import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Spring } from 'app/shared/model/spring.model';
import { SpringService } from './spring.service';
import { SpringComponent } from './spring.component';
import { SpringDetailComponent } from './spring-detail.component';
import { SpringUpdateComponent } from './spring-update.component';
import { SpringDeletePopupComponent } from './spring-delete-dialog.component';
import { ISpring } from 'app/shared/model/spring.model';

@Injectable({ providedIn: 'root' })
export class SpringResolve implements Resolve<ISpring> {
    constructor(private service: SpringService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpring> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Spring>) => response.ok),
                map((spring: HttpResponse<Spring>) => spring.body)
            );
        }
        return of(new Spring());
    }
}

export const springRoute: Routes = [
    {
        path: '',
        component: SpringComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Springs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SpringDetailComponent,
        resolve: {
            spring: SpringResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Springs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SpringUpdateComponent,
        resolve: {
            spring: SpringResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Springs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SpringUpdateComponent,
        resolve: {
            spring: SpringResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Springs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const springPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SpringDeletePopupComponent,
        resolve: {
            spring: SpringResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Springs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
