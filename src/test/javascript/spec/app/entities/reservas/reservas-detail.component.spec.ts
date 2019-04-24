/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { ReservasDetailComponent } from 'app/entities/reservas/reservas-detail.component';
import { Reservas } from 'app/shared/model/reservas.model';

describe('Component Tests', () => {
    describe('Reservas Management Detail Component', () => {
        let comp: ReservasDetailComponent;
        let fixture: ComponentFixture<ReservasDetailComponent>;
        const route = ({ data: of({ reservas: new Reservas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ReservasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReservasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReservasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.reservas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
