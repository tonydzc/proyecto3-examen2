import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpring } from 'app/shared/model/spring.model';

type EntityResponseType = HttpResponse<ISpring>;
type EntityArrayResponseType = HttpResponse<ISpring[]>;

@Injectable({ providedIn: 'root' })
export class SpringService {
    public resourceUrl = SERVER_API_URL + 'api/springs';

    constructor(protected http: HttpClient) {}

    create(spring: ISpring): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(spring);
        return this.http
            .post<ISpring>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(spring: ISpring): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(spring);
        return this.http
            .put<ISpring>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISpring>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISpring[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(spring: ISpring): ISpring {
        const copy: ISpring = Object.assign({}, spring, {
            starDate: spring.starDate != null && spring.starDate.isValid() ? spring.starDate.toJSON() : null,
            endDate: spring.endDate != null && spring.endDate.isValid() ? spring.endDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.starDate = res.body.starDate != null ? moment(res.body.starDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((spring: ISpring) => {
                spring.starDate = spring.starDate != null ? moment(spring.starDate) : null;
                spring.endDate = spring.endDate != null ? moment(spring.endDate) : null;
            });
        }
        return res;
    }
}
