/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { ReservasComponent } from 'app/entities/reservas/reservas.component';
import { ReservasService } from 'app/entities/reservas/reservas.service';
import { Reservas } from 'app/shared/model/reservas.model';

describe('Component Tests', () => {
    describe('Reservas Management Component', () => {
        let comp: ReservasComponent;
        let fixture: ComponentFixture<ReservasComponent>;
        let service: ReservasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ReservasComponent],
                providers: []
            })
                .overrideTemplate(ReservasComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReservasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservasService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Reservas(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reservas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
