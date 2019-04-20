/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UmlTestModule } from '../../../test.module';
import { SpringDeleteDialogComponent } from 'app/entities/spring/spring-delete-dialog.component';
import { SpringService } from 'app/entities/spring/spring.service';

describe('Component Tests', () => {
    describe('Spring Management Delete Component', () => {
        let comp: SpringDeleteDialogComponent;
        let fixture: ComponentFixture<SpringDeleteDialogComponent>;
        let service: SpringService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UmlTestModule],
                declarations: [SpringDeleteDialogComponent]
            })
                .overrideTemplate(SpringDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpringDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpringService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
