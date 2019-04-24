/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { EspaciosReservaComponent } from 'app/entities/espacios-reserva/espacios-reserva.component';
import { EspaciosReservaService } from 'app/entities/espacios-reserva/espacios-reserva.service';
import { EspaciosReserva } from 'app/shared/model/espacios-reserva.model';

describe('Component Tests', () => {
    describe('EspaciosReserva Management Component', () => {
        let comp: EspaciosReservaComponent;
        let fixture: ComponentFixture<EspaciosReservaComponent>;
        let service: EspaciosReservaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspaciosReservaComponent],
                providers: []
            })
                .overrideTemplate(EspaciosReservaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspaciosReservaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspaciosReservaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EspaciosReserva(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.espaciosReservas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
