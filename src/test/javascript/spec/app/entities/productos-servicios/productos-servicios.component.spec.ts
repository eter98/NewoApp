/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { ProductosServiciosComponent } from 'app/entities/productos-servicios/productos-servicios.component';
import { ProductosServiciosService } from 'app/entities/productos-servicios/productos-servicios.service';
import { ProductosServicios } from 'app/shared/model/productos-servicios.model';

describe('Component Tests', () => {
    describe('ProductosServicios Management Component', () => {
        let comp: ProductosServiciosComponent;
        let fixture: ComponentFixture<ProductosServiciosComponent>;
        let service: ProductosServiciosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ProductosServiciosComponent],
                providers: []
            })
                .overrideTemplate(ProductosServiciosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductosServiciosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosServiciosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductosServicios(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productosServicios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
