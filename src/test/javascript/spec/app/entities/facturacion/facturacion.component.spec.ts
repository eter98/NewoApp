/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { FacturacionComponent } from 'app/entities/facturacion/facturacion.component';
import { FacturacionService } from 'app/entities/facturacion/facturacion.service';
import { Facturacion } from 'app/shared/model/facturacion.model';

describe('Component Tests', () => {
    describe('Facturacion Management Component', () => {
        let comp: FacturacionComponent;
        let fixture: ComponentFixture<FacturacionComponent>;
        let service: FacturacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [FacturacionComponent],
                providers: []
            })
                .overrideTemplate(FacturacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FacturacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacturacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Facturacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.facturacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
