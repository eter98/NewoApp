/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EspaciosReservaDetailComponent } from 'app/entities/espacios-reserva/espacios-reserva-detail.component';
import { EspaciosReserva } from 'app/shared/model/espacios-reserva.model';

describe('Component Tests', () => {
    describe('EspaciosReserva Management Detail Component', () => {
        let comp: EspaciosReservaDetailComponent;
        let fixture: ComponentFixture<EspaciosReservaDetailComponent>;
        const route = ({ data: of({ espaciosReserva: new EspaciosReserva(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspaciosReservaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EspaciosReservaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspaciosReservaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.espaciosReserva).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
