/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { UmlTestModule } from '../../../test.module';
import { PeriodUpdateComponent } from 'app/entities/period/period-update.component';
import { PeriodService } from 'app/entities/period/period.service';
import { Period } from 'app/shared/model/period.model';

describe('Component Tests', () => {
    describe('Period Management Update Component', () => {
        let comp: PeriodUpdateComponent;
        let fixture: ComponentFixture<PeriodUpdateComponent>;
        let service: PeriodService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UmlTestModule],
                declarations: [PeriodUpdateComponent]
            })
                .overrideTemplate(PeriodUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PeriodUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Period(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.period = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Period();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.period = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
