/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UmlTestModule } from '../../../test.module';
import { SpringComponent } from 'app/entities/spring/spring.component';
import { SpringService } from 'app/entities/spring/spring.service';
import { Spring } from 'app/shared/model/spring.model';

describe('Component Tests', () => {
    describe('Spring Management Component', () => {
        let comp: SpringComponent;
        let fixture: ComponentFixture<SpringComponent>;
        let service: SpringService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UmlTestModule],
                declarations: [SpringComponent],
                providers: []
            })
                .overrideTemplate(SpringComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpringComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpringService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Spring(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.springs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
