/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UmlTestModule } from '../../../test.module';
import { SpringDetailComponent } from 'app/entities/spring/spring-detail.component';
import { Spring } from 'app/shared/model/spring.model';

describe('Component Tests', () => {
    describe('Spring Management Detail Component', () => {
        let comp: SpringDetailComponent;
        let fixture: ComponentFixture<SpringDetailComponent>;
        const route = ({ data: of({ spring: new Spring(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UmlTestModule],
                declarations: [SpringDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SpringDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpringDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.spring).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
