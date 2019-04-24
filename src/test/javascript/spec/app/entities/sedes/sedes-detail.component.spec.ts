/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { SedesDetailComponent } from 'app/entities/sedes/sedes-detail.component';
import { Sedes } from 'app/shared/model/sedes.model';

describe('Component Tests', () => {
    describe('Sedes Management Detail Component', () => {
        let comp: SedesDetailComponent;
        let fixture: ComponentFixture<SedesDetailComponent>;
        const route = ({ data: of({ sedes: new Sedes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [SedesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SedesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SedesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sedes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
