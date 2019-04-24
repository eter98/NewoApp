/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { RegistroCompraComponent } from 'app/entities/registro-compra/registro-compra.component';
import { RegistroCompraService } from 'app/entities/registro-compra/registro-compra.service';
import { RegistroCompra } from 'app/shared/model/registro-compra.model';

describe('Component Tests', () => {
    describe('RegistroCompra Management Component', () => {
        let comp: RegistroCompraComponent;
        let fixture: ComponentFixture<RegistroCompraComponent>;
        let service: RegistroCompraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [RegistroCompraComponent],
                providers: []
            })
                .overrideTemplate(RegistroCompraComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegistroCompraComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroCompraService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RegistroCompra(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.registroCompras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
