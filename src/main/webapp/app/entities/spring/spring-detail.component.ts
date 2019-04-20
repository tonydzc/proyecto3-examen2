import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpring } from 'app/shared/model/spring.model';

@Component({
    selector: 'jhi-spring-detail',
    templateUrl: './spring-detail.component.html'
})
export class SpringDetailComponent implements OnInit {
    spring: ISpring;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spring }) => {
            this.spring = spring;
        });
    }

    previousState() {
        window.history.back();
    }
}
