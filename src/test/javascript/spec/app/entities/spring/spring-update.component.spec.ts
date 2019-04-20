/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { UmlTestModule } from '../../../test.module';
import { SpringUpdateComponent } from 'app/entities/spring/spring-update.component';
import { SpringService } from 'app/entities/spring/spring.service';
import { Spring } from 'app/shared/model/spring.model';

describe('Component Tests', () => {
    describe('Spring Management Update Component', () => {
        let comp: SpringUpdateComponent;
        let fixture: ComponentFixture<SpringUpdateComponent>;
        let service: SpringService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UmlTestModule],
                declarations: [SpringUpdateComponent]
            })
                .overrideTemplate(SpringUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpringUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpringService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Spring(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.spring = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Spring();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.spring = entity;
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
