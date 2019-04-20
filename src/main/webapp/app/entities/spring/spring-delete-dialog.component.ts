import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpring } from 'app/shared/model/spring.model';
import { SpringService } from './spring.service';

@Component({
    selector: 'jhi-spring-delete-dialog',
    templateUrl: './spring-delete-dialog.component.html'
})
export class SpringDeleteDialogComponent {
    spring: ISpring;

    constructor(protected springService: SpringService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.springService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'springListModification',
                content: 'Deleted an spring'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spring-delete-popup',
    template: ''
})
export class SpringDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spring }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpringDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.spring = spring;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/spring', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/spring', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
